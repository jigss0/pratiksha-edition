import type { ReactNode } from 'react';
import { FloatingPetals } from '../effects/FloatingPetals';
import { Butterflies } from '../effects/Butterflies';

interface MagazinePageProps {
  children: ReactNode;
  /** Optional small label printed like a running-header / issue folio. */
  folio?: string;
  petals?: boolean;
  butterflies?: boolean;
  className?: string;
  tone?: 'paper' | 'plum';
}

export function MagazinePage({
  children,
  folio,
  petals = true,
  butterflies = false,
  className = '',
  tone = 'paper',
}: MagazinePageProps) {
  const isPlum = tone === 'plum';

  return (
    <div
      className={`relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-10 ${
        isPlum ? 'bg-plum' : 'bg-plum-dark'
      }`}
    >
      {petals && <FloatingPetals count={8} />}
      {butterflies && <Butterflies count={2} />}

      <div
        className={`deckle-edge paper-surface relative w-full max-w-md rounded-sm px-6 py-9 shadow-paper sm:max-w-lg sm:px-10 sm:py-12 ${className}`}
      >
        {folio && (
          <p className="font-type mb-6 text-center text-[10px] uppercase tracking-[0.35em] text-plum/50">
            {folio}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
