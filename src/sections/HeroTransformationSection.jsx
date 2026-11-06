import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RunnerCanvasScrubber from "../animations/RunnerCanvasScrubber";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to manage GSAP ScrollTrigger timeline and frame interpolation progress
 */
function useHeroScrollAnimation(containerRef, scrollProgressRef, runnerEaseRef) {
  const isInitialSettled =
    typeof window !== "undefined" &&
    (new URLSearchParams(window.location.search).get("scroll") === "1" ||
      new URLSearchParams(window.location.search).get("scene") === "1");

  const [scrollProgress, setScrollProgress] = useState(
    isInitialSettled ? 1 : 0
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
      onUpdate: (self) => {
        const p = self.progress;
        // Frame scrubber completes all 48 frames smoothly across scroll
        const frameP = Math.min(1, Math.max(0, p / 0.85));
        scrollProgressRef.current = frameP;

        // Runner movement: starts at 15% scroll, smoothly glides into settled spot by 75% scroll
        const rProg = Math.min(1, Math.max(0, (p - 0.15) / 0.6));
        const rEase = rProg * rProg * (3 - 2 * rProg);
        runnerEaseRef.current = rEase;

        setScrollProgress(p);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [containerRef, scrollProgressRef, runnerEaseRef]);

  // Phase computations:
  // 0% -> 15%: Chevron indicator guides user and fades out smoothly
  const indicatorOpacity = Math.max(0, 1 - scrollProgress / 0.15);

  // UI reveal progress (starts at 50% scroll, settles by 80%)
  const uiProgress = Math.min(1, Math.max(0, (scrollProgress - 0.5) / 0.3));
  const isSettled = scrollProgress >= 0.8;

  return { scrollProgress, indicatorOpacity, uiProgress, isSettled };
}

export default function HeroTransformationSection({ onDownloadClick }) {
  const containerRef = useRef(null);
  const isInitialSettled =
    typeof window !== "undefined" &&
    (new URLSearchParams(window.location.search).get("scroll") === "1" ||
      new URLSearchParams(window.location.search).get("scene") === "1");

  const scrollProgressRef = useRef(isInitialSettled ? 1 : 0);
  const runnerEaseRef = useRef(isInitialSettled ? 1 : 0);

  const { indicatorOpacity, uiProgress, isSettled } = useHeroScrollAnimation(
    containerRef,
    scrollProgressRef,
    runnerEaseRef
  );

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative w-full h-[200vh] bg-[#F5F5F7] select-none"
    >
      {/* Sticky 100svh Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex items-center justify-center bg-[#F5F5F7]">
        {/* FIRST FRAME (Scroll 0%): Minimalist Scroll Indicator */}
        <ScrollIndicator opacity={indicatorOpacity} />

        {/* RUNNER LAYER: 120fps Canvas Scrubber (48 Frames WebP) */}
        {/* Desktop Runner */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
          <RunnerCanvasScrubber
            progressRef={scrollProgressRef}
            runnerEaseRef={runnerEaseRef}
            layoutMode="desktop"
            className="w-full h-full"
          />
        </div>

        {/* Mobile Runner */}
        <div className="lg:hidden absolute inset-0 z-10 pointer-events-none">
          <RunnerCanvasScrubber
            progressRef={scrollProgressRef}
            runnerEaseRef={runnerEaseRef}
            layoutMode="mobile"
            className="w-full h-full"
          />
        </div>

        {/* LAST FRAME: DESKTOP SETTLED UI */}
        <DesktopSettledView
          uiProgress={uiProgress}
          isSettled={isSettled}
          onDownloadClick={onDownloadClick}
        />

        {/* LAST FRAME: MOBILE SETTLED UI */}
        <MobileSettledView
          uiProgress={uiProgress}
          isSettled={isSettled}
          onDownloadClick={onDownloadClick}
        />
      </div>
    </section>
  );
}

/**
 * Floating scroll prompt shown at 0% scroll
 */
function ScrollIndicator({ opacity }) {
  return (
    <div
      className="absolute bottom-8 sm:bottom-12 z-40 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
      style={{
        opacity,
        transform: `translate3d(0, ${(1 - opacity) * 20}px, 0)`,
      }}
    >
      <span className="font-sans font-semibold text-[11px] sm:text-[12px] tracking-[0.2em] text-[#15151F]/60 uppercase">
        Scroll to explore
      </span>
      <div className="animate-float-indicator">
        <svg
          className="w-5 h-5 text-[#15151F]/70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Desktop Settled UI View (Screens >= 1024px)
 */
function DesktopSettledView({ uiProgress, isSettled, onDownloadClick }) {
  return (
    <div
      className="hidden lg:flex absolute inset-0 z-30 flex-col justify-between p-6 xl:p-10 pointer-events-none transition-all duration-300 ease-out"
      style={{
        opacity: uiProgress,
        transform: `translate3d(0, ${(1 - uiProgress) * 24}px, 0)`,
        pointerEvents: isSettled ? "auto" : "none",
      }}
    >
      {/* Header Spacer (Navbar is fixed at top) */}
      <div className="h-[50px] xl:h-[60px]" />

      {/* Main Hero Pitch (Right Column - 1:1 Figma Layout) */}
      <div className="w-full max-w-[1920px] mx-auto flex-1 flex flex-col justify-center px-4 xl:px-8">
        <div className="ml-auto w-[52%] max-w-[480px] xl:max-w-[560px] flex flex-col gap-2 xl:gap-3.5">
          {/* Headline Lockup: "Run the" / "Vibe." with Gradient Underline */}
          <div className="relative">
            <h1 className="font-display font-black italic text-[#15151F] text-[54px] xl:text-[68px] 2xl:text-[72px] leading-[0.92] tracking-[-0.05em]">
              <span className="block">Run the</span>
              <span className="block">Vibe.</span>
            </h1>

            {/* Gradient Accent Bar directly under the baseline of 'Vibe.' */}
            <div
              className="w-[100px] xl:w-[140px] h-[3.5px] xl:h-[4.5px] rounded-[4px] bg-gradient-to-r from-[#de857a] via-[#ba617b] to-[#a273af] mt-1.5 xl:mt-2"
              aria-hidden="true"
            />
          </div>

          {/* Tagline */}
          <p className="font-display font-normal italic text-[#171918] text-[16px] xl:text-[20px] tracking-[-0.03em] leading-tight">
            Movement becomes music.
          </p>

          {/* Description */}
          <p className="font-sans font-normal text-[#171918]/85 text-[11px] xl:text-[13px] leading-[1.38] max-w-[360px]">
            STRADIO is a movement-powered music experience that turns every
            step into your soundtrack.
          </p>

          {/* Get the App CTA Pill */}
          <div className="pt-1 xl:pt-2">
            <button
              type="button"
              onClick={() => onDownloadClick("hero_desktop_cta")}
              className="group inline-flex items-center gap-2.5 bg-[#15151F] text-[#F5F5F7] rounded-[100px] px-5 xl:px-6 py-2 xl:py-2.5 border border-[#15151F] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl pointer-events-auto"
            >
              <span className="font-sans font-medium text-[12px] xl:text-[14px]">
                Get the App
              </span>
              <img
                src="/assets/images/figma/figma_arrow.svg"
                alt=""
                className="w-3.5 h-3 object-contain transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: 3 Benefit Pillars + Registration Markers */}
      <div className="w-full max-w-[1920px] mx-auto px-4 xl:px-8 pt-4 pb-2">
        <div className="flex items-end justify-between gap-8 pb-2">
          {/* ============================================================== */}
          {/* 3 Product Benefits (Desktop)                                  */}
          {/* Change translateX(0px) for LEFT or RIGHT                       */}
          {/* Change translateY(0px) for UP or DOWN                         */}
          {/* ============================================================== */}
          <div
            className="flex items-center gap-4 xl:gap-7"
            style={{ transform: "translateX(400px) translateY(0px)" }}
          >
            {/* Benefit 1: Step Detection */}
            <div className="flex flex-col items-center text-center gap-1 w-[100px] xl:w-[120px]">
              <img
                src="/assets/images/figma/figma_desk_symbol_shoe.svg"
                alt="Step Detection icon"
                className="w-9 h-8 xl:w-11 xl:h-10 object-contain"
              />
              <span className="font-sans font-bold text-[#171918] text-[12px] xl:text-[13px] leading-tight mt-0.5">
                Step Detection
              </span>
              <span className="font-sans font-normal text-[#171918]/75 text-[10px] xl:text-[11px]">
                with precision
              </span>
            </div>

            {/* Divider 1 */}
            <div
              className="w-[1.5px] h-[50px] xl:h-[60px] bg-[#BCBDB4]"
              aria-hidden="true"
            />

            {/* Benefit 2: Adaptive Music */}
            <div className="flex flex-col items-center text-center gap-1 w-[100px] xl:w-[120px]">
              <img
                src="/assets/images/figma/figma_desk_symbol_wave.svg"
                alt="Adaptive Music icon"
                className="w-9 h-8 xl:w-11 xl:h-10 object-contain"
              />
              <span className="font-sans font-bold text-[#171918] text-[12px] xl:text-[13px] leading-tight mt-0.5">
                Adaptive Music
              </span>
              <span className="font-sans font-normal text-[#171918]/75 text-[10px] xl:text-[11px]">
                in real-time
              </span>
            </div>

            {/* Divider 2 */}
            <div
              className="w-[1.5px] h-[50px] xl:h-[60px] bg-[#BCBDB4]"
              aria-hidden="true"
            />

            {/* Benefit 3: Lightweight */}
            <div className="flex flex-col items-center text-center gap-1 w-[100px] xl:w-[120px]">
              <img
                src="/assets/images/figma/figma_desk_symbol_bolt.svg"
                alt="Lightweight icon"
                className="w-9 h-8 xl:w-11 xl:h-10 object-contain"
              />
              <span className="font-sans font-bold text-[#171918] text-[12px] xl:text-[13px] leading-tight mt-0.5">
                Lightweight
              </span>
              <span className="font-sans font-normal text-[#171918]/75 text-[10px] xl:text-[11px]">
                and seamless
              </span>
            </div>
          </div>

          {/* Right Signature */}
          <div className="flex items-center gap-3 xl:gap-4">
            <div
              className="w-[50px] xl:w-[70px] h-[1.5px] bg-[#BCBDB4]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bottom Registration Markers & Gradient Hairline */}
        <div className="relative pt-1.5">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-[#de857a] via-[#ba617b] to-[#a273af] rounded-[1px]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Individual reusable feature card for mobile settled state
 */
function MobileFeatureCard({
  badge,
  title,
  subtitle,
  iconSrc,
  bgClass,
  badgeBgClass,
  translateY = "0px",
}) {
  return (
    <div
      className={`relative w-[100px] sm:w-[130px] h-[115px] sm:h-[135px] rounded-[10px] p-[2px] shadow-lg ${bgClass}`}
      style={{ transform: `translateY(${translateY})` }}
    >
      <div className="w-full h-full bg-[#fafaf7] rounded-[8px] flex flex-col items-center justify-center p-2 text-center">
        <img
          src={iconSrc}
          alt={title}
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-1"
        />
        <span className="font-sans font-semibold text-[10px] sm:text-[11px] text-[#0b0c0c] leading-tight">
          {title}
        </span>
        <span className="font-sans font-normal text-[9px] sm:text-[10px] text-[#0b0c0c]/60">
          {subtitle}
        </span>
      </div>
      {/* Number Badge */}
      <div
        className={`absolute top-1.5 right-1.5 w-4 h-4 rounded-[4px] text-white font-sans font-semibold text-[9px] flex items-center justify-center ${badgeBgClass}`}
      >
        {badge}
      </div>
    </div>
  );
}

/**
 * Mobile Settled UI View (Screens < 1024px)
 */
function MobileSettledView({ uiProgress, isSettled, onDownloadClick }) {
  return (
    <div
      className="lg:hidden absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 pointer-events-none transition-all duration-300 ease-out"
      style={{
        opacity: uiProgress,
        transform: `translate3d(0, ${(1 - uiProgress) * 20}px, 0)`,
        pointerEvents: isSettled ? "auto" : "none",
      }}
    >
      {/* Top-Right Ribbon Flourish */}
      <div className="relative w-full h-[40px] pointer-events-none">
        <img
          src="/assets/images/figma/pure_top_ribbon.png"
          alt=""
          className="absolute -top-4 -right-4 w-[72px] sm:w-[85px] h-auto object-contain pointer-events-none select-none drop-shadow-sm"
        />
      </div>

      {/* Right Hero Pitch Block */}
      <div className="flex-1 flex flex-col justify-start items-end text-right pr-1 pt-3">
        <div className="flex flex-col items-end">
          {/* 1. TITLE: mb-[6px] */}
          <h1 className="font-display font-black italic text-[#0b0c0c] text-[36px] sm:text-[44px] leading-[0.92] tracking-[-0.05em] mb-[6px]">
            <span className="block">Run the</span>
            <span className="block">Vibe.</span>
          </h1>

          {/* 2. TAGLINE: mb-[14px] */}
          <p className="font-display font-normal italic text-[#0b0c0c] text-[12px] sm:text-[17px] tracking-[-0.02em] leading-tight mb-[14px]">
            Movement becomes music.
          </p>

          {/* 3. DESCRIPTION BOX / DIV: w-[150px] mb-[20px] */}
          <div className="w-[150px] mb-[20px]">
            <p className="font-sans font-normal text-[#303030] text-[10px] sm:text-[12px] leading-[1.32]">
              STRADIO is a movement music experience that turns every step
              into your soundtrack.
            </p>
          </div>

          {/* 4. BUTTON: px-1.5 py-1 text-[7px] */}
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={() => onDownloadClick("hero_mobile_cta")}
              className="bg-gradient-to-r from-[#59417e] via-[#26232e] to-[#db806d] p-[2px] rounded-[40px] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer shadow-md"
            >
              <div className="bg-[#0b0c0c] text-white px-1.5 py-1 rounded-[40px] flex items-center gap-2">
                <span className="font-sans font-medium text-[7px] sm:text-[12px]">
                  Get the App
                </span>
                <img
                  src="/assets/images/figma/figma_arrow.svg"
                  alt=""
                  className="w-3.5 h-3 object-contain"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Cards & Beat Rhythm Connectors */}
      <div className="w-full pb-2">
        {/* FEATURE CARDS ROW (All 3 cards together) */}
        <div
          className="relative flex items-center justify-center gap-1.5 sm:gap-4 py-2 mb-[0px]"
          style={{ transform: "translateY(-100px)" }}
        >
          {/* Connector 1 */}
          <div className="hidden sm:flex items-center gap-0.5">
            <div className="w-[2px] h-[2px] rounded-full bg-[#c97b6d]" />
            <div className="w-[8px] h-[2px] bg-[#c97b6d]" />
            <div className="w-[2px] h-[2px] rounded-full bg-[#c97b6d]" />
          </div>

          {/* Feature Card 01: Step Detection */}
          <MobileFeatureCard
            badge="01"
            title="Step Detection"
            subtitle="with precision"
            iconSrc="/assets/images/figma/figma_feature_shoe.svg"
            bgClass="bg-gradient-to-b from-[#ba617b] to-[#211d36]"
            badgeBgClass="bg-[#ba617b]"
            translateY="0px"
          />

          {/* Connector 2 */}
          <div className="flex items-center gap-0.5">
            <div className="w-[2px] h-[2px] rounded-full bg-[#9c5b92]" />
            <div className="w-[8px] h-[2px] bg-[#9c5b92]" />
            <div className="w-[2px] h-[2px] rounded-full bg-[#9c5b92]" />
          </div>

          {/* Feature Card 02: Adaptive Music */}
          <MobileFeatureCard
            badge="02"
            title="Adaptive Music"
            subtitle="in real-time"
            iconSrc="/assets/images/figma/figma_feature_wave.svg"
            bgClass="bg-gradient-to-b from-[#8652a4] to-[#211d36]"
            badgeBgClass="bg-[#8652a4]"
            translateY="0px"
          />

          {/* Connector 3 */}
          <div className="flex items-center gap-0.5">
            <div className="w-[2px] h-[2px] rounded-full bg-[#68418c]" />
            <div className="w-[8px] h-[2px] bg-[#68418c]" />
            <div className="w-[2px] h-[2px] rounded-full bg-[#68418c]" />
          </div>

          {/* Feature Card 03: Lightweight */}
          <MobileFeatureCard
            badge="03"
            title="Lightweight"
            subtitle="and seamless"
            iconSrc="/assets/images/figma/figma_feature_bolt.svg"
            bgClass="bg-[#211d36]"
            badgeBgClass="bg-[#211d36]"
            translateY="0px"
          />

          {/* Connector 4 */}
          <div className="hidden sm:flex items-center gap-0.5">
            <div className="w-[2px] h-[2px] rounded-full bg-[#211d36]" />
            <div className="w-[8px] h-[2px] bg-[#211d36]" />
            <div className="w-[2px] h-[2px] rounded-full bg-[#211d36]" />
          </div>
        </div>

        {/* Mobile Footer Lockup */}
        <div className="relative flex items-center justify-between pt-3 border-t border-[#b7b4ab]/40">
          <span className="font-wordmark font-black text-[19px] tracking-[0.2em] text-[#0b0c0c]">
            STRADIO
          </span>
          {/* Bottom Ribbon Flourish */}
          <img
            src="/assets/images/figma/new_ribbon.png"
            alt=""
            className="absolute -bottom-6 -right-4 w-[300px] sm:w-[190px] h-auto object-contain pointer-events-none select-none opacity-90 drop-shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
