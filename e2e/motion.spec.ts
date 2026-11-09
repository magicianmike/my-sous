import { expect, test, type Locator, type Page } from "@playwright/test";

/** The CSS animation on an element: its name, duration and delay. */
function animation(locator: Locator) {
  return locator.evaluate((el) => {
    const style = getComputedStyle(el);
    return { name: style.animationName, duration: style.animationDuration, delay: style.animationDelay };
  });
}

/** Where the Combination's Ingredients show at a glance: the bar's drawings. */
function trayItems(page: Page) {
  // Each drawing's wrapper, which carries the animation; empty slots have no drawing.
  return page.locator(".tray-bar [class*=marks] > :has(svg)");
}

for (const reduced of [false, true]) {
  test.describe(reduced ? "with reduced motion" : "by default", () => {
    test.use({ reducedMotion: reduced ? "reduce" : "no-preference" });

    test("the Case Study's chapter links scroll smoothly to their chapter", async ({ page }) => {
      await page.goto("/case-study");
      // The document scrolls on desktop, .page on a phone; both glide unless the Cook asks for less motion.
      const behaviours = await page.evaluate(() =>
        [document.documentElement, document.querySelector(".page")!].map((el) => getComputedStyle(el).scrollBehavior),
      );
      expect(behaviours).toEqual(reduced ? ["auto", "auto"] : ["smooth", "smooth"]);

      await page.getByRole("navigation", { name: "Chapters" }).getByRole("link", { name: "The module" }).click();
      await expect(page.getByRole("heading", { level: 2, name: "The module" })).toBeInViewport();
    });

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
      // Note each row that starts to settle, from the page as first sent to the page once it's live.
      // Note too any row or Pairing group taken out of the page, which would mean rows were swapped.
      await page.addInitScript(() => {
        const settled: Element[] = [];
        const swapped: Node[] = [];
        Object.assign(window, { settled, swapped });
        document.addEventListener(
          "animationstart",
          (event) => event.animationName === "settle" && settled.push(event.target as Element),
          true,
        );
        new MutationObserver((records) => {
          for (const { target, removedNodes } of records) {
            // A row is a list item of a group; what's inside a row, such as its links arriving, can change.
            const fromList = target instanceof Element && target.matches(".pairing-group ul");
            for (const node of removedNodes) {
              if (node instanceof Element && ((fromList && node.matches("li")) || node.matches(".pairing-group") || node.querySelector(".pairing-group"))) {
                swapped.push(node);
              }
            }
          }
        }).observe(document, { childList: true, subtree: true });
      });
      await page.goto("/ingredients/garlic");
      // The Cuisine control appears only once the page is live, so by then any swap would have happened.
      await expect(page.getByRole("radiogroup", { name: "Show Pairings common in" })).toBeVisible();
      const rows = page.locator(".pairing-group li");
      const count = await rows.count();
      const settledRows = () =>
        page.evaluate(() => {
          const settled = (window as unknown as { settled: Element[] }).settled;
          return { live: settled.filter((row) => row.isConnected).length, replaced: settled.filter((row) => !row.isConnected).length };
        });
      // No row is swapped for another as the page goes live.
      expect(await page.evaluate(() => (window as unknown as { swapped: Node[] }).swapped.length)).toBe(0);
      // Every row settles, once. Under reduced motion nothing moves, and a browser may not report a
      // settle that takes no time, so there it's enough that each row has the settle, at no length.
      if (!reduced) {
        await expect.poll(async () => (await settledRows()).live).toBe(count);
        expect(await settledRows()).toEqual({ live: count, replaced: 0 });
      }
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

    test("an added Ingredient grows into the tray; those already there don't", async ({ page }) => {
      await page.goto("/ingredients/garlic?with=lemon");
      const items = trayItems(page);
      await expect(items).toHaveCount(1);
      expect((await animation(items.first())).name).toBe("none");

      await page.getByRole("button", { name: "Add Garlic to your basket" }).first().click();
      await expect(items).toHaveCount(2);
      expect(await animation(items.nth(1))).toMatchObject({
        name: expect.stringMatching(/grow$/),
        duration: reduced ? "0s" : "0.4s",
      });
      expect((await animation(items.first())).name).toBe("none");
    });
  });
}
