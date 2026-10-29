import { expect, test, type Locator, type Page } from "@playwright/test";

function tray(page: Page) {
  return page.getByRole("complementary", { name: /Your Combination/ });
}

/** A Formula's Slot, found by the heading that names its role. */
function slotItem(page: Page, role: string) {
  return page
    .getByRole("main")
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { level: 3, name: role }) });
}

/** What a Formula's Slot is filled with. */
function slot(page: Page, role: string) {
  return slotItem(page, role).locator(".slot-fill");
}

function suggestionList(page: Page) {
  return page.getByRole("list", { name: "Suggestions" });
}

async function expectCombination(page: Page, names: string[]) {
  await expect(tray(page).getByRole("listitem")).toHaveText(
    names.map((name) => new RegExp(`^${name}`)),
  );
  await expect(tray(page).getByRole("heading")).toContainText(`${names.length} of 4`);
}

test("a Cook builds a Combination, sees Suggestions and opens a Formula", async ({
  page,
  context,
}) => {
  await page.goto("/ingredients/chicken-thigh");
  await page.getByRole("button", { name: "Add Chicken thigh to Combination" }).click();
  await expectCombination(page, ["Chicken thigh"]);
  await page.getByRole("button", { name: "Add Garlic to Combination" }).click();
  await expectCombination(page, ["Chicken thigh", "Garlic"]);
  await expect(page).toHaveURL(/\/ingredients\/chicken-thigh\?with=chicken-thigh,garlic$/);

  await tray(page).getByRole("link", { name: "See what to make" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "What to make" })).toBeVisible();
  await expect(suggestionList(page).getByRole("heading")).toHaveText([
    "Pan sauce",
    "Sheet-pan roast",
  ]);

  await page.getByRole("link", { name: "Pan sauce" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Pan sauce" })).toBeVisible();
  await expect(slot(page, "something to sear")).toHaveText("Chicken thigh");
  await expect(slot(page, "an aromatic")).toHaveText("Garlic");
  await expect(slot(page, "an acid")).toHaveText("Lemon");
  await expect(page.getByRole("listitem").filter({ hasText: /^Season chicken thigh/ })).toBeVisible();
  const formulaUrl = page.url();

  // Back and forward step through the Combination's history.
  await page.goBack();
  await expect(page).toHaveURL(/\/suggestions\?with=chicken-thigh,garlic$/);
  await page.goBack();
  await expectCombination(page, ["Chicken thigh", "Garlic"]);
  await page.goBack();
  await expectCombination(page, ["Chicken thigh"]);
  await page.goForward();
  await expectCombination(page, ["Chicken thigh", "Garlic"]);

  // A copied link reopens the exact Combination.
  const reopened = await context.newPage();
  await reopened.goto(formulaUrl);
  await expect(slot(reopened, "something to sear")).toHaveText("Chicken thigh");
  await expectCombination(reopened, ["Chicken thigh", "Garlic"]);
});

test("Suggestions are ranked by how well their Ingredients pair, with a reason", async ({
  page,
}) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic,tomato");

  const suggestions = suggestionList(page).getByRole("listitem");
  await expect(suggestions.getByRole("heading")).toHaveText(["Sheet-pan roast", "Pan sauce"]);
  await expect(suggestions.nth(0)).toContainText("Everything here pairs with garlic.");
  await expect(suggestions.nth(1)).toContainText("Chicken thigh and garlic pair well.");
});

test("a Combination that doesn't pair names the tension, and a swap resolves it", async ({
  page,
}) => {
  await page.goto("/suggestions?with=chicken-thigh,basil");
  const tensions = page.getByRole("region", { name: "Not everything pairs yet" });
  await expect(tensions.getByRole("listitem")).toHaveText([
    "Chicken thigh and basil don’t have a Pairing in MySous.",
  ]);
  await expect(tensions).toContainText("Swap or remove one?");
  // The closest Suggestions still show, with their gaps.
  await expect(suggestionList(page).getByRole("heading")).toHaveText(["Pan sauce", "Sheet-pan roast"]);

  await tensions.getByRole("button", { name: "Swap basil for cilantro" }).click();

  await expect(page).toHaveURL(/\/suggestions\?with=chicken-thigh,cilantro$/);
  await expectCombination(page, ["Chicken thigh", "Cilantro"]);
  await expect(tensions).toBeHidden();
  await expect(page.getByRole("heading", { name: "Suggestions" })).toBeFocused();
  await expect(suggestionList(page).getByRole("listitem").first()).toContainText(
    "Chicken thigh and cilantro pair well.",
  );
  await expect(page.getByRole("status")).toHaveText(
    "Basil swapped for cilantro in your Combination.",
  );

  await page.goBack();
  await expect(tensions).toBeVisible();
});

