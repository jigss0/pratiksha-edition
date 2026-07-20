import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { hiddenMemoryCards } from '../../data/content';
import { MagazinePage } from '../ui/MagazinePage';
import { StageNav } from '../ui/StageNav';
import { PhotoFrame } from '../ui/PhotoFrame';

interface HiddenMemoriesPageProps {
  onNext: () => void;
  onPrev: () => void;
}

const ROTATIONS = [-3, 2, -2, 3, -4, 2, -3];

export function HiddenMemoriesPage({ onNext, onPrev }: HiddenMemoriesPageProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = hiddenMemoryCards.find((c) => c.id === activeId) ?? null;

  return (
    <MagazinePage folio="04 &middot; Hidden Memories">
      <h2 className="text-center font-display text-2xl font-bold text-plum sm:text-3xl">
        Hidden Memories
      </h2>
      <p className="mt-1.5 text-center font-body text-sm text-ink-light">
        Tap a card to pull it out of the stack.
      </p>

      <div className="relative mt-8 grid grid-cols-3 gap-x-2 gap-y-6">
        {hiddenMemoryCards.map((card, i) => (
          <motion.button
            key={card.id}
            type="button"
            layoutId={`card-${card.id}`}
            onClick={() => setActiveId(card.id)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, rotate: ROTATIONS[i % ROTATIONS.length] }}
            whileHover={{ y: -6, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="relative rounded-sm bg-white p-1.5 pb-4 shadow-md"
          >
            <div className="aspect-[3/4] overflow-hidden bg-paper-dark">
              <PhotoFrame file={card.file} alt={card.alt} className="h-full w-full object-cover" />
            </div>
            <p className="mt-1.5 truncate text-center font-hand text-[13px] text-ink">
              {card.title}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-plum/70 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
          >
            <motion.div
              layoutId={`card-${active.id}`}
              onClick={(e) => e.stopPropagation()}
              className="deckle-edge w-full max-w-xs rounded-sm bg-white p-4 pb-6 shadow-2xl"
            >
              <div className="aspect-[3/4] overflow-hidden bg-paper-dark">
                <PhotoFrame
                  file={active.file}
                  alt={active.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-center font-display text-lg font-semibold text-plum">
                {active.title}
              </h3>
              <p className="mt-1 text-center font-hand text-base text-ink-light">{active.note}</p>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="mx-auto mt-4 block font-type text-[10px] uppercase tracking-widest text-plum/50 hover:text-plum"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <StageNav onNext={onNext} onPrev={onPrev} />
    </MagazinePage>
  );
}
