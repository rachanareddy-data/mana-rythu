import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // market stats
      setTimeout(() => setPhase(2), 2500), // clear stats
      setTimeout(() => setPhase(3), 3500), // lockup 1
      setTimeout(() => setPhase(4), 4500), // lockup 2
      setTimeout(() => setPhase(5), 5500), // lockup 3
      setTimeout(() => setPhase(6), 9000), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10"
      {...sceneTransitions.fadeBlur}
    >
      {/* Market Opportunity */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center gap-16"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 0, scale: 1.2, filter: "blur(20px)" } : phase >= 1 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <p className="text-7xl font-black text-white mb-4">140M</p>
          <p className="text-2xl text-primary font-bold">Farmers</p>
        </div>
        <div className="text-center">
          <p className="text-7xl font-black text-white mb-4">₹30T</p>
          <p className="text-2xl text-primary font-bold">Market</p>
        </div>
        <div className="text-center">
          <p className="text-7xl font-black text-white mb-4">350M</p>
          <p className="text-2xl text-primary font-bold">Rural Users</p>
        </div>
      </motion.div>

      {/* Final Lockup */}
      <div className="flex flex-col items-center justify-center">
        <motion.h1 
          className="text-[8vw] font-black tracking-tighter leading-none"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={phase >= 6 ? { opacity: 0 } : phase >= 3 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Mana<span className="text-primary">Rythu</span>
        </motion.h1>
        
        <div className="flex gap-4 mt-8 text-3xl font-medium tracking-wide">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={phase >= 6 ? { opacity: 0 } : phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          >One Platform.</motion.p>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={phase >= 6 ? { opacity: 0 } : phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          >One Fair Price.</motion.p>
          <motion.p 
            className="text-highlight font-bold"
            initial={{ opacity: 0, x: 20 }}
            animate={phase >= 6 ? { opacity: 0 } : phase >= 5 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          >Built for India.</motion.p>
        </div>
      </div>
    </motion.div>
  );
}
