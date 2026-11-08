import { expect, test, type Page } from "@playwright/test";

/** An Ingredient's pill on the Ingredients list, found by its link. */
function pill(page: Page, name: string) {
  return page
    .locator(".ingredient-links > li")
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
  await pill(page, "Basil").hover();
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
  await pill(page, "Basil").hover();
  await page.getByRole("button", { name: "Add Basil to your basket" }).click();

  await expect(page).toHaveURL(/\/ingredients\?with=garlic,basil$/);
  await expect(page.locator(".toast-spot")).toHaveText("Basil added to your basket, 2 of 6.");
  await expect(opener(page)).toHaveAccessibleName("Your basket 2 of 6: Garlic, Basil");
  await expect(page.getByRole("button", { name: "Remove Basil from your basket" })).toBeFocused();
});

test("an Ingredient in the basket shows a bin that takes it out", async ({ page }) => {
  await page.goto("/ingredients?with=garlic,basil");
  await pill(page, "Basil").hover();
  await page.getByRole("button", { name: "Remove Basil from your basket" }).click();

  await expect(opener(page)).toHaveAccessibleName("Your basket 1 of 6: Garlic");
  await expect(page.getByRole("button", { name: "Add Basil to your basket" })).toBeFocused();
});

test("adding from the list to a full basket says why nothing was added", async ({ page }) => {
  await page.goto("/ingredients?with=lemon,lime,garlic,tomato,mint,sumac");
  await pill(page, "Basil").hover();
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
  await expect(main.locator(".ingredient-links").getByRole("link")).toHaveText(["Basil", "Doubanjiang"]);
  await expect(page.getByText("2 ingredients match.")).toBeVisible();
});

test("a name the Ingredients page doesn't have says so, and clearing shows every Ingredient", async ({ page }) => {
  await page.goto("/ingredients");
  await filter(page).fill("mango");
  await expect(page.getByText("“mango” isn’t in MySous yet.")).toBeVisible();
  await expect(page.getByText("Try another spelling, or clear the search to see every ingredient.")).toBeVisible();
  await expect(page.locator(".ingredient-links")).toHaveCount(0);

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
