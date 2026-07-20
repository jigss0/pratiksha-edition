import { useState } from 'react';
import { motion } from 'framer-motion';
import { letterContent } from '../../data/content';
import { useTypewriter } from '../../hooks/useTypewriter';
import { MagazinePage } from '../ui/MagazinePage';
import { StageNav } from '../ui/StageNav';

interface LetterPageProps {
  onNext: () => void;
  onPrev: () => void;
}

export function LetterPage({ onNext, onPrev }: LetterPageProps) {
  const [unfolded, setUnfolded] = useState(false);
  const { revealed, isDone } = useTypewriter(letterContent.paragraphs, { active: unfolded });

  return (
    <MagazinePage folio="05 &middot; Friendship Letter">
      <h2 className="text-center font-display text-2xl font-bold text-plum sm:text-3xl">
        {letterContent.heading}
      </h2>

      {!unfolded ? (
        <div className="mt-10 flex flex-col items-center">
          <motion.button
            type="button"
            onClick={() => setUnfolded(true)}
            initial={{ rotateX: 0 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            style={{ transformStyle: 'preserve-3d', perspective: 800 }}
            className="relative h-40 w-full max-w-[220px] rounded-sm border border-plum/15 bg-paper-light shadow-md"
            aria-label="Unfold the letter"
          >
            <div className="absolute inset-x-0 top-1/3 h-px bg-plum/10" />
            <div className="absolute inset-x-0 top-2/3 h-px bg-plum/10" />
            <span className="absolute inset-0 flex items-center justify-center font-hand text-lg text-rose-dark">
              unfold me
            </span>
          </motion.button>
          <p className="mt-4 font-body text-xs italic text-plum/40">Tap the folded letter</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, rotateX: -12, y: -14 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="mt-6 rounded-sm border border-plum/10 bg-paper-light px-5 py-6 shadow-inner"
        >
          <div className="min-h-[220px] space-y-4 font-type text-[13px] leading-relaxed text-ink">
            {letterContent.paragraphs.map((p, i) => (
              <p key={i}>
                {revealed[i]}
                {revealed[i].length < p.length && revealed[i].length > 0 && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            ))}
          </div>

          {isDone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-6 text-right font-hand text-2xl text-rose-dark"
            >
              {letterContent.signature}
            </motion.p>
          )}
        </motion.div>
      )}

      <StageNav onNext={onNext} onPrev={onPrev} hideNext={!isDone} />
    </MagazinePage>
  );
}
