import { useEffect, useRef, useState } from 'react';

interface UseTypewriterOptions {
  speedMs?: number;
  startDelayMs?: number;
  active?: boolean;
}

/**
 * Types out a list of paragraphs sequentially, one character at a time.
 * Returns the currently-revealed text for each paragraph plus a completion flag.
 */
export function useTypewriter(paragraphs: string[], options: UseTypewriterOptions = {}) {
  const { speedMs = 18, startDelayMs = 300, active = true } = options;
  const [revealed, setRevealed] = useState<string[]>(() => paragraphs.map(() => ''));
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRevealed(paragraphs);
      setIsDone(true);
      return;
    }

    let paraIndex = 0;
    let charIndex = 0;

    const tick = () => {
      if (paraIndex >= paragraphs.length) {
        setIsDone(true);
        return;
      }

      const currentPara = paragraphs[paraIndex];
      charIndex += 1;

      setRevealed((prev) => {
        const next = [...prev];
        next[paraIndex] = currentPara.slice(0, charIndex);
        return next;
      });

      if (charIndex >= currentPara.length) {
        paraIndex += 1;
        charIndex = 0;
        timeoutRef.current = window.setTimeout(tick, speedMs * 8);
      } else {
        timeoutRef.current = window.setTimeout(tick, speedMs);
      }
    };

    timeoutRef.current = window.setTimeout(tick, startDelayMs);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return { revealed, isDone };
}
