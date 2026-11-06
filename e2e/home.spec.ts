import { expect, test } from "@playwright/test";

test("Home says what MySous does, what the basket is for, and offers search and two ways to browse", async ({
  page,
}) => {
  await page.goto("/");
  const main = page.getByRole("main");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Find what goes with what, and why.");
  await expect(main).toContainText(
    "Add up to four ingredients you want to cook around to your basket, from your fridge or not",
  );
  await expect(main.getByRole("heading", { level: 2 })).toHaveText(["Start from an ingredient", "Or browse"]);
  await expect(main.getByRole("combobox", { name: "Find an ingredient" })).toBeVisible();
  await expect(main.getByRole("link", { name: /^Browse ingredients/ })).toHaveAttribute("href", "/ingredients");
  await expect(main.getByRole("link", { name: /^Browse cuisines/ })).toHaveAttribute("href", "/cuisines");
});

test("from Home, a Cook browses ingredients, fills the basket and sees what to make", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /^Browse ingredients/ }).click();
  await expect(page).toHaveURL(/\/ingredients$/);
  await page.getByRole("main").getByRole("link", { name: "Lemon" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Lemon" })).toBeVisible();

  await page.getByRole("button", { name: "Add Lemon to your basket" }).click();
  await page.getByRole("button", { name: "Add Garlic to your basket" }).first().click();
  await page.getByRole("link", { name: "See what to make" }).first().click();

  await expect(page).toHaveURL(/\/suggestions\?with=lemon,garlic$/);
  await expect(page.getByRole("list", { name: "Suggestions" }).getByRole("listitem").first()).toBeVisible();
});

test("the Ingredients page lists every Ingredient by kind", async ({ page }) => {
  await page.goto("/ingredients");
  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { level: 2 }).first()).toHaveText("Herbs");
  const herbs = main.getByRole("region", { name: "Herbs" });
  await expect(herbs.getByRole("link")).toHaveText(["Basil", "Cilantro", "Epazote", "Mint", "Parsley", "Shiso"]);
});

test("the top nav reaches Ingredients and Cuisines on app screens, marks the current one, keeps the basket", async ({
  page,
}) => {
  for (const path of ["/", "/ingredients/lemon?with=garlic", "/suggestions?with=garlic", "/formulas/pan-sauce"]) {
    await page.goto(path);
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link")).toHaveText(["Ingredients", "Cuisines"]);
  }
  // The Case Study keeps a quiet header: the wordmark and its label.
  await page.goto("/case-study");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main" })).toHaveCount(0);
  await page.goto("/cuisines/ligurian?with=garlic");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Cuisines" })).toHaveAttribute("aria-current", "page");
  await expect(nav.getByRole("link", { name: "Ingredients" })).not.toHaveAttribute("aria-current");
  await nav.getByRole("link", { name: "Ingredients" }).click();
  await expect(page).toHaveURL(/\/ingredients\?with=garlic$/);
  await expect(nav.getByRole("link", { name: "Ingredients" })).toHaveAttribute("aria-current", "page");
});
