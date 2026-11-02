import { expect, test, type Page } from "@playwright/test";

/** Puts Ingredients in the Pantry as a returning Cook's browser would have them, then opens `path`. */
async function withPantry(page: Page, ids: string[], path: string) {
  await page.goto("/pantry");
  await page.evaluate((ids) => localStorage.setItem("mysous.pantry", JSON.stringify(ids)), ids);
  await page.goto(path);
}

const pantryList = (page: Page) =>
  page.getByRole("region", { name: /^In your Pantry/ }).getByRole("listitem");

/** A Suggestion's card on What to make, found by its dish's name. */
function card(page: Page, dish: string) {
  return page
    .getByRole("list", { name: "Suggestions" })
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { level: 3, name: dish }) });
}

/** A part of a dish, found by the heading that names its role. */
function part(page: Page, role: string) {
  return page
    .getByRole("main")
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { level: 3, name: role }) });
}

test("a Cook fills their Pantry, it's kept after a reload, and what they can make now comes first", async ({
  page,
}) => {
  await page.goto("/pantry");
  await expect(page.getByText("Nothing here yet.")).toBeVisible();

  // By name, and the field clears for the next one.
  const search = page.getByRole("combobox", { name: "Find an ingredient to add" });
  await search.fill("chicken");
  await search.press("Enter");
  await expect(search).toHaveValue("");
  await expect(page.getByRole("status").filter({ hasText: "Chicken thigh added" })).toHaveText(
    "Chicken thigh added to your Pantry, 1 ingredient.",
  );

  // By tapping staples.
  await page.getByRole("button", { name: "Garlic", exact: true }).click();
  await page.getByRole("button", { name: "Lemon", exact: true }).click();
  await page.getByRole("button", { name: "Lime", exact: true }).click();
  const garlicStaple = page.getByRole("button", { name: "Garlic", exact: true });
  await expect(garlicStaple).toHaveAttribute("aria-pressed", "true");
  await expect(pantryList(page)).toHaveText([/^Chicken thigh/, /^Garlic/, /^Lemon/, /^Lime/]);
  await expect(page.getByRole("link", { name: /^Pantry/ })).toHaveText(/^Pantry\s*·\s*4\s*ingredients$/);

  // Removing, from the list or by tapping a staple again.
  await page.getByRole("button", { name: "Remove Lime from your Pantry" }).click();
  await expect(page.getByRole("heading", { name: /^In your Pantry/ })).toBeFocused();
  await expect(pantryList(page)).toHaveCount(3);

  await page.reload();
  await expect(pantryList(page)).toHaveText([/^Chicken thigh/, /^Garlic/, /^Lemon/]);

  await page.goto("/suggestions?with=chicken-thigh");
  const first = page.getByRole("list", { name: "Suggestions" }).getByRole("listitem").first();
  await expect(first.getByRole("heading", { level: 3 })).toHaveText("Pan sauce");
  await expect(first).toContainText("Ready");
  await expect(page.getByRole("main")).toContainText("Ready means your Pantry has every part a dish needs");
});

test("with a Pantry, a dish marks what's on hand and what you'd need, in words", async ({ page }) => {
  await withPantry(page, ["garlic", "lemon", "lime"], "/formulas/pan-sauce?with=chicken-thigh,garlic");

  const says = async (role: string, tags: string[], availability: string) => {
    await expect(part(page, role).locator(".tag")).toHaveText(tags);
    await expect(part(page, role).locator(".slot-availability, .tag")).toContainText([availability]);
  };
  await says("something to sear", ["Yours"], "You’d need this");
  await says("an aromatic", ["Yours"], "In your Pantry");
  // From the Pantry, the tag already says so.
  await expect(part(page, "an acid").locator(".tag")).toHaveText(["In your Pantry"]);
  await expect(part(page, "an acid").locator(".slot-availability")).toHaveCount(0);
  await expect(page.locator(".formula-readiness")).toContainText(
    "Also needs something to sear (chicken thigh, not in your Pantry).",
  );

  // Lemon fills the acid from the Pantry; lime, also there, is a choice marked as on hand.
  const acid = part(page, "an acid");
  await acid.getByText("Swap").click();
  await expect(acid.getByRole("button", { name: /^Use Lime\s*,\s*in Pantry$/ })).toBeVisible();
});

test("with a Pantry, the basket marks what's already in it", async ({ page }) => {
  await withPantry(page, ["garlic"], "/suggestions?with=chicken-thigh,garlic");
  const basket = page.locator(".suggestions-combination li");
  await expect(basket).toHaveText([/^Chicken thigh(?!.*in Pantry)/, /^Garlic, in Pantry/]);
});

test("with storage blocked, the Pantry lasts the visit, says so, and the app still works", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const blocked = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
    Object.defineProperty(window, "localStorage", { get: blocked });
  });
  await page.goto("/pantry?with=chicken-thigh");
  await expect(page.getByText("This browser isn’t letting MySous save")).toBeVisible();

  for (const name of ["Garlic", "Lemon"]) await page.getByRole("button", { name, exact: true }).click();
  await expect(pantryList(page)).toHaveCount(2);

  // Moving within the app keeps the Pantry for the visit.
  await page.getByRole("link", { name: "See what to make" }).first().click();
  await expect(page.getByRole("main")).toContainText("Ready means your Pantry has every part a dish needs");
  await expect(page.getByRole("link", { name: /^Pantry/ })).toHaveText(/^Pantry\s*·\s*2\s*ingredients$/);
});
