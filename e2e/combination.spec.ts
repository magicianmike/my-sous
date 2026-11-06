import { expect, test, type Locator, type Page } from "@playwright/test";

/** On a phone, the Combination sits in a sheet opened from the bar, except on What to make. */
function inSheet(page: Page) {
  return test.info().project.use.isMobile && !new URL(page.url()).pathname.startsWith("/suggestions");
}

/** The tray: the side panel on desktop, or on a phone the sheet, opened from its bar. */
async function tray(page: Page) {
  if (!inSheet(page)) return page.getByRole("complementary", { name: /Your basket/ });
  const sheet = page.getByRole("dialog", { name: /Your basket/ });
  if (!(await sheet.isVisible())) await page.getByRole("button", { name: /^Your basket/ }).click();
  return sheet;
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

/** Checks the Combination without moving focus: on a phone, from the bar's name. */
async function expectCombination(page: Page, names: string[]) {
  if (inSheet(page)) {
    await expect(page.getByRole("button", { name: /^Your basket/ })).toHaveAccessibleName(
      `Your basket ${names.length} of 4${names.length > 0 ? `: ${names.join(", ")}` : ""}`,
    );
    return;
  }
  const shown = await tray(page);
  await expect(shown.getByRole("listitem")).toHaveText(names.map((name) => new RegExp(`^${name}`)));
  await expect(shown.getByRole("heading")).toContainText(`${names.length} of 4`);
}

test("a Cook builds a Combination, sees Suggestions and opens a Formula", async ({
  page,
  context,
}) => {
  await page.goto("/ingredients/chicken-thigh");
  await page.getByRole("button", { name: "Add Chicken thigh to your basket" }).click();
  await expectCombination(page, ["Chicken thigh"]);
  await page.getByRole("button", { name: "Add Garlic to your basket" }).click();
  await expectCombination(page, ["Chicken thigh", "Garlic"]);
  await expect(page).toHaveURL(/\/ingredients\/chicken-thigh\?with=chicken-thigh,garlic$/);

  await (await tray(page)).getByRole("link", { name: "See what to make" }).click();
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
  await expect(page.getByRole("listitem").filter({ hasText: /^Pat each piece of chicken thigh dry/ })).toBeVisible();
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
  await expect(suggestions.nth(0)).toContainText("Every Ingredient here pairs with every other.");
  await expect(suggestions.nth(1)).toContainText("Chicken thigh and garlic pair well.");
});

test("a Combination that doesn't pair still gets its closest Suggestions, each saying what doesn't pair", async ({
  page,
}) => {
  await page.goto("/suggestions?with=chicken-thigh,basil");
  await expect(suggestionList(page).getByRole("heading")).toHaveText(["Pan sauce", "Sheet-pan roast"]);
  await expect(suggestionList(page).getByRole("listitem").first()).toContainText("Chicken thigh and basil don't have a Pairing in MySous yet.");
  await expect(page.getByRole("heading", { name: "Not everything pairs yet" })).toHaveCount(0);
});

test("a Cook swaps a Slot by ticking one Ingredient and unticking another, sees the method follow, and undoes it", async ({
  page,
}) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  await expect(slot(page, "an acid")).toHaveText("Lemon");
  await expect(acid).toContainText(
    "Pairs with chicken thigh: Lemon juice goes into the tandoori marinade for chicken thighs",
  );
  await expect(acid.locator(".tag")).toHaveText(["Suggested"]);
  await expect(slotItem(page, "a soft herb")).toContainText("Optional");
  await expect(page.locator(".formula-readiness")).toContainText("Also needs an acid (lemon pairs best).");

  await acid.getByRole("button", { name: /^Options/ }).click();
  await acid.getByRole("checkbox", { name: "Lime" }).check();
  await expect(page.getByRole("status")).toHaveText("Lime is now also an acid. Undo takes it out.");
  await expect(acid.getByRole("checkbox", { name: "Lime" })).toBeFocused();
  await acid.getByRole("checkbox", { name: "Lemon" }).uncheck();

  await expect(slot(page, "an acid")).toHaveText("Lime");
  await expect(acid.locator(".tag")).toHaveText(["Added"]);
  await expect(page.getByRole("status")).toHaveText("Lemon taken out of an acid. Undo puts it back.");
  await expect(page.getByText(/then lime juice a little at a time/)).toBeVisible();
  await expect(page.locator(".formula-readiness")).toContainText("Also needs an acid (you chose lime).");
  // The list stays open, in the same order, for the next change.
  await expect(acid.getByRole("checkbox")).toHaveCount(9);
  await expect(acid.getByRole("checkbox", { name: "Lemon" })).toBeFocused();

  const undo = acid.getByRole("button", { name: "Undo change to an acid" });
  await undo.click();
  await expect(slot(page, "an acid")).toHaveText(["Lemon", "Lime"]);
  await expect(page.getByRole("status")).toHaveText("Undone: Lemon is back in an acid.");
  await expect(undo).toBeFocused();
  await undo.click();
  await expect(slot(page, "an acid")).toHaveText("Lemon");
  await expect(page.getByRole("status")).toHaveText("Undone: Lime taken out of an acid.");
  await expect(page.getByText(/then lemon juice a little at a time/)).toBeVisible();
  await expect(acid.getByRole("button", { name: /^Undo/ })).toHaveCount(0);
  await expect(acid.getByRole("heading", { name: "an acid" })).toBeFocused();
});

