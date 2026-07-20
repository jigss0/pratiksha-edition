/**
 * config.ts
 * All environment / structural configuration for the magazine.
 * Edit dates, media paths and feature toggles here — leave content.ts for copy.
 */

export const siteConfig = {
  title: 'The Pratiksha Edition',
  recipientName: 'Pratiksha',
  senderName: 'Basanti',

  /**
   * Countdown target. The magazine stays sealed until this moment,
   * evaluated in Asia/Kolkata time regardless of the visitor's own timezone.
   */
  countdownTarget: {
    year: 2026,
    month: 7, // July
    day: 22,
    hour: 0,
    minute: 0,
    timeZone: 'Asia/Kolkata',
  },

  /** Set true to bypass the countdown gate while developing/previewing. */
  devSkipCountdown: false,

  media: {
    basePath: '/media/',
    video: 'birthday-video.mp4',
    music: 'birthday-song.mp3',
    // Placeholder photo manifest — supports 8 to 15 images.
    // Drop matching files into /public/media/ to replace the generated placeholders.
    photos: [
      'hero.jpg',
      'school-1.jpg',
      'school-2.jpg',
      'motion-1.jpg',
      'motion-2.jpg',
      'parul-1.jpg',
      'parul-2.jpg',
      'memory-1.jpg',
      'memory-2.jpg',
      'memory-3.jpg',
      'memory-4.jpg',
      'memory-5.jpg',
    ],
  },

  wishJar: {
    revealCount: 20,
  },
};

export type SiteConfig = typeof siteConfig;
