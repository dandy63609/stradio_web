import React, { useEffect, useRef } from "react";

const TOTAL_FRAMES = 48;

// ===================================================================
// 📱 MOBILE CONTROLS (Screens < 1024px / Phone / Mobile View):
// ===================================================================
export const MOBILE_RUNNER_CONFIG = {
  FIRST_FRAME_SIZE: 1.6, // Size at 0% scroll
  FIRST_FRAME_Y: 0,      // Pixels from top at 0% scroll
  LAST_FRAME_SIZE: 1.3,  // Runner size at end (100% scroll / SETTLED)
  LAST_FRAME_X: -20,     // Horizontal offset (negative moves left, positive moves right)
  LAST_FRAME_Y: -1,      // Vertical offset (negative moves up, positive moves down)
  HEIGHT_RATIO: 0.65,    // Canvas height fraction
  MAX_HEIGHT: null,
};

// ===================================================================
// 💻 DESKTOP CONTROLS (Screens >= 1024px / Standard 100% Zoom):
// ===================================================================
export const DESKTOP_RUNNER_CONFIG = {
  FIRST_FRAME_SIZE: 1.5, // Size at 0% scroll
  FIRST_FRAME_Y: 0,      // Pixels from top at 0% scroll
  LAST_FRAME_SIZE: 1.4,  // Runner size at end (100% scroll / SETTLED)
  LAST_FRAME_X: 290,     // Horizontal offset
  LAST_FRAME_Y: 0,       // Vertical offset
  HEIGHT_RATIO: 0.72,    // Canvas height fraction
  MAX_HEIGHT: 750,       // Max height clamp in pixels
};

/**
 * Calculates frame position and size given the device config and ease progress
 */
function getFrameCoordinates(config, cw, ch, imgAspect, easeVal) {
  const currentSize =
    (1 - easeVal) * config.FIRST_FRAME_SIZE + easeVal * config.LAST_FRAME_SIZE;
  const baseHeight = config.MAX_HEIGHT
    ? Math.min(ch * config.HEIGHT_RATIO, config.MAX_HEIGHT)
    : ch * config.HEIGHT_RATIO;
  const dh = baseHeight * currentSize;
  const dw = dh * imgAspect;

  const dy = (1 - easeVal) * config.FIRST_FRAME_Y + easeVal * config.LAST_FRAME_Y;
  const startX = (cw - dw) / 2;
  const endX = config.LAST_FRAME_X;
  const dx = (1 - easeVal) * startX + easeVal * endX;

  return { dx, dy, dw, dh };
}

// Global image cache: preloaded once so images stay in memory across fast refresh and device resizing
const globalImageCache = new Array(TOTAL_FRAMES);
let globalImagesPreloaded = false;

function preloadGlobalImages() {
  if (globalImagesPreloaded || typeof window === "undefined") return;
  globalImagesPreloaded = true;
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    const padNum = String(i).padStart(2, "0");
    img.src = `/assets/runner-frames/frame_${padNum}.webp`;
    globalImageCache[i - 1] = img;
  }
}

if (typeof window !== "undefined") {
  preloadGlobalImages();
}

/**
 * High-performance 120fps HTML5 Canvas Runner Frame Scrubber.
 * Preloads 48 WebP frames into memory and paints via requestAnimationFrame
 * without triggering React re-renders during scroll.
 */
export default function RunnerCanvasScrubber({
  progressRef,
  runnerEaseRef,
  className = "",
  layoutMode = "desktop", // 'desktop' | 'mobile'
  style = {},
}) {
  const canvasRef = useRef(null);
  const lastDrawnFrameRef = useRef(-1);
  const lastEaseRef = useRef(-1);

  useEffect(() => {
    let isCancelled = false;
    preloadGlobalImages();

    // Reset frame tracking on every render/hot-reload so any number changes update immediately
    lastDrawnFrameRef.current = -1;
    lastEaseRef.current = -1;

    function drawFrame(frameIndex, easeVal = 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = globalImageCache[frameIndex - 1];
      if (!img || !img.complete) {
        if (img) {
          img.onload = () => {
            if (!isCancelled) {
              drawFrame(frameIndex, easeVal);
            }
          };
        }
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;
      if (cw <= 0 || ch <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (
        canvas.width !== Math.round(cw * dpr) ||
        canvas.height !== Math.round(ch * dpr)
      ) {
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(ch * dpr);
      }

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const config =
        layoutMode === "mobile" ? MOBILE_RUNNER_CONFIG : DESKTOP_RUNNER_CONFIG;
      const { dx, dy, dw, dh } = getFrameCoordinates(
        config,
        cw,
        ch,
        imgAspect,
        easeVal
      );

      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
      lastDrawnFrameRef.current = frameIndex;
      lastEaseRef.current = easeVal;
    }

    // Set canvas internal resolution based on devicePixelRatio
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        const currentP =
          progressRef && progressRef.current !== undefined
            ? progressRef.current
            : 0;
        const currentFrame =
          1 + Math.round(Math.max(0, Math.min(1, currentP)) * (TOTAL_FRAMES - 1));
        const currentEase =
          runnerEaseRef && runnerEaseRef.current !== undefined
            ? runnerEaseRef.current
            : 0;
        drawFrame(currentFrame, currentEase);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Force immediate initial paint of the current frame on mount or code change
    const initP =
      progressRef && progressRef.current !== undefined
        ? progressRef.current
        : 0;
    const initFrame =
      1 + Math.round(Math.max(0, Math.min(1, initP)) * (TOTAL_FRAMES - 1));
    const initEase =
      runnerEaseRef && runnerEaseRef.current !== undefined
        ? runnerEaseRef.current
        : 0;
    drawFrame(initFrame, initEase);

    let rafId;
    const tick = () => {
      if (progressRef && progressRef.current !== undefined) {
        const p = Math.max(0, Math.min(1, progressRef.current));
        const targetFrame = 1 + Math.round(p * (TOTAL_FRAMES - 1));
        const easeVal =
          runnerEaseRef && runnerEaseRef.current !== undefined
            ? runnerEaseRef.current
            : 0;

        if (
          targetFrame !== lastDrawnFrameRef.current ||
          Math.abs(easeVal - lastEaseRef.current) > 0.001
        ) {
          drawFrame(targetFrame, easeVal);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [progressRef, runnerEaseRef, layoutMode]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none pointer-events-none ${className}`}
      style={style}
    >
      {/* 120fps Hardware-Accelerated Canvas */}
      <canvas
        ref={canvasRef}
        id="runner-canvas"
        className="w-full h-full pointer-events-none select-none"
      />
    </div>
  );
}
