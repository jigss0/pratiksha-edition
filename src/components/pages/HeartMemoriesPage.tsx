import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { heartMemoryPhotos } from '../../data/content';
import { MagazinePage } from '../ui/MagazinePage';
import { StageNav } from '../ui/StageNav';
import { PhotoFrame } from '../ui/PhotoFrame';

interface HeartMemoriesPageProps {
  onNext: () => void;
  onPrev: () => void;
}

function HeartIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 29" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16 28.5S1.5 19.6 1.5 9.9C1.5 4.7 5.6.9 10.4.9c2.9 0 5.3 1.4 5.6 3.9C16.3 2.3 18.7.9 21.6.9c4.8 0 8.9 3.8 8.9 9 0 9.7-14.5 18.6-14.5 18.6Z" />
    </svg>
  );
}

export function HeartMemoriesPage({ onNext, onPrev }: HeartMemoriesPageProps) {
  const [opened, setOpened] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);

  const triggerFlash = (id: string) => {
    setFlashId(id);
    window.setTimeout(() => setFlashId(null), 260);
  };

  return (
    <MagazinePage folio="03 &middot; Heart Memories">
      <h2 className="text-center font-display text-2xl font-bold text-plum sm:text-3xl">
        Heart Memories
      </h2>
      <p className="mt-1.5 text-center font-body text-sm text-ink-light">
        {opened ? 'A few favourites, unsealed.' : 'Drag the heart down to open it.'}
      </p>

      {!opened ? (
        <div className="relative mt-8 flex h-64 items-center justify-center">
          <HeartIcon className="absolute h-40 w-40 text-rose/25" />
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Drag down to open the heart envelope"
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 90 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.y > 55) setOpened(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setOpened(true);
            }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 flex h-28 w-28 cursor-grab flex-col items-center justify-center rounded-full bg-rose-dark text-paper shadow-seal active:cursor-grabbing"
          >
            <HeartIcon className="h-9 w-9" />
            <span className="mt-1 font-type text-[9px] uppercase tracking-widest">Pull</span>
          </motion.div>
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 font-type text-[10px] uppercase tracking-widest text-plum/40"
          >
            &darr; drag &darr;
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          {heartMemoryPhotos.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => triggerFlash(photo.id)}
              initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -4 : 4 }}
              animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -3 : 3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-sm bg-white p-2 pb-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-lg ${
                i === heartMemoryPhotos.length - 1 && heartMemoryPhotos.length % 2 !== 0
                  ? 'col-span-2 mx-auto w-2/3'
                  : ''
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-paper-dark">
                <PhotoFrame
                  file={photo.file}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                />
                <AnimatePresence>
                  {flashId === photo.id && (
                    <motion.div
                      initial={{ opacity: 0.95 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-white"
                    />
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-2 truncate text-center font-hand text-sm text-ink">
                {photo.caption}
              </p>
            </motion.button>
          ))}
        </motion.div>
      )}

      <StageNav onNext={onNext} onPrev={onPrev} hideNext={!opened} />
    </MagazinePage>
  );
}
