import { expect, test } from "@playwright/test";

test("Home teaches the basket in three steps, the search in the first, then offers three ways to browse", async ({
  page,
}) => {
  await page.goto("/");
  const main = page.getByRole("main");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Find what goes with what, and why.");
  await expect(main.getByRole("heading", { level: 2 })).toHaveText([
    "Find an ingredient",
    "Fill your basket",
    "See what to make",
    "Or browse by",
  ]);
  await expect(main.getByRole("listitem").first().getByRole("combobox", { name: "Find an ingredient" })).toBeVisible();
  await expect(main).toContainText("Up to six ingredients you want to cook around.");
  const browse = main.getByRole("region", { name: "Or browse by" });
  await expect(browse.getByRole("link", { name: /^Ingredients/ })).toHaveAttribute("href", "/ingredients");
  await expect(browse.getByRole("link", { name: /^Cuisines/ })).toHaveAttribute("href", "/cuisines");
  await expect(browse.getByRole("link", { name: /^Dishes/ })).toHaveAttribute("href", "/dishes");
});

test("on a wide screen, Home's three steps sit side by side, and the browse heading sits on its rule", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const titles = page.getByRole("main").getByRole("heading", { level: 2 });
  await expect(titles.first()).toBeVisible();
  const tops = await Promise.all([0, 1, 2].map(async (i) => (await titles.nth(i).boundingBox())!.y));
  expect(Math.max(...tops) - Math.min(...tops)).toBeLessThan(2);

  const section = (await page.getByRole("region", { name: "Or browse by" }).boundingBox())!;
  const heading = (await titles.nth(3).boundingBox())!;
  expect(heading.y).toBeLessThan(section.y);
  expect(heading.y + heading.height).toBeGreaterThan(section.y);
});

test("from Home, a Cook browses ingredients, fills the basket and sees what to make", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /^Ingredients.*Browse ingredients/ }).click();
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

test("the top nav reaches Ingredients, Cuisines and Dishes on app screens, marks the current one, keeps the basket", async ({
  page,
}) => {
  for (const path of ["/", "/ingredients/lemon?with=garlic", "/suggestions?with=garlic", "/formulas/pan-sauce"]) {
    await page.goto(path);
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link")).toHaveText(["Ingredients", "Cuisines", "Dishes"]);
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

test("the header starts where the page's content does, with room before it", async ({ page }) => {
  for (const path of ["/", "/suggestions?with=garlic", "/ingredients/lemon?with=garlic", "/formulas/pan-sauce"]) {
    await page.goto(path);
    // Measured only once each is on screen: a bounding box doesn't wait for the page as expect does.
    const wordmarkLink = page.getByRole("link", { name: "MySous", exact: true });
    const title = page.getByRole("main").getByRole("heading", { level: 1 });
    await expect(wordmarkLink).toBeVisible();
    await expect(title).toBeVisible();
    const wordmark = (await wordmarkLink.boundingBox())!;
    const heading = (await title.boundingBox())!;
    const content = (await page.getByRole("main").boundingBox())!;
    // The ingredient page's first column holds its drawing; elsewhere the title leads the content.
    expect(Math.abs(wordmark.x - content.x)).toBeLessThan(2);
    const header = (await page.locator(".site-header").boundingBox())!;
    const first = Math.min(heading.y, content.y);
    expect(first - (header.y + header.height)).toBeGreaterThanOrEqual(24);
  }
});
