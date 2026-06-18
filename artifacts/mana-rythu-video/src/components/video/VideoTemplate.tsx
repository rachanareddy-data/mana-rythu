import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS: Record<string, number> = {
  intro: 6000,
  problem: 10000,
  marketplace: 12000,
  chat: 12000,
  impact: 10000,
  closing: 10000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Scene1,
  problem: Scene2,
  marketplace: Scene3,
  chat: Scene4,
  impact: Scene5,
  closing: Scene6,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <div className="w-full h-screen overflow-hidden relative bg-bg-dark text-text-inverse font-display">
      {/* Persistent Background Video */}
      <motion.video
        src={`${import.meta.env.BASE_URL}videos/farmland.mp4`}
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        autoPlay
        muted
        loop
        playsInline
        animate={{ opacity: sceneIndex === 5 || sceneIndex === 0 ? 0.3 : 0.1, scale: 1.1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Persistent Texture Overlay */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/texture-green.png`}
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Persistent Shapes / Motifs */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
        animate={{
          x: ['-20vw', '50vw', '10vw', '70vw', '30vw', '50vw'][sceneIndex],
          y: ['-20vh', '10vh', '50vh', '-10vh', '40vh', '20vh'][sceneIndex],
          scale: [1, 1.5, 0.8, 1.2, 1.5, 1][sceneIndex],
          opacity: [0.3, 0.2, 0.4, 0.2, 0.3, 0.4][sceneIndex]
        }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </div>
  );
}
