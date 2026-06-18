import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // UI base
      setTimeout(() => setPhase(2), 1200),  // cards stagger
      setTimeout(() => setPhase(3), 3500),  // hover/focus card
      setTimeout(() => setPhase(4), 5500),  // zoom into card
      setTimeout(() => setPhase(5), 10500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10"
      {...sceneTransitions.morphExpand}
    >
      {/* UI Mockup Container */}
      <motion.div 
        className="w-[85vw] h-[80vh] bg-bg-light rounded-2xl shadow-2xl overflow-hidden flex text-text-primary border border-gray-200"
        initial={{ opacity: 0, y: 100, rotateX: 20 }}
        animate={
          phase >= 4 ? { scale: 1.5, opacity: 0, y: -200 } : 
          phase >= 1 ? { opacity: 1, y: 0, rotateX: 0 } : 
          { opacity: 0, y: 100, rotateX: 20 }
        }
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200 }}
      >
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col gap-6">
          <div className="h-8 w-32 bg-primary/20 rounded-md"></div>
          <div className="space-y-4 mt-8">
            <div className="h-4 w-full bg-gray-200 rounded-sm"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded-sm"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded-sm"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Direct Marketplace</h2>
            <div className="px-4 py-2 bg-highlight/20 text-secondary rounded-full font-bold">Live Prices 🟢</div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                className="bg-white p-5 rounded-xl border-2 border-transparent shadow-sm relative overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  phase >= 2 
                    ? phase >= 3 && i === 2 
                      ? { opacity: 1, y: -10, scale: 1.05, borderColor: "var(--color-primary)", boxShadow: "0 25px 50px -12px rgba(21, 128, 61, 0.25)" }
                      : { opacity: 1, y: 0, scale: 1, borderColor: "transparent", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }
                    : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: phase === 2 ? i * 0.1 : 0 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">🍅</div>
                  <span className="text-xs font-bold text-white bg-accent px-2 py-1 rounded-md">100% Trust</span>
                </div>
                <h3 className="font-bold text-xl mb-1">Premium Tomato</h3>
                <p className="text-sm text-gray-500 mb-4">Telangana • 500kg</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">Direct Price</p>
                    <p className="text-2xl font-bold text-primary">₹28<span className="text-sm">/kg</span></p>
                  </div>
                  {i === 2 && (
                    <motion.div 
                      className="text-xs font-bold text-secondary bg-highlight/30 px-2 py-1 rounded"
                      initial={{ opacity: 0, x: -10 }}
                      animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    >📈 Rising</motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
