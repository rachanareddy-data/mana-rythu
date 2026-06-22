import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';
import { IconWheat, IconRobot, IconMoney, IconRocket } from '../VideoIcons';

const steps = [
  {
    Icon: IconWheat,
    step: '01',
    title: 'Farmer Lists Crop',
    desc: 'Post crops with photo, quantity & price in under 2 minutes',
    iconColor: '#22c55e',
    color: 'rgba(34,197,94,0.2)',
    border: '#22c55e',
    glow: 'rgba(34,197,94,0.3)',
  },
  {
    Icon: IconRobot,
    step: '02',
    title: 'AI Matches Buyers',
    desc: 'Smart algorithm connects to verified buyers at fair APMC rates',
    iconColor: '#93c5fd',
    color: 'rgba(59,130,246,0.2)',
    border: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
  },
  {
    Icon: IconMoney,
    step: '03',
    title: 'Direct UPI Payment',
    desc: 'Farmer receives full price — zero agents, zero commission',
    iconColor: '#fde68a',
    color: 'rgba(251,191,36,0.2)',
    border: '#fbbf24',
    glow: 'rgba(251,191,36,0.3)',
  },
];

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 3600),
      setTimeout(() => setPhase(5), 6000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.morphExpand}
    >
      <CinematicBg overlay="rgba(5,46,22,0.68)" />

      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-8 text-center">

        <motion.p
          className="font-bold text-[#4ade80] tracking-widest uppercase mb-3"
          style={{ fontSize: 'clamp(0.65rem, 1.8vw, 1rem)' }}
          initial={{ opacity: 0, y: -16 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.p>

        <motion.h2
          className="font-black text-white leading-tight mb-3"
          style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)' }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          3 Steps. Zero Middlemen.
        </motion.h2>

        <motion.p
          className="text-white/65 mb-8 sm:mb-12"
          style={{ fontSize: 'clamp(0.75rem, 1.8vw, 1.1rem)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          From farm to buyer in minutes — not weeks.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-4 sm:gap-6 w-full max-w-4xl">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center rounded-2xl p-5 sm:p-7 w-full sm:w-auto sm:flex-1"
              style={{
                background: s.color,
                border: `2px solid ${s.border}`,
                boxShadow: `0 0 40px ${s.glow}`,
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={phase >= 3 + i ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div
                className="absolute top-3 right-3 text-[10px] font-black tracking-widest opacity-40"
                style={{ color: s.border }}
              >
                {s.step}
              </div>
              <div className="mb-3">
                <s.Icon size={48} color={s.iconColor} strokeWidth={1.6} />
              </div>
              <h3 className="font-bold text-white mb-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}>
                {s.title}
              </h3>
              <p className="text-white/65 leading-snug" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.875rem)' }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 sm:mt-12 flex items-center gap-3 rounded-full px-6 py-2.5"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(34,197,94,0.4)',
            backdropFilter: 'blur(8px)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8 }}
        >
          <IconRocket size={22} color="#4ade80" strokeWidth={1.8} />
          <span
            className="font-semibold text-white/85"
            style={{ fontSize: 'clamp(0.7rem, 1.6vw, 1rem)' }}
          >
            Live on Replit · Real farmers · Real crops · Real money
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
