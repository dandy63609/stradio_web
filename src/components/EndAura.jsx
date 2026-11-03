import React, { useEffect, useRef } from 'react';

/*
 * Bottom-of-page aura + floating light particles.
 * Fades in over the last part of the scroll (p 0.86 -> 1) and keeps drifting
 * while the user stays at the bottom. Continues the dust that the video ends on.
 * Sleeps (no drawing) whenever intensity is 0, so it costs nothing at the top.
 */

const CORAL = [255, 122, 89];
const VIOLET = [169, 149, 219];

const makeSprite = ([r, g, b]) => {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  const grd = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, `rgba(255,255,255,1)`);
  grd.addColorStop(0.18, `rgba(${r},${g},${b},0.95)`);
  grd.addColorStop(0.5, `rgba(${r},${g},${b},0.25)`);
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, s, s);
  return c;
};

export default function EndAura({ progressRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const sprites = [makeSprite(VIOLET), makeSprite(CORAL)];
    const lowEnd = (navigator.deviceMemory || 8) <= 4;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1;
    let particles = [];
    let raf;
    let last = performance.now();
    let intensity = 0;

    // Runner box in viewport space (video is height-fit, centered, 9:16)
    const runnerBox = () => {
      const rw = Math.min(w, (h * 9) / 16);
      return { x: (w - rw) / 2, w: rw, y: 0, h };
    };

    const spawn = (initial) => {
      const b = runnerBox();
      // Bias spawn to the legs/trailing foot where the video's dust lives
      const x = b.x + b.w * (0.25 + Math.random() * 0.6);
      const y = b.y + b.h * (initial ? 0.15 + Math.random() * 0.8 : 0.45 + Math.random() * 0.5);
      return {
        x, y,
        vx: (Math.random() - 0.3) * 10,          // slight drift to the trailing side
        vy: -(6 + Math.random() * 16),            // slow rise
        size: (lowEnd ? 5 : 6) + Math.random() * 12,
        life: 0,
        maxLife: 4 + Math.random() * 5,
        phase: Math.random() * Math.PI * 2,
        sway: 6 + Math.random() * 14,
        sprite: sprites[Math.random() < 0.62 ? 0 : 1],
        initial,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1.25 : 1.75);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = reduced ? 18 : lowEnd ? 40 : w < 768 ? 60 : 90;
      particles = Array.from({ length: count }, () => {
        const p = spawn(true);
        p.life = Math.random() * p.maxLife; // stagger
        return p;
      });
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = progressRef.current || 0;
      const target = Math.min(1, Math.max(0, (p - 0.86) / 0.14));
      intensity += (target - intensity) * (1 - Math.pow(0.9, dt * 60));

      if (intensity < 0.002) {
        if (canvas.style.opacity !== '0') {
          ctx.clearRect(0, 0, w, h);
          canvas.style.opacity = '0';
        }
        raf = requestAnimationFrame(draw);
        return;
      }
      canvas.style.opacity = '1';
      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;
      const b = runnerBox();

      // Aura: breathing violet/coral glows behind the runner
      ctx.globalCompositeOperation = 'lighter';
      const breathe = 0.82 + 0.18 * Math.sin(t * 1.6);
      const glows = [
        { cx: b.x + b.w * 0.5, cy: h * 0.42, r: b.w * 0.75, c: VIOLET, a: 0.34 },
        { cx: b.x + b.w * 0.62, cy: h * 0.72, r: b.w * 0.55, c: CORAL, a: 0.22 + 0.06 * Math.sin(t * 2.1 + 1) },
      ];
      for (const g of glows) {
        const grd = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.r * breathe);
        const a = g.a * intensity;
        grd.addColorStop(0, `rgba(${g.c[0]},${g.c[1]},${g.c[2]},${a})`);
        grd.addColorStop(0.55, `rgba(${g.c[0]},${g.c[1]},${g.c[2]},${a * 0.35})`);
        grd.addColorStop(1, `rgba(${g.c[0]},${g.c[1]},${g.c[2]},0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      // Particles: embers / fireflies
      for (let i = 0; i < particles.length; i++) {
        let q = particles[i];
        q.life += dt;
        if (q.life >= q.maxLife || q.y < -20) {
          q = particles[i] = spawn(false);
        }
        q.x += (q.vx + Math.sin(t * 0.9 + q.phase) * q.sway * 0.3) * dt;
        q.y += q.vy * dt;
        const k = q.life / q.maxLife;
        const fade = Math.min(1, k * 4) * Math.min(1, (1 - k) * 2.5);
        const twinkle = 0.65 + 0.35 * Math.sin(t * 3 + q.phase * 3);
        ctx.globalAlpha = fade * twinkle * intensity;
        const s = q.size;
        ctx.drawImage(q.sprite, q.x - s / 2, q.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
      style={{ opacity: 0 }}
    />
  );
}
