interface StageNavProps {
  onNext?: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  prevLabel?: string;
  hideNext?: boolean;
  hidePrev?: boolean;
}

export function StageNav({
  onNext,
  onPrev,
  nextLabel = 'Turn the page',
  prevLabel = 'Back',
  hideNext = false,
  hidePrev = false,
}: StageNavProps) {
  return (
    <div className="mt-8 flex w-full items-center justify-between gap-3">
      {!hidePrev && onPrev ? (
        <button
          type="button"
          onClick={onPrev}
          className="font-body text-sm tracking-wide text-plum/60 underline-offset-4 transition hover:text-plum hover:underline"
        >
          &larr; {prevLabel}
        </button>
      ) : (
        <span />
      )}

      {!hideNext && onNext && (
        <button
          type="button"
          onClick={onNext}
          className="group inline-flex items-center gap-2 rounded-full bg-plum px-6 py-2.5 font-display text-sm tracking-wide text-paper shadow-seal transition hover:bg-plum-light active:scale-95"
        >
          {nextLabel}
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </button>
      )}
    </div>
  );
}
