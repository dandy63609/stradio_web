# Plan 011: Warm Studio Scrollytelling Redesign, Natural Stride Video & Fluid Physics (`/apple-design` + `/animation-vocabulary`)

**Status:** Planned & Verified on `pen.dev`  
**Design Spec:** [design-plans/02-apple-design-redesign-architecture.md](../design-plans/02-apple-design-redesign-architecture.md)  
**Pencil File:** [untitled.pen](file:///C:/Users/PC/.pencil/documents/434f9cad-1140-4fcb-89c9-277e81803cf0/untitled.pen)  
**Supersedes:** All previous dark-mode / neon-vein / sci-fi VFX plans.

---

## 1. Scope & Objective

Implement the complete redesign of the STRADIO web application based on Dandy's provided visual benchmarks:
- **Desktop Reference:** `C:\Users\PC\Downloads\Making_web_version_868f5dae_2K.jpg`
- **Mobile Reference:** `C:\Users\PC\Downloads\Redesigning_page_UI_elements_bb4a02f5_2K.jpg`
- **Natural Stride Video:** `C:\Users\PC\Downloads\Person_running_naturally_23e1f059_1080p.mp4`

---

## 2. Technical Implementation Architecture

### A. 36-Frame Zero-Lag WebP Pipeline
- Extract 36 stride frames (0.0s to 1.5s, 1 full stride cycle) from `Person_running_naturally_23e1f059_1080p.mp4` into `src/assets/runner-frames/frame_00.webp` through `frame_35.webp`.
- Frame 0 serves as the instant LCP poster image.
- A zero-re-render HTML5 `<canvas>` (or hardware-composited `<img>`) draws the appropriate frame based on scroll progress via DOM refs and `requestAnimationFrame`.

### B. Two-Phase 120vh Sticky Hero Container (`src/sections/HeroScrollytelling.tsx`)
- Container height: `220vh` total (`120vh` sticky scrub distance + `100vh` settled content).
- **Initial State (0% scroll):**
  - Runner at Frame 0, centered, `scale: 1.25`, filling the entire viewport.
  - Zero UI elements: No navbar, no headline, no CTA button.
  - Floating hairline down-arrow ("Scroll to explore") at bottom center.
- **Phase 1 (0% to 60% scroll):**
  - Floating arrow fades to 0 opacity by 10% scroll.
  - Runner video scrubs from Frame 0 to Frame 35 (footstrike ground impact).
  - Runner scales down from `1.25` to `1.0` and translates to the left column (Desktop: `x: 0%` to `48%` width; Mobile: upper half `h: 52vh`).
- **Phase 2 (60% to 100% scroll):**
  - Runner locks in place at Frame 35.
  - Top navigation bar slides down (`translateY: -20px -> 0px`, `opacity: 0 -> 1`).
  - Headline, subhead, body copy, and CTA pill slide up (`translateY: 24px -> 0px`, `opacity: 0 -> 1`).
  - 3 Value Pillars dock into place (Desktop: directly on the floor with dividers; Mobile: 3 distinct floating cards + `FIND YOUR RHYTHM` sticker).
- **Post-100%:** Page unpins cleanly and flows into Section 2.

### C. Top Navigation Bar (`src/components/Navbar.tsx`)
- Official 3D S-Logo (`public/assets/images/stradio-3d-s-logo.png`) + `STRADIO` wordmark.
- Desktop links: `ABOUT`, `FEATURES`, `COMMUNITY`.
- Action: Solid black `Download App` pill button (`#191923`) wired to the APK sheet.

### D. Section 2 Warm Studio Theme (`src/sections/SensorArchitectureSection.tsx`)
- Updated to `#FAF8F5` background with clean white cards and brand-accented waveforms.

### E. Spring-Physics APK Download Sheet (`src/components/ApkDownloadSheet.tsx`)
- Frosted glass sheet driven by critically damped spring physics (`damping: 1.0, response: 0.35`) and 1:1 pointer tracking.
