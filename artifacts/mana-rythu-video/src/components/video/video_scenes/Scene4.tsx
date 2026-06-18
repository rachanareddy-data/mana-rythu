import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

const screens = [
  { img: 'marketplace.jpg', cap: 'Browse live crop listings' },
  { img: 'farmer-dashboard2.jpg', cap: 'Manage crops & track earnings' },
  { img: 'pest-detection.jpg', cap: 'Upload photo → AI diagnoses in Telugu' },
  { img: 'logistics.jpg', cap: 'Estimate transport cost across TS & AP' }
];

export function Scene4() {
  const [screenIdx, setScreenIdx] = useState(0);

  useEffect(() => {
    // 30 seconds total, 4 screens ~ 7s each
    const timers = [
      setTimeout(() => setScreenIdx(1), 7000),
      setTimeout(() => setScreenIdx(2), 14000),
      setTimeout(() => setScreenIdx(3), 21000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const BASE = import.meta.env.BASE_URL;

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#052e16]"
      {...sceneTransitions.morphExpand}
    >
      {/* Phone Mockup */}
      <motion.div 
        className="relative w-[320px] h-[650px] rounded-[3rem] border-[6px] border-white/20 bg-black shadow-2xl overflow-hidden mb-12"
        animate={{ y: [0, -10, 0], rotateZ: [0, 1, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
          <div className="w-32 h-6 bg-white/20 rounded-b-xl" />
        </div>

        <AnimatePresence mode="popLayout">
          <motion.img 
            key={screenIdx}
            src={`${BASE}screenshots/${screens[screenIdx].img}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Caption */}
      <div className="h-20 flex items-center justify-center overflow-hidden w-full max-w-2xl px-8 text-center">
        <AnimatePresence mode="popLayout">
          <motion.p 
            key={screenIdx}
            className="text-[2.5vw] font-bold text-white"
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