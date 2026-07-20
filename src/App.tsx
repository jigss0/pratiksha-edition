import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Stage } from './types';
import { siteConfig } from './data/config';
import { CountdownPage } from './components/pages/CountdownPage';
import { CoverPage } from './components/pages/CoverPage';
import { StoryPage } from './components/pages/StoryPage';
import { HeartMemoriesPage } from './components/pages/HeartMemoriesPage';
import { HiddenMemoriesPage } from './components/pages/HiddenMemoriesPage';
import { LetterPage } from './components/pages/LetterPage';
import { VideoPage } from './components/pages/VideoPage';
import { FuturePage } from './components/pages/FuturePage';
import { BackCoverPage } from './components/pages/BackCoverPage';
import { WishJarPage } from './components/pages/WishJarPage';
import { ReadAgainPage } from './components/pages/ReadAgainPage';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';

const PAGE_FLOW: Stage[] = [
  'cover',
  'story',
  'heart-memories',
  'hidden-memories',
  'letter',
  'video',
  'future',
  'back-cover',
  'wish-jar',
  'read-again',
];

/** Simulated page-turn: a 3D rotation around the left edge, with a soft shadow sweep. */
const pageVariants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 70 : -70,
    opacity: 0,
    x: dir > 0 ? 40 : -40,
  }),
  center: { rotateY: 0, opacity: 1, x: 0 },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -70 : 70,
    opacity: 0,
    x: dir > 0 ? -40 : 40,
  }),
};

function MuteToggle() {
  const { isMuted, toggleMute, hasStarted } = useBackgroundMusic();

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      className="fixed right-4 top-4 z-[80] flex h-10 w-10 items-center justify-center rounded-full bg-plum/70 text-paper shadow-md backdrop-blur transition hover:bg-plum"
    >
      {isMuted || !hasStarted ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M4 9v6h4l5 5V4L8 9H4Zm11.5 3-2.5 2.5V6.5L15.5 9l3-3 1.4 1.4-3 3 3 3L18.5 15l-3-3Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M4 9v6h4l5 5V4L8 9H4Zm11-1.5v9a4.5 4.5 0 0 0 0-9Zm0-3.3a7.5 7.5 0 0 1 0 15.6v-2.06a5.5 5.5 0 0 0 0-11.48V4.2Z" />
        </svg>
      )}
    </button>
  );
}

export default function App() {
  const [stage, setStage] = useState<Stage>(() =>
    siteConfig.devSkipCountdown ? 'cover' : 'countdown',
  );
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((next: Stage, dir: number) => {
    setDirection(dir);
    setStage(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const currentIndex = PAGE_FLOW.indexOf(stage);

  const handleNext = useCallback(() => {
    const idx = PAGE_FLOW.indexOf(stage);
    if (idx === -1 || idx >= PAGE_FLOW.length - 1) return;
    goTo(PAGE_FLOW[idx + 1], 1);
  }, [stage, goTo]);

  const handlePrev = useCallback(() => {
    const idx = PAGE_FLOW.indexOf(stage);
    if (idx <= 0) return;
    goTo(PAGE_FLOW[idx - 1], -1);
  }, [stage, goTo]);

  const handleRestart = useCallback(() => {
    goTo('cover', 1);
  }, [goTo]);

  const showMuteToggle = stage !== 'countdown';

  return (
    <div className="relative" style={{ perspective: 1400 }}>
      {showMuteToggle && <MuteToggle />}

      <a
        href="#magazine-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-paper focus:px-3 focus:py-2 focus:text-plum"
      >
        Skip to content
      </a>

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.main
          key={stage}
          id="magazine-content"
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.42, 0, 0.2, 1] }}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: direction > 0 ? 'left center' : 'right center',
          }}
        >
          {stage === 'countdown' && <CountdownPage onUnsealed={() => goTo('cover', 1)} />}
          {stage === 'cover' && <CoverPage onNext={handleNext} />}
          {stage === 'story' && <StoryPage onNext={handleNext} onPrev={handlePrev} />}
          {stage === 'heart-memories' && (
            <HeartMemoriesPage onNext={handleNext} onPrev={handlePrev} />
          )}
          {stage === 'hidden-memories' && (
            <HiddenMemoriesPage onNext={handleNext} onPrev={handlePrev} />
          )}
          {stage === 'letter' && <LetterPage onNext={handleNext} onPrev={handlePrev} />}
          {stage === 'video' && <VideoPage onNext={handleNext} onPrev={handlePrev} />}
          {stage === 'future' && <FuturePage onNext={handleNext} onPrev={handlePrev} />}
          {stage === 'back-cover' && <BackCoverPage onNext={handleNext} onPrev={handlePrev} />}
          {stage === 'wish-jar' && <WishJarPage onNext={handleNext} onPrev={handlePrev} />}
          {stage === 'read-again' && <ReadAgainPage onRestart={handleRestart} />}
        </motion.main>
      </AnimatePresence>

      {currentIndex > 0 && stage !== 'read-again' && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-3 left-1/2 z-[75] flex -translate-x-1/2 gap-1"
        >
          {PAGE_FLOW.slice(0, -1).map((s, i) => (
            <span
              key={s}
              className={`h-1 rounded-full transition-all ${
                i <= currentIndex ? 'w-4 bg-gold' : 'w-1.5 bg-paper/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
