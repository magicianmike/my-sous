import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("a Cook opens an Ingredient and follows a Pairing to another Ingredient", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Lemon" }).click();

  await expect(page.getByRole("heading", { level: 1, name: "Lemon" })).toBeVisible();
  const garlic = page.getByRole("listitem").filter({ hasText: "Garlic" });
  await expect(garlic).toContainText("Lemon's sharpness cuts through the richness of garlic");

  await garlic.getByRole("link", { name: "Garlic" }).click();

  await expect(page).toHaveURL(/\/ingredients\/garlic$/);
  await expect(page.getByRole("heading", { level: 1, name: "Garlic" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Lemon" })).toBeVisible();
});

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`in the ${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const path of ["/", "/ingredients/lemon"]) {
      test(`${path} has no axe violations`, async ({ page }) => {
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  });
}
