import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Phone appears
      setTimeout(() => setPhase(2), 1500),  // Msg 1
      setTimeout(() => setPhase(3), 3000),  // Msg 2
      setTimeout(() => setPhase(4), 5000),  // AI Panel slides in
      setTimeout(() => setPhase(5), 6500),  // AI Price calculates
      setTimeout(() => setPhase(6), 10500), // exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center gap-16 z-10"
      {...sceneTransitions.clipPolygon}
    >
      {/* Phone UI - Chat */}
      <motion.div 
        className="w-[380px] h-[750px] bg-bg-light rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden relative flex flex-col"
        initial={{ opacity: 0, x: -100, rotate: -10 }}
        animate={phase >= 6 ? { opacity: 0, scale: 0.8 } : phase >= 1 ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -100, rotate: -10 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="bg-gray-100 p-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-800 text-xl">Ramu (Farmer)</h3>
          <p className="text-sm text-green-600 font-medium">Online</p>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6 bg-gray-50">
          <motion.div 
            className="self-end bg-primary text-white p-4 rounded-2xl rounded-tr-none max-w-[80%]"
            initial={{ opacity: 0, scale: 0.8, originX: 1, originY: 1 }}
            animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <p>I have 500kg of Grade A Tomatoes ready tomorrow.</p>
          </motion.div>

          <motion.div 
            className="self-start bg-gray-800 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%]"
            initial={{ opacity: 0, scale: 0.8, originX: 0, originY: 1 }}
            animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <p>What price are you expecting?</p>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Fair Price Panel */}
      <motion.div 
        className="w-[500px] bg-bg-dark/80 backdrop-blur-xl border border-primary/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(21,128,61,0.3)]"
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={phase >= 6 ? { opacity: 0, scale: 1.1 } : phase >= 4 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-highlight/20 flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <h2 className="text-3xl font-bold text-white">AI Fair Price</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Crop & Grade</p>
            <p className="text-white font-bold text-xl">Tomato • Grade A</p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Mandi Benchmark</p>
            <p className="text-white font-bold text-xl">₹22/kg</p>
          </div>

          <motion.div 
            className="mt-8 bg-primary/20 border border-primary p-6 rounded-2xl text-center relative overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={phase >= 5 ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-primary opacity-20"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-highlight text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Recommended Price</p>
            <p className="text-6xl font-black text-white relative z-10">₹28<span className="text-2xl">/kg</span></p>
          </motion.div>
        </div>
      </motion.div>

    </motion.div>
  );
}
