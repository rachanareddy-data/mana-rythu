import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 5000), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      {...sceneTransitions.clipCircle}
    >
      <motion.div 
        className="flex items-center gap-6 mb-8"
        animate={phase >= 4 ? { scale: 3, opacity: 0, filter: "blur(20px)" } : { scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
          initial={{ rotate: -90, scale: 0, borderRadius: "50%" }}
          animate={phase >= 1 ? { rotate: 0, scale: 1, borderRadius: "25%" } : { rotate: -90, scale: 0, borderRadius: "50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.img 
            src={`${import.meta.env.BASE_URL}images/sprout.png`}
            className="w-full h-full object-cover mix-blend-luminosity opacity-80"
          />
        </motion.div>
        
        <div className="overflow-hidden">
          <motion.h1 
            className="text-8xl font-bold tracking-tight"
            initial={{ y: "100%" }}
            animate={phase >= 2 ? { y: 0 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            Mana<span className="text-highlight">Rythu</span>
          </motion.h1>
        </div>
      </motion.div>

      <motion.div
        className="overflow-hidden h-20 flex items-center"
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 0 } : { opacity: 1 }}
      >
        <motion.p 
          className="text-3xl text-gray-300 font-medium tracking-wide"
          initial={{ y: "100%", opacity: 0 }}
          animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Cut Middlemen. Empower Farmers.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
