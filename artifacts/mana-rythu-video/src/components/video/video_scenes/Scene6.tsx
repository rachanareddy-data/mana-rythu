import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 25 seconds total
    const timers = [
      setTimeout(() => setPhase(1), 500),   // 140M
      setTimeout(() => setPhase(2), 2500),  // ₹30T
      setTimeout(() => setPhase(3), 4500),  // 350M
      setTimeout(() => setPhase(4), 8000),  // Close screen
      setTimeout(() => setPhase(5), 11000), // Card lines
      setTimeout(() => setPhase(6), 14000), // One Fair Market
      setTimeout(() => setPhase(7), 17000), // Built & running
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10 bg-[#052e16] overflow-hidden"
      {...sceneTransitions.fadeBlur}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-30 blur-3xl pointer-events-none" />

      {phase < 4 && (
        <div className="flex flex-col gap-12 w-full max-w-4xl">
          <Stat value="140M" label="Farm holdings addressable" show={phase >= 1} />
          <Stat value="₹30T" label="India agri supply chain" show={phase >= 2} />
          <Stat value="350M" label="Rural internet users" show={phase >= 3} />
        </div>
      )}

      {phase >= 4 && (
        <motion.div 
          className="flex flex-col items-center justify-center w-full max-w-5xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-[5vw] font-black text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            140 Million Farmers
          </motion.h2>
          
          <motion.h2 
            className="text-[5vw] font-black text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            One AI Operating System
          </motion.h2>

          <motion.h2 
            className="text-[6vw] font-black text-[#4ade80] mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase >= 6 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            One Fair Market
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 7 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[2vw] font-bold text-white/80 bg-white/10 px-8 py-4 rounded-full border border-white/20 mb-8 inline-block">
              Built and running today.
            </p>
            <p className="text-[2vw] font-bold text-white tracking-widest uppercase opacity-60">
              mana-rythu.replit.app
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

function Stat({ value, label, show }: { value: string, label: string, show: boolean }) {
  return (
    <motion.div 
      className="flex items-end justify-between border-b border-white/20 pb-4"
      initial={{ opacity: 0, x: -50 }}
      animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <h3 className="text-[6vw] font-black text-[#4ade80] leading-none">{value}</h3>
      <p className="text-[2.5vw] font-medium text-white/80 mb-2">{label}</p>
    </motion.div>
  );
}