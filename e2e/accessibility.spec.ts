import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const combination = "?with=chicken-thigh,garlic";

/** Each screen, and something that shows once its client-side content has rendered. */
const screens: [string, (page: Page) => ReturnType<Page["getByRole"]>][] = [
  ["/", (page) => page.getByRole("heading", { name: /Your Combination/ })],
  ["/ingredients/lemon", (page) => page.getByRole("button", { name: "Add Lemon to Combination" })],
  [`/ingredients/lemon${combination}`, (page) => page.getByRole("button", { name: "Remove Garlic" })],
  [`/suggestions${combination}`, (page) => page.getByRole("link", { name: "Pan sauce" })],
  [`/formulas/pan-sauce${combination}`, (page) => page.getByRole("heading", { name: "Method" })],
];

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`in the ${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const [path, ready] of screens) {
      test(`${path} has no axe violations`, async ({ page }) => {
        await page.goto(path);
        await expect(ready(page)).toBeVisible();
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  });
}
