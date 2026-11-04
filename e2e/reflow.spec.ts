import { expect, test, type Page } from "@playwright/test";
import { screenShown, trayShown } from "./tray";

/** Widths from the smallest phone to wide desktop; 640×360 is a 1280×720 screen at 200% zoom. */
const viewports = [
  { width: 320, height: 640 },
  { width: 390, height: 844 },
  { width: 576, height: 640 },
  { width: 640, height: 360 },
  { width: 1000, height: 800 },
  { width: 1280, height: 720 },
  { width: 1600, height: 900 },
];

const screens = [
  "/",
  "/ingredients/chicken-thigh?with=chicken-thigh,garlic,lemon,basil",
  "/ingredients/gremolata",
  "/suggestions?with=chicken-thigh,basil",
  "/formulas/pan-sauce?with=chicken-thigh,garlic",
  "/suggestions?with=chicken-thigh,basil,ginger",
  "/formulas/sheet-pan-roast?with=ginger",
  "/case-study",
  "/cuisines",
  "/ingredients",
  "/cuisines/southern-italian",
  "/ingredients/garlic?cuisine=southern-italian",
];

// Viewports are set per test, so one project is enough.
test.skip(({ isMobile }) => isMobile, "each test sets its own viewport");

async function open(page: Page, path: string) {
  await page.goto(path);
  await expect(screenShown(page, path)).toBeVisible();
}

for (const viewport of viewports) {
  test.describe(`at ${viewport.width}×${viewport.height}`, () => {
    test.use({ viewport });

    for (const path of screens) {
      test(`${path} doesn't scroll sideways`, async ({ page }) => {
        await open(page, path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  });
}

for (const viewport of viewports.filter(({ width }) => width < 896)) {
  test.describe(`with the tray bar at ${viewport.width}×${viewport.height}`, () => {
    test.use({ viewport });

    test("the bar never covers the focused control", async ({ page }) => {
      await open(page, "/ingredients/chicken-thigh?with=chicken-thigh,garlic");
      await expect(page.locator(".tray-bar")).toBeVisible();
      // The page measures the bar once it's there; scrolling leaves that much room.
      await expect
        .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).scrollPaddingBottom))
        .toMatch(/^[1-9]\d*px$/);
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const covered = await page.evaluate(() => {
          const focused = document.activeElement;
          const bar = document.querySelector(".tray-dock")!;
          if (!focused || focused === document.body || bar.contains(focused)) return null;
          const { top, bottom } = focused.getBoundingClientRect();
          // Focus Not Obscured: the control must not sit under the docked bar. Scrolling snaps to
          // whole pixels, so an edge may land a fraction of one past the bar's top.
          const barTop = bar.getBoundingClientRect().top;
          if (bottom - barTop <= 1 || top >= innerHeight) return null;
          return `${focused.outerHTML.slice(0, 60)} bottom=${bottom} barTop=${barTop}`;
        });
        expect(covered).toBeNull();
      }
    });

    test("the end of the page can scroll clear of the bar", async ({ page }) => {
      await open(page, "/ingredients/chicken-thigh?with=chicken-thigh,garlic");
      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
      const clear = await page.evaluate(() => {
        const last = [...document.querySelectorAll("main li")].at(-1)!.getBoundingClientRect();
        return last.bottom <= document.querySelector(".tray-dock")!.getBoundingClientRect().top;
      });
      expect(clear).toBe(true);
    });

    test("with four Ingredients, the bar's title stays whole on one line", async ({ page }) => {
      await open(page, "/ingredients/lemon?with=chicken-thigh,garlic,lemon,basil");
      const title = page.locator(".tray-bar button").getByText("Your basket", { exact: true });
      const fits = await title.evaluate((el) => {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        return { wrapped: el.getBoundingClientRect().height > lineHeight * 1.5, cut: el.scrollWidth > el.clientWidth };
      });
      expect(fits).toEqual({ wrapped: false, cut: false });
    });

    test("at the end of the page, the bar still meets the foot of the screen", async ({ page }) => {
      await open(page, "/ingredients/chicken-thigh?with=chicken-thigh,garlic");
      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
      const gap = await page.evaluate(
        () => innerHeight - document.querySelector(".tray-dock")!.getBoundingClientRect().bottom,
      );
      expect(gap).toBeLessThanOrEqual(1);
    });
  });
}
