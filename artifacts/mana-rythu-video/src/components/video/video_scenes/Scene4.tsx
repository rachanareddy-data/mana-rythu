import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

const screens = [
  { img: 'marketplace.jpg',       label: '📱 Mobile Marketplace',  cap: 'Browse 500+ live crop listings' },
  { img: 'farmer-dashboard2.jpg', label: '📊 Farmer Dashboard',    cap: 'Track crops, earnings & orders' },
  { img: 'chat-ui.jpg',           label: '💬 Real-Time Chat',       cap: 'Negotiate directly with buyers' },
  { img: 'fair-price.jpg',        label: '💰 AI Price Intel',       cap: 'Live APMC rates, Grade A/B/C pricing' },
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
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.morphExpand}
    >
      <CinematicBg overlay="rgba(5,20,22,0.82)" />

      <div className="relative z-10 flex flex-col items-center w-full h-full py-8 px-8">

        {/* Top: badge + screen label */}
        <div className="flex flex-col items-center mb-4">
          <motion.span
            className="text-xs font-bold tracking-[0.35em] text-[#4ade80] uppercase mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            MOBILE APP
          </motion.span>

          <AnimatePresence mode="popLayout">
            <motion.h2
              key={`label-${screenIdx}`}
              className="text-[2.8vw] font-black text-white text-center leading-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {screens[screenIdx].label}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Center: Phone mockup — big and prominent */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Ambient glow behind phone */}
            <div
              className="absolute inset-0 rounded-[3rem] blur-2xl -z-10 scale-110"
              style={{ background: 'rgba(34,197,94,0.18)' }}
            />

            {/* Phone frame */}
            <div
              className="relative overflow-hidden bg-black"
              style={{
                width: 'clamp(220px, 22vw, 310px)',
                height: 'clamp(440px, 44vw, 620px)',
                borderRadius: '2.5rem',
                border: '5px solid rgba(255,255,255,0.2)',
                boxShadow:
                  '0 50px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              {/* Dynamic island */}
              <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20 pt-2">
                <div className="w-20 h-4 bg-black rounded-full" />
              </div>

              {/* Screenshot slides */}
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={screenIdx}
                  src={`${BASE}screenshots/${screens[screenIdx].img}`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                />
              </AnimatePresence>

              {/* Home bar */}
              <div className="absolute bottom-2 inset-x-0 flex justify-center z-20">
                <div className="w-20 h-1 bg-white/25 rounded-full" />
              </div>
            </div>

            {/* Glow puddle under phone */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-2xl"
              style={{
                width: '70%',
                height: 24,
                background: 'rgba(34,197,94,0.3)',
              }}
            />
          </motion.div>
        </div>

        {/* Bottom: caption + dot indicators */}
        <div className="flex flex-col items-center gap-4 pb-2">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={`cap-${screenIdx}`}
              className="text-[1.6vw] text-white/75 font-medium text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {screens[screenIdx].cap}
            </motion.p>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {screens.map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full"
                animate={{
                  width: i === screenIdx ? 28 : 6,
                  backgroundColor:
                    i === screenIdx ? '#22c55e' : 'rgba(255,255,255,0.3)',
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