test("a Cook can take out a part's only Ingredient, and the part says it needs one", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const aromatic = slotItem(page, "an aromatic");
  await aromatic.getByRole("button", { name: /^Options/ }).click();
  await aromatic.getByRole("checkbox", { name: "Garlic" }).uncheck();

  await expect(slot(page, "an aromatic")).toHaveText("Needs an aromatic");
  await expect(aromatic).toContainText("Empty for now. Garlic pairs best with the rest of the dish. Choose one in Options.");
  await expect(page.getByRole("status")).toHaveText("Garlic taken out of an aromatic. Undo puts it back.");
  await expect(page.locator(".formula-readiness")).toContainText("Also needs an aromatic (garlic pairs best) and an acid");
  await expect(aromatic.getByRole("checkbox", { name: "Garlic" })).toBeFocused();

  await aromatic.getByRole("checkbox", { name: "Ginger" }).check();
  await expect(slot(page, "an aromatic")).toHaveText("Ginger");
  await expect(page.getByRole("status")).toHaveText("Ginger is now an aromatic. Undo takes it out.");
});

test("only the latest change offers Undo, and undoing it moves Undo to the change before", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  await acid.getByRole("button", { name: /^Options/ }).click();
  await acid.getByRole("checkbox", { name: "Lime" }).check();
  const aromatic = slotItem(page, "an aromatic");
  await aromatic.getByRole("button", { name: /^Options/ }).click();
  await aromatic.getByRole("checkbox", { checked: false }).first().check();

  await expect(page.getByRole("button", { name: /^Undo change/ })).toHaveCount(1);
  await aromatic.getByRole("button", { name: "Undo change to an aromatic" }).click();
  await expect(acid.getByRole("button", { name: "Undo change to an acid" })).toBeFocused();
});

test("a Formula ready with the Combination says so, in words", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic,lemon");
  await expect(page.locator(".formula-readiness")).toHaveText(/^Ready\s*Ready with your basket\.$/);
  await expect(slotItem(page, "an acid").locator(".tag")).toHaveText(["Yours"]);
});

test("unknown Ingredients in a link are dropped with a notice", async ({ page }) => {
  await page.goto("/suggestions?with=lemon,unicorn");
  await expectCombination(page, ["Lemon"]);
  await expect(await tray(page)).toContainText("aren’t in MySous yet, so they’re left out: unicorn.");
});

