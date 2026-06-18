import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

const screens = [
  { img: 'fair-price.jpg', cap: 'Live APMC mandi rates. Grade A/B/C pricing.' },
  { img: 'farmer-dashboard.jpg', cap: 'Zero commission. Full transparency.' },
  { img: 'home.jpg', cap: 'Built for Telangana & AP farmers' }
];

export function Scene5() {
  const [screenIdx, setScreenIdx] = useState(0);

  useEffect(() => {
    // 25 seconds total, 3 screens ~ 8s each
    const timers = [
      setTimeout(() => setScreenIdx(1), 8000),
      setTimeout(() => setScreenIdx(2), 16000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const BASE = import.meta.env.BASE_URL;

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#052e16]"
      {...sceneTransitions.clipPolygon}
    >
      <motion.div 
        className="relative w-[75vw] h-[60vh] bg-[#111] rounded-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col mb-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Browser Chrome */}
        <div className="h-10 bg-white/10 flex items-center px-4 border-b border-white/10 gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="mx-auto bg-black/40 h-6 w-1/2 rounded-md flex items-center justify-center text-xs text-white/40 font-mono">
            mana-rythu.replit.app
          </div>
        </div>

        <div className="relative flex-1 bg-[#052e16] overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={screenIdx}
              src={`${BASE}screenshots/${screens[screenIdx].img}`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Caption */}
      <div className="h-20 flex items-center justify-center w-full px-8 text-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.p 
            key={screenIdx}
            className="text-[2.5vw] font-bold text-white bg-black/50 px-8 py-3 rounded-full border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {screens[screenIdx].cap}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}