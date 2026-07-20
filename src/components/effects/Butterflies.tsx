interface ButterfliesProps {
  count?: number;
  className?: string;
}

const POSITIONS = [
  { top: '12%', left: '8%' },
  { top: '68%', left: '85%' },
  { top: '30%', left: '90%' },
  { top: '78%', left: '12%' },
];

/** A few occasional butterflies — kept sparse so it reads as a detail, not a swarm. */
export function Butterflies({ count = 2, className = '' }: ButterfliesProps) {
  const items = POSITIONS.slice(0, Math.min(count, POSITIONS.length));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {items.map((pos, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute h-5 w-5 animate-flutter opacity-60"
          style={{ top: pos.top, left: pos.left, animationDelay: `${i * 1.4}s` }}
        >
          <path
            d="M12 12c-2-4-7-6-9-3-1.6 2.4 1 6 5 5.5 1.8-.2 3.2-1.3 4-2.5Z"
            fill="#C97B84"
            opacity="0.85"
          />
          <path
            d="M12 12c2-4 7-6 9-3 1.6 2.4-1 6-5 5.5-1.8-.2-3.2-1.3-4-2.5Z"
            fill="#8F7038"
            opacity="0.85"
          />
          <rect x="11.3" y="8" width="1.4" height="9" rx="0.7" fill="#3A2A22" />
        </svg>
      ))}
    </div>
  );
}
