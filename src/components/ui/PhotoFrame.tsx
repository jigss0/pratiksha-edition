import { useState } from 'react';
import { siteConfig } from '../../data/config';

interface PhotoFrameProps {
  file: string;
  alt: string;
  className?: string;
}

/**
 * Renders a photo from /public/media, and if the file hasn't been added yet,
 * falls back to a tasteful placeholder so the layout still looks intentional
 * during development / before real assets are dropped in.
 */
export function PhotoFrame({ file, alt, className = '' }: PhotoFrameProps) {
  const [errored, setErrored] = useState(false);
  const src = `${siteConfig.media.basePath}${file}`;

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-paper-dark to-gold/30 text-center ${className}`}
      >
        <div className="px-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="mx-auto mb-1 h-6 w-6 text-plum/40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="12" cy="12" r="3.2" />
            <path d="M8 5l1.5-2h5L16 5" />
          </svg>
          <p className="font-type text-[9px] leading-tight text-plum/50">{file}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
