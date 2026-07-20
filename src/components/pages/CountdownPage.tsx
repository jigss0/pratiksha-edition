import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { siteConfig } from '../../data/config';
import { CelebrationBurst } from '../effects/CelebrationBurst';
import { FloatingPetals } from '../effects/FloatingPetals';

interface CountdownPageProps {
  onUnsealed: () => void;
}

const UNITS: Array<{ key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }> = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hrs' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
];

export function CountdownPage({ onUnsealed }: CountdownPageProps) {
  const countdown = useCountdown();
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!countdown.isComplete) return;
    setBurst(true);
    const timeout = window.setTimeout(onUnsealed, 1400);
    return () => window.clearTimeout(timeout);
  }, [countdown.isComplete, onUnsealed]);

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-plum px-4">
      <FloatingPetals count={10} />
      <CelebrationBurst active={burst} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative w-full max-w-sm"
      >
        {/* Sealed magazine */}
        <div className="deckle-edge paper-surface relative overflow-hidden rounded-sm px-7 py-12 text-center shadow-paper">
          <p className="font-type text-[10px] uppercase tracking-[0.4em] text-plum/50">
            Sealed Until Release
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-plum text-shadow-gold sm:text-4xl">
            {siteConfig.title}
          </h1>
          <p className="mt-2 font-hand text-xl text-rose-dark">for {siteConfig.recipientName}</p>

          <div className="mt-8 grid grid-cols-4 gap-2">
            {UNITS.map((u) => (
              <div key={u.key} className="rounded-sm bg-plum/5 px-1 py-3">
                <p className="font-display text-xl font-bold text-plum sm:text-2xl">
                  {String(countdown[u.key]).padStart(2, '0')}
                </p>
                <p className="font-type mt-1 text-[9px] uppercase tracking-wider text-plum/50">
                  {u.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-7 font-body text-xs italic text-plum/50">
            Opens midnight, 22 July &middot; Asia/Kolkata
          </p>
        </div>

        {/* Ribbon seal */}
        <motion.div
          aria-hidden="true"
          animate={countdown.isComplete ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
          style={{ transformOrigin: 'top' }}
          className="pointer-events-none absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 washi"
        />
        <motion.div
          aria-hidden="true"
          animate={
            countdown.isComplete
              ? { scale: 0, rotate: 25, opacity: 0 }
              : { scale: 1, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.6, ease: 'easeIn' }}
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rose-dark shadow-seal"
        >
          <span className="font-hand text-lg text-paper-light">PE</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
