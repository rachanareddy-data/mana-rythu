import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 4500),
      setTimeout(() => setPhase(4), 8500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const pills = [
    { icon: '🌾', text: 'Marketplace' },
    { icon: '🤖', text: 'AI Intelligence' },
    { icon: '💬', text: 'Real-Time Chat' },
    { icon: '🚛', text: 'Logistics' },
    { icon: '💳', text: 'UPI Payments' },
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.fadeBlur}
    >
      <CinematicBg overlay="rgba(5,46,22,0.55)" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex flex-col items-center"
        >
          <img src={`${import.meta.env.BASE_URL}images/sprout.png`} alt="Sprout" className="w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6 drop-shadow-2xl" />
          <h1 className="font-black text-white tracking-tighter leading-none" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
            Mana Rythu
          </h1>
        </motion.div>

        <motion.p
          className="font-bold text-[#22c55e] mt-3 sm:mt-4"
          style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.4rem)' }}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={phase >= 2 ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
        >
          AI Operating System for Farmers
        </motion.p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8 sm:mt-12 px-2 sm:px-8">
          {pills.map((pill, i) => (
            <motion.div
              key={pill.text}
              className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 sm:px-6 py-2 sm:py-3 rounded-full"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={phase >= 3 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: phase >= 3 ? i * 0.15 : 0 }}
            >
              <span className="text-base sm:text-2xl">{pill.icon}</span>
              <span className="text-xs sm:text-xl font-bold text-white">{pill.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 sm:absolute sm:top-[35vh] text-white/80 font-medium tracking-wider"
          style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.95rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          Built for 140M farmers across Telangana & AP
        </motion.div>
      </div>
    </motion.div>
  );
}
