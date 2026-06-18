import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

const screens = [
  { img: 'marketplace.jpg',       label: '📱 Mobile Marketplace',   cap: 'Browse 500+ live crop listings' },
  { img: 'farmer-dashboard2.jpg', label: '📊 Farmer Dashboard',     cap: 'Track crops, earnings & orders' },
  { img: 'chat-ui.jpg',           label: '💬 Real-Time Chat',        cap: 'Negotiate directly with buyers' },
  { img: 'fair-price.jpg',        label: '💰 AI Price Intel',        cap: 'Live APMC rates, Grade A/B/C pricing' },
];

export function Scene4() {
  const [screenIdx, setScreenIdx] = useState(0);
  const BASE = import.meta.env.BASE_URL;

  useEffect(() => {
    const timers = [
      setTimeout(() => setScreenIdx(1), 7000),
      setTimeout(() => setScreenIdx(2), 15000),
      setTimeout(() => setScreenIdx(3), 23000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      {...sceneTransitions.morphExpand}
    >
      <CinematicBg overlay="rgba(5,20,22,0.82)" />

      <div className="relative z-10 flex items-center gap-16 w-full max-w-6xl px-16">
        {/* Left: label + dots */}
        <div className="flex-1 flex flex-col">
          <motion.span
            className="text-sm font-bold tracking-[0.3em] text-[#4ade80] uppercase mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            MOBILE APP
          </motion.span>

          <AnimatePresence mode="popLayout">
            <motion.h2
              key={screenIdx}
              className="text-[3.5vw] font-black text-white leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {screens[screenIdx].label}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <motion.p
              key={screenIdx}
              className="text-[1.6vw] text-white/70 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {screens[screenIdx].cap}
            </motion.p>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-3 mt-10">
            {screens.map((_, i) => (
              <motion.div
                key={i}
                className="h-2 rounded-full"
                animate={{
                  width: i === screenIdx ? 32 : 8,
                  backgroundColor: i === screenIdx ? '#22c55e' : 'rgba(255,255,255,0.3)',
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </div>

        {/* Phone mockup */}
        <motion.div
          className="relative flex-shrink-0"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="relative overflow-hidden bg-black"
            style={{
              width: 280,
              height: 570,
              borderRadius: '2.5rem',
              border: '6px solid rgba(255,255,255,0.18)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 20px rgba(0,0,0,0.3)',
            }}
          >
            {/* Dynamic Island / notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20 pt-1">
              <div className="w-24 h-5 bg-black rounded-full" />
            </div>

            <AnimatePresence mode="popLayout">
              <motion.img
                key={screenIdx}
                src={`${BASE}screenshots/${screens[screenIdx].img}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </AnimatePresence>

            {/* Bottom home bar */}
            <div className="absolute bottom-2 inset-x-0 flex justify-center z-20">
              <div className="w-24 h-1 bg-white/30 rounded-full" />
            </div>
          </div>

          {/* Glow under phone */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full blur-xl"
            style={{ background: 'rgba(34,197,94,0.25)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
