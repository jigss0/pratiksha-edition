import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../data/config';

/**
 * Lazily creates an <audio> element and only starts playback after the
 * visitor's first interaction with the page (click, touch or key press),
 * satisfying autoplay policies and the spec's "music begins after first
 * interaction" requirement. Exposes a manual mute toggle.
 */
export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio(`${siteConfig.media.basePath}${siteConfig.media.music}`);
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const startOnce = () => {
      const audio = audioRef.current;
      if (!audio || hasStarted) return;
      audio
        .play()
        .then(() => setHasStarted(true))
        .catch(() => {
          // Autoplay was blocked; it will simply retry on the next interaction.
        });
    };

    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, startOnce, { once: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, startOnce));
    };
  }, [hasStarted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return { isMuted, toggleMute, hasStarted };
}