test("every Ingredient in a tension gets one next step, and removing works too", async ({
  page,
}) => {
  await page.goto("/suggestions?with=chicken-thigh,basil,ginger");
  const tensions = page.getByRole("region", { name: "Not everything pairs yet" });
  await expect(tensions.getByRole("listitem")).toHaveText([
    "Chicken thigh and basil don’t have a Pairing in MySous.",
    "Basil and ginger don’t have a Pairing in MySous.",
  ]);
  // Garlic pairs with chicken thigh and basil; nothing pairs with all the rest for the others.
  await expect(tensions.getByRole("button")).toHaveText([
    "Remove chicken thigh",
    "Remove basil",
    "Swap ginger for garlic",
  ]);

  await tensions.getByRole("button", { name: "Remove basil" }).click();
  await expectCombination(page, ["Chicken thigh", "Ginger"]);
  await expect(tensions).toBeHidden();
});

test("a Cook swaps a Slot, sees the method follow, and undoes it", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  await expect(slot(page, "an acid")).toHaveText("Lemon");
  await expect(acid).toContainText(
    "Pairs with chicken thigh: Lemon's acid balances the rich fat of chicken thigh.",
  );
  await expect(slotItem(page, "a soft herb (optional)")).toBeVisible();

  await acid.getByText("Swap").click();
  await acid.getByRole("button", { name: "Use Lime" }).click();

  await expect(slot(page, "an acid")).toHaveText("Lime");
  await expect(page.getByRole("main").getByRole("status")).toHaveText(
    "Lime is now an acid. Undo brings back lemon.",
  );
  await expect(page.getByText(/then add lime a little at a time/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Undo swap" })).toBeFocused();

  await page.getByRole("button", { name: "Undo swap" }).click();
  await expect(slot(page, "an acid")).toHaveText("Lemon");
  await expect(page.getByRole("main").getByRole("status")).toHaveText(
    "Undone: Lemon is an acid again.",
  );
  await expect(page.getByText(/then add lemon a little at a time/)).toBeVisible();
});

test("unknown Ingredients in a link are dropped with a notice", async ({ page }) => {
  await page.goto("/suggestions?with=lemon,unicorn");
  await expectCombination(page, ["Lemon"]);
  await expect(tray(page)).toContainText("aren’t in MySous yet, so they’re left out: unicorn.");
});

test("a full Combination says why nothing more can be added", async ({ page }) => {
  await page.goto("/ingredients/garlic?with=lemon,lime,basil,tomato");
  await page.getByRole("button", { name: "Add Garlic to Combination" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Your Combination already holds 4 Ingredients, the most it can, so Suggestions stay focused. Remove one to add Garlic.",
  );
  await expect(page.getByRole("status")).toBeVisible();
  await expectCombination(page, ["Lemon", "Lime", "Basil", "Tomato"]);
});

test("removing an Ingredient updates the Combination and announces it", async ({ page }) => {
  await page.goto("/ingredients/lemon?with=lemon,garlic");
  await tray(page).getByRole("button", { name: "Remove Lemon" }).click();
  await expectCombination(page, ["Garlic"]);
  await expect(page.getByRole("status")).toHaveText("Lemon removed from Combination, 1 of 4.");
});

async function tabTo(page: Page, target: Locator) {
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((el) => el === document.activeElement)) return;
  }
  throw new Error(`Tab never reached ${target}`);
}

test("the whole journey works with the keyboard alone", async ({ page }) => {
  await page.goto("/ingredients/chicken-thigh");
  await tabTo(page, page.getByRole("button", { name: "Add Chicken thigh to Combination" }));
  await page.keyboard.press("Enter");
  await expectCombination(page, ["Chicken thigh"]);
  await expect(
    page.getByRole("button", { name: "Remove Chicken thigh from Combination" }),
  ).toBeFocused();
  await tabTo(page, page.getByRole("button", { name: "Add Garlic to Combination" }));
  await page.keyboard.press("Enter");
  await expectCombination(page, ["Chicken thigh", "Garlic"]);
  await tabTo(page, page.getByRole("link", { name: "See what to make" }));
  await page.keyboard.press("Enter");
  await tabTo(page, page.getByRole("link", { name: "Pan sauce" }));
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1, name: "Pan sauce" })).toBeVisible();
  await expect(slot(page, "an aromatic")).toHaveText("Garlic");

  // Swap and undo, still by keyboard.
  await tabTo(page, page.getByText("Swap an acid"));
  await page.keyboard.press("Enter");
  await tabTo(page, page.getByRole("button", { name: "Use Lime" }));
  await page.keyboard.press("Enter");
  await expect(slot(page, "an acid")).toHaveText("Lime");
  await expect(page.getByRole("button", { name: "Undo swap" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(slot(page, "an acid")).toHaveText("Lemon");
});
