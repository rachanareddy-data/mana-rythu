import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // Chart layout
      setTimeout(() => setPhase(2), 2000), // Pain 1
      setTimeout(() => setPhase(3), 4500), // Pain 2
      setTimeout(() => setPhase(4), 7000), // Pain 3
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10 bg-[#052e16] px-16"
      {...sceneTransitions.pushLeft}
    >
      <div className="w-1/2 h-full flex items-center justify-center relative">
        {/* Chain Diagram */}
        <div className="flex flex-col items-center gap-4">
          {['👨🏽‍🌾 Farmer', '🕴️ Broker', '🕴️ Wholesaler', '🛒 Buyer'].map((node, i) => (
            <motion.div key={i} className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className={`px-8 py-4 rounded-xl border-2 text-2xl font-bold ${
                i === 0 || i === 3 ? 'bg-white/10 border-white/20 text-white' : 'bg-red-500/20 border-red-500 text-red-400'
              }`}>
                {node}
              </div>
              {i < 3 && (
                <div className="h-10 w-1 bg-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-1/2 h-full flex flex-col justify-center gap-12 pr-12">
        <PainPoint 
          text="No price visibility" 
          show={phase >= 2} 
        />
        <PainPoint 
          text="No direct market access" 
          show={phase >= 3} 
        />
        <PainPoint 
          text="No accountability, no receipts" 
          show={phase >= 4} 
        />
      </div>
    </motion.div>
  );
}

function PainPoint({ text, show }: { text: string, show: boolean }) {
  return (
    <motion.div 
      className="bg-red-500/10 border-l-4 border-red-500 p-8 rounded-r-2xl"
      initial={{ opacity: 0, x: 50 }}
      animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center gap-4">
        <span className="text-red-500 text-3xl font-black">✕</span>
        <h3 className="text-3xl font-bold text-white">{text}</h3>
      </div>
    </motion.div>
  );
}