# 04 — Architecture, Mobile Performance & Responsive Behavior

---

## 1. Repository Directory Structure (`stradio_web`)

```text
stradio_web/
├── README.md
├── AGENTS.md                          # Website agent rules & Design-First workflow
│
├── docs/
│   ├── 01-brand-system.md             # Locked hex palette, typography & UI rules
│   ├── 02-storyboard-scenes.md        # Scene 01, Scene 02 & Scene 03 specifications
│   ├── 03-motion-vfx-specs.md         # Scroll timeline, dual-video VFX handoff & prompt
│   ├── 04-implementation-perf.md      # Architecture, Android performance & responsive spec
│   └── references/                    # Visual ground-truth mockups & exported Frame 135
│       ├── canva-brand-board.png
│       ├── canva-webui-board.png
│       ├── scene-01-light-reference.png
│       ├── scene-02-dark-ui-reference.png
│       └── frame_135_midnight_base.png
│
├── public/
│   ├── stradio.apk                    # Direct Android MVP APK download
│   └── assets/
│       ├── images/                    # S-ribbon logo SVG/PNG, poster & OG share image
│       ├── videos/                    # runner_1080.webm, runner_720.webm, runner_vfx_loop.mp4
│       └── audio/                     # vibe-track.m4a (165 BPM ambient loop)
│
├── src/
│   ├── components/                    # Reusable UI atoms (Navbar, AudioVibePlayer, DownloadModal, BrandLogo)
│   ├── sections/                      # Page sections (HeroTransformationSection, MusicSensorSection)
│   ├── animations/                    # Motion layers (VideoScrubber, VfxLoopLayer, SensorWaveVisualizer)
│   ├── hooks/                         # Custom hooks (useLenisScroll, useScrollProgress)
│   └── styles/                        # index.css & --t theme variables
│
└── tests/                             # Smoke & layout verification tests
```

---

## 2. Mobile Performance Budget (Android Chrome Priority)

1. **Zero Heavy WebGL Shaders on Mobile:**
   * All complex visual effects (glowing muscle transformation, orbiting particles, sonic light ribbons, smoke mist) are pre-rendered into hardware-decoded video streams (`<video muted playsInline>`).
2. **Adaptive Video Resolution Selection:**
   * Devices with `navigator.deviceMemory <= 4` or `navigator.hardwareConcurrency <= 4` automatically load `runner_720.webm` (`~2.1 MB`).
   * Standard devices load `runner_1080.webm` (`~3.9 MB`).
3. **Zero React Re-Renders on Scroll:**
   * Scroll progress (`p`) and theme interpolation (`--t`) are written directly to DOM refs and CSS custom properties inside `requestAnimationFrame`—React `useState` is never called at 60Hz during scroll.

---

## 3. Responsive Layout Rules (Android Portrait vs. Windows Desktop)

* **Android Portrait (`< 768px` — Primary Conversion Target):**
  * 1:1 match to [`docs/references/scene-02-dark-ui-reference.png`](references/scene-02-dark-ui-reference.png).
  * Runner fills the vertical stage (`top: 0`), with the `Run the Vibe.` + solid white `[ Get the App → ]` pill positioned in the left negative space next to the runner's hip/thigh, the 3 monochrome line-icon pillars (`Step Detection | Adaptive Music | Lightweight`) across the lower dock, and `STRADIO — A MOVEMENT-POWERED MUSIC EXPERIENCE` along the bottom edge.
* **Windows Desktop (`>= 1024px`):**
  * Preserves the exact same minimal editorial aesthetic from `scene-02-dark-ui-reference.png` (no cluttered side boxes or dashboard cards)—scaling the typography, generous margins, and centered 3-column bottom pillars cleanly across the widescreen stage.