test("a full Combination says why nothing more can be added", async ({ page }) => {
  await page.goto("/ingredients/garlic?with=lemon,lime,basil,tomato");
  await page.getByRole("button", { name: "Add Garlic to your basket" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Your basket already holds 4 Ingredients, the most it can, so Suggestions stay focused. Remove one to add Garlic.",
  );
  await expect(page.locator(".toast-spot")).toHaveText(/^Your basket already holds 4 Ingredients/);
  await expectCombination(page, ["Lemon", "Lime", "Basil", "Tomato"]);
});

test("removing an Ingredient updates the Combination and announces it", async ({ page }) => {
  await page.goto("/ingredients/lemon?with=lemon,garlic");
  const shown = await tray(page);
  await shown.getByRole("button", { name: "Remove Lemon" }).click();
  await expectCombination(page, ["Garlic"]);
  // On a phone the change is made in the open sheet, so it's announced from there.
  const live = test.info().project.use.isMobile ? shown.getByRole("status") : page.getByRole("status");
  await expect(live).toHaveText("Lemon removed from your basket, 1 of 4.");
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
  await tabTo(page, page.getByRole("button", { name: "Add Chicken thigh to your basket" }));
  await page.keyboard.press("Enter");
  await expectCombination(page, ["Chicken thigh"]);
  await expect(
    page.getByRole("button", { name: "Remove Chicken thigh from your basket" }),
  ).toBeFocused();
  await tabTo(page, page.getByRole("button", { name: "Add Garlic to your basket" }));
  await page.keyboard.press("Enter");
  await expectCombination(page, ["Chicken thigh", "Garlic"]);
  await tabTo(page, page.getByRole("link", { name: "See what to make" }));
  await page.keyboard.press("Enter");
  await tabTo(page, page.getByRole("link", { name: "Pan sauce" }));
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1, name: "Pan sauce" })).toBeVisible();
  await expect(slot(page, "an aromatic")).toHaveText("Garlic");

  // Options and undo, still by keyboard.
  await tabTo(page, page.getByText("Options for an acid"));
  await page.keyboard.press("Enter");
  await tabTo(page, page.getByRole("checkbox", { name: "Lime" }));
  await page.keyboard.press("Space");
  await expect(slot(page, "an acid")).toHaveText(["Lemon", "Lime"]);
  await tabTo(page, page.getByRole("button", { name: "Undo change to an acid" }));
  await page.keyboard.press("Enter");
  await expect(slot(page, "an acid")).toHaveText("Lemon");
});

test("What to make shows the Combination under its heading, in place of the tray", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const shown = page.getByRole("main").getByRole("complementary", { name: /Your basket/ });
  await expect(shown.getByRole("listitem")).toHaveText([/^Chicken thigh/, /^Garlic/]);
  await expect(page.getByRole("complementary")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /^Your basket/ })).toHaveCount(0);

  await shown.getByRole("button", { name: "Remove Garlic" }).click();
  await expect(page.getByRole("status")).toHaveText("Garlic removed from your basket, 1 of 4.");
  await expect(shown.getByRole("heading", { name: /Your basket/ })).toBeFocused();
  await expect(suggestionList(page)).toBeVisible();
});

test("a change shows as a toast, which fades after a few seconds", async ({ page }) => {
  await page.goto("/ingredients/lemon");
  await page.getByRole("button", { name: "Add Lemon to your basket" }).first().click();
  const toast = page.locator(".toast-spot");
  await expect(toast).toHaveText("Lemon added to your basket, 1 of 4.");
  await expect(toast).toBeVisible();
  // It's for the eye only; the live region announces it.
  await expect(toast.getByRole("status")).toHaveCount(0);
  await expect(toast.locator("p")).toBeHidden({ timeout: 8000 });
});

test("a Cook opens an Ingredient from the tray and keeps the Combination", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  await (await tray(page)).getByRole("link", { name: "Garlic" }).click();

  await expect(page.getByRole("heading", { level: 1, name: "Garlic" })).toBeVisible();
  await expect(page).toHaveURL(/\/ingredients\/garlic\?with=chicken-thigh,garlic$/);
  await expectCombination(page, ["Chicken thigh", "Garlic"]);
});
