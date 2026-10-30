import { expect, test, type Locator, type Page } from "@playwright/test";

/** The CSS animation on an element: its name, duration and delay. */
function animation(locator: Locator) {
  return locator.evaluate((el) => {
    const style = getComputedStyle(el);
    return { name: style.animationName, duration: style.animationDuration, delay: style.animationDelay };
  });
}

/** Where the Combination's Ingredients show: the tray's rows on desktop, the bar's drawings on a phone. */
function trayItems(page: Page, isMobile: boolean) {
  // On a phone, each drawing's wrapper, which carries the animation.
  return isMobile ? page.locator(".tray-bar [aria-hidden=true] >> xpath=..") : page.locator(".tray-panel li");
}

for (const reduced of [false, true]) {
  test.describe(reduced ? "with reduced motion" : "by default", () => {
    test.use({ reducedMotion: reduced ? "reduce" : "no-preference" });

    test("the Ingredient's drawing draws itself in", async ({ page }) => {
      await page.goto("/ingredients/lemon");
      const stroke = page.locator(".hero svg > *").first();
      expect(await animation(stroke)).toMatchObject({
        // CSS modules prefix the name.
        name: expect.stringMatching(/draw-in$/),
        duration: reduced ? "0s" : "1.4s",
      });
    });

    test("Pairing rows settle in one after another, once", async ({ page }) => {
      await page.goto("/ingredients/chicken-thigh");
      const rows = page.locator(".pairing-group li");
      expect(await animation(rows.nth(0))).toEqual({
        name: "settle",
        duration: reduced ? "0s" : "0.4s",
        delay: "0s",
      });
      expect((await animation(rows.nth(2))).delay).toBe(reduced ? "0s" : "0.09s");

      // Filtering after first paint doesn't replay it.
      await page.getByRole("radio", { name: "Tradition" }).check();
      await page.getByRole("radio", { name: "All" }).check();
      expect((await animation(rows.nth(0))).name).toBe("none");
    });

    test("an added Ingredient grows into the tray; those already there don't", async ({ page, isMobile }) => {
      await page.goto("/ingredients/garlic?with=lemon");
      const items = trayItems(page, isMobile);
      await expect(items).toHaveCount(1);
      expect((await animation(items.first())).name).toBe("none");

      await page.getByRole("button", { name: "Add Garlic to Combination" }).first().click();
      await expect(items).toHaveCount(2);
      expect(await animation(items.nth(1))).toMatchObject({
        name: expect.stringMatching(/grow$/),
        duration: reduced ? "0s" : "0.4s",
      });
      expect((await animation(items.first())).name).toBe("none");
    });
  });
}
