import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';
import { IconGlobe } from '../VideoIcons';

const lines = [
  { text: '140 Million Farmers',       color: 'text-white' },
  { text: 'One AI Operating System',   color: 'text-[#22c55e]' },
  { text: 'One Fair Market',           color: 'text-white' },
  { text: 'Built and running today.',  color: 'text-[#4ade80]', glow: true },
];

const particles = [0, 1, 2, 3, 4];

export function Scene8() {
  const [phase, setPhase] = useState(0);
  const BASE = import.meta.env.BASE_URL;

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 1900),
      setTimeout(() => setPhase(4), 2700),
      setTimeout(() => setPhase(5), 3500),
      setTimeout(() => setPhase(6), 6000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.fadeBlur}
    >
      <CinematicBg overlay="rgba(5,46,22,0.45)" />

      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 6 + i * 2,
            height: 6 + i * 2,
            left: `${15 + i * 17}%`,
            bottom: '-20px',
            background: 'rgba(74,222,128,0.5)',
            filter: 'blur(2px)',
          }}
          animate={{
            y: [0, -(Math.random() * 300 + 400)],
            opacity: [0, 0.7, 0],
            x: [0, (i % 2 === 0 ? 30 : -30)],
          }}
          transition={{
            duration: 6 + i * 1.2,
            repeat: Infinity,
            delay: i * 1.1,
            ease: 'easeOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <motion.img
          src={`${BASE}images/sprout.png`}
          alt="Mana Rythu"
          className="mb-8 drop-shadow-2xl"
          style={{ width: 64, height: 64 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        />

        <div className="flex flex-col items-center gap-2">
          {lines.map((line, i) => (
            <motion.h2
              key={i}
              className={`font-black leading-tight ${line.color}`}
              style={{
                fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
                ...(line.glow ? { textShadow: '0 0 40px rgba(74,222,128,0.6)' } : {}),
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={phase >= i + 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              {line.text}
            </motion.h2>
          ))}
        </div>

        <AnimatePresence>
          {phase >= 6 && (
            <motion.div
              className="mt-12 flex items-center gap-3 rounded-full px-8 py-3 text-white text-lg font-medium"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <IconGlobe size={24} color="#4ade80" strokeWidth={1.8} />
              <span>mana-rythu.replit.app</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
