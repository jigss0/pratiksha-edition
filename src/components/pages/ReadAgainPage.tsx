import { motion } from 'framer-motion';
import { siteConfig } from '../../data/config';
import { FloatingPetals } from '../effects/FloatingPetals';

interface ReadAgainPageProps {
  onRestart: () => void;
}

export function ReadAgainPage({ onRestart }: ReadAgainPageProps) {
  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-plum px-4">
      <FloatingPetals count={8} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="deckle-edge paper-surface relative w-full max-w-sm rounded-sm px-8 py-12 text-center shadow-paper"
      >
        <p className="font-type text-[10px] uppercase tracking-[0.35em] text-plum/50">
          10 &middot; The End
        </p>
        <h2 className="mt-4 font-display text-2xl font-bold text-plum sm:text-3xl">
          The magazine closes here.
        </h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink-light">
          Thank you for reading{' '}
          {siteConfig.title.toLowerCase().includes('the') ? '' : 'the '}
          {siteConfig.title}, {siteConfig.recipientName}. Every page is here whenever you want it
          again.
        </p>

        <motion.button
          type="button"
          onClick={onRestart}
          whileTap={{ scale: 0.96 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-plum px-7 py-3 font-display text-sm tracking-wide text-paper shadow-seal transition hover:bg-plum-light"
        >
          Read it again &#8635;
        </motion.button>
      </motion.div>
    </div>
  );
}
