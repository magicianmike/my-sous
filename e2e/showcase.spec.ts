import { expect, test } from "@playwright/test";

test("a dish leads to its worked recipe and back, keeping the basket", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  await page.getByRole("link", { name: "See a worked recipe" }).click();

  await expect(page).toHaveURL(/\/formulas\/pan-sauce\/recipe\?with=chicken-thigh,garlic$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Chicken thighs with a garlic, lemon and basil pan sauce",
  );

  await page.getByRole("link", { name: "Back to Pan sauce" }).click();
  await expect(page).toHaveURL(/\/formulas\/pan-sauce\?with=chicken-thigh,garlic$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pan sauce");
});

test("a worked recipe gives quantities, timings, ordered steps and the citation for a safety step", async ({
  page,
}) => {
  await page.goto("/formulas/pan-sauce/recipe");
  const main = page.getByRole("main");

  const facts = main.getByRole("definition");
  await expect(facts).toHaveText(["2", "10 minutes", "30 minutes", "40 minutes"]);

  const ingredients = main.getByRole("list", { name: "Ingredients" }).getByRole("listitem");
  await expect(ingredients.first()).toContainText("4 chicken thigh");
  await expect(ingredients.filter({ hasText: "garlic" }).getByRole("link", { name: "garlic" })).toBeVisible();

  const steps = main.getByRole("list", { name: "Method" }).getByRole("listitem");
  await expect(steps.first()).toContainText("pat each chicken thigh dry");
  const safety = steps.filter({ hasText: "165°F" });
  await expect(safety).toContainText("Food safety");
  await expect(safety.getByRole("link", { name: /Safe Minimum Internal Temperature/ })).toBeVisible();
});

test("a dish without a worked recipe offers no link to one", async ({ page }) => {
  await page.goto("/formulas/sheet-pan-roast?with=ginger");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sheet-pan roast");
  await expect(page.getByRole("link", { name: "See a worked recipe" })).toHaveCount(0);
});
