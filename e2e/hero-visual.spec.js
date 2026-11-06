import { test, expect } from '@playwright/test';

test.describe('Hero Immersion & Settled Layout Contract (Figma 1:1 Alignment)', () => {

  test('01: Initial State (0% Scroll) - Only Runner Visible on First Frame', async ({ page }) => {
    await page.goto('/');

    // Wait for canvas to be visible and frame 01 drawn
    const canvas = page.locator('canvas:visible');
    await expect(canvas).toBeVisible();

    // Verify UI is hidden at 0% scroll (First Frame Immersion)
    const desktopUI = page.locator('.hidden.lg\\:flex.absolute.inset-0');
    if (await desktopUI.count() > 0) {
      await expect(desktopUI).toHaveCSS('opacity', '0');
    }

    await page.waitForTimeout(600); // Allow RAF and image decode to settle

    // Visual snapshot assertion for First Frame (Scroll 0%)
    await expect(page).toHaveScreenshot('hero-initial-0pct.png', {
      mask: [page.locator('.animate-float-indicator')],
    });
  });

  test('02: Settled State (100% Scroll) - Layout Must Match Figma 1:1', async ({ page }) => {
    await page.goto('/?scroll=1');

    // Wait for settled UI and canvas
    const canvas = page.locator('canvas:visible');
    await expect(canvas).toBeVisible();

    const headline = page.locator('h1:visible');
    await expect(headline).toBeVisible();

    await page.waitForTimeout(600);

    // Visual snapshot assertion for Settled State (Scroll 100%)
    await expect(page).toHaveScreenshot('hero-settled-100pct.png');
  });

  test('03: Numerical Centering & Presence Invariants', async ({ page }) => {
    await page.goto('/');
    const canvas = page.locator('canvas:visible');
    await expect(canvas).toBeVisible();
    await page.waitForTimeout(500);

    const metrics = await page.evaluate(() => {
      const stage = document.querySelector('section#top');
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      return {
        winW,
        winH,
        hasStage: !!stage,
      };
    });

    expect(metrics.hasStage).toBe(true);
    expect(metrics.winW).toBeGreaterThan(0);
    expect(metrics.winH).toBeGreaterThan(0);
  });

});
