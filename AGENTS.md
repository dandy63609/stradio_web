# AGENTS.md — STRADIO Website (`stradio_web`)

> **Project:** STRADIO Website (Conversion & Experience Landing Page)  
> **Tagline:** Run the Vibe.  
> **Core Concept:** Movement becomes music.  
> **Primary Goal:** Convert visitors into Android APK testers through an authentic athletic, Warm Studio scrollytelling web experience.

---

## 1. Required Reading Order for Every AI Agent

Before writing or modifying any UI, CSS, or animation code in `stradio_web`, you **MUST** read:

1. [`design-plans/02-apple-design-redesign-architecture.md`](design-plans/02-apple-design-redesign-architecture.md) — 1:1 visual breakdown of `Making_web_version_868f5dae_2K.jpg` (Desktop) and `Redesigning_page_UI_elements_bb4a02f5_2K.jpg` (Mobile).
2. [`plans/011-apple-design-redesign-and-fluid-physics.md`](plans/011-apple-design-redesign-and-fluid-physics.md) — Two-Phase 120vh sticky container, 36-frame WebP canvas rendering, and critically damped Apple spring physics.
3. [`docs/01-brand-system.md`](docs/01-brand-system.md) — Locked hex palette (`Midnight #191923`, `Warm Ivory #FAF8F5`, `Sonic Coral #FF765F`, `Rhythm Violet #A595DB`, `Deep Violet #4B3D8E`) and `Sora` + `Inter` typography.

---

## 2. Design-First Workflow (Pencil `pen.dev`)

**NEVER** invent or improvise UI layouts directly in React/Tailwind code without visual sign-off:

1. **Pull Design Context:** Read tokens from `docs/01-brand-system.md` and reference images in `docs/references/`.
2. **Visual Prototyping in Pencil (`pen.dev`):** Iterate scenes on the canvas first so Dandy can verify typography, spacing, and proportions.
3. **1:1 Code Translation:** Translate approved Pencil frames directly into `src/sections/` and `src/components/`.

---

## 3. Non-Negotiable Guardrails

1. **Warm Studio Aesthetic:** Strictly use `#FAF8F5` (`#F8F0E6`) studio cyclorama tone. Zero pitch-black dark mode, zero muddy gradients.
2. **Authentic Cinematography (No AI Slop / No Sci-Fi VFX):** Never add glowing vein overlays, synthetic lasers, or game-loading HUD clutter. Use only the natural athletic runner footage and brand graphic language.
3. **Zero-Lag Scrollytelling:** Scroll drives the 36-frame WebP stride sequence via 1:1 direct manipulation (`requestAnimationFrame`) with zero video seeking latency.
4. **Spring Physics (`/apple-design`):** All sheets and modals use critically damped springs (`damping: 1.0, response: 0.35`) and 1:1 touch/pointer tracking.

---

## 4. Scrollytelling Debugging Protocol (`scrollytelling-ui-debugger`)

When Dandy gives a brief or shorthand debug request (e.g. *"fix first frame"*, *"runner is off"*, *"mobile text wrapped"*), the agent **MUST**:

0. **Ask a Direct Clarifying Question on Dual-Meaning Terms:** Whenever a term could mean either the **Animation Timeline** (0% scroll vs 100% scroll) or the **Figma Canvas Artboards** (artboard A vs artboard B), ask directly: *"Do you mean [Timeline State] or [Figma Canvas Artboard]?"* without guessing or adding a biased `(Recommended)` tag.
1. **Never Assume Static Mockups Mean Initial Load:** In Figma, static screenshots often display full copy for presentation. The web app's First Frame (`0% scroll`) is **pure immersion: runner only, zero UI clutter**.
2. **Deconstruct Into the 3-Phase State Contract:**
   - **Phase 0 (0% Scroll / First Frame):** Only runner visible, centered, subtle scroll cue. All UI hidden.
   - **Phase 1 (1% – 79% Scroll):** Runner scrubs stride frames 1 to 48 while gliding to its settled corridor.
   - **Phase 2 (80% – 100% Scroll / Settled Frame):** Runner locks at footstrike; full Figma UI cascades in.
3. **Present the Deconstructed State Matrix for 1-Word Confirmation (`"Confirm"`) before writing code.**
4. **Run Playwright Visual Tests (`npm run test:visual`) after every change to produce screenshot evidence.**
