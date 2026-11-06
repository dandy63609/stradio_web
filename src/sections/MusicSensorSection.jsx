import React from "react";

const BEAT_STEM_POSITIONS = [
  { x: 56, isMajor: false },
  { x: 118, isMajor: true },
  { x: 180, isMajor: false },
  { x: 242, isMajor: true },
  { x: 304, isMajor: false },
  { x: 366, isMajor: true },
  { x: 428, isMajor: false },
  { x: 490, isMajor: true },
  { x: 552, isMajor: false },
];

const STEP_PEAKS = [
  { cx: 110, cy: 40 },
  { cx: 255, cy: 36 },
  { cx: 405, cy: 38 },
  { cx: 550, cy: 36 },
];

export default function MusicSensorSection() {
  return (
    <section
      id="features"
      className="relative w-full bg-[#F5F5F7] text-[#15151F] pt-16 sm:pt-24 pb-0 overflow-hidden border-t border-[#BCBDB4]/30"
    >
      <div className="max-w-[1376px] mx-auto px-5 sm:px-10 flex flex-col gap-10 sm:gap-14">
        {/* Section Header Row & Metrics */}
        <SectionHeader />

        {/* 2 Visual Architecture Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <DualLayerAudioCard />
          <SensorAlgorithmCard />
        </div>

        {/* Bottom Attribution & Creator Row */}
        <AttributionFooter />
      </div>

      {/* 100% EDGE-TO-EDGE FULL BLEED WAVE */}
      <EdgeToEdgeFluidWave />
    </section>
  );
}

/**
 * Section title and performance latency/polling metrics
 */
function SectionHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div className="flex flex-col gap-2.5 max-w-[620px]">
        <span className="font-sans font-bold text-[#BA617B] text-[11px] sm:text-[12px] tracking-[0.22em] uppercase">
          02 / MOVEMENT-TO-AUDIO ARCHITECTURE
        </span>
        <h2 className="font-display font-black italic text-[#15151F] text-[36px] sm:text-[52px] leading-[1.04] tracking-[-0.04em]">
          Engineered for Your Stride.
        </h2>
      </div>

      <div className="flex flex-col gap-4 max-w-[460px]">
        <p className="font-sans font-normal text-[#171918]/80 text-[14px] sm:text-[16px] leading-[1.5]">
          Two synchronized audio layers driven by a 100 Hz Adaptive Midpoint
          + Gravitation sensor algorithm that responds to every footstrike
          in under 50ms.
        </p>

        {/* Performance Metric Badges */}
        <div className="flex items-center gap-6 sm:gap-8 pt-1">
          <div>
            <span className="font-display font-black text-[#DE857A] text-[20px] sm:text-[24px]">
              &lt; 50ms
            </span>
            <p className="font-sans text-[11px] text-[#171918]/60 uppercase tracking-wider">
              Footstrike Latency
            </p>
          </div>
          <div className="w-[1px] h-8 bg-[#BCBDB4]/40" />
          <div>
            <span className="font-display font-black text-[#8652A4] text-[20px] sm:text-[24px]">
              100 Hz
            </span>
            <p className="font-sans text-[11px] text-[#171918]/60 uppercase tracking-wider">
              Sensor Polling
            </p>
          </div>
          <div className="w-[1px] h-8 bg-[#BCBDB4]/40" />
          <div>
            <span className="font-display font-black text-[#15151F] text-[20px] sm:text-[24px]">
              165 BPM
            </span>
            <p className="font-sans text-[11px] text-[#171918]/60 uppercase tracking-wider">
              Target Cadence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Architecture Card 01: Dual-Layer Sound Engine
 */
function DualLayerAudioCard() {
  return (
    <article className="rounded-[24px] bg-white/90 border border-[#BCBDB4]/50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-2.5">
        <span className="font-sans font-bold text-[#BA617B] text-[11px] tracking-[0.18em] uppercase">
          LAYER 01 & 02 · DUAL-LAYER SOUND ENGINE
        </span>
        <h3 className="font-display font-bold text-[#15151F] text-[22px] sm:text-[26px] tracking-[-0.02em]">
          Ambient Melody + Step-Triggered Beat
        </h3>
        <p className="font-sans font-normal text-[#171918]/75 text-[13px] sm:text-[15px] leading-[1.5]">
          Layer 1 loops a cinematic atmospheric melody continuously. Layer
          2 fires deep, punchy drum stems the exact millisecond your foot
          strikes the ground—scaling tempo naturally from walk to sprint.
        </p>
      </div>

      {/* Visual Waveform SVG */}
      <div className="relative w-full h-[140px] sm:h-[160px] rounded-xl bg-[#F5F5F7] border border-[#BCBDB4]/30 overflow-hidden flex items-center justify-center px-4">
        <svg className="w-full h-full" viewBox="0 0 600 140" fill="none">
          {/* Continuous Sine Wave */}
          <path
            d="M 0 70 Q 75 20, 150 70 T 300 70 T 450 70 T 600 70"
            stroke="#BA617B"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 0 70 Q 75 120, 150 70 T 300 70 T 450 70 T 600 70"
            stroke="#8652A4"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Staggered Vertical Beat Stems */}
          {BEAT_STEM_POSITIONS.map((stem, i) => (
            <line
              key={i}
              x1={stem.x}
              y1={stem.isMajor ? 25 : 45}
              x2={stem.x}
              y2={stem.isMajor ? 115 : 95}
              stroke={stem.isMajor ? "#DE857A" : "#BCBDB4"}
              strokeWidth={stem.isMajor ? "3" : "1.5"}
              strokeLinecap="round"
              opacity={stem.isMajor ? "0.9" : "0.4"}
            />
          ))}
        </svg>
      </div>
    </article>
  );
}

