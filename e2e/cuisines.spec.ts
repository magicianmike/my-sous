import { expect, test } from "@playwright/test";

test("from Home, a Cook explores a Cuisine, opens an Ingredient and filters its Pairings to it", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Browse cuisines" }).click();
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

test("the Cuisines index gives each Cuisine a row: where it is, its counts, and the drawings of what it leans on", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/cuisines");
  const table = page.getByRole("table", { name: "Cuisines" });
  await expect(table.getByRole("columnheader")).toHaveText(["Cuisine", "Where", "Ingredients", "Pairings", "Leans on"]);
  const sichuan = table.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "Sichuan" }) });
  await expect(sichuan.getByRole("cell")).toHaveText([/^The cooking of Sichuan province/, "19", /^\d+$/, ""]);
  await expect(sichuan.getByRole("img")).toHaveAccessibleName(
    "Sichuan pepper, Black vinegar, Doubanjiang, Chicken breast and Dried chile",
  );
  await expect(sichuan.locator(".ingredient-mark")).toHaveCount(5);
  await sichuan.getByRole("link", { name: "Sichuan" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Sichuan" })).toBeVisible();
});

test("a Cuisine with fewer than five Ingredients shows them all", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/cuisines");
  const ligurian = page.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "Ligurian" }) });
  await expect(ligurian.locator(".ingredient-mark")).toHaveCount(3);
  await expect(ligurian.getByRole("cell").nth(1)).toHaveText("3");
});

test("on a narrow screen, the Cuisines index keeps each name and its counts", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/cuisines");
  const table = page.getByRole("table", { name: "Cuisines" });
  await expect(table.getByRole("columnheader")).toHaveText(["Cuisine", "Ingredients", "Pairings"]);
  const sichuan = table.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "Sichuan" }) });
  await expect(sichuan.getByRole("cell")).toHaveText(["19", /^\d+$/]);
  await expect(sichuan.getByRole("img")).toBeHidden();
});
