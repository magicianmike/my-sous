import { expect, test } from "@playwright/test";

test("from Home, a Cook browses dishes and opens one, keeping the basket", async ({ page }) => {
  await page.goto("/?with=garlic");
  await page.getByRole("link", { name: /^Browse dishes/ }).click();
  await expect(page).toHaveURL(/\/dishes\?with=garlic$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dishes");

  const dishes = page.getByRole("list", { name: "Dishes" });
  await expect(dishes.getByRole("heading", { level: 2 }).first()).toHaveText("Pan sauce");
  await dishes.getByRole("link", { name: "Pan sauce" }).click();
  await expect(page).toHaveURL(/\/formulas\/pan-sauce\?with=garlic$/);
  await expect(page.getByRole("heading", { level: 1, name: "Pan sauce" })).toBeVisible();
});

test("each dish shows its image, what it's for, its parts, and what it's made with as written", async ({ page }) => {
  await page.goto("/dishes");
  const dishes = page.getByRole("list", { name: "Dishes" }).getByRole("listitem").filter({ has: page.getByRole("heading", { level: 2 }) });
  const panSauce = dishes.filter({ has: page.getByRole("heading", { name: "Pan sauce" }) });

  // Its heading names the dish, so the image is decorative, but still says how it was made.
  await expect(panSauce.locator("picture img")).toHaveAttribute("alt", "");
  await expect(panSauce.getByText("AI-generated image")).toBeVisible();
  await expect(panSauce).toContainText("Sear something, then turn the browned bits left in the pan");
  await expect(panSauce).toContainText("Parts: something to sear, an aromatic, an acid, and optionally a soft herb and some heat.");
  const asWritten = panSauce.getByRole("group", { name: "As written" });
  for (const name of ["Chicken thigh", "Garlic", "Lemon", "Basil"]) {
    await expect(asWritten.getByRole("link", { name })).toBeVisible();
  }

  // Every dish is here, each linking to its page.
  for (const dish of await dishes.all()) {
    await expect(dish.getByRole("heading", { level: 2 }).getByRole("link")).toHaveAttribute("href", /^\/formulas\/[\w-]+$/);
  }
  await expect(dishes).toHaveCount(await page.getByRole("list", { name: "Dishes" }).getByRole("heading", { level: 2 }).count());
});

test("the top nav marks Dishes as current on the Dishes page and on a dish's page", async ({ page }) => {
  for (const path of ["/dishes", "/formulas/pan-sauce"]) {
    await page.goto(path);
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "Dishes" })).toHaveAttribute("aria-current", "page");
    await expect(nav.getByRole("link", { name: "Ingredients" })).not.toHaveAttribute("aria-current");
  }
});
