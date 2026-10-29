import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const combination = "?with=chicken-thigh,garlic";

/** Each screen, and something that shows once its client-side content has rendered. */
const screens: [string, (page: Page) => ReturnType<Page["getByRole"]>][] = [
  ["/", (page) => page.getByRole("heading", { name: /Your Combination/ })],
  ["/ingredients/lemon", (page) => page.getByRole("button", { name: "Add Lemon to Combination" })],
  [`/ingredients/lemon${combination}`, (page) => page.getByRole("button", { name: "Remove Garlic from Combination" })],
  [`/suggestions${combination}`, (page) => page.getByRole("link", { name: "Pan sauce" })],
  [`/formulas/pan-sauce${combination}`, (page) => page.getByRole("heading", { name: "Method" })],
  ["/ingredients/gremolata", (page) => page.getByRole("heading", { name: "Typically includes" })],
  ["/design", (page) => page.getByRole("heading", { name: "Combination tray" })],
  ["/ingredients/mango", (page) => page.getByRole("heading", { name: "This isn’t in MySous yet" })],
  [
    "/suggestions?with=chicken-thigh,basil,ginger",
    (page) => page.getByRole("heading", { name: "Not everything pairs yet" }),
  ],
];

async function expectNoViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
}

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`in the ${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const [path, ready] of screens) {
      test(`${path} has no axe violations`, async ({ page }) => {
        await page.goto(path);
        await expect(ready(page)).toBeVisible();
        await expectNoViolations(page);
      });
    }

    test("an open search, a no-match search and an expanded Pairing have no axe violations", async ({
      page,
    }) => {
      await page.goto("/");
      const search = page.getByRole("combobox", { name: "Find an ingredient" });
      await search.fill("l");
      await search.press("ArrowDown");
      await expect(page.getByRole("listbox")).toBeVisible();
      await expectNoViolations(page);
      await search.fill("mango");
      await expect(page.getByText("browse every ingredient")).toBeVisible();
      await expectNoViolations(page);

      await page.goto("/ingredients/lemon");
      await page.getByText("More about lemon and garlic, contrast").click();
      await expectNoViolations(page);
    });

    test("a Formula with an empty Slot, an open Swap list and a swap made has no axe violations", async ({
      page,
    }) => {
      await page.goto("/formulas/sheet-pan-roast?with=ginger");
      await expect(page.getByText("No Pairing here points to a vegetable yet.")).toBeVisible();
      const acid = page.getByRole("main").getByRole("listitem").filter({ hasText: /^an acid/ });
      await acid.getByText("Swap").click();
      await expectNoViolations(page);
      await acid.getByRole("button", { name: /^Use / }).first().click();
      await expect(page.getByRole("main").getByRole("status")).not.toBeEmpty();
      await expectNoViolations(page);
    });
  });
}
