import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

const screens = [
  { img: 'marketplace.jpg',    label: '🌾 Marketplace',         cap: 'Direct farmer-to-buyer crop listings' },
  { img: 'farmer-dashboard.jpg', label: '📊 Farmer Dashboard',  cap: 'Zero commission. Full transparency.' },
  { img: 'pest-detection.jpg', label: '🤖 AI Pest Detection',   cap: 'Upload photo → Telugu AI diagnosis' },
  { img: 'logistics.jpg',      label: '🚛 Logistics Estimator', cap: 'Transport costs across TS & AP' },
];

export function Scene5() {
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
      {...sceneTransitions.clipPolygon}
    >
      <CinematicBg overlay="rgba(5,20,22,0.82)" />

      <div className="relative z-10 flex flex-col items-center w-full px-10">
        {/* Header badge */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm font-bold tracking-[0.3em] text-[#4ade80] uppercase">
            DESKTOP DASHBOARD
          </span>
          <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        </motion.div>

        {/* Label + caption */}
        <div className="h-16 flex flex-col items-center justify-center mb-4 text-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.h2
              key={`label-${screenIdx}`}
              className="text-[2.5vw] font-black text-white"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {screens[screenIdx].label}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={`cap-${screenIdx}`}
              className="text-[1.4vw] text-white/60 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {screens[screenIdx].cap}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Browser mockup */}
        <motion.div
          className="w-full overflow-hidden flex flex-col"
          style={{
            maxWidth: 900,
            borderRadius: '12px 12px 8px 8px',
            border: '2px solid rgba(255,255,255,0.14)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center px-4 gap-2 flex-shrink-0"
            style={{
              height: 38,
              background: 'rgba(20,20,20,0.96)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div
              className="flex-1 mx-3 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>
                🔒 mana-rythu.replit.app
              </span>
            </div>
          </div>

          {/* Screenshot area */}
          <div className="relative bg-[#052e16] overflow-hidden" style={{ height: '52vh' }}>
            <AnimatePresence mode="popLayout">
              <motion.img
                key={screenIdx}
                src={`${BASE}screenshots/${screens[screenIdx].img}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex gap-3 mt-5">
          {screens.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full"
              animate={{
                width: i === screenIdx ? 28 : 6,
                backgroundColor: i === screenIdx ? '#22c55e' : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
