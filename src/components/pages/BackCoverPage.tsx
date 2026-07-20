import { motion } from 'framer-motion';
import { backCoverContent } from '../../data/content';
import { PhotoFrame } from '../ui/PhotoFrame';
import { StageNav } from '../ui/StageNav';
import { FloatingPetals } from '../effects/FloatingPetals';

interface BackCoverPageProps {
  onNext: () => void;
  onPrev: () => void;
}

export function BackCoverPage({ onNext, onPrev }: BackCoverPageProps) {
  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-plum px-4 py-10">
      <FloatingPetals count={10} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="deckle-edge relative w-full max-w-sm overflow-hidden rounded-sm border-4 border-gold/50 shadow-paper"
      >
        <div className="absolute inset-0">
          <PhotoFrame
            file="memory-3.jpg"
            alt="Golden farewell portrait"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-plum/70 via-plum/50 to-plum/95" />
          <div
            className="absolute inset-0 mix-blend-overlay"
            style={{
              background: 'radial-gradient(circle at 50% 30%, #E1C688, transparent 60%)',
            }}
          />
        </div>

        <div className="relative flex min-h-[480px] flex-col justify-between px-7 py-9">
          <p className="text-center font-type text-[10px] uppercase tracking-[0.35em] text-gold-light">
            08 &middot; Back Cover
          </p>

          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-paper sm:text-3xl">
              {backCoverContent.heading}
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-paper/85">
              {backCoverContent.body}
            </p>
            <p className="mt-6 font-hand text-2xl text-gold-light">
              {backCoverContent.signature}
            </p>
          </div>

          <StageNav onNext={onNext} onPrev={onPrev} nextLabel="The Wish Jar" />
        </div>
      </motion.div>
    </div>
  );
}