/**
 * Architecture Card 02: Adaptive Midpoint Sensor Science
 */
function SensorAlgorithmCard() {
  return (
    <article className="rounded-[24px] bg-white/90 border border-[#BCBDB4]/50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-2.5">
        <span className="font-sans font-bold text-[#8652A4] text-[11px] tracking-[0.18em] uppercase">
          SENSOR SCIENCE · REAL-TIME ADAPTATION
        </span>
        <h3 className="font-display font-bold text-[#15151F] text-[22px] sm:text-[26px] tracking-[-0.02em]">
          Adaptive Midpoint + Gravitation
        </h3>
        <p className="font-sans font-normal text-[#171918]/75 text-[13px] sm:text-[15px] leading-[1.5]">
          Continuous drift-cancelling calibration isolates vertical
          acceleration peaks from phone bounce in pockets, armbands, or
          handheld grips with &gt; 98% strike accuracy.
        </p>
      </div>

      {/* Visual Accelerometer Trajectory SVG */}
      <div className="relative w-full h-[140px] sm:h-[160px] rounded-xl bg-[#F5F5F7] border border-[#BCBDB4]/30 overflow-hidden flex items-center justify-center px-4">
        <svg className="w-full h-full" viewBox="0 0 600 140" fill="none">
          {/* Horizontal Baseline */}
          <line
            x1="0"
            y1="70"
            x2="600"
            y2="70"
            stroke="#BCBDB4"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Stride Impulse Curve */}
          <path
            d="M 0 70 C 60 70, 80 115, 110 40 C 130 -10, 160 70, 200 70 C 230 70, 240 115, 255 36 C 270 -12, 300 70, 350 70 C 380 70, 395 115, 405 38 C 420 -8, 450 70, 500 70 C 530 70, 540 115, 550 36 C 565 -12, 580 70, 600 70"
            stroke="#DE857A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Footstrike Peak Markers */}
          {STEP_PEAKS.map((peak, idx) => (
            <g key={idx}>
              <circle cx={peak.cx} cy={peak.cy} r="4" fill="#8652A4" />
              <circle
                cx={peak.cx}
                cy={peak.cy}
                r="8"
                stroke="#DE857A"
                strokeWidth="1.5"
                opacity="0.7"
              />
            </g>
          ))}
        </svg>
      </div>
    </article>
  );
}

/**
 * Bottom attribution footer with composer Dhani link and developer GitHub links
 */
function AttributionFooter() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[#BCBDB4]/30">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <span className="font-wordmark font-black italic text-[20px] text-[#15151F]">
          STRADIO
        </span>
        <span className="hidden sm:inline-block text-[#BCBDB4]">·</span>
        {/* Music Composer Attribution */}
        <a
          href="https://www.instagram.com/ddhann.wav/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 bg-[#15151F] text-white px-3.5 py-1.5 rounded-full font-sans font-medium text-[12px] sm:text-[13px] hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm border border-white/10 hover:border-[#BA617B]/60"
          aria-label="Composed by Dhani on Instagram"
        >
          <svg
            className="w-3.5 h-3.5 fill-current text-[#BA617B] group-hover:text-[#DE857A] transition-colors"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>composed by Dhani</span>
          <span className="text-[10px] text-white/60 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>

      {/* Dual Developer GitHub Attributions */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2.5">
        <span className="font-sans font-semibold text-[10px] tracking-[0.16em] uppercase text-[#171918]/60">
          Engineered by Developers
        </span>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/dandy63609"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-[#15151F] text-white px-4 py-2 rounded-full font-sans font-medium text-[13px] hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm border border-white/10 hover:border-[#DE857A]/50"
            aria-label="Dandy's GitHub Profile"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>@dandy63609</span>
            <span className="text-[10px] text-white/60 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
          <a
            href="https://github.com/Yogs4R"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-[#15151F] text-white px-4 py-2 rounded-full font-sans font-medium text-[13px] hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm border border-white/10 hover:border-[#A273AF]/50"
            aria-label="Yogs4R's GitHub Profile"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>@Yogs4R</span>
            <span className="text-[10px] text-white/60 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * 100% edge-to-edge full bleed wave footer asset
 */
function EdgeToEdgeFluidWave() {
  return (
    <div
      className="w-full min-w-full relative flex items-end mt-10 sm:mt-14 pointer-events-none select-none overflow-hidden"
      style={{ transform: "translateX(0px) translateY(0px)" }}
    >
      <img
        src="/assets/images/custom_design_footer.png"
        alt="STRADIO Fluid Wave"
        className="w-full min-w-full h-auto object-cover object-top block"
      />
    </div>
  );
}
