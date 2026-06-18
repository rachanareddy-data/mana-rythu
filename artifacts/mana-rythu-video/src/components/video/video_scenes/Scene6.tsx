import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),  // 50%
      setTimeout(() => setPhase(2), 3000),  // ₹0
      setTimeout(() => setPhase(3), 5000),  // 24hrs
      setTimeout(() => setPhase(4), 7000),  // 140M
      setTimeout(() => setPhase(5), 11000), // Background shift to aerial
      setTimeout(() => setPhase(6), 14000), // Final text 1
      setTimeout(() => setPhase(7), 18000), // Final text 2
      setTimeout(() => setPhase(8), 22000), // Logo
      setTimeout(() => setPhase(9), 25000), // Tagline
      setTimeout(() => setPhase(10), 28000), // Fade to black
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10 bg-black"
      {...sceneTransitions.fadeBlur}
    >
      {/* Aerial Background */}
      {phase >= 5 && (
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: phase >= 10 ? 0 : 0.6, scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          <img src={`${import.meta.env.BASE_URL}images/aerial-farmland.png`} className="w-full h-full object-cover mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </motion.div>
      )}

      {/* Impact Stats Sequence */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-24">
        {phase >= 1 && phase < 5 && (
          <motion.div 
            className="text-center w-full"
            initial={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9 }}
            key={`stat-${phase}`}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-[15vw] font-black text-white leading-none mb-4">
              {phase === 1 && "50%"}
              {phase === 2 && "₹0"}
              {phase === 3 && "24hrs"}
              {phase === 4 && "140M"}
            </h2>
            <p className="text-[3vw] text-primary font-bold uppercase tracking-widest">
              {phase === 1 && "More income for farmers"}
              {phase === 2 && "Broker fees"}
              {phase === 3 && "Settlement time"}
              {phase === 4 && "Farmers waiting"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Final Lockup */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-5xl">
        {phase >= 6 && phase < 8 && (
          <motion.h2 
            className="text-[4vw] font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            Built for 140 million farmers.
          </motion.h2>
        )}
        
        {phase >= 7 && phase < 8 && (
          <motion.p 
            className="text-[2vw] text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            Starting in Telangana & Andhra Pradesh.
          </motion.p>
        )}

        {phase >= 8 && (
          <motion.div 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: phase >= 10 ? 0 : 1, scale: phase >= 10 ? 0.9 : 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-6 mb-8">
              <img src={`${import.meta.env.BASE_URL}images/sprout.png`} alt="Logo" className="w-24 h-24 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]" />
              <h1 className="text-[7vw] font-black tracking-tighter text-white leading-none">Mana<span className="text-primary">Rythu</span></h1>
            </div>
            
            {phase >= 9 && (
              <motion.p 
                className="text-[2.5vw] text-accent font-medium tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                One Platform. One Fair Price.
              </motion.p>
            )}
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}
