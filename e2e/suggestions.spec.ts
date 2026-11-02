import { expect, test, type Page } from "@playwright/test";

/** A Suggestion's card on What to make, found by its Formula's name. */
function card(page: Page, formula: string) {
  return page
    .getByRole("list", { name: "Suggestions" })
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { level: 3, name: formula }) });
}

/** A Formula's Slot, found by the heading that names its role. */
function slotItem(page: Page, role: string) {
  return page
    .getByRole("main")
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { level: 3, name: role }) });
}

test("a Suggestion the Combination fills says Ready, in words", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic,lemon");
  const panSauce = card(page, "Pan sauce");
  await expect(panSauce).toContainText("Ready");
  await expect(panSauce).not.toContainText("Also needs");
  await expect(panSauce.getByText(/^Yours/)).toHaveText("Yours: chicken thigh, garlic, lemon.");
});

test("a Suggestion that needs more says how many, what, and what pairs best", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const panSauce = card(page, "Pan sauce");
  await expect(panSauce).toContainText("Needs 1 more");
  await expect(panSauce).toContainText("Also needs an acid (lemon pairs best).");
  await expect(panSauce.getByText(/^Yours/)).toHaveText("Yours: chicken thigh, garlic.");
  await expect(panSauce.getByText(/^Suggested/)).toContainText("lemon");
});

test("What to make says Ready only covers the Combination while MySous doesn't know the Pantry", async ({
  page,
}) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  await expect(page.getByRole("main")).toContainText("MySous doesn’t know your Pantry yet");
});

test("a required Slot nothing pairs with shows as open, with the choice still there", async ({ page }) => {
  await page.goto("/formulas/sheet-pan-roast?with=ginger");
  const vegetable = slotItem(page, "a vegetable");
  await expect(vegetable.locator(".slot-fill")).toHaveText("Nothing yet");
  await expect(vegetable.locator(".tag")).toHaveCount(0);
  await expect(page.locator(".formula-readiness")).toContainText("a vegetable (nothing pairs yet)");

  await vegetable.getByText("Choose").click();
  await vegetable.getByRole("button", { name: /^Use / }).first().click();
  await expect(vegetable.locator(".tag")).toHaveText(["Swapped"]);
  await expect(page.getByRole("status")).toHaveText(/ is now a vegetable\.$/);
});

test("with no Combination, What to make shows four open Slots and one way forward", async ({ page }) => {
  await page.goto("/suggestions");
  const nothing = page.getByRole("region", { name: "Nothing to suggest yet" });
  await expect(nothing).toBeVisible();
  await expect(page.getByRole("list", { name: "Suggestions" })).toHaveCount(0);
  await nothing.getByRole("link", { name: "Find an Ingredient" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("removing the last Ingredient on What to make moves focus to what replaces it", async ({ page }) => {
  await page.goto("/suggestions?with=lemon");
  await page.getByRole("button", { name: "Remove Lemon" }).click();
  await expect(page.getByRole("heading", { name: "Nothing to suggest yet" })).toBeFocused();
});

test("a tension shows both Ingredients and names them in words", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,basil,ginger");
  const tension = page.locator(".tension").first();
  await expect(tension.locator("svg")).toHaveCount(2);
  await expect(tension).toHaveText("Chicken thigh and basil don’t have a Pairing in MySous.");
});
