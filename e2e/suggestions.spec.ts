import { expect, test, type Page } from "@playwright/test";

/** A Suggestion's card on What to make, found by its Formula's name. */
function card(page: Page, formula: string) {
  return page
    .getByRole("list", { name: "Suggestions" })
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { level: 3, name: formula }) });
}

/** The links in a card's group of drawings, such as the group "Yours". */
function marks(page: Page, formula: string, group: string) {
  return card(page, formula).getByRole("group", { name: group }).getByRole("link");
}

/** The names of the Ingredients a card's group of drawings links to. */
function markNames(page: Page, formula: string, group: string) {
  return marks(page, formula, group).evaluateAll((links) => links.map((link) => link.getAttribute("aria-label")));
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
  expect(await markNames(page, "Pan sauce", "Yours")).toEqual(["Chicken thigh", "Garlic", "Lemon"]);
});

test("a Suggestion that needs more says how many, what, and what pairs best", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const panSauce = card(page, "Pan sauce");
  await expect(panSauce).toContainText("Needs 1 more");
  await expect(panSauce).toContainText("Also needs an acid (lemon pairs best).");
  expect(await markNames(page, "Pan sauce", "Yours")).toEqual(["Chicken thigh", "Garlic"]);
  // Only the acid is needed; the basil and chile that pair are optional extras, kept apart.
  expect(await markNames(page, "Pan sauce", "Suggested")).toEqual(["Lemon"]);
  expect(await markNames(page, "Pan sauce", "Optional")).toEqual(["Basil", "Fresh chile"]);
  await expect(panSauce.getByRole("link", { name: "lemon", exact: true })).toBeVisible();
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

test("an Ingredient's drawing and its name both open its page", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  await marks(page, "Pan sauce", "Suggested").first().click();
  await expect(page).toHaveURL(/\/ingredients\/lemon\?with=chicken-thigh,garlic$/);

  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  await acid.getByRole("link", { name: "Lemon" }).click();
  await expect(page).toHaveURL(/\/ingredients\/lemon\?with=chicken-thigh,garlic$/);

  await page.goBack();
  await slotItem(page, "an acid").locator("a.mark-link").click();
  await expect(page).toHaveURL(/\/ingredients\/lemon\?with=chicken-thigh,garlic$/);
});

test("links stand without underlines except in a sentence, and change colour under the pointer", async ({
  page,
  isMobile,
}) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const panSauce = card(page, "Pan sauce");
  const title = panSauce.getByRole("link", { name: "Pan sauce" });
  const inSentence = panSauce.getByRole("link", { name: "lemon", exact: true });
  const decoration = (link: typeof title) => link.evaluate((el) => getComputedStyle(el).textDecorationLine);
  expect(await decoration(title)).toBe("none");
  expect(await decoration(inSentence)).toBe("underline");

  test.skip(isMobile, "hover is for a pointer");
  const colour = () => title.evaluate((el) => getComputedStyle(el).color);
  const before = await colour();
  await title.hover();
  await expect.poll(colour).not.toBe(before);
});

test("where a part's Ingredient came from sits quietly in the row's top corner", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  const [tag, fill, row] = await Promise.all([
    acid.locator(".tag").boundingBox(),
    acid.locator(".slot-fill").boundingBox(),
    acid.boundingBox(),
  ]);
  expect(tag!.y).toBeLessThan(fill!.y);
  expect(tag!.x + tag!.width).toBeGreaterThan(row!.x + row!.width * 0.75);
});

test("removing from the Combination is a bin icon, still named in words", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const remove = page.getByRole("button", { name: "Remove Garlic" });
  await expect(remove.locator("svg")).toHaveCount(1);
  await expect(remove.getByText("Remove Garlic")).toHaveClass(/visually-hidden/);
});
