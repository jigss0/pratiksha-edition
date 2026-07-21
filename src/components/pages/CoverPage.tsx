import { motion } from 'framer-motion';
import { coverContent as cover } from '../../data/content';
import { PhotoFrame } from '../ui/PhotoFrame';
import { StageNav } from '../ui/StageNav';
import { FloatingPetals } from '../effects/FloatingPetals';
import { Butterflies } from '../effects/Butterflies';

interface CoverPageProps {
  onNext: () => void;
}

export function CoverPage({ onNext }: CoverPageProps) {
  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-plum px-4 py-10">
      <FloatingPetals count={10} />
      <Butterflies count={2} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ perspective: 1000 }}
        className="relative w-full max-w-sm"
      >
        <div className="deckle-edge relative overflow-hidden rounded-sm border-4 border-gold/40 bg-plum shadow-paper">
          <div className="absolute inset-0">
            <PhotoFrame
              file="hero.jpg"
              alt="Cover portrait"
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-plum/40 via-plum/60 to-plum/95" />
          </div>

          <div className="relative flex min-h-[520px] flex-col justify-between px-7 py-8">
            <div className="flex items-center justify-between">
              <p className="font-type text-[10px] uppercase tracking-[0.35em] text-gold-light">
                {cover.eyebrow}
              </p>
              <p className="font-type text-[10px] tracking-widest text-gold-light/80">01</p>
            </div>

            <div className="text-center">
  <div className="mx-auto mb-6 w-full max-w-[320px] overflow-hidden rounded-sm border-2 border-gold/60 aspect-video">
    <PhotoFrame
      file="hero.jpg"
      alt="Cover portrait"
      className="h-full w-full object-contain"
    />
  </div>

              {/*
                <h1 className="gold-shimmer bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent drop-shadow-sm sm:text-5xl">
    {cover.title}
  </h1> 
  */}

  <p className="mt-4 font-hand text-2xl text-rose-light">
    {cover.subtitle}
  </p>
</div>

            <p className="text-center font-type text-[10px] uppercase tracking-[0.3em] text-paper/70">
              {cover.issueLine}
            </p>
          </div>
        </div>

        <StageNav onNext={onNext} nextLabel="Open the magazine" hidePrev />
      </motion.div>
    </div>
  );
}
