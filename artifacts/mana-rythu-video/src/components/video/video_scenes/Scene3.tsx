import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1700),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 4500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const features = [
    { icon: "🌾", title: "Marketplace", desc: "Connect farmers to direct buyers" },
    { icon: "🤖", title: "AI Crop Intel", desc: "Disease detection via photo upload" },
    { icon: "💰", title: "Price Intelligence", desc: "Live APMC mandi rates" },
    { icon: "💬", title: "Live Chat", desc: "Farmer-buyer negotiation" },
    { icon: "🚛", title: "Logistics", desc: "Transport estimates TS & AP" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#052e16]"
      {...sceneTransitions.morphExpand}
    >
      <CinematicBg overlay="rgba(5,46,22,0.68)" />

      <div className="relative z-10 w-full flex flex-col items-center px-16 text-center">
        <motion.p
          className="text-2xl font-bold text-[#4ade80] tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          Introducing
        </motion.p>

        <motion.h1
          className="text-[8vw] font-black text-white leading-none drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          Mana Rythu
        </motion.h1>

        <motion.p
          className="text-[3vw] font-medium text-[#22c55e] mt-4 mb-20 drop-shadow-md"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={phase >= 3 ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1 }}
        >
          — One platform. Zero middlemen.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-[240px] flex flex-col items-center text-center shadow-xl"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={phase >= 4 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: phase >= 4 ? i * 0.1 : 0 }}
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/70">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}