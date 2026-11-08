import { expect, test } from "@playwright/test";

test("a Cook opens an Ingredient and follows a Pairing to another Ingredient", async ({ page }) => {
  await page.goto("/ingredients");
  await page.getByRole("main").getByRole("link", { name: "Lemon" }).click();

  await expect(page.getByRole("heading", { level: 1, name: "Lemon" })).toBeVisible();
  const garlic = page.getByRole("listitem").filter({ hasText: "Garlic" });
  await expect(garlic).toContainText("Garlic and lemon juice season the tahini sauces");

  await garlic.getByRole("link", { name: "Garlic" }).click();

  await expect(page).toHaveURL(/\/ingredients\/garlic$/);
  await expect(page.getByRole("heading", { level: 1, name: "Garlic" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Lemon" })).toBeVisible();
});

test("a Cook narrows the Pairings to one Pairing Reason", async ({ page }) => {
  await page.goto("/ingredients/chicken-thigh");
  const filter = page.getByRole("radiogroup", { name: "Show Pairings by reason" });
  const radios = filter.getByRole("radio");
  await expect(radios).toHaveCount(4);
  for (const [i, name] of ["All", "Contrast", "Aromatic bridge", "Tradition"].entries()) {
    await expect(radios.nth(i)).toHaveAccessibleName(name);
  }
  await expect(filter.getByRole("radio", { name: "All" })).toBeChecked();

  await filter.getByRole("radio", { name: "Tradition" }).check();
  await expect(page.getByRole("heading", { level: 3, name: "Tradition" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "Contrast" })).toBeHidden();

  await filter.getByRole("radio", { name: "All" }).check();
  await expect(page.getByRole("heading", { level: 3, name: "Contrast" })).toBeVisible();
});

test("an Ingredient with one Pairing Reason has nothing to filter", async ({ page }) => {
  await page.goto("/ingredients/basil");
  await expect(page.getByRole("heading", { level: 3, name: "Tradition" })).toBeVisible();
  await expect(page.getByRole("radiogroup", { name: "Show Pairings by reason" })).toHaveCount(0);
});

test.describe("on desktop", () => {
  test.skip(({ isMobile }) => isMobile, "three columns are the desktop layout");

  test("the Ingredient sits beside its Pairings, with the first Pairings on the first screen", async ({
    page,
  }) => {
    await page.goto("/ingredients/chicken-thigh");
    const name = (await page.getByRole("heading", { level: 1 }).boundingBox())!;
    const pairings = (await page.getByRole("heading", { level: 2, name: "Pairs well with" }).boundingBox())!;
    const firstPairing = (await page.getByRole("main").getByRole("listitem").first().boundingBox())!;
    expect(pairings.x).toBeGreaterThan(name.x + name.width);
    expect(firstPairing.y + firstPairing.height).toBeLessThan(page.viewportSize()!.height);
  });
});

test("a selected Pairing filter is a raised white pill, not a solid one", async ({ page }) => {
  await page.goto("/ingredients/garlic");
  const all = page.locator("label").filter({ has: page.getByRole("radio", { name: "All", exact: true }) });
  // The surface colour, white in the light theme.
  await expect(all).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(all).toHaveCSS("color", "rgb(31, 38, 32)");
});

test("at a laptop width, the Ingredient and its Pairings sit side by side, each with room", async ({ page, isMobile }) => {
  test.skip(isMobile, "the laptop layout");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/ingredients/garlic");
  const [hero, pairings] = await Promise.all([
    page.locator(".ingredient > :first-child").boundingBox(),
    page.locator(".ingredient-pairings").boundingBox(),
  ]);
  expect(pairings!.y).toBeCloseTo(hero!.y, -1);
  expect(hero!.width).toBeGreaterThanOrEqual(360);
  expect(pairings!.width).toBeGreaterThanOrEqual(560);
});
