import { expect, test } from "@playwright/test";

test("Home says what MySous does, offers one way in, and what the basket is for", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Find what goes with what, and why.");
  await expect(page.getByRole("heading", { level: 2, name: "Start from an ingredient" })).toBeVisible();
  await expect(page.getByRole("main")).toContainText(
    "Add up to four you want to cook around to your basket, from your fridge or not, and MySous suggests what to make.",
  );
  // One way in: no second door.
  await expect(page.getByRole("main").getByRole("heading", { level: 2 })).toHaveCount(1);
});

test("from Home, a Cook opens an Ingredient, fills the basket and sees what to make", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("list", { name: "Every ingredient" }).getByRole("link", { name: "Lemon" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Lemon" })).toBeVisible();

  await page.getByRole("button", { name: "Add Lemon to your basket" }).click();
  await page.getByRole("button", { name: "Add Garlic to your basket" }).first().click();
  await page.getByRole("link", { name: "See what to make" }).first().click();

  await expect(page).toHaveURL(/\/suggestions\?with=lemon,garlic$/);
  await expect(page.getByRole("list", { name: "Suggestions" }).getByRole("listitem").first()).toBeVisible();
});
