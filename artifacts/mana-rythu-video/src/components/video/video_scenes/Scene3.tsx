import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),  // UI appears
      setTimeout(() => setPhase(2), 4000),  // Cards stagger
      setTimeout(() => setPhase(3), 12000), // Cursor move / Filter
      setTimeout(() => setPhase(4), 22000), // Sort update
      setTimeout(() => setPhase(5), 30000), // Zoom into card
      setTimeout(() => setPhase(6), 34000), // Detail view
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-bg-dark px-12"
      {...sceneTransitions.fadeBlur}
    >
      <motion.h2 
        className="absolute top-12 left-12 text-[3vw] font-bold text-white/90"
        initial={{ opacity: 0, x: -50 }}
        animate={phase >= 1 && phase < 5 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
      >
        The Marketplace
      </motion.h2>

      {/* Main UI Mockup */}
      <motion.div 
        className="w-[85vw] h-[75vh] bg-[#0a1f12] rounded-3xl border border-primary/30 shadow-2xl overflow-hidden flex relative mt-16"
        initial={{ opacity: 0, y: 100, rotateX: 10, scale: 0.95 }}
        animate={
          phase >= 6 ? { scale: 1.2, opacity: 0 } :
          phase >= 5 ? { scale: 1.5, x: '-20%', y: '10%' } :
          phase >= 1 ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : 
          { opacity: 0, y: 100, rotateX: 10, scale: 0.95 }
        }
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200 }}
      >
        {/* Sidebar */}
        <div className="w-72 bg-[#05170d] border-r border-primary/20 p-8 flex flex-col gap-8">
          <div className="h-10 w-40 bg-primary/20 rounded-lg"></div>
          <div className="space-y-6 mt-4">
            <div className="space-y-3">
              <p className="text-white/50 text-sm font-bold uppercase">Crop Type</p>
              <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10"></div>
            </div>
            <div className="space-y-3 relative">
              <p className="text-white/50 text-sm font-bold uppercase">Location</p>
              <motion.div 
                className="h-10 w-full rounded-lg border transition-colors flex items-center px-4"
                animate={phase >= 3 ? { backgroundColor: 'rgba(34, 197, 94, 0.2)', borderColor: 'rgba(34, 197, 94, 0.5)' } : { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <span className="text-white/80">Telangana</span>
              </motion.div>
              {/* Fake cursor */}
              <motion.div 
                className="absolute w-6 h-6 z-50 pointer-events-none"
                initial={{ x: 300, y: 200, opacity: 0 }}
                animate={phase >= 3 ? { x: 50, y: 20, opacity: 1 } : { x: 300, y: 200, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <svg viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" className="w-8 h-8 drop-shadow-md">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.42c.41 0 .75-.34.75-.75V3.21c0-.41-.34-.75-.75-.75H6.25c-.41 0-.75.34-.75.75z" />
                </svg>
              </motion.div>
            </div>
            <div className="space-y-3">
              <p className="text-white/50 text-sm font-bold uppercase">Grade</p>
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-primary/40 rounded-md border border-primary text-primary flex items-center justify-center text-xs font-bold">A</div>
                <div className="h-8 w-16 bg-white/5 rounded-md border border-white/10 text-white/50 flex items-center justify-center text-xs font-bold">B</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10 bg-transparent relative">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-bold text-white">Live Listings</h3>
            <div className="px-4 py-2 bg-highlight/20 text-highlight rounded-full font-bold text-sm border border-highlight/30">Live 🟢</div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {['Tomatoes', 'Rice', 'Onions', 'Chillies'].map((crop, i) => (
              <motion.div 
                key={i}
                className="bg-[#05170d] p-6 rounded-2xl border border-primary/20 shadow-lg relative overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  phase >= 4 && i > 1 ? { opacity: 0, y: 20 } :
                  phase >= 2 ? { opacity: 1, y: 0 } : 
                  { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: phase === 2 ? i * 0.2 : 0 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30">Grade A</span>
                  <div className="flex gap-1">
                    {'⭐⭐⭐⭐⭐'.split('').map((star, j) => <span key={j} className="text-xs">{star}</span>)}
                  </div>
                </div>
                <h4 className="font-bold text-3xl text-white mb-2">{crop}</h4>
                <div className="flex gap-2 mb-6">
                  <span className="text-sm text-white/60 bg-white/5 px-3 py-1 rounded-md">📍 Nalgonda</span>
                  {i === 0 && <span className="text-sm text-highlight bg-highlight/10 px-3 py-1 rounded-md border border-highlight/20">↑ Trending</span>}
                </div>
                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-sm text-white/50 mb-1">Asking Price</p>
                    <p className="text-4xl font-black text-primary">₹{27 + i}<span className="text-xl text-white/40">/kg</span></p>
                  </div>
                  <div className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg">Buy Now</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>

      {/* Detail View Overlay */}
      {phase >= 6 && (
        <motion.div 
          className="absolute inset-0 bg-bg-dark/95 backdrop-blur-xl z-50 flex items-center justify-center p-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full max-w-5xl h-full bg-[#0a1f12] rounded-[3rem] border border-primary/50 shadow-[0_0_100px_rgba(21,128,61,0.2)] p-12 flex gap-12">
            <div className="w-1/3 flex flex-col gap-6">
              <div className="w-full aspect-square rounded-3xl bg-primary/20 overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}images/farmer-phone.png`} className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-80" />
                <p className="absolute bottom-6 left-6 text-2xl font-bold text-white">Ramu Yadav</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <p className="text-white/50 text-sm mb-2">Verified Farmer</p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-primary" />
                </div>
                <p className="text-right text-primary font-bold text-sm mt-2">100% Score</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-6xl font-black text-white mb-4">Premium Tomatoes</h3>
                  <p className="text-2xl text-white/60">500kg Available • Ready to ship</p>
                </div>
                <p className="text-6xl font-black text-primary">₹27<span className="text-2xl text-white/40">/kg</span></p>
              </div>
              
              <div className="flex-1 bg-white/5 rounded-3xl border border-white/10 p-8 mt-4 flex flex-col">
                <p className="text-white/50 text-sm font-bold uppercase mb-6">Price History (30 Days)</p>
                <div className="flex-1 relative flex items-end">
                  {/* Sparkline */}
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <path d="M0,100 Q50,90 100,60 T200,40 T300,70 T400,20 T500,10" fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="500" cy="10" r="8" fill="var(--color-highlight)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

    </motion.div>
  );
}
