# The Pratiksha Edition

A handcrafted interactive birthday magazine for Pratiksha — 10 pages of memories, a live countdown gate, a friendship letter, a video page, future headlines, and a wish jar. Built with React 19, Vite 7, Tailwind CSS v4, and Framer Motion.

## Live site

> `https://<your-github-username>.github.io/pratiksha-edition/`
> Deployed automatically via GitHub Actions on every push to `main`.

---

## Getting started locally

```bash
npm install
npm run dev        # http://localhost:5173
```

To preview past the countdown during development, open `src/data/config.ts` and set:

```ts
devSkipCountdown: true,
```

Remember to set it back to `false` before pushing for the real birthday deploy.

---

## Adding your media

Drop files into `public/media/` using these exact filenames:

| File | Used on |
|------|---------|
| `hero.jpg` | Cover page — full-bleed hero photo |
| `school-1.jpg` | Story page — photo 1 |
| `school-2.jpg` | Story page — photo 2 |
| `motion-1.jpg` | Heart Memories — photo 1 |
| `motion-2.jpg` | Heart Memories — photo 2 |
| `parul-1.jpg` | Heart Memories — photo 3 |
| `parul-2.jpg` | Heart Memories — photo 4 |
| `memory-1.jpg` … `memory-5.jpg` | Hidden Memories polaroids |
| `birthday-video.mp4` | Video page |
| `birthday-song.mp3` | Background music (starts on first tap) |

Until real files are added, placeholder frames are shown gracefully.

---

## Project structure

```
src/
  App.tsx                     Stage machine + page-turn animation
  data/
    config.ts                 Countdown date, names, devSkipCountdown flag
    content.ts                All copy: story beats, letter, headlines, wish jar
  components/
    pages/                    One component per magazine stage (10 pages)
    ui/                       MagazinePage shell, StageNav, PhotoFrame
    effects/                  FloatingPetals, Butterflies, CelebrationBurst
  hooks/
    useCountdown.ts           IST-offset countdown (UTC+5:30, no tz database)
    useBackgroundMusic.ts     Lazy audio, starts on first user interaction
    useTypewriter.ts          Sequential per-paragraph typewriter effect
  types/index.ts              Stage union, shared interfaces
public/
  media/                      Drop your photos, video, and music here
.github/
  workflows/deploy.yml        GitHub Pages CI/CD
```

## Magazine page flow

**Countdown** → Cover → Birthday Story → Heart Memories → Hidden Memories → Friendship Letter → Birthday Video → Future Editions → Back Cover → Wish Jar → Read Again

---

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages → Source** and select **"GitHub Actions"**.
3. The workflow runs automatically on every push to `main`.
4. Your app will be live at `https://<username>.github.io/pratiksha-edition/`.
