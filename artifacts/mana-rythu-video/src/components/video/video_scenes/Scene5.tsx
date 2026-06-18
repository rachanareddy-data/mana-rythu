import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),  // Price intel appears
      setTimeout(() => setPhase(2), 4000),  // Chart bars animate
      setTimeout(() => setPhase(3), 8000),  // Rec price slams in
      setTimeout(() => setPhase(4), 14000), // Order flow begins
      setTimeout(() => setPhase(5), 18000), // Timeline dots
      setTimeout(() => setPhase(6), 23000), // Payment escrow
      setTimeout(() => setPhase(7), 26000), // Balance update
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex z-10 bg-bg-dark"
      {...sceneTransitions.splitHorizontal}
    >
      {/* LEFT: AI Fair Price */}
      <div className="w-1/2 h-full relative p-20 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-black text-white mb-4">Price Intelligence</h2>
          <div className="flex gap-4 mb-16">
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-white/80">Tomatoes</span>
            <span className="bg-primary/20 border border-primary/40 text-primary px-4 py-2 rounded-full font-bold">Grade A</span>
            <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-white/80">Nalgonda</span>
          </div>

          {/* Chart */}
          <div className="h-64 flex items-end gap-6 mb-16 border-b border-white/10 pb-4">
            {[40, 60, 45, 80, 50, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <motion.div 
                  className={`w-full rounded-t-lg ${i === 5 ? 'bg-primary' : 'bg-white/10'}`}
                  initial={{ height: 0 }}
                  animate={phase >= 2 ? { height: `${h}%` } : { height: 0 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                />
                <span className="text-white/40 text-sm">D{i+1}</span>
              </div>
            ))}
          </div>

          {/* Result */}
          {phase >= 3 && (
            <motion.div 
              className="bg-highlight/10 border border-highlight p-8 rounded-3xl"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="text-highlight font-bold uppercase tracking-widest mb-2">Recommended Price</p>
              <h3 className="text-7xl font-black text-white mb-2">₹27<span className="text-3xl text-white/50">/kg</span></h3>
              <p className="text-highlight/80 text-xl font-medium">↑ 23% above APMC average</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* RIGHT: Order Flow */}
      <div className="w-1/2 h-full bg-[#0a1f12] relative p-20 flex flex-col justify-center border-l border-primary/20">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={phase >= 4 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-black text-white mb-16">Seamless Settlement</h2>

          {/* Timeline */}
          <div className="flex flex-col gap-12 mb-16 relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-white/5" />
            
            {['Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-8 relative z-10"
                initial={{ opacity: 0.3 }}
                animate={phase >= 5 && i <= 4 ? { opacity: 1 } : { opacity: 0.3 }}
                transition={{ duration: 0.5, delay: phase >= 5 ? i * 0.4 : 0 }}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-4 ${phase >= 5 && i <= 4 ? 'bg-primary border-highlight shadow-[0_0_20px_rgba(74,222,128,0.4)]' : 'bg-bg-dark border-white/10 text-white/30'}`}>
                  {phase >= 5 && i <= 4 ? '✓' : i+1}
                </div>
                <p className={`text-3xl font-bold ${phase >= 5 && i <= 4 ? 'text-white' : 'text-white/30'}`}>{step}</p>
              </motion.div>
            ))}
          </div>

          {/* Escrow & Payment */}
          <div className="flex gap-8">
            {phase >= 6 && (
              <motion.div 
                className="flex-1 bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-4xl">🔒</div>
                <div>
                  <p className="text-white/50 text-sm font-bold uppercase">Security</p>
                  <p className="text-white font-bold text-xl">UPI Escrow Protected</p>
                </div>
              </motion.div>
            )}

            {phase >= 7 && (
              <motion.div 
                className="flex-1 bg-primary/20 border border-primary p-6 rounded-2xl flex flex-col justify-center shadow-[0_0_30px_rgba(21,128,61,0.2)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <p className="text-primary font-bold uppercase tracking-wider text-sm mb-1">Received</p>
                <p className="text-white font-black text-3xl">+₹13,500</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
