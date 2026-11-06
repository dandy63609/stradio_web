# UI Contract Guard & Visual Regression Prevention

This project enforces strict visual invariants to prevent "whack-a-mole" UI regressions.
Whenever modifying layout, CSS, canvas calculations, or scroll animations in `src/sections/HeroTransformationSection.jsx` or `src/animations/RunnerCanvasScrubber.jsx`:

## 1. Visual Invariant Contracts
- **0% Scroll (Immersion State)**:
  - The runner subject must be dead-center in the viewport on both Mobile (390px) and Desktop (1440px).
  - Floating indicator ("Scroll to explore") is centered at bottom.
  - No settled text, cards, or grid UI visible.
- **100% Scroll (Settled State)**:
  - Layout must match Figma 1:1.
  - Desktop: 2-column layout (Left: title + subtitle + cards, Right: runner docked in 560x560 canvas).
  - Mobile: Left-aligned layout with docked runner on the left, typography and CTA properly stacked.

## 2. Mandatory Verification Step
Before delivering any UI or animation task, execute:
```bash
npm run test:visual
```
All 6 Playwright tests must pass. If any test fails, do NOT ship or claim completion until resolved.

## 3. Snapshot Updates
Only update baseline snapshots when an intentional redesign was requested by the user:
```bash
npm run test:visual:update
```
