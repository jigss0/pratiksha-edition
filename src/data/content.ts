import type { StoryBeat, Photo, MemoryCard, FutureHeadline } from '../types';

/**
 * content.ts
 * All editable copy for the magazine lives here. Replace the placeholder
 * lines with your own words — everything downstream reads from this file.
 */

export const coverContent = {
  eyebrow: 'A Keepsake Collector\u2019s Edition',
  title: 'The Pratiksha Edition',
  subtitle: 'Twelve pages. One friendship. A whole lot of chaos and love.',
  issueLine: 'Issue No. 01 \u2014 Printed With Love',
};

export const storyBeats: StoryBeat[] = [
  {
    heading: 'The Opening Line',
    body:
      'Every great story needs a beginning, and ours started somewhere between a classroom you barely paid attention in and a joke you definitely didn\u2019t mean to make so many people laugh at. Pratiksha, this is the story of you \u2014 told the way only someone who has seen it all up close could tell it.',
  },
  {
    heading: 'Chapter One \u2014 Loud, Bright, Unmistakably You',
    body:
      'You walk into a room and somehow the room gets better. That energy isn\u2019t an accident \u2014 it\u2019s just you, being fully yourself without apology. It\u2019s one of my favourite things about you.',
  },
  {
    heading: 'Chapter Two \u2014 The Friend Everyone Wants',
    body:
      'You show up. In small ways and big ones, on ordinary Tuesdays and on days that actually mattered. That\u2019s rarer than people think, and it\u2019s the reason so many of us are lucky to call you a friend.',
  },
  {
    heading: 'Chapter Three \u2014 Still Writing',
    body:
      'This page isn\u2019t finished \u2014 it\u2019s not supposed to be. There\u2019s a whole lot more story left, and I\u2019m just glad I get a front-row seat to whatever comes next.',
  },
];

export const heartMemoryPhotos: Photo[] = [
  {
    id: 'hm-hero',
    file: 'hero.jpg',
    caption: 'The one that started it all',
    alt: 'A favourite photo of Pratiksha',
  },
  {
    id: 'hm-school-1',
    file: 'school-1.jpg',
    caption: 'School days, big dreams',
    alt: 'Pratiksha at school',
  },
  {
    id: 'hm-school-2',
    file: 'school-2.jpg',
    caption: 'Uniform on, mischief loading',
    alt: 'Pratiksha at school, another moment',
  },
  {
    id: 'hm-motion-1',
    file: 'motion-1.jpg',
    caption: 'Caught mid-laugh, as usual',
    alt: 'Pratiksha laughing candidly',
  },
  {
    id: 'hm-motion-2',
    file: 'motion-2.jpg',
    caption: 'Always in motion, never boring',
    alt: 'Pratiksha in a candid action shot',
  },
];

export const hiddenMemoryCards: MemoryCard[] = [
  {
    id: 'mem-parul-1',
    file: 'parul-1.jpg',
    title: 'The Duo Chronicles',
    note: 'Some memories only make sense if you were there \u2014 and I was.',
    alt: 'Pratiksha and Parul together',
  },
  {
    id: 'mem-parul-2',
    file: 'parul-2.jpg',
    title: 'Partners in Crime',
    note: 'Whatever trouble this was, I remember exactly why it was worth it.',
    alt: 'Pratiksha and Parul in another moment',
  },
  {
    id: 'mem-1',
    file: 'memory-1.jpg',
    title: 'Unfiled, Unforgettable',
    note: 'A day that didn\u2019t need a reason to be perfect.',
    alt: 'A candid memory',
  },
  {
    id: 'mem-2',
    file: 'memory-2.jpg',
    title: 'The Background Cast',
    note: 'You always made even the small moments feel like main events.',
    alt: 'A candid memory',
  },
  {
    id: 'mem-3',
    file: 'memory-3.jpg',
    title: 'Off-Script',
    note: 'Nobody planned this. It\u2019s better that way.',
    alt: 'A candid memory',
  },
  {
    id: 'mem-4',
    file: 'memory-4.jpg',
    title: 'Golden Hour, Golden You',
    note: 'The light was good. The company was better.',
    alt: 'A candid memory',
  },
  {
    id: 'mem-5',
    file: 'memory-5.jpg',
    title: 'To Be Continued',
    note: 'This one\u2019s unfinished on purpose \u2014 there\u2019s more to come.',
    alt: 'A candid memory',
  },
];

