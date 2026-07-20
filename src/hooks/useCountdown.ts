import { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '../data/config';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

/**
 * Asia/Kolkata has a fixed UTC+5:30 offset (no daylight saving), so the
 * target instant can be computed without a timezone database.
 */
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function getTargetEpoch(): number {
  const { year, month, day, hour, minute } = siteConfig.countdownTarget;
  const utcOfIstWallClock = Date.UTC(year, month - 1, day, hour, minute, 0);
  return utcOfIstWallClock - IST_OFFSET_MS;
}

function computeState(targetEpoch: number): CountdownState {
  const diff = targetEpoch - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isComplete: false };
}

export function useCountdown(): CountdownState {
  const targetEpoch = useMemo(getTargetEpoch, []);
  const [state, setState] = useState<CountdownState>(() =>
    siteConfig.devSkipCountdown
      ? { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
      : computeState(targetEpoch),
  );

  useEffect(() => {
    if (siteConfig.devSkipCountdown) return;

    const interval = window.setInterval(() => {
      setState(computeState(targetEpoch));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetEpoch]);

  return state;
}
