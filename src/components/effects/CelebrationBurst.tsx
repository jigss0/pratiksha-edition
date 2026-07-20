import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  vRotation: number;
}

const COLORS = ['#C6A15B', '#C97B84', '#7C8B65', '#F3EBD9', '#E1C688'];

interface CelebrationBurstProps {
  /** Toggle true to fire; component re-fires whenever this flips to true. */
  active: boolean;
  durationMs?: number;
}

/**
 * Lightweight canvas confetti + firework burst. No external dependency,
 * self-contained animation loop, cleans up fully on unmount.
 */
export function CelebrationBurst({ active, durationMs = 3200 }: CelebrationBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let particles: Particle[] = [];
    const spawnCount = prefersReduced ? 0 : 140;

    for (let i = 0; i < spawnCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: 70 + Math.random() * 50,
        size: 4 + Math.random() * 5,
        rotation: Math.random() * Math.PI,
        vRotation: (Math.random() - 0.5) * 0.3,
      });
    }

    const start = performance.now();

    const step = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life < p.maxLife);

      particles.forEach((p) => {
        p.vy += 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRotation;
        p.life += 1;

        const alpha = 1 - p.life / p.maxLife;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(alpha, 0);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (now - start < durationMs) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, durationMs]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  );
}
