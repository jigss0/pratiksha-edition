import { useMemo } from 'react';

interface FloatingPetalsProps {
  count?: number;
  className?: string;
}

const PETAL_COLORS = ['#C97B84', '#E1C688', '#A2AF8B', '#E3AAB0'];

/**
 * Purely decorative, ambient petals drifting behind page content.
 * Uses CSS animation (not Framer) so it stays cheap even with many pages mounted.
 */
export function FloatingPetals({ count = 10, className = '' }: FloatingPetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: Math.round(Math.random() * 6 * 10) / 10,
        duration: 6 + Math.round(Math.random() * 5),
        size: 8 + Math.round(Math.random() * 10),
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-5%] animate-float rounded-[60%_40%_60%_40%] opacity-70"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.75,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
