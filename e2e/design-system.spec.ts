import { expect, test, type Page } from "@playwright/test";

const screens = [
  "/",
  "/ingredients/lemon?with=lemon,garlic",
  "/ingredients/gremolata",
  "/suggestions?with=chicken-thigh,basil",
  "/formulas/pan-sauce?with=chicken-thigh,garlic",
  "/design",
];

/** Waits for the parts that render in the browser (the tray) to be there. */
async function open(page: Page, path: string) {
  await page.goto(path);
  await expect(page.getByRole("heading", { name: /Your Combination/ }).first()).toBeVisible();
}

test.describe("touch targets on a phone", () => {
  test.skip(({ isMobile }) => !isMobile, "touch targets are checked at phone width");

  for (const path of screens) {
    test(`${path}: every control is big enough to tap`, async ({ page }) => {
      await open(page, path);
      // Open every disclosure, so the controls inside are measured too.
      for (const summary of await page.locator("summary").all()) await summary.click();

      const tooSmall = await page.evaluate(() => {
        const describe = (el: Element) => `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 30)}"`;
        const visible = (el: Element) => {
          const box = el.getBoundingClientRect();
          return box.width > 0 && box.height > 0 && getComputedStyle(el).visibility !== "hidden";
        };
        const failures: string[] = [];
        for (const el of document.querySelectorAll("button, summary, input, [role=option]")) {
          const { width, height } = el.getBoundingClientRect();
          if (visible(el) && (width < 44 || height < 44)) failures.push(`${describe(el)} ${width}×${height}`);
        }
        // Links in running text are exempt (WCAG 2.5.8); standalone links aren't.
        for (const el of document.querySelectorAll("a")) {
          if (el.closest("p, li > p")) continue;
          const { width, height } = el.getBoundingClientRect();
          if (visible(el) && (width < 24 || height < 44)) failures.push(`${describe(el)} ${width}×${height}`);
        }
        return failures;
      });

      expect(tooSmall).toEqual([]);
    });
  }
});

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`focus in the ${colorScheme} theme`, () => {
    test.skip(({ isMobile }) => isMobile, "keyboard focus is checked at desktop width");
    test.use({ colorScheme });

    for (const path of screens) {
      test(`${path}: every focused control shows the same ring, in the focus colour`, async ({ page }) => {
        await open(page, path);
        const focusColour = await page.evaluate(() => {
          // Resolve the --focus token to the browser's rgb() form, as outlines report it.
          const probe = document.createElement("span");
          probe.style.color = "var(--focus)";
          document.body.append(probe);
          const colour = getComputedStyle(probe).color;
          probe.remove();
          return colour;
        });
        const rings = new Set<string>();
        for (let i = 0; i < 40; i++) {
          await page.keyboard.press("Tab");
          const ring = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            const { outlineStyle, outlineWidth, outlineColor } = getComputedStyle(el);
            return `${outlineStyle} ${outlineWidth} ${outlineColor}`;
          });
          if (ring) rings.add(ring);
        }
        expect([...rings]).toEqual([`solid 3px ${focusColour}`]);
      });
    }
  });
}

test.describe("motion", () => {
  const motionBase = (page: Page) =>
    page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--motion-base").trim());

  test("motion tokens have their durations by default", async ({ page }) => {
    await page.goto("/");
    expect(await motionBase(page)).toBe("200ms");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("every motion token is 0ms", async ({ page }) => {
      await page.goto("/");
      expect(await motionBase(page)).toBe("0ms");
    });
  });
});

test("the specimen renders components from props alone, without the URL", async ({ page }) => {
  await open(page, "/design");
  const tray = page.getByRole("main").getByRole("complementary", { name: /Your Combination/ });
  await expect(tray).toContainText("2 of 4");
  await tray.getByRole("button", { name: "Remove Basil" }).click();
  await expect(tray).toContainText("1 of 4");
  await expect(page).toHaveURL(/\/design$/);
});
