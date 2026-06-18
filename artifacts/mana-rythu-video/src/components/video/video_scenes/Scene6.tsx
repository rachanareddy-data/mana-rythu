import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3500),
      setTimeout(() => setPhase(5), 5500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const badges = [
    '✓ React + Vite',
    '✓ Express 5 API',
    '✓ PostgreSQL + Drizzle',
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.fadeBlur}
    >
      <CinematicBg overlay="rgba(5,46,22,0.58)" />

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Checkmark icon */}
        <motion.div
          className="flex items-center justify-center rounded-full mb-8"
          style={{
            width: 96,
            height: 96,
            background: 'rgba(34,197,94,0.2)',
            border: '2px solid rgba(34,197,94,0.5)',
            boxShadow: '0 0 60px rgba(34,197,94,0.4)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <span className="text-5xl">✅</span>
        </motion.div>

        <motion.h1
          className="font-black tracking-[0.18em] uppercase text-[#4ade80]"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={phase >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
          transition={{ duration: 0.7 }}
        >
          LIVE PRODUCT
        </motion.h1>

        <motion.p
          className="text-2xl text-white/80 font-medium tracking-widest mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
        >
          FULL STACK IMPLEMENTED
        </motion.p>

        {/* Tech badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {badges.map((badge, i) => (
            <motion.span
              key={badge}
              className="text-sm font-semibold text-white px-5 py-2 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(34,197,94,0.35)',
                backdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: phase >= 4 ? i * 0.12 : 0, type: 'spring', stiffness: 400, damping: 25 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="mt-10 text-lg italic font-medium"
          style={{ color: 'rgba(74,222,128,0.75)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 5 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          No mockups. No demo data. Real product.
        </motion.p>
      </div>
    </motion.div>
  );
}
