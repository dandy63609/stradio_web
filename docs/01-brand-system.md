# 01 — STRADIO Brand Identity System, Graphic Language & Assets

> **Primary Source of Truth:** `STRADIO BRAND IDENTITY SYSTEM & VISUAL GUIDELINES` (`01`–`11`)  
> **Brand Overview (`01`):** `Stride + Audio — Movement becomes music` | Tagline: `RUN THE VIBE.`  
> **Figma Layout Reference:** `E7PGUJEDY1ojG07XMcWIKY` (Desktop `3:479`, Portrait `7:328`)  
> **Canva Board (`DAHZdeIrIm8`):** [`docs/references/canva-brand-board.png`](references/canva-brand-board.png)

---

## 1. Official Brand Identity System (`01`–`11`)

### `02 LOGO SYSTEM`
- **Primary Lockup:** 3D sculpted canyon-wave **`S` symbol** (`public/assets/images/brand/s-logo-3d.png`) paired horizontally with **`STRADIO`** in **`Sora` ExtraBold Italic** (`tracking-[0.06em]`) and optional sub-caption `RUN THE VIBE` (`tracking-[0.35em]`).
- **Monochrome Lockup:** Solid Warm Ivory (`#F5F0EB`) or Midnight (`#191923`) silhouette of the sculpted `S` mark (`s-logo-mono-light.png` / `s-logo-mono-dark.png`) + `STRADIO` wordmark.
- **Wordmark Only (`STRADIO ONLY`):** Used in the bottom footer signature bar (`Sora` ExtraBold Italic, never auto-traced `Michroma`).
- **Logo Clear Space (`11 BRAND GUIDELINES`):** Maintain `1x` cap-height clear space around the `STRADIO` wordmark and `S` symbol; never stretch, outline, or place low-contrast neon effects behind the mark.

### `03 COLOR PALETTE` & Brand Gradients
| Token Name | Hex | Role in Brand System (`03`) |
| :--- | :--- | :--- |
| **Midnight** | `#191923` | Primary dark background, deep wave shadow strata, Light Mode typography |
| **Warm Ivory** | `#F5F0EB` | Light Mode (Scroll `0%`) canvas background, primary dark-mode headline & wordmark fill |
| **Sonic Coral** | `#FF765F` | Primary kinetic energy accent, step-lock peaks, and gradient terminus |
| **Rhythm Violet** | `#A595DB` | Secondary melodic wave accent, ambient waveform & sub-headers |
| **Supporting Violet** | `#4B3D8E` | Deep harmonic strata, card glow, and mid-tone gradient bridge |

**Official Brand Gradients (`03 COLOR PALETTE` bottom row):**
1. **Deep Midnight → Supporting Violet:** `linear-gradient(135deg, #191923 0%, #4B3D8E 100%)`
2. **Supporting Violet → Sonic Coral:** `linear-gradient(135deg, #4B3D8E 0%, #A595DB 45%, #FF765F 100%)`
3. **Sonic Coral → Warm Amber-Coral:** `linear-gradient(135deg, #A595DB 0%, #FF765F 60%, #FF9468 100%)`

### `04 TYPOGRAPHY`
- **Header Font — `Sora` (`Bold` / `ExtraBold` / `ExtraBold Italic`):**
  - Used for the `STRADIO` wordmark, hero display headlines (`Run the Vibe.`), section headers (`Engineered for Your Stride.`), and feature card titles.
- **Body Font — `Inter` (`Regular` / `Medium` / `SemiBold`):**
  - Clean, high-legibility geometric sans-serif used for body copy, navigation links (`ABOUT`, `FEATURES`, `COMMUNITY`), technical telemetry labels, and UI controls.

### `05 GRAPHIC LANGUAGE` (Layered Canyon-Wave Ribbons)
- STRADIO's visual signature is **sculpted, flowing topographic soundwave/canyon ribbons** layered in Midnight (`#191923`), Supporting Violet (`#4B3D8E`), Rhythm Violet (`#A595DB`), and Sonic Coral (`#FF765F`)—echoing the 3D contours of the `S` mark.
- **Strict Do/Don't (`11 BRAND GUIDELINES`):** Never use generic blurry 2D neon circles or unbranded glitter effects. Always use the organic multi-layered canyon-wave ribbons (`public/assets/images/brand/graphic-waves-feathered.png` and SVG/Canvas wave strata) behind the transformed runner and in section transitions.

### `08 DIGITAL PRODUCT` (App UI & Waveform Cards)
- App player cards and audio visualizations use a **Sunset Coral-to-Violet gradient surface** (`linear-gradient(135deg, #4B3D8E 0%, #A595DB 42%, #FF765F 100%)`) with crisp vertical symmetrical soundwave bars and `#191923` Midnight framing.

---

## 2. Extracted Brand & Figma Assets (`public/assets/images/`)

| File Path | Source | Description |
| :--- | :--- | :--- |
| [`brand/s-logo-3d.png`](../public/assets/images/brand/s-logo-3d.png) | Brand Sheet `02` | High-res 3D sculpted canyon-wave `S` logo (transparent PNG) |
| [`brand/s-logo-graphic.png`](../public/assets/images/brand/s-logo-graphic.png) | Brand Sheet `02` | Flat graphic canyon-wave `S` logo |
| [`brand/s-logo-mono-light.png`](../public/assets/images/brand/s-logo-mono-light.png) | Brand Sheet `02` | Monochrome `#F5F0EB` `S` mark |
| [`brand/s-logo-mono-dark.png`](../public/assets/images/brand/s-logo-mono-dark.png) | Brand Sheet `02` | Monochrome `#191923` `S` mark |
| [`brand/graphic-waves-feathered.png`](../public/assets/images/brand/graphic-waves-feathered.png) | Brand Sheet `05` | Feathered `05 GRAPHIC LANGUAGE` layered canyon-wave ribbons |
| [`brand/digital-product-phones.png`](../public/assets/images/brand/digital-product-phones.png) | Brand Sheet `08` | `08 DIGITAL PRODUCT` mobile UI screens reference |
| [`brand/runner-clean-black.png`](../public/assets/images/brand/runner-clean-black.png) | Scene 01 Cutout | Clean 100% black-shorts & black-shoes runner cutout for Light Mode start |
| [`icon-step-detection.svg`](../public/assets/images/icon-step-detection.svg) | Figma `3:502` | Running shoe with motion lines (`Step Detection`) |
| [`icon-adaptive-music.svg`](../public/assets/images/icon-adaptive-music.svg) | Figma `3:509` | Symmetrical vertical soundwave bars (`Adaptive Music`) |
| [`icon-lightweight.svg`](../public/assets/images/icon-lightweight.svg) | Figma `3:516` | Monochrome lightning bolt outline (`Lightweight`) |
| [`icon-arrow-right.svg`](../public/assets/images/icon-arrow-right.svg) | Figma `3:499` | Right arrow inside `Get the App` pill button |
