import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // Particles
      setTimeout(() => setPhase(2), 1500), // Logo & Mana Rythu
      setTimeout(() => setPhase(3), 3500), // Tagline
      setTimeout(() => setPhase(4), 5500), // Subtitle
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#052e16]"
      {...sceneTransitions.clipPolygon}
    >
      {/* Particle burst */}
      {phase >= 1 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#4ade80]"
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{ 
                x: (Math.random() - 0.5) * 800, 
                y: (Math.random() - 0.5) * 800, 
                scale: Math.random() * 2,
                opacity: [1, 0] 
              }}
              transition={{ duration: 2 + Math.random() * 2, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      <motion.div 
        className="flex flex-col items-center z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="text-[10vw] mb-6 drop-shadow-[0_0_40px_rgba(74,222,128,0.5)]">🌾</div>
        <h1 className="text-[8vw] font-black text-white tracking-tighter leading-none mb-8">
          Mana<span className="text-[#4ade80]">Rythu</span>
        </h1>
      </motion.div>

      <motion.h2 
        className="text-[3vw] font-bold text-white/90 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        AI Operating System for Farmers
      </motion.h2>

      <motion.p 
        className="text-[2vw] text-[#4ade80] mt-8 font-medium tracking-wide z-20"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={phase >= 4 ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 1.2 }}
      >
        Marketplace · AI · Chat · Logistics — one platform
      </motion.p>

    </motion.div>
  );
}