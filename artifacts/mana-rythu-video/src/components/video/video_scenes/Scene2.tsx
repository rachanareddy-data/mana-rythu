import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // farmer appears
      setTimeout(() => setPhase(2), 1500), // flow to middlemen
      setTimeout(() => setPhase(3), 3000), // middlemen duplicate
      setTimeout(() => setPhase(4), 4500), // flow to buyer
      setTimeout(() => setPhase(5), 6000), // stats appear
      setTimeout(() => setPhase(6), 8500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-24"
      {...sceneTransitions.zoomThrough}
    >
      <motion.h2 
        className="absolute top-24 left-24 text-5xl font-bold text-gray-400"
        initial={{ opacity: 0, x: -50 }}
        animate={phase >= 1 && phase < 6 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
      >
        The System is Broken.
      </motion.h2>

      <div className="flex items-center justify-between w-full max-w-6xl mt-12">
        {/* Farmer */}
        <motion.div 
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 1 && phase < 6 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center bg-bg-dark/50 backdrop-blur">
            <span className="text-4xl">👨🏽‍🌾</span>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">Farmer</p>
            <motion.p 
              className="text-4xl font-bold text-red-400 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            >Earns ₹20</motion.p>
          </div>
        </motion.div>

        {/* Middlemen */}
        <div className="flex-1 flex items-center justify-center px-8 relative">
          {/* Connecting line */}
          <motion.div 
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-red-500/50 to-red-500/50"
            initial={{ scaleX: 0 }}
            animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 1 }}
          />

          <motion.div 
            className="relative z-10 flex gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={phase >= 2 && phase < 6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          >
            <div className="w-24 h-24 rounded-lg border-2 border-red-500/50 bg-bg-dark/80 flex items-center justify-center text-3xl">🕴️</div>
            
            <motion.div 
              className="w-24 h-24 rounded-lg border-2 border-red-500/50 bg-bg-dark/80 flex items-center justify-center text-3xl absolute top-0 left-0"
              initial={{ x: 0, opacity: 0 }}
              animate={phase >= 3 ? { x: 40, y: 20, opacity: 0.8 } : { x: 0, opacity: 0 }}
            >🕴️</motion.div>
            
            <motion.div 
              className="w-24 h-24 rounded-lg border-2 border-red-500/50 bg-bg-dark/80 flex items-center justify-center text-3xl absolute top-0 left-0"
              initial={{ x: 0, opacity: 0 }}
              animate={phase >= 3 ? { x: -40, y: 20, opacity: 0.6 } : { x: 0, opacity: 0 }}
            >🕴️</motion.div>
          </motion.div>
          
          <motion.p 
            className="absolute -bottom-16 text-xl text-red-400 font-bold"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          >Multiple Brokers Take Cuts</motion.p>
        </div>

        {/* Buyer */}
        <motion.div 
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 4 && phase < 6 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-gray-500 flex items-center justify-center bg-bg-dark/50 backdrop-blur">
            <span className="text-4xl">🛒</span>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">Buyer</p>
            <motion.p 
              className="text-4xl font-bold text-red-400 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            >Pays ₹40</motion.p>
          </div>
        </motion.div>
      </div>
      
    </motion.div>
  );
}
