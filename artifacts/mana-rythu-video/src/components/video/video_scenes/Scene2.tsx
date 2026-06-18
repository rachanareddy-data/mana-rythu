import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '../../lib/video/animations';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),  // Hook line
      setTimeout(() => setPhase(2), 5000),  // Flow begins
      setTimeout(() => setPhase(3), 10000), // Middlemen cascade
      setTimeout(() => setPhase(4), 16000), // Consumer price
      setTimeout(() => setPhase(5), 21000), // Stats text
      setTimeout(() => setPhase(6), 26000), // Final beat
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-24 bg-bg-dark"
      {...sceneTransitions.scaleFade}
    >
      <motion.h2 
        className="absolute top-1/3 w-full text-center text-[4vw] font-bold text-white/90"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={
          phase >= 2 ? { opacity: 0, y: -50, filter: 'blur(10px)' } :
          phase >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : 
          { opacity: 0, y: 20, filter: 'blur(10px)' }
        }
        transition={{ duration: 1.5, ease: 'circOut' }}
      >
        The man who grows your food —<br />
        <span className="text-red-400">can't afford to eat it.</span>
      </motion.h2>

      <div className="flex items-center justify-between w-full max-w-7xl mt-12">
        {/* Farmer */}
        <motion.div 
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1, ease: 'circOut' }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center bg-bg-dark/80 backdrop-blur overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}images/farmer-phone.png`} className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">Farmer</p>
            <motion.p 
              className="text-3xl font-black text-red-400 mt-2"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
            >₹4/kg</motion.p>
          </div>
        </motion.div>

        {/* Middlemen */}
        <div className="flex-1 flex items-center justify-center px-12 relative h-40">
          {/* Trickle to farmer */}
          <motion.div 
            className="absolute left-0 w-1/4 h-1 bg-red-500/30"
            initial={{ scaleX: 0 }}
            animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 1 }}
          />

          <motion.div 
            className="relative z-10 flex gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, staggerChildren: 0.2 }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="w-20 h-20 rounded-lg border border-red-500/50 bg-[#0a1f12] flex items-center justify-center text-3xl shadow-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: i * 0.4 }}
              >🕴️</motion.div>
            ))}
          </motion.div>

          {/* Fat arrow to middlemen/buyer */}
          <motion.div 
            className="absolute right-0 w-1/3 h-4 bg-gradient-to-r from-red-500/50 to-red-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={phase >= 4 ? { scaleX: 1 } : { scaleX: 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Buyer */}
        <motion.div 
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: 50 }}
          animate={phase >= 4 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1, ease: 'circOut' }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-gray-600 flex items-center justify-center bg-gray-800 backdrop-blur">
            <span className="text-4xl">🛒</span>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">Consumer</p>
            <motion.p 
              className="text-3xl font-black text-gray-300 mt-2"
              initial={{ opacity: 0 }}
              animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
            >₹42/kg</motion.p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-1/4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 6 ? { opacity: 0, y: -20 } : phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        <p className="text-[3vw] font-black text-white">9% of value.</p>
        <p className="text-[3vw] font-black text-red-500 mt-2">91% captured by brokers.</p>
      </motion.div>

      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-bg-dark"
        initial={{ opacity: 0 }}
        animate={phase >= 6 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <p className="text-[4vw] font-medium text-white/80 tracking-wide">
          "Raju didn't even know."
        </p>
      </motion.div>
      
    </motion.div>
  );
}
