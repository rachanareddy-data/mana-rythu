import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

const CAPTIONS = [
  { time: 0, label: '🌾 Live Marketplace',       cap: 'Real farmers, real crops — buy directly' },
  { time: 4, label: '💰 AI Price Intelligence',  cap: 'Live APMC mandi rates. Grade A/B/C pricing.' },
  { time: 8, label: '💬 Real-Time Chat',          cap: 'Farmer ↔ Buyer direct negotiation, no agents' },
];

export function Scene5() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [captionIdx, setCaptionIdx] = useState(0);

  function handleTimeUpdate() {
    const t = videoRef.current?.currentTime ?? 0;
    const idx = CAPTIONS.findLastIndex(c => t >= c.time);
    if (idx >= 0 && idx !== captionIdx) setCaptionIdx(idx);
  }

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.clipPolygon}
    >
      <CinematicBg overlay="rgba(4,16,18,0.80)" />

      <div className="relative z-10 flex flex-col items-center w-full h-full py-5 px-8">

        {/* Badge */}
        <div className="flex flex-col items-center mb-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[0.65rem] font-bold tracking-[0.4em] uppercase" style={{ color: '#4ade80' }}>
              LIVE PLATFORM
            </span>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
          </div>

          <AnimatePresence mode="popLayout">
            <motion.h2
              key={captionIdx}
              className="text-[min(3vw,1.7rem)] font-black text-white text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {CAPTIONS[captionIdx].label}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Browser mockup with recorded video */}
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
                    key={captionIdx}
                    className="text-[11px] font-mono truncate"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {captionIdx === 0 ? 'mana-rythu.replit.app/marketplace' :
                     captionIdx === 1 ? 'mana-rythu.replit.app/fair-price' :
                     'mana-rythu.replit.app/chat'}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Recorded video */}
            <div className="relative flex-1 overflow-hidden bg-[#052e16]">
              <video
                ref={videoRef}
                src="/mana-rythu-video/platform-demo.mp4"
                className="w-full h-full object-cover"
                muted
                playsInline
                autoPlay
                loop
                onTimeUpdate={handleTimeUpdate}
                style={{ objectPosition: 'top center' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Caption + dots */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0 pt-3">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={captionIdx}
              className="text-[min(1.5vw,0.9rem)] font-medium text-center"
              style={{ color: 'rgba(255,255,255,0.72)' }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {CAPTIONS[captionIdx].cap}
            </motion.p>
          </AnimatePresence>

          <div className="flex gap-2 items-center">
            {CAPTIONS.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                animate={{
                  width: i === captionIdx ? 24 : 5,
                  backgroundColor: i === captionIdx ? '#22c55e' : 'rgba(255,255,255,0.3)',
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
