import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { trayShown } from "./tray";

const combination = "?with=chicken-thigh,garlic";

/** Each screen, and something that shows once its client-side content has rendered. */
const screens: [string, (page: Page) => ReturnType<Page["getByRole"]>][] = [
  ["/", trayShown],
  ["/ingredients/lemon", (page) => page.getByRole("button", { name: "Add Lemon to your basket" })],
  [`/ingredients/lemon${combination}`, (page) => page.getByRole("button", { name: "Remove Garlic from your basket" })],
  [`/suggestions${combination}`, (page) => page.getByRole("link", { name: "Pan sauce" })],
  [`/formulas/pan-sauce${combination}`, (page) => page.getByRole("heading", { name: "Method" })],
  ["/formulas/pan-sauce", (page) => page.getByRole("heading", { name: "Ingredients" })],
  ["/formulas/fried-rice", (page) => page.getByRole("heading", { name: "Ingredients" })],
  ["/formulas/quick-pickle", (page) => page.getByRole("heading", { name: "Ingredients" })],
  ["/formulas/braise", (page) => page.getByRole("heading", { name: "Ingredients" })],
  ["/ingredients/gremolata", (page) => page.getByRole("heading", { name: "Typically includes" })],
  ["/design", (page) => page.getByRole("heading", { name: "Combination tray" })],
  ["/case-study", (page) => page.getByRole("figure").first()],
  ["/cuisines", (page) => page.getByRole("heading", { level: 1, name: "Cuisines" })],
  ["/dishes", (page) => page.getByRole("heading", { level: 1, name: "Dishes" })],
  ["/ingredients", (page) => page.getByRole("heading", { level: 2, name: "Herbs" })],
  ["/cuisines/southern-italian", (page) => page.getByRole("heading", { name: "Pairings" })],
  [
    "/ingredients/garlic?cuisine=southern-italian",
    (page) => page.locator(".filter-status").filter({ hasText: "common in Southern Italian cooking" }),
  ],
  ["/ingredients/mango", (page) => page.getByRole("heading", { name: "This isn’t in MySous yet" })],
  [
    "/suggestions?with=chicken-thigh,basil,ginger",
    (page) => page.getByRole("heading", { name: "Suggestions" }),
  ],
];

async function expectNoViolations(page: Page) {
  // Contrast is judged on what settles, not on rows caught halfway through fading in.
  await page.evaluate(() => Promise.all(document.getAnimations().map(({ finished }) => finished)));
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
      await page.getByText("More about lemon and parsley, contrast").click();
      await expectNoViolations(page);
    });

    test("the open tray sheet has no axe violations", async ({ page }) => {
      await page.goto("/ingredients/lemon?with=lemon,garlic");
      await page.getByRole("button", { name: /^Your basket/ }).click();
      await expect(page.getByRole("dialog", { name: /Your basket/ })).toBeVisible();
      await expectNoViolations(page);
    });

    test("a Formula with an empty Slot, an open Options list and a change made has no axe violations", async ({
      page,
    }) => {
      await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
      const aromatic = page.getByRole("main").getByRole("listitem").filter({ hasText: /^an aromatic/ });
      await aromatic.getByRole("button", { name: /^Options/ }).click();
      // Taking out its only Ingredient leaves the part empty.
      await aromatic.getByRole("checkbox", { name: "Garlic" }).uncheck();
      await expect(aromatic).toContainText("Empty for now.");
      await expectNoViolations(page);
      await aromatic.getByRole("checkbox", { name: "Ginger" }).check();
      await expect(aromatic.getByRole("button", { name: /^Undo change/ })).toBeVisible();
      await expect(page.getByRole("status")).not.toBeEmpty();
      await expectNoViolations(page);
    });
  });
}

// A theme the Cook chose, against the device's: each screen, after the choice.
for (const [colorScheme, chosen] of [
  ["light", "Dark"],
  ["dark", "Light"],
] as const) {
  test.describe(`with ${chosen} chosen on a ${colorScheme} device`, () => {
    test.use({ colorScheme });

    for (const [path, ready] of screens) {
      test(`${path} has no axe violations`, async ({ page }) => {
        await page.goto(path);
        await page.getByRole("banner").getByRole("radio", { name: chosen }).check();
        await expect(ready(page)).toBeVisible();
        await expectNoViolations(page);
      });
    }
  });
}
