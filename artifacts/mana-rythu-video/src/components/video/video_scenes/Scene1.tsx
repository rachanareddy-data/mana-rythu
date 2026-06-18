import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // 140M Indian farmers
      setTimeout(() => setPhase(2), 2000), // One broken system
      setTimeout(() => setPhase(3), 4000), // Visual chain ₹20 -> ₹40
      setTimeout(() => setPhase(4), 5500), // Stolen text
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#052e16]"
      {...sceneTransitions.fadeBlur}
    >
      <div className="text-center mb-16 relative z-20 px-8">
        <motion.h1 
          className="text-[6vw] font-bold text-white tracking-tight leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          140M Indian farmers.
        </motion.h1>
        <motion.h1 
          className="text-[6vw] font-bold text-red-400 tracking-tight leading-tight"
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          animate={phase >= 2 ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          transition={{ duration: 0.8 }}
        >
          One broken system.
        </motion.h1>
      </div>

      {phase >= 3 && (
        <div className="flex items-center justify-center w-full gap-8">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="w-24 h-24 bg-[#15803d]/30 rounded-full border-2 border-[#15803d] flex items-center justify-center text-4xl mb-4">👨🏽‍🌾</div>
            <p className="text-white text-xl font-bold">Farmer gets</p>
            <p className="text-3xl font-black text-[#22c55e]">₹20</p>
          </motion.div>

          <motion.div 
            className="h-2 w-32 bg-gradient-to-r from-[#22c55e] to-red-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
          />

          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.5 }}
          >
            <div className="w-24 h-24 bg-white/10 rounded-full border-2 border-white/20 flex items-center justify-center text-4xl mb-4">🛒</div>
            <p className="text-white text-xl font-bold">Buyer pays</p>
            <p className="text-3xl font-black text-white/80">₹40</p>
          </motion.div>
        </div>
      )}

      {phase >= 4 && (
        <motion.div 
          className="absolute bottom-[20%] bg-red-500/20 border border-red-500 px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.3)]"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <p className="text-3xl font-bold text-red-400">₹20 stolen by middlemen</p>
        </motion.div>
      )}
    </motion.div>
  );
}