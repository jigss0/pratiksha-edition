import { motion } from 'framer-motion';
import { futureHeadlines } from '../../data/content';
import { MagazinePage } from '../ui/MagazinePage';
import { StageNav } from '../ui/StageNav';

interface FuturePageProps {
  onNext: () => void;
  onPrev: () => void;
}

export function FuturePage({ onNext, onPrev }: FuturePageProps) {
  return (
    <MagazinePage folio="07 &middot; Future Editions">
      <h2 className="text-center font-display text-2xl font-bold text-plum sm:text-3xl">
        Future Editions
      </h2>
      <p className="mt-1.5 text-center font-body text-sm text-ink-light">
        A sneak peek at headlines still to come.
      </p>

      <div className="mt-7 space-y-5">
        {futureHeadlines.map((item, i) => (
          <motion.article
            key={item.year}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="border-l-2 border-gold/50 pl-4"
          >
            <p className="font-type text-xs tracking-widest text-gold-dark">{item.year} EDITION</p>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug text-plum">
              {item.headline}
            </h3>
            <p className="mt-1 font-body text-sm italic text-ink-light">{item.deck}</p>
          </motion.article>
        ))}
      </div>

      <StageNav onNext={onNext} onPrev={onPrev} />
    </MagazinePage>
  );
}
