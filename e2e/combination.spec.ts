import { expect, test, type Locator, type Page } from "@playwright/test";

/** On a phone, the Combination sits in a sheet opened from the bar, except on What to make. */
function inSheet(page: Page) {
  return test.info().project.use.isMobile && !new URL(page.url()).pathname.startsWith("/suggestions");
}

/** The tray: the side panel on desktop, or on a phone the sheet, opened from its bar. */
async function tray(page: Page) {
  if (!inSheet(page)) return page.getByRole("complementary", { name: /Your Combination/ });
  const sheet = page.getByRole("dialog", { name: /Your Combination/ });
  if (!(await sheet.isVisible())) await page.getByRole("button", { name: /^Your Combination/ }).click();
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
    await expect(page.getByRole("button", { name: /^Your Combination/ })).toHaveAccessibleName(
      `Your Combination ${names.length} of 4${names.length > 0 ? `: ${names.join(", ")}` : ""}`,
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
  await page.getByRole("button", { name: "Add Chicken thigh to Combination" }).click();
  await expectCombination(page, ["Chicken thigh"]);
  await page.getByRole("button", { name: "Add Garlic to Combination" }).click();
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
  await expect(await tray(page)).toContainText("aren’t in MySous yet, so they’re left out: unicorn.");
});

test("a full Combination says why nothing more can be added", async ({ page }) => {
  await page.goto("/ingredients/garlic?with=lemon,lime,basil,tomato");
  await page.getByRole("button", { name: "Add Garlic to Combination" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Your Combination already holds 4 Ingredients, the most it can, so Suggestions stay focused. Remove one to add Garlic.",
  );
  await expect(page.locator(".toast-spot")).toHaveText(/^Your Combination already holds 4 Ingredients/);
  await expectCombination(page, ["Lemon", "Lime", "Basil", "Tomato"]);
});

test("removing an Ingredient updates the Combination and announces it", async ({ page }) => {
  await page.goto("/ingredients/lemon?with=lemon,garlic");
  const shown = await tray(page);
  await shown.getByRole("button", { name: "Remove Lemon" }).click();
  await expectCombination(page, ["Garlic"]);
  // On a phone the change is made in the open sheet, so it's announced from there.
  const live = test.info().project.use.isMobile ? shown.getByRole("status") : page.getByRole("status");
  await expect(live).toHaveText("Lemon removed from Combination, 1 of 4.");
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

test("What to make shows the Combination under its heading, in place of the tray", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const shown = page.getByRole("main").getByRole("complementary", { name: /Your Combination/ });
  await expect(shown.getByRole("listitem")).toHaveText([/^Chicken thigh/, /^Garlic/]);
  await expect(page.getByRole("complementary")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /^Your Combination/ })).toHaveCount(0);

  await shown.getByRole("button", { name: "Remove Garlic" }).click();
  await expect(page.getByRole("status")).toHaveText("Garlic removed from Combination, 1 of 4.");
  await expect(shown.getByRole("heading", { name: /Your Combination/ })).toBeFocused();
  await expect(suggestionList(page)).toBeVisible();
});

test("a change shows as a toast, which fades after a few seconds", async ({ page }) => {
  await page.goto("/ingredients/lemon");
  await page.getByRole("button", { name: "Add Lemon to Combination" }).first().click();
  const toast = page.locator(".toast-spot");
  await expect(toast).toHaveText("Lemon added to Combination, 1 of 4.");
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
