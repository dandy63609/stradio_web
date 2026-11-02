import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Footprints, Music, Zap } from 'lucide-react';

export default function HeroRunway({ onOpenDownload, onThemeChange }) {
  const runwayRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      
      setScrollProgress(progress);
      onThemeChange(progress > 0.45);
    };

    const onScrollRaf = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollRaf, { passive: true });
    handleScroll(); // initialize

    return () => {
      window.removeEventListener('scroll', onScrollRaf);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onThemeChange]);

  // Color interpolation between Warm Ivory (#F5F0EB) and Deep Midnight (#191923)
  const getBackgroundColor = (p) => {
    // Ivory: 245, 240, 235
    // Midnight: 25, 25, 35
    const r = Math.round(245 + (25 - 245) * p);
    const g = Math.round(240 + (25 - 240) * p);
    const b = Math.round(235 + (35 - 235) * p);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const isDark = scrollProgress > 0.45;
  const state1Opacity = Math.max(1 - scrollProgress * 2.2, 0);
  const state2Opacity = Math.min(Math.max((scrollProgress - 0.35) * 2.2, 0), 1);

  return (
    <div id="hero" ref={runwayRef} className="relative w-full h-[380vh]">
      {/* Sticky Hero Viewport */}
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-20 pb-8 px-6 md:px-12 transition-colors duration-200"
        style={{ backgroundColor: getBackgroundColor(scrollProgress) }}
      >
        {/* Runner Stage (Centered Background Element) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {/* State 1: Athletic Runner on White Studio Backdrop */}
          <div
            className="absolute transition-opacity duration-300 flex items-center justify-center"
            style={{ opacity: state1Opacity }}
          >
            <img
              src="/images/runner_state_1.png"
              alt="Athletic Runner Stride"
              className="max-h-[70vh] md:max-h-[80vh] object-contain drop-shadow-md select-none"
            />
          </div>

          {/* State 2: Glowing Neon Rhythm Violet Runner Legs */}
          <div
            className="absolute transition-opacity duration-300 flex items-center justify-center animate-float-slow"
            style={{ opacity: state2Opacity }}
          >
            <img
              src="/images/neon_runner_figure.png"
              alt="Rhythm-Powered Glowing Runner"
              className="max-h-[70vh] md:max-h-[82vh] object-contain select-none drop-shadow-[0_0_35px_rgba(169,149,219,0.35)]"
            />
          </div>
        </div>

        {/* Content Layer: State 1 (Top Hero text) */}
        <div
          className="relative z-10 max-w-xl transition-all duration-300"
          style={{
            opacity: state1Opacity,
            transform: `translateY(${scrollProgress * -30}px)`,
            pointerEvents: state1Opacity > 0.2 ? 'auto' : 'none'
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-gray-800 mb-4">
            <Footprints size={14} className="text-[#FF7A59]" />
            <span>Stride-Triggered Audio</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-[#191923] leading-none mb-4">
            TURN EVERY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A59] to-[#191923]">
              STRIDE INTO SOUND.
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Running shouldn't just be counting miles. Scroll down to experience how STRADIO converts cadence into music.
          </p>

          <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-gray-500 animate-bounce">
            <ChevronDown size={16} className="text-[#FF7A59]" />
            <span>Scroll down to ignite the vibe</span>
          </div>
        </div>

        {/* Content Layer: State 2 (Transformed Vibe View) */}
        <div
          className="relative z-10 max-w-lg transition-all duration-300"
          style={{
            opacity: state2Opacity,
            transform: `translateY(${(1 - scrollProgress) * 40}px)`,
            pointerEvents: state2Opacity > 0.2 ? 'auto' : 'none'
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#A995DB] mb-3">
            <Zap size={13} className="text-[#FF7A59]" />
            <span>Rhythm Activated</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-3">
            Run the Vibe.
          </h2>

          <p className="text-[#A995DB] font-semibold text-base sm:text-lg mb-2">
            Movement becomes music.
          </p>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-md">
            STRADIO is a movement-powered music experience that turns every step into your soundtrack. Synchronized to your exact footstrike.
          </p>

          {/* CTA Button with the Sonic Coral + Rhythm Violet Aura Glow */}
          <div className="inline-block relative">
            <button
              onClick={onOpenDownload}
              className="relative z-10 flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold text-sm tracking-wide text-white bg-[#191923] border border-transparent animate-aura-pulse transition-transform hover:scale-105 active:scale-95 shadow-2xl"
            >
              <span>Get the App</span>
              <ArrowRight size={16} className="text-[#FF7A59]" />
            </button>
          </div>
        </div>

        {/* Bottom Feature Badges (State 2 Footer) */}
        <div
          className="relative z-10 grid grid-cols-3 gap-2 sm:gap-6 border-t border-white/10 pt-4 transition-opacity duration-300"
          style={{
            opacity: state2Opacity,
            pointerEvents: state2Opacity > 0.2 ? 'auto' : 'none'
          }}
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A59] mb-1">
              <Footprints size={15} />
            </div>
            <span className="text-xs font-bold text-white leading-tight">Step Detection</span>
            <span className="text-[10px] text-gray-400">with precision</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#A995DB] mb-1">
              <Music size={15} />
            </div>
            <span className="text-xs font-bold text-white leading-tight">Adaptive Music</span>
            <span className="text-[10px] text-gray-400">in real-time</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A59] mb-1">
              <Zap size={15} />
            </div>
            <span className="text-xs font-bold text-white leading-tight">Lightweight</span>
            <span className="text-[10px] text-gray-400">and seamless</span>
          </div>
        </div>
      </div>
    </div>
  );
}
