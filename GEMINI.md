# Project Guidelines & UI Invariant Guard

## Visual Regression Testing Contract
This project uses Playwright Visual Regression Testing to protect layout invariants.
Whenever you make any changes to UI components, layout, or animations:

1. Always run `npm run test:visual` to ensure no visual regressions across desktop (1440x900) and mobile (390x844).
2. The UI has two key invariant states that must never be broken:
   - **Initial Immersion (0% scroll)**: Runner subject centered in viewport on both desktop and mobile.
   - **Settled State (100% scroll)**: Layout matches Figma design 1:1.
3. If an intentional redesign is made, update baseline snapshots with `npm run test:visual:update`.
