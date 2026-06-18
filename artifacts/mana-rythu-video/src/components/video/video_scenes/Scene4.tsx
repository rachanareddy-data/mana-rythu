import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

// Mobile scene = farmer journey. Start with pest FIRST so it's visible early.
const routes = [
  { path: '/farmer?tab=pest',      label: '🤖 AI Pest Detection',  cap: 'Upload crop photo → AI diagnosis in Telugu' },
  { path: '/farmer',               label: '📊 Farmer Dashboard',   cap: 'Track crops, earnings — zero commission' },
  { path: '/farmer?tab=transport', label: '🚛 Logistics Estimator', cap: 'Estimate transport cost across TS & AP' },
  { path: '/marketplace',          label: '🌾 Marketplace',         cap: 'Buy & sell crops directly — no middlemen' },
];

export function Scene4() {
  const [routeIdx, setRouteIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    const timers = [
      setTimeout(() => setRouteIdx(1), 7500),
      setTimeout(() => setRouteIdx(2), 15500),
      setTimeout(() => setRouteIdx(3), 23500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    setLoaded(false);
    if (iframeRef.current) {
      iframeRef.current.src = origin + routes[routeIdx].path;
    }
  }, [routeIdx, origin]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.morphExpand}
    >
      <CinematicBg overlay="rgba(4,16,18,0.80)" />

      <div className="relative z-10 flex flex-col items-center w-full h-full py-6 px-6">

        {/* Top: badge + screen label */}
        <div className="flex flex-col items-center mb-3 flex-shrink-0">
          <motion.span
            className="text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-2"
            style={{ color: '#4ade80' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            LIVE APP
          </motion.span>

          <AnimatePresence mode="popLayout">
            <motion.h2
              key={routeIdx}
              className="text-[min(3vw,1.6rem)] font-black text-white text-center leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {routes[routeIdx].label}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Phone mockup */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <motion.div
            className="relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Glow behind phone */}
            <div
              className="absolute inset-0 -z-10 blur-3xl scale-110 rounded-[3rem]"
              style={{ background: 'rgba(34,197,94,0.15)' }}
            />

            {/* Phone shell */}
            <div
              className="relative bg-black overflow-hidden flex flex-col"
              style={{
                width:  'clamp(210px, 20vw, 290px)',
                height: 'clamp(430px, 42vw, 590px)',
                borderRadius: '2.2rem',
                border: '5px solid rgba(255,255,255,0.22)',
                boxShadow: '0 40px 90px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              {/* Dynamic island */}
              <div className="absolute top-0 inset-x-0 z-30 h-6 flex justify-center items-start pt-1.5 pointer-events-none">
                <div className="w-[4.5rem] h-3.5 bg-black rounded-full" />
              </div>

              {/* Loading shimmer */}
              <AnimatePresence>
                {!loaded && (
                  <motion.div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
                    style={{ background: '#052e16' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="text-4xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >🌾</motion.div>
                    <p className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      LOADING...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Live iframe */}
              <iframe
                ref={iframeRef}
                src={origin + routes[0].path}
                className="flex-1 w-full border-0"
                style={{ pointerEvents: 'none' }}
                onLoad={() => setLoaded(true)}
                title="Mana Rythu App"
              />

              {/* Home bar */}
              <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-30 pointer-events-none">
                <div className="w-16 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
              </div>
            </div>

            {/* Glow puddle */}
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 blur-2xl rounded-full"
              style={{ width: '65%', height: 20, background: 'rgba(34,197,94,0.28)' }}
            />
          </motion.div>
        </div>

        {/* Caption + dots */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0 pt-3">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={routeIdx}
              className="text-[min(1.5vw,0.85rem)] text-center font-medium"
              style={{ color: 'rgba(255,255,255,0.72)' }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {routes[routeIdx].cap}
            </motion.p>
          </AnimatePresence>

          <div className="flex gap-2 items-center">
            {routes.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                animate={{
                  width: i === routeIdx ? 24 : 5,
                  backgroundColor: i === routeIdx ? '#22c55e' : 'rgba(255,255,255,0.3)',
                }}
                transition={{ duration: 0.35 }}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
