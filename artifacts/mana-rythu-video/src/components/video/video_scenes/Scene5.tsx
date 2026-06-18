import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

// Desktop scene = buyer + platform features (no overlap with mobile scene)
const routes = [
  { path: '/marketplace', label: '🌾 Live Marketplace',        cap: 'Crops listed by real farmers — buy directly' },
  { path: '/fair-price',  label: '💰 AI Price Intelligence',   cap: 'Live APMC mandi rates. Grade A / B / C pricing.' },
  { path: '/chat',        label: '💬 Real-Time Chat',           cap: 'Farmer ↔ Buyer direct negotiation, no agents' },
  { path: '/farmer',      label: '📊 Full Dashboard View',     cap: 'Complete earnings & crop management overview' },
];

export function Scene5() {
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
      {...sceneTransitions.clipPolygon}
    >
      <CinematicBg overlay="rgba(4,16,18,0.80)" />

      <div className="relative z-10 flex flex-col items-center w-full h-full py-5 px-8">

        {/* Top: badge + label — NO mention of website */}
        <div className="flex flex-col items-center mb-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[0.65rem] font-bold tracking-[0.4em] uppercase"
              style={{ color: '#4ade80' }}
            >
              LIVE PLATFORM
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#22c55e' }}
            />
          </div>

          <AnimatePresence mode="popLayout">
            <motion.h2
              key={routeIdx}
              className="text-[min(3vw,1.7rem)] font-black text-white text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {routes[routeIdx].label}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Browser mockup */}
        <div className="flex-1 flex items-center justify-center min-h-0 w-full">
          <motion.div
            className="w-full flex flex-col overflow-hidden"
            style={{
              maxWidth: 'min(900px, 92vw)',
              borderRadius: '10px 10px 8px 8px',
              border: '2px solid rgba(255,255,255,0.13)',
              boxShadow: '0 40px 90px rgba(0,0,0,0.8)',
              height: 'min(56vh, 520px)',
            }}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-4 flex-shrink-0"
              style={{
                height: 38,
                background: 'rgba(18,18,18,0.97)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div
                className="flex-1 mx-2 h-6 rounded-full flex items-center px-3 gap-2"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>🔒</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={routeIdx}
                    className="text-[11px] font-mono truncate"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    mana-rythu.replit.app{routes[routeIdx].path}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Live iframe area */}
            <div className="relative flex-1 bg-[#052e16] overflow-hidden">
              <AnimatePresence>
                {!loaded && (
                  <motion.div
                    className="absolute inset-0 z-10 flex items-center justify-center"
                    style={{ background: '#052e16' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="text-5xl"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >🌾</motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <iframe
                ref={iframeRef}
                src={origin + routes[0].path}
                className="w-full h-full border-0"
                style={{ pointerEvents: 'none' }}
                onLoad={() => setLoaded(true)}
                title="Mana Rythu Platform"
              />
            </div>
          </motion.div>
        </div>

        {/* Caption + dots */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0 pt-3">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={routeIdx}
              className="text-[min(1.5vw,0.9rem)] font-medium text-center"
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
