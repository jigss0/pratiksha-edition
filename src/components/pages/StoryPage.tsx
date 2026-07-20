import { motion } from 'framer-motion';
import { storyBeats } from '../../data/content';
import { MagazinePage } from '../ui/MagazinePage';
import { StageNav } from '../ui/StageNav';
import { PhotoFrame } from '../ui/PhotoFrame';

interface StoryPageProps {
  onNext: () => void;
  onPrev: () => void;
}

export function StoryPage({ onNext, onPrev }: StoryPageProps) {
  return (
    <MagazinePage folio="02 &middot; Birthday Story">
      <div className="relative">
        <span
          className="washi absolute -left-4 -top-6 h-6 w-16 -rotate-6 rounded-sm"
          aria-hidden="true"
        />
        <h2 className="font-display text-2xl font-bold text-plum sm:text-3xl">
          The Birthday Story
        </h2>
      </div>

      <div className="relative mt-4 mb-6 h-40 w-3/5 rotate-[-3deg] self-center rounded-sm border-4 border-white bg-white shadow-md">
        <PhotoFrame
          file="school-1.jpg"
          alt="Story portrait"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-6">
        {storyBeats.map((beat, i) => (
          <motion.div
            key={beat.heading}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <h3 className="font-display text-base font-semibold text-rose-dark">
              {beat.heading}
            </h3>
            <p className="mt-1.5 font-body text-[15px] leading-relaxed text-ink-light">
              {beat.body}
            </p>
          </motion.div>
        ))}
      </div>

      <StageNav onNext={onNext} onPrev={onPrev} />
    </MagazinePage>
  );
}
