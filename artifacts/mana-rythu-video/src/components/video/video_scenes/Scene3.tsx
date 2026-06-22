import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';
import { IconWheat, IconRobot, IconMoney, IconChat, IconTruck } from '../VideoIcons';

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
    { Icon: IconWheat,  title: "Marketplace",        desc: "Connect farmers to direct buyers",      color: "#22c55e" },
    { Icon: IconRobot,  title: "AI Crop Intel",       desc: "Disease detection via photo upload",   color: "#a78bfa" },
    { Icon: IconMoney,  title: "Price Intelligence",  desc: "Live APMC mandi rates",               color: "#fbbf24" },
    { Icon: IconChat,   title: "Live Chat",           desc: "Farmer-buyer negotiation",             color: "#38bdf8" },
    { Icon: IconTruck,  title: "Logistics",           desc: "Transport estimates TS & AP",          color: "#fb923c" },
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#052e16] overflow-hidden"
      {...sceneTransitions.morphExpand}
    >
      <CinematicBg overlay="rgba(5,46,22,0.68)" />

      <div className="relative z-10 w-full flex flex-col items-center px-4 sm:px-8 lg:px-16 text-center">
        <motion.p
          className="font-bold text-[#4ade80] tracking-widest uppercase mb-3 sm:mb-4"
          style={{ fontSize: 'clamp(0.75rem, 2vw, 1.25rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          Introducing
        </motion.p>

        <motion.h1
          className="font-black text-white leading-none drop-shadow-2xl"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          Mana Rythu
        </motion.h1>

        <motion.p
          className="font-medium text-[#22c55e] mt-3 mb-10 sm:mb-20 drop-shadow-md"
          style={{ fontSize: 'clamp(0.85rem, 3vw, 1.8rem)' }}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={phase >= 3 ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1 }}
        >
          — One platform. Zero middlemen.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 w-full max-w-7xl">
          {features.map(({ Icon, title, desc, color }, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 flex flex-col items-center text-center shadow-xl"
              style={{ width: 'clamp(130px, 40vw, 240px)' }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={phase >= 4 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: phase >= 4 ? i * 0.1 : 0 }}
            >
              <div className="mb-2 sm:mb-4">
                <Icon size={44} color={color} strokeWidth={1.6} />
              </div>
              <h3 className="font-bold text-white mb-1" style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1.25rem)' }}>{title}</h3>
              <p className="text-white/70" style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)' }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
