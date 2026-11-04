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

test("the recipe follows the basket and every swap, amounts included", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,lime");
  const acidLine = ingredientLines(page).filter({ has: page.getByRole("link", { name: /^(limes|lemon)$/ }) });
  await expect(acidLine).toHaveText(/^2 limes, juiced/);

  await part(page, "an acid").getByText("Swap").click();
  await part(page, "an acid").getByRole("button", { name: "Use Lemon" }).click();

  await expect(acidLine).toHaveText(/^1 lemon, juiced/);
  await expect(page.getByRole("main").getByRole("list", { name: "Method" })).toContainText("lemon juice");
});

test("a dish without a recipe keeps its short method and gives no amounts", async ({ page }) => {
  await page.goto("/formulas/sheet-pan-roast?with=ginger");
  await expect(page.getByRole("heading", { level: 2, name: "Method" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ingredients" })).toHaveCount(0);
});
