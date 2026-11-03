import React, { useEffect, useRef } from 'react';
import { ArrowRight, Footprints, Music, Zap, Smartphone, Download } from 'lucide-react';
import EndAura from './EndAura';

/*
 * STRADIO Hero: In-place runner transformation (stradio_web_spec.md)
 *
 * Scroll progress p (0..1) over a 400vh runway (~3 phone screens of swiping):
 *   0.00        Clean black-shorts runner on Warm Ivory (#F5F0EB), nav only, zero text
 *   0.30-0.70   Glowing muscles appear; bg, nav, logo & buttons interpolate Ivory -> Midnight (--t)
 *   0.80-0.98   End UI fades in:
 *               - Android Phone: Upper-left headline + subtitle + breathing CTA (leaves glowing legs 100% clear)
 *                 + 3 compact badges along the bottom dock.
 *               - Windows Desktop: 3-zone editorial layout:
 *                 Left (Headline + description + breathing CTA) | Center (Runner + Aura) | Right (Android QR Card + 3 stacked badges)
 *   1.00        Frame 135 held; EndAura glow + floating particles loop seamlessly
 */

const IVORY = [245, 240, 235];
const MIDNIGHT = [25, 25, 35];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (a, b, v) => {
  const x = clamp01((v - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const mix = (a, b, t) => a.map((c, i) => Math.round(c + (b[i] - c) * t));

const pickVideo = () => {
  const mem = navigator.deviceMemory || 8;
  const cores = navigator.hardwareConcurrency || 8;
  return mem <= 4 || cores <= 4 ? '/video/runner_720.webm' : '/video/runner_1080.webm';
};

export default function HeroRunway({ onOpenDownload, onThemeChange }) {
  const runwayRef = useRef(null);
  const bgRef = useRef(null);
  const videoRef = useRef(null);
  const endLeftRef = useRef(null);
  const endRightRef = useRef(null);
  const endBottomMobileRef = useRef(null);
  const progressRef = useRef(0);
  const themeCbRef = useRef(onThemeChange);
  themeCbRef.current = onThemeChange;

  useEffect(() => {
    const video = videoRef.current;
    video.src = pickVideo();

    let raf;
    let last = performance.now();
    let smoothed = 0;
    let seeking = false;
    let lastSeekAt = 0;
    let isDark = null;
    const root = document.documentElement;

    const onSeeked = () => {
      seeking = false;
    };
    video.addEventListener('seeked', onSeeked);

    const readProgress = () => {
      const el = runwayRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      return total > 0 ? clamp01(-rect.top / total) : 0;
    };

    const tick = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;

      const target = readProgress();
      smoothed += (target - smoothed) * (1 - Math.pow(0.82, dt * 60));
      if (Math.abs(target - smoothed) < 0.0005) smoothed = target;
      const p = smoothed;
      progressRef.current = p;

      // 1) Seek-throttled video scrub
      if (video.readyState >= 1 && video.duration) {
        const t = p * (video.duration - 0.001);
        if (!seeking && now - lastSeekAt > 16 && Math.abs(video.currentTime - t) > 1 / 60) {
          seeking = true;
          lastSeekAt = now;
          video.currentTime = t;
        }
      }

      // 2) Theme sync (30% -> 70%)
      const theme = smoothstep(0.3, 0.7, p);
      root.style.setProperty('--t', theme.toFixed(4));
      const [r, g, b] = mix(IVORY, MIDNIGHT, theme);
      if (bgRef.current) {
        bgRef.current.style.backgroundColor = `rgb(${r},${g},${b})`;
      }
      const dark = theme > 0.5;
      if (dark !== isDark) {
        isDark = dark;
        themeCbRef.current?.(dark);
      }

      // 3) End UI reveal (80% -> 98%)
      const e = smoothstep(0.8, 0.98, p);
      const interactive = e > 0.6 ? 'auto' : 'none';

      if (endLeftRef.current) {
        endLeftRef.current.style.opacity = e;
        endLeftRef.current.style.transform = `translate3d(0, ${(1 - e) * 26}px, 0)`;
        endLeftRef.current.style.pointerEvents = interactive;
      }
      if (endRightRef.current) {
        endRightRef.current.style.opacity = e;
        endRightRef.current.style.transform = `translate3d(0, ${(1 - e) * 26}px, 0)`;
        endRightRef.current.style.pointerEvents = interactive;
      }
      if (endBottomMobileRef.current) {
        endBottomMobileRef.current.style.opacity = e;
        endBottomMobileRef.current.style.transform = `translate3d(0, ${(1 - e) * 18}px, 0)`;
        endBottomMobileRef.current.style.pointerEvents = interactive;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener('seeked', onSeeked);
      root.style.removeProperty('--t');
    };
  }, []);

  const apkUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/stradio.apk`
      : 'https://stradio.app/stradio.apk';

  return (
    <section id="hero" ref={runwayRef} className="relative w-full h-[400vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Dynamic Background (Ivory #F5F0EB -> Midnight #191923) */}
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{ backgroundColor: 'rgb(245,240,235)' }}
        />

        {/* Bottom Aura + Drifting Light Particles (behind the runner) */}
        <EndAura progressRef={progressRef} />

        {/* Transparent Runner Video Cutout */}
        <video
          ref={videoRef}
          className="runner-video absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none"
          poster="/video/runner_poster.webp"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label="Runner transforming into a glowing rhythm-powered runner"
        />

        {/* ============================================================
            ZONE 1 (Phone Upper-Left & Desktop Left Column):
            Headline + Subtitle + Description + Breathing CTA Button
            ============================================================ */}
        <div
          ref={endLeftRef}
          className="
            absolute z-20
            left-5 top-[4.75rem] max-w-[66%]
            sm:left-8 sm:top-24 sm:max-w-xs
            lg:left-12 xl:left-20 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-md
          "
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          {/* Subtle pill on Desktop / Tablet */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/15 text-[11px] font-semibold text-[#A995DB] mb-4 backdrop-blur-md">
            <Zap size={12} className="text-[#FF7A59]" />
            <span>Rhythm Activated</span>
          </div>

          <h1 className="font-display font-black text-[2.35rem] leading-[0.95] sm:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight drop-shadow-[0_4px_24px_rgba(14,14,20,0.9)]">
            Run the
            <br />
            Vibe.
          </h1>

          <p className="mt-2.5 sm:mt-3 text-[#A995DB] font-semibold text-sm sm:text-base lg:text-lg drop-shadow-[0_2px_12px_rgba(14,14,20,0.9)]">
            Movement becomes music.
          </p>

          <p className="mt-1.5 sm:mt-2 text-gray-300/90 text-[11px] sm:text-xs lg:text-sm leading-relaxed max-w-[230px] sm:max-w-xs lg:max-w-sm drop-shadow-[0_2px_10px_rgba(14,14,20,0.95)]">
            STRADIO is a movement-powered music experience that turns every step into your soundtrack.
          </p>

          {/* Breathing Coral/Violet CTA grouped right under text (Canva State 2) */}
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <CtaButton onClick={onOpenDownload} />
          </div>
        </div>

        {/* ============================================================
            ZONE 3 (Windows Desktop Right Column):
            Android QR Install Card + 3 Stacked Feature Cards
            ============================================================ */}
        <div
          ref={endRightRef}
          className="
            hidden lg:flex flex-col gap-3.5
            absolute z-20 right-12 xl:right-20 top-1/2 -translate-y-1/2 w-72
          "
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          {/* QR Code Card for Windows Desktop Visitors */}
          <div className="p-4 rounded-2xl bg-[#191923]/80 backdrop-blur-xl border border-white/12 shadow-2xl">
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded-xl bg-white shrink-0 shadow-md">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&color=191923&bgcolor=FFFFFF&data=${encodeURIComponent(apkUrl)}`}
                  alt="Scan to download STRADIO Android APK"
                  className="w-16 h-16 rounded-md block"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF7A59] mb-1">
                  <Smartphone size={12} />
                  <span>Android APK</span>
                </div>
                <p className="text-xs font-semibold text-white leading-snug">
                  Scan with your phone camera
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                  Installs directly on Android (v0.1.0-alpha)
                </p>
              </div>
            </div>
            <button
              onClick={onOpenDownload}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-[11px] font-semibold text-gray-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download size={12} className="text-[#A995DB]" />
              <span>Or download .APK to this PC</span>
            </button>
          </div>

          {/* 3 Stacked Feature Badges on Desktop */}
          <div className="p-4 rounded-2xl bg-[#191923]/75 backdrop-blur-xl border border-white/10 space-y-3">
            <DesktopBadge
              icon={<Footprints size={15} />}
              color="text-[#FF7A59]"
              title="Step Detection"
              sub="with precision"
            />
            <div className="h-px bg-white/8" />
            <DesktopBadge
              icon={<Music size={15} />}
              color="text-[#A995DB]"
              title="Adaptive Music"
              sub="in real-time"
            />
            <div className="h-px bg-white/8" />
            <DesktopBadge
              icon={<Zap size={15} />}
              color="text-[#FF7A59]"
              title="Lightweight"
              sub="and seamless"
            />
          </div>
        </div>

        {/* ============================================================
            MOBILE / TABLET BOTTOM DOCK (3 Compact Feature Badges)
            ============================================================ */}
        <div
          ref={endBottomMobileRef}
          className="lg:hidden absolute z-20 inset-x-0 bottom-0 px-5 pb-5 pt-12 bg-gradient-to-t from-[#191923] via-[#191923]/85 to-transparent"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <div className="grid grid-cols-3 gap-2 border-t border-white/12 pt-3.5 max-w-md">
            <MobileBadge
              icon={<Footprints size={14} />}
              color="text-[#FF7A59]"
              title="Step Detection"
              sub="with precision"
            />
            <MobileBadge
              icon={<Music size={14} />}
              color="text-[#A995DB]"
              title="Adaptive Music"
              sub="in real-time"
            />
            <MobileBadge
              icon={<Zap size={14} />}
              color="text-[#FF7A59]"
              title="Lightweight"
              sub="and seamless"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        relative inline-flex items-center gap-2.5
        px-6 py-3 sm:px-8 sm:py-4
        rounded-full font-display font-bold text-xs sm:text-sm tracking-wide
        text-white bg-[#191923]/95 border border-transparent
        animate-aura-pulse transition-transform hover:scale-105 active:scale-95
        cursor-pointer
      "
    >
      <span>Get the App</span>
      <ArrowRight size={15} className="text-[#FF7A59]" />
    </button>
  );
}

function MobileBadge({ icon, color, title, sub }) {
  return (
    <div className="flex flex-col items-start text-left">
      <div className={`w-6 h-6 rounded-lg bg-white/8 flex items-center justify-center mb-1 ${color}`}>
        {icon}
      </div>
      <span className="text-[11px] font-bold text-white leading-tight">{title}</span>
      <span className="text-[10px] text-gray-400 leading-tight">{sub}</span>
    </div>
  );
}

function DesktopBadge({ icon, color, title, sub }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs font-bold text-white leading-tight">{title}</div>
        <div className="text-[11px] text-gray-400 leading-tight">{sub}</div>
      </div>
    </div>
  );
}
