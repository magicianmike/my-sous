import { expect, test } from "@playwright/test";

test("from Home, a Cook explores a Cuisine, opens an Ingredient and filters its Pairings to it", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "explore by cuisine" }).click();
  await expect(page).toHaveURL(/\/cuisines$/);
  await page.getByRole("link", { name: "Southern Italian" }).click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Southern Italian");
  const common = page.getByRole("list", { name: "Ingredients common in Southern Italian cooking" });
  await expect(common.getByRole("link", { name: "Garlic" })).toBeVisible();
  await expect(page.locator(".cuisine-pairings li").first()).toContainText(/\w+ and \w+/);

  await common.getByRole("link", { name: "Garlic" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Garlic" })).toBeVisible();
  const all = await page.locator(".pairing-group:not([hidden]) li").count();

  const filter = page.getByRole("radiogroup", { name: "Show Pairings common in" });
  await filter.getByRole("radio", { name: "Southern Italian" }).click();
  await expect(page).toHaveURL(/\/ingredients\/garlic\?cuisine=southern-italian$/);
  const status = page.locator(".filter-status");
  await expect(status).toHaveText(/^\d+ Pairings? common in Southern Italian cooking\.$/);
  await expect(status).toHaveAttribute("aria-live", "polite");
  const filtered = await page.locator(".pairing-group:not([hidden]) li").count();
  expect(filtered).toBeGreaterThan(0);
  expect(filtered).toBeLessThan(all);

  // Clearing, by choosing any cuisine or by going Back.
  await filter.getByRole("radio", { name: "Any cuisine" }).click();
  await expect(page).toHaveURL(/\/ingredients\/garlic$/);
  await expect(page.locator(".pairing-group:not([hidden]) li")).toHaveCount(all);
  await page.goBack();
  await expect(filter.getByRole("radio", { name: "Southern Italian" })).toBeChecked();
  await expect(page.locator(".pairing-group:not([hidden]) li")).toHaveCount(filtered);
});

test("a filtered Ingredient keeps the basket, and opens filtered from a link", async ({ page }) => {
  await page.goto("/ingredients/garlic?with=lemon&cuisine=cantonese");
  const filter = page.getByRole("radiogroup", { name: "Show Pairings common in" });
  await expect(filter.getByRole("radio", { name: "Cantonese" })).toBeChecked();
  await filter.getByRole("radio", { name: "Any cuisine" }).click();
  await expect(page).toHaveURL(/\/ingredients\/garlic\?with=lemon$/);
});

test("an Ingredient's Cuisines lead to their pages", async ({ page }) => {
  await page.goto("/ingredients/lemon");
  await page.getByRole("list", { name: "Common in" }).getByRole("link", { name: "Southern Italian" }).click();
  await expect(page).toHaveURL(/\/cuisines\/southern-italian$/);
});
