import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';

const CAPTIONS = [
  { time: 0,  label: '📊 Farmer Dashboard',    cap: 'Crops & earnings — zero commission' },
  { time: 4,  label: '🤖 AI Pest Detection',   cap: 'Upload photo → Telugu diagnosis instantly' },
  { time: 8,  label: '🚛 Logistics Estimator', cap: 'Transport cost across TS & AP routes' },
];

export function Scene4() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [captionIdx, setCaptionIdx] = useState(0);
  const [started, setStarted] = useState(false);

  function handleTimeUpdate() {
    const t = videoRef.current?.currentTime ?? 0;
    const idx = CAPTIONS.findLastIndex(c => t >= c.time);
    if (idx >= 0 && idx !== captionIdx) setCaptionIdx(idx);
  }

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.morphExpand}
    >
      <CinematicBg overlay="rgba(4,16,18,0.80)" />

      <div className="relative z-10 flex flex-col items-center w-full h-full py-6 px-6">

        {/* Top label */}
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
              key={captionIdx}
              className="text-[min(3vw,1.6rem)] font-black text-white text-center leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {CAPTIONS[captionIdx].label}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Phone mockup with recorded video */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <motion.div
            className="relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Glow */}
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

              {/* Play overlay */}
              <AnimatePresence>
                {!started && (
                  <motion.div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 cursor-pointer"
                    style={{ background: '#052e16' }}
                    exit={{ opacity: 0 }}
                    onClick={() => { videoRef.current?.play(); setStarted(true); }}
                  >
                    <motion.div
                      className="text-4xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >🌾</motion.div>
                    <p className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      TAP TO PLAY
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Recorded video */}
              <video
                ref={videoRef}
                src="/mana-rythu-video/farmer-demo.mp4"
                className="flex-1 w-full object-cover"
                muted
                playsInline
                autoPlay
                loop
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setStarted(true)}
                style={{ objectPosition: 'top center' }}
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
              key={captionIdx}
              className="text-[min(1.5vw,0.85rem)] text-center font-medium"
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
