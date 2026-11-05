import { expect, test, type Page } from "@playwright/test";

/** A dish's part, found by the heading that names its role. */
function part(page: Page, role: string) {
  return page
    .getByRole("main")
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { level: 3, name: role }) });
}

function ingredientLines(page: Page) {
  return page.getByRole("main").getByRole("list", { name: "Ingredients" }).getByRole("listitem");
}

test("with an empty basket, a dish with a recipe fills its parts from the recipe", async ({ page }) => {
  await page.goto("/formulas/pan-sauce");
  await expect(part(page, "something to sear")).toContainText("Chicken thigh");
  await expect(part(page, "something to sear").locator(".tag")).toHaveText(["Suggested"]);

  await expect(page.getByRole("main").getByRole("definition")).toHaveText([
    "2",
    "10 minutes",
    "30 minutes",
    "40 minutes",
  ]);
  await expect(ingredientLines(page).first()).toContainText("4 chicken thighs");

  const steps = page.getByRole("main").getByRole("list", { name: "Method" }).getByRole("listitem");
  const cooking = steps.filter({ hasText: "cooked through" });
  await expect(cooking).toContainText("Food safety");
  await expect(cooking).toContainText("165°F / 74°C");
  await expect(cooking.getByRole("link", { name: /Safe Minimum Internal Temperature/ })).toBeVisible();
});

test("food safety guidance stands out from the step around it, on its own background", async ({ page }) => {
  await page.goto("/formulas/pan-sauce");
  const steps = page.getByRole("main").getByRole("list", { name: "Method" }).getByRole("listitem");
  const background = (locator: ReturnType<typeof steps.first>) =>
    locator.evaluate((el) => {
      // The colour painted behind it: its own, or the nearest ancestor's.
      for (let node: Element | null = el; node; node = node.parentElement) {
        const colour = getComputedStyle(node).backgroundColor;
        if (colour !== "rgba(0, 0, 0, 0)") return colour;
      }
      return "";
    });
  const cooking = steps.filter({ hasText: "cooked through" });
  const note = cooking.locator(".safety-note");

  expect(await background(note)).not.toBe(await background(cooking));
});

test("the recipe follows the basket and every change, amounts included", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,lime");
  const acidLine = ingredientLines(page).filter({ has: page.getByRole("link", { name: /^(limes|lemon)$/ }) });
  await expect(acidLine).toHaveText(/^2 limes, juiced/);

  const acid = part(page, "an acid");
  await acid.getByRole("button", { name: /^Options/ }).click();
  await acid.getByRole("checkbox", { name: "Lemon" }).check();
  await acid.getByRole("checkbox", { name: "Lime" }).uncheck();

  await expect(acidLine).toHaveText(/^1 lemon, juiced/);
  await expect(page.getByRole("main").getByRole("list", { name: "Method" })).toContainText("lemon juice");
});

test("a dish without a recipe keeps its short method and gives no amounts", async ({ page }) => {
  await page.goto("/formulas/sheet-pan-roast?with=ginger");
  await expect(page.getByRole("heading", { level: 2, name: "Method" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ingredients" })).toHaveCount(0);
});

test("a part can hold two Ingredients from the basket, each with its full amount, and the Cook can take one out", async ({
  page,
}) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic,ginger");
  const aromatic = part(page, "an aromatic");
  await expect(aromatic.locator(".slot-fill")).toHaveText(["Garlic", "Ginger"]);
  await expect(ingredientLines(page).filter({ hasText: /^3 cloves garlic/ })).toHaveCount(1);
  await expect(ingredientLines(page).filter({ hasText: /^a thumb-sized piece ginger/ })).toHaveCount(1);
  await expect(page.getByRole("main").getByRole("list", { name: "Method" })).toContainText("add garlic and ginger");

  await aromatic.getByRole("button", { name: /^Options/ }).click();
  await aromatic.getByRole("checkbox", { name: "Ginger" }).uncheck();
  await expect(aromatic.locator(".slot-fill")).toHaveText(["Garlic"]);
  await expect(page.getByRole("status")).toHaveText("Ginger taken out of an aromatic. Undo puts it back.");
  await aromatic.getByRole("button", { name: "Undo change to an aromatic" }).click();
  await expect(aromatic.locator(".slot-fill")).toHaveText(["Garlic", "Ginger"]);
});

test("the Cook can keep adding Ingredients to a part, with no limit", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const aromatic = part(page, "an aromatic");
  await aromatic.getByRole("button", { name: /^Options/ }).click();
  await aromatic.getByRole("checkbox", { name: "Ginger" }).check();

  await expect(aromatic.locator(".slot-fill")).toHaveText(["Garlic", "Ginger"]);
  await expect(aromatic.locator(".tag")).toHaveText(["Yours", "Added"]);
  await expect(page.getByRole("status")).toHaveText("Ginger is now also an aromatic. Undo takes it out.");

  await aromatic.getByRole("checkbox", { name: "Scallion" }).check();
  await expect(aromatic.locator(".slot-fill")).toHaveText(["Garlic", "Ginger", "Scallion"]);
  await expect(page.getByRole("main").getByRole("list", { name: "Method" })).toContainText("garlic, ginger and scallion");
  // Every aromatic is in.
  await expect(aromatic.getByRole("checkbox", { checked: false })).toHaveCount(0);
});
