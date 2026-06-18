import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 3500),
      setTimeout(() => setPhase(5), 8500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-12"
      {...sceneTransitions.wipe}
    >
      <motion.h2 
        className="text-7xl font-bold mb-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={phase >= 5 ? { opacity: 0, y: -50 } : phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        The Mana Rythu <span className="text-highlight">Impact</span>
      </motion.h2>

      <div className="grid grid-cols-3 gap-12 w-full max-w-6xl">
        <StatCard 
          label="Farmer Income" 
          value="+50%" 
          phase={phase} 
          triggerPhase={2} 
          isExit={phase >= 5}
        />
        <StatCard 
          label="Middlemen" 
          value="Zero" 
          phase={phase} 
          triggerPhase={3} 
          isExit={phase >= 5}
        />
        <StatCard 
          label="Negotiation" 
          value="Real-time" 
          phase={phase} 
          triggerPhase={4} 
          isExit={phase >= 5}
        />
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, phase, triggerPhase, isExit }: { label: string, value: string, phase: number, triggerPhase: number, isExit: boolean }) {
  return (
    <motion.div 
      className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center text-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={isExit ? { opacity: 0, scale: 1.1, filter: "blur(10px)" } : phase >= triggerPhase ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {phase >= triggerPhase && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      )}
      <p className="text-2xl text-gray-400 font-medium mb-4 relative z-10">{label}</p>
      <h3 className="text-6xl font-black text-white relative z-10">{value}</h3>
    </motion.div>
  );
}