export const letterContent = {
  heading: 'A Letter, Folded Twice',
  paragraphs: [
    'Dear Pratiksha,',
    'I don\u2019t say this enough, so I\u2019m putting it in writing where it can\u2019t be interrupted or forgotten: I\u2019m endlessly grateful for you. For the ridiculous jokes, the late-night voice notes, the way you show up without being asked twice.',
    'Today is your day, and I hope it\u2019s exactly as loud, bright and unmistakably \u201cyou\u201d as you are every other day of the year.',
    'Here\u2019s to another year of chaos, comfort, and everything in between.',
  ],
  signature: '\u2014 With Love, Basanti \ud83e\udd76\ud83c\udffb\u2764\ufe0f',
};

export const futureHeadlines: FutureHeadline[] = [
  {
    year: 2027,
    headline: 'Pratiksha Named "Most Likely To Still Be Late, But Worth It"',
    deck: 'Sources close to the friend group confirm this has been true since day one.',
  },
  {
    year: 2028,
    headline: 'Local Legend Continues Streak Of Making Every Room Better',
    deck: 'Analysts remain unable to explain the phenomenon. They\u2019ve stopped trying.',
  },
  {
    year: 2029,
    headline: 'Friendship With Basanti Enters Its Second Decade, Shows No Signs Of Slowing',
    deck: 'Experts call it "unreasonably strong." We call it Tuesday.',
  },
  {
    year: 2035,
    headline: 'Pratiksha, Now A Living Legend, Still Answers Every Voice Note Instantly',
    deck: 'Some things, thankfully, never change.',
  },
];

export const backCoverContent = {
  heading: 'The Final Word',
  body:
    'Every edition has to end somewhere \u2014 but this one only ends on paper. Thank you for being exactly who you are, today and every day. Happy Birthday, Pratiksha.',
  signature: '\u2014 With Love, Basanti \ud83e\udd76\ud83c\udffb\u2764\ufe0f',
};

/** ~20 handwritten-style wishes, revealed one at a time without repetition. */
export const wishJarEntries: string[] = [
  'May this year hand you exactly the kind of chaos you love and none of the kind you don\u2019t.',
  'Wishing you rooms that get louder and better the second you walk in, forever.',
  'May your chai always be the right temperature and your Wi-Fi never lag mid-video-call.',
  'Here\u2019s to more inside jokes than we can count and none we\u2019ll ever explain to anyone else.',
  'May every plan you almost cancel turn into your favourite memory anyway.',
  'Wishing you a year as unforgettable as your laugh is unmistakable.',
  'May you never run out of people who show up for you the way you show up for them.',
  'Here\u2019s to more late-night voice notes that somehow turn into hour-long stories.',
  'May this year bring you closer to every single thing you\u2019re quietly hoping for.',
  'Wishing you the kind of birthday that makes the rest of the year jealous.',
  'May your playlists stay perfect and your bad days stay short.',
  'Here\u2019s to more spontaneous plans and fewer regrets about the 2 a.m. ones.',
  'May you keep being exactly this loud, this bright, this fully yourself.',
  'Wishing you friendships that feel like this one \u2014 easy, loyal, and a little bit unhinged.',
  'May every year from here add more stories to this magazine.',
  'Here\u2019s to you finally beating me at the games you insist you\u2019re better at.',
  'May your birthday cake be exactly as extra as you deserve.',
  'Wishing you a year where every "we should hang out soon" actually happens soon.',
  'May you always know how loved you are, even on the days you forget to check.',
  'Here\u2019s to another year of you being my favourite person to tell things to first.',
];
