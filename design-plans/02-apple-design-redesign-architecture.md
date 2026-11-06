# Design Plan 02: STRADIO Warm Studio Scrollytelling Architecture (`/apple-design` + `/animation-vocabulary`)

**Date:** 2026-11-05  
**Author:** Antigravity (`/apple-design`, `/animation-vocabulary`, `/plan`, `/grill-me`)  
**Status:** Visual Prototype in `pen.dev` (`untitled.pen`) — Awaiting Final Code Implementation  
**Canvas Reference:** [untitled.pen](file:///C:/Users/PC/.pencil/documents/434f9cad-1140-4fcb-89c9-277e81803cf0/untitled.pen)

---

## 1. Executive Summary & Design Pivot

Following Dandy's direct instruction and provided benchmark assets:
- **Desktop Benchmark:** `C:\Users\PC\Downloads\Making_web_version_868f5dae_2K.jpg`
- **Mobile Benchmark:** `C:\Users\PC\Downloads\Redesigning_page_UI_elements_bb4a02f5_2K.jpg`
- **Natural Stride Cinematography:** `C:\Users\PC\Downloads\Person_running_naturally_23e1f059_1080p.mp4`

All previous dark-mode / complex VFX / neon muscle-vein concepts are completely decommissioned. The STRADIO web experience pivots 100% to a **Warm Studio Cyclorama Aesthetic (`#FAF8F5`)**, focusing on athletic cinematography, direct-manipulation scroll scrubbing, and Apple-grade minimalist restraint.

---

## 2. Interaction Model & Motion Architecture (`/animation-vocabulary`)

```mermaid
flowchart TD
    A["Initial Load (Scroll 0%)<br/>• Full-Bleed Runner Frame 0 (scale: 1.25)<br/>• Warm Studio Cyclorama (#FAF8F5)<br/>• Zero UI, Zero Buttons<br/>• Minimalist Hairline Down-Arrow ('Scroll to explore')"] 
    -->|Scroll 0% to 60% (Phase 1: Direct Scrub)| B["Phase 1: Direct Manipulation Scrub<br/>• Continuity Transition: scale(1.25 -> 1.0)<br/>• Desktop: translates from center to left column (w: 48%)<br/>• Mobile: settles into upper-half framing<br/>• Video Stride: scrubs 0.0s to 1.5s (Footstrike contact)<br/>• Guide arrow fades out within first 10%"]
    B -->|Scroll 60% to 100% (Phase 2: UI Cascade)| C["Phase 2: Staggered Scroll Reveal<br/>• Top Nav slides down (translateY: -20px -> 0, opacity: 0 -> 1)<br/>• Headline ('Run the Vibe.') + Brand underline slide up<br/>• Description, CTA button, and 3 Value Pillars dock into place<br/>• Mobile: 3 distinct cards + 'FIND YOUR RHYTHM' sticker reveal"]
    C -->|Scroll > 100%| D["Section 2: Unlocked Page Flow<br/>• Page unlocks for normal downward vertical scrolling into Architecture Stage"]
```

### Motion Terminology & Specifications:
1. **Initial Immersion State (`Scroll 0%`):**
   - The user lands on a completely clean screen showing only the runner at Frame 0 on the warm off-white studio cyclorama (`#FAF8F5`).
   - Zero UI clutter: No navigation bar, no headline, no CTA button.
   - A single minimalist down-arrow with a gentle vertical float loop (`translateY: 0 -> 6px -> 0`, 2s `ease-in-out`) and a faint micro-label `"Scroll to explore"` at bottom center guides the visitor. Fades out completely (`opacity: 0`) within the first 10% of scroll.
2. **Two-Phase 120vh Runway:**
   - **Phase 1 (`0% – 60% scroll`):** The scroll gesture directly scrubs the runner's stride forward (0.0s to 1.5s in the natural video, 36 WebP frames) while simultaneously executing a **Continuity Transition** (`scale: 1.25 -> 1.0` and translation to the left half on desktop / upper-half on mobile). Reversing scroll rewinds the stride.
   - **Phase 2 (`60% – 100% scroll`):** The runner locks at completed footstrike; the UI elements cascade into place via an Apple-style **Staggered Scroll Reveal** (`translateY: 20px -> 0px`, `opacity: 0 -> 1` with a `40ms` stagger).
   - **Post-100%:** The sticky container unpins and the page scrolls naturally into Section 2.

---

## 3. Visual Layout Specifications

### Color & Material Tokens
| Semantic Token | Value | Role |
| :--- | :--- | :--- |
| `--color-ivory` | `#FAF8F5` | Warm studio cyclorama background & card fills |
| `--color-midnight` | `#191923` | Primary display headlines, body text, and solid CTA pills |
| `--color-coral` | `#FF765F` | Primary brand accent: CTA arrow, gradient underline end, pillar 01 icon |
| `--color-violet` | `#A595DB` | Secondary brand accent: gradient underline start, pillar 02 icon |
| `--color-deep-violet` | `#4B3D8E` | Mobile `01 / START NOW` pill badge & sticker tones |

### Desktop Specification (`Making_web_version_868f5dae_2K.jpg`)
- **Left Column (`48% width`):** Natural human runner from `Person_running_naturally_23e1f059_1080p.mp4` running on seamless `#FAF8F5`.
- **Top Navigation Bar:** 
  - Left: Official 3D S-Logo (`stradio-3d-s-logo.png`) + `STRADIO` wordmark in Sora 800 Italic.
  - Center/Right: `ABOUT`, `FEATURES`, `COMMUNITY` links + `Download App` black pill button (`#191923`).
- **Right Column (`52% width`):**
  - Display headline: `Run the Vibe.` in Sora 800 Italic with a sleek horizontal gradient underline (`#A595DB` to `#FF765F`).
  - Subhead: `Movement becomes music.` in elegant serif/sans italic.
  - Body text: `STRADIO is a movement-powered music experience that turns every step into your soundtrack.`
  - CTA button: `Get the App ->` solid black pill button with Kinetic Coral arrow.
- **Floor Level:** 3 Value Pillars placed directly on the floor plane with vertical hairline dividers:
  1. `Step Detection with precision` (Coral dot `#FF765F`)
  2. `Adaptive Music in real-time` (Violet star `#A595DB`)
  3. `Lightweight and seamless` (Coral bolt `#FF765F`)
- **Footer:** Bottom signature rule `STRADIO` — `A MOVEMENT-POWERED MUSIC EXPERIENCE | 02`.

### Mobile Specification (`Redesigning_page_UI_elements_bb4a02f5_2K.jpg`)
- **Top Chrome:** 3D S-Logo + `STRADIO` + `Download App` pill.
- **Upper Center:** Natural runner settled into position with natural floor shadow.
- **Content Stack:**
  - `01 / START NOW` violet pill tag.
  - `Run the Vibe.` + `Movement becomes music.` + description.
  - `Get the App ->` black CTA pill.
- **Brand Sticker:** `FIND YOUR RHYTHM` circular badge floating beside the runner.
- **Bottom Pillars:** 3 distinct floating white cards with colored badge pills (`01`, `02`, `03`):
  - Card 01: `Step Detection with precision` (Coral icon `#FF765F`)
  - Card 02: `Adaptive Music in real-time` (Violet icon `#A595DB`)
  - Card 03: `Lightweight and seamless` (Black icon `#191923`)
- **Corner Accent:** 05 Graphic Language wave ribbon corner accent in bottom-right corner.
- **Footer:** `STRADIO` — `A MOVEMENT-POWERED MUSIC EXPERIENCE`.
