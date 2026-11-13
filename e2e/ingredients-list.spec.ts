import { expect, test, type Page } from "@playwright/test";

/** An Ingredient's tile on the Ingredients list, found by its link. */
function tile(page: Page, name: string) {
  return page
    .locator(".ingredient-gallery > li")
    .filter({ has: page.getByRole("link", { name, exact: true }) });
}

const opener = (page: Page) => page.getByRole("button", { name: /^Your basket/ });

test("with a mouse, an Ingredient's plus shows only under the pointer or on keyboard focus", async ({
  page,
  isMobile,
}) => {
  await page.goto("/ingredients");
  const add = page.getByRole("button", { name: "Add Basil to your basket" });
  const opacity = () => add.evaluate((el) => getComputedStyle(el).opacity);
  if (isMobile) {
    // Nothing hovers on touch, so it always shows.
    expect(await opacity()).toBe("1");
    return;
  }
  await expect.poll(opacity).toBe("0");
  await tile(page, "Basil").hover();
  await expect.poll(opacity).toBe("1");
  await page.mouse.move(0, 0);
  await expect.poll(opacity).toBe("0");
  await add.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect.poll(opacity).toBe("1");
});

test("one click adds an Ingredient from the list, and the Cook stays on it", async ({ page }) => {
  await page.goto("/ingredients?with=garlic");
  await tile(page, "Basil").hover();
  await page.getByRole("button", { name: "Add Basil to your basket" }).click();

  await expect(page).toHaveURL(/\/ingredients\?with=garlic,basil$/);
  await expect(page.locator(".toast-spot")).toHaveText("Basil added to your basket, 2 of 6.");
  await expect(opener(page)).toHaveAccessibleName("Your basket 2 of 6: Garlic, Basil");
  await expect(page.getByRole("button", { name: "Remove Basil from your basket" })).toBeFocused();
});

test("an Ingredient in the basket shows a bin that takes it out", async ({ page }) => {
  await page.goto("/ingredients?with=garlic,basil");
  await tile(page, "Basil").hover();
  await page.getByRole("button", { name: "Remove Basil from your basket" }).click();

  await expect(opener(page)).toHaveAccessibleName("Your basket 1 of 6: Garlic");
  await expect(page.getByRole("button", { name: "Add Basil to your basket" })).toBeFocused();
});

test("adding from the list to a full basket says why nothing was added", async ({ page }) => {
  await page.goto("/ingredients?with=lemon,lime,garlic,tomato,mint,sumac");
  await tile(page, "Basil").hover();
  const add = page.getByRole("button", { name: "Add Basil to your basket" });
  await add.click();

  await expect(page.locator(".toast-spot")).toHaveText(/^Your basket already holds 6 Ingredients.*Remove one to add Basil\.$/);
  await expect(opener(page)).toHaveAccessibleName(/^Your basket 6 of 6/);
  await expect(add).toBeFocused();
});

const filter = (page: Page) => page.getByRole("searchbox", { name: "Find an ingredient" });

test("typing in the Ingredients page's search narrows the list below it, with a count", async ({ page }) => {
  await page.goto("/ingredients");
  await filter(page).fill("ba");
  const main = page.getByRole("main");
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await expect(main.getByRole("heading", { level: 2 })).toHaveText(["Herbs", "Condiments"]);
  await expect(main.locator(".ingredient-gallery").getByRole("link")).toHaveText(["Basil", "Doubanjiang"]);
  await expect(page.getByText("2 ingredients match.")).toBeVisible();
});

test("a name the Ingredients page doesn't have says so, and clearing shows every Ingredient", async ({ page }) => {
  await page.goto("/ingredients");
  await filter(page).fill("mango");
  await expect(page.getByText("“mango” isn’t in MySous yet.")).toBeVisible();
  await expect(page.getByText("Try another spelling, or clear the search to see every ingredient.")).toBeVisible();
  await expect(page.locator(".ingredient-gallery")).toHaveCount(0);

  await filter(page).fill("");
  await expect(page.getByRole("main").getByRole("region", { name: "Herbs" })).toBeVisible();
});

test("Enter opens the one Ingredient that matches", async ({ page }) => {
  await page.goto("/ingredients?with=garlic");
  await filter(page).fill("basi");
  await filter(page).press("Enter");
  await expect(page).toHaveURL(/\/ingredients\/basil\?with=garlic$/);
  await expect(page.getByRole("heading", { level: 1, name: "Basil" })).toBeVisible();
});

test("an Ingredient in the basket has a solid border on the list", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/ingredients?with=basil");
  const link = (name: string) => tile(page, name).getByRole("link");
  // The ink colour, in the light theme.
  await expect(link("Basil")).toHaveCSS("border-color", "rgb(31, 38, 32)");
  await expect(link("Mint")).toHaveCSS("border-color", "rgba(0, 0, 0, 0)");
  // Every tile keeps the border's room, so nothing moves when one is added.
  const [basil, mint] = await Promise.all([link("Basil").boundingBox(), link("Mint").boundingBox()]);
  expect(basil!.height).toBe(mint!.height);
});

test("the kinds index links to each kind on the page, with its count, and narrows with the search", async ({ page }) => {
  await page.goto("/ingredients");
  const index = page.getByRole("navigation", { name: "Kinds of ingredient" });
  await expect(index.getByRole("link").first()).toHaveText("Herbs 6");
  await index.getByRole("link", { name: /^Condiments/ }).click();
  await expect(page).toHaveURL(/#category-condiment$/);
  await expect(page.getByRole("heading", { level: 2, name: "Condiments" })).toBeInViewport();

  await filter(page).fill("ba");
  await expect(index.getByRole("link")).toHaveText(["Herbs 1", "Condiments 1"]);
  await filter(page).fill("mango");
  await expect(index).toHaveCount(0);
});

test("on a wide screen, the search and the kinds stay in view beside the drawings", async ({ page, isMobile }) => {
  test.skip(isMobile, "a phone shows them above the drawings");
  await page.goto("/ingredients");
  await page.getByRole("heading", { level: 2, name: "Blends" }).scrollIntoViewIfNeeded();
  await expect(filter(page)).toBeInViewport();
  await expect(page.getByRole("navigation", { name: "Kinds of ingredient" })).toBeInViewport();
});
