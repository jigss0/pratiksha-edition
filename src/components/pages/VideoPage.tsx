import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../data/config';
import { MagazinePage } from '../ui/MagazinePage';
import { StageNav } from '../ui/StageNav';
import { PhotoFrame } from '../ui/PhotoFrame';

interface VideoPageProps {
  onNext: () => void;
  onPrev: () => void;
}

export function VideoPage({ onNext, onPrev }: VideoPageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  const src = `${siteConfig.media.basePath}${siteConfig.media.video}`;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <MagazinePage folio="06 &middot; Birthday Video" petals={false}>
      <h2 className="text-center font-display text-2xl font-bold text-plum sm:text-3xl">
        The Birthday Video
      </h2>
      <p className="mt-1.5 text-center font-body text-sm text-ink-light">
        One cinematic moment, made just for you.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mt-6 overflow-hidden rounded-sm border-4 border-white shadow-lg"
      >
        {errored ? (
          <div className="relative aspect-video w-full">
            <PhotoFrame
              file="hero.jpg"
              alt="Video placeholder"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-plum/60 text-center text-paper">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="font-type text-[10px] uppercase tracking-widest">
                Add birthday-video.mp4 to /public/media
              </p>
            </div>
          </div>
        ) : (
          <div className="relative aspect-video w-full bg-plum">
            <video
              ref={videoRef}
              src={src}
              poster={`${siteConfig.media.basePath}hero.jpg`}
              className="h-full w-full object-cover"
              playsInline
              preload="metadata"
              onError={() => setErrored(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center bg-plum/25 transition hover:bg-plum/35"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/90 shadow-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-1 h-7 w-7 text-plum"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        )}
      </motion.div>

      <StageNav onNext={onNext} onPrev={onPrev} />
    </MagazinePage>
  );
}
