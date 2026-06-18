import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

const stats = [
  { value: '140M',  label: 'Farm Holdings',         sub: 'Addressable market in Telangana & AP' },
  { value: '₹30T',  label: 'Agri Supply Chain',     sub: "India's agriculture market opportunity" },
  { value: '350M',  label: 'Rural Internet Users',  sub: 'Growing digital-first farmer population' },
];

export function Scene7() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => setPhase(5), 7000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.fadeBlur}
    >
      <CinematicBg overlay="rgba(5,46,22,0.60)" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-12">
        <motion.h2
          className="text-[4vw] font-bold text-[#22c55e] mb-12 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          The Impact
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 w-full">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="flex-1 min-w-[240px] max-w-[300px] flex flex-col items-center text-center rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={phase >= 2 + i ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            >
              <h3
                className="font-black leading-none mb-3"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#4ade80' }}
              >
                {s.value}
              </h3>
              <p className="text-xl font-bold text-white mb-1">{s.label}</p>
              <p className="text-sm text-white/55 leading-snug">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Impact lines */}
        <div className="flex flex-col items-center gap-3 mt-12">
          {[
            '50% higher income for farmers through direct sales',
            '100% transparent trade — receipts, contracts, real-time pricing',
          ].map((line, i) => (
            <motion.p
              key={i}
              className="text-[1.4vw] font-medium text-white text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
