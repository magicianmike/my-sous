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

test("makeable Suggestions come first, each saying so, and Ready is explained by the basket", async ({
  page,
}) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic,lemon");
  await expect(page.getByRole("main")).toContainText("Ready means your basket fills every part a dish needs.");
  const first = page.getByRole("list", { name: "Suggestions" }).getByRole("listitem").first();
  await expect(first).toContainText("Ready with your basket.");
});

test("a required Slot nothing pairs with shows as open, with the choice still there", async ({ page }) => {
  await page.goto("/formulas/sheet-pan-roast?with=ginger");
  const vegetable = slotItem(page, "a vegetable");
  await expect(vegetable.locator(".slot-fill")).toHaveText("Needs a vegetable");
  await expect(vegetable.locator(".tag")).toHaveCount(0);
  await expect(page.locator(".formula-readiness")).toContainText("a vegetable (nothing pairs yet)");

  await vegetable.getByRole("button", { name: /^Options/ }).click();
  await vegetable.getByRole("checkbox").first().check();
  await expect(vegetable.locator(".tag")).toHaveText(["Added"]);
  await expect(page.getByRole("status")).toHaveText("Tomato is now a vegetable. Undo takes it out.");
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

test("where a part's Ingredient came from sits quietly at the end of its name's line", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  const [tag, fill, row] = await Promise.all([
    acid.locator(".tag").boundingBox(),
    acid.locator(".slot-fill").boundingBox(),
    acid.boundingBox(),
  ]);
  expect(tag!.y + tag!.height / 2).toBeGreaterThan(fill!.y);
  expect(tag!.y + tag!.height / 2).toBeLessThan(fill!.y + fill!.height);
  expect(tag!.x + tag!.width).toBeGreaterThan(row!.x + row!.width * 0.75);
});

test("removing from the Combination is a bin icon, still named in words", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const remove = page.getByRole("button", { name: "Remove Garlic" });
  await expect(remove.locator("svg")).toHaveCount(1);
  await expect(remove.getByText("Remove Garlic")).toHaveClass(/visually-hidden/);
});

test("only a drawing shown without its name rings under the pointer", async ({ page, isMobile }) => {
  test.skip(isMobile, "hover is for a pointer");
  const ring = (target: ReturnType<Page["locator"]>) =>
    target.locator(".ingredient-mark").evaluate((el) => getComputedStyle(el).boxShadow);
  const places: [string, (page: Page) => ReturnType<Page["locator"]>, boolean][] = [
    ["/suggestions?with=chicken-thigh,garlic", (page) => marks(page, "Pan sauce", "Suggested").first(), true],
    ["/ingredients", (page) => page.getByRole("main").getByRole("link", { name: "Lemon" }), false],
    ["/formulas/pan-sauce?with=chicken-thigh,garlic", (page) => slotItem(page, "an acid").locator("a.mark-link"), false],
  ];
  for (const [path, target, rings] of places) {
    await page.goto(path);
    expect(await ring(target(page))).toBe("none");
    await target(page).hover();
    if (rings) await expect.poll(() => ring(target(page))).not.toBe("none");
    else {
      await page.waitForTimeout(300);
      expect(await ring(target(page))).toBe("none");
    }
  }
});

test("a drawing shown without its name gives the name in a tooltip, on hover or focus, until Escape", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "hover and Tab are for a pointer and a keyboard");
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const lemon = marks(page, "Pan sauce", "Suggested").first();
  const tooltip = card(page, "Pan sauce").getByText("Lemon", { exact: true });
  await expect(tooltip).toHaveCount(0);

  await lemon.hover();
  await expect(tooltip).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(tooltip).toHaveCount(0);
  await page.mouse.move(0, 0);

  await lemon.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(lemon).toBeFocused();
  await expect(tooltip).toBeVisible();
  // The name is the link's own; the tooltip doesn't read it twice.
  await expect(lemon).toHaveAccessibleName("Lemon");
});

test("What to make shows the Combination's Ingredients side by side, each as wide as its name", async ({ page }) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const items = page.locator(".suggestions-combination li");
  const [first, second] = await Promise.all([items.nth(0).boundingBox(), items.nth(1).boundingBox()]);
  expect(second!.y).toBe(first!.y);
  expect(second!.x).toBeGreaterThan(first!.x + first!.width - 1);
});

test("with a mouse, an Ingredient's bin shows only under the pointer or on keyboard focus", async ({
  page,
  isMobile,
}) => {
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const remove = page.getByRole("button", { name: "Remove Garlic" });
  const opacity = () => remove.evaluate((el) => getComputedStyle(el).opacity);
  if (isMobile) {
    // Nothing hovers on touch, so it always shows.
    expect(await opacity()).toBe("1");
    return;
  }
  await expect.poll(opacity).toBe("0");
  await page.locator(".suggestions-combination li").filter({ hasText: "Garlic" }).hover();
  await expect.poll(opacity).toBe("1");
  await page.mouse.move(0, 0);
  await expect.poll(opacity).toBe("0");
  await remove.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect.poll(opacity).toBe("1");
});

test("an Ingredient's bin turns red under the pointer", async ({ page, isMobile }) => {
  test.skip(isMobile, "hover is for a pointer");
  await page.goto("/suggestions?with=chicken-thigh,garlic");
  const remove = page.getByRole("button", { name: "Remove Garlic" });
  await remove.hover();
  // The danger token: #b3261e in the light theme.
  await expect.poll(() => remove.evaluate((el) => getComputedStyle(el).color)).toBe("rgb(179, 38, 30)");
});

test("a suggested Ingredient on a dish can be added to the basket, and its part becomes the Cook's own", async ({
  page,
}) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  // The Cook's own parts have nothing to add.
  await expect(slotItem(page, "an aromatic").getByRole("button", { name: /^Add / })).toHaveCount(0);

  await acid.getByRole("button", { name: "Add Lemon to your basket" }).click();
  await expect(page).toHaveURL(/with=chicken-thigh,garlic,lemon$/);
  await expect(page.getByRole("status")).toHaveText("Lemon added to your basket, 3 of 4.");
  await expect(acid.locator(".tag")).toHaveText(["Yours"]);
  await expect(acid.getByRole("button", { name: /^Add / })).toHaveCount(0);
  await expect(acid.getByRole("heading", { name: "an acid" })).toBeFocused();
});

test("the basket's Ingredients sit side by side in the side panel too", async ({ page, isMobile }) => {
  test.skip(isMobile, "the side panel is the wide layout");
  await page.goto("/ingredients/lemon?with=lemon,garlic");
  const items = page.locator(".tray-panel li");
  const [first, second] = await Promise.all([items.nth(0).boundingBox(), items.nth(1).boundingBox()]);
  expect(second!.y).toBe(first!.y);
});

test("a part's Options sit at the end of its top row, and open above what's in it", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  const options = acid.getByRole("button", { name: "Options for an acid" });
  await expect(options).toHaveAttribute("aria-expanded", "false");
  await options.click();
  await expect(options).toHaveAttribute("aria-expanded", "true");

  const [toggle, role, card, list, fill] = await Promise.all([
    options.boundingBox(),
    acid.getByRole("heading", { name: "an acid" }).boundingBox(),
    acid.boundingBox(),
    acid.getByRole("group", { name: "Ingredients for an acid" }).boundingBox(),
    acid.locator(".part-fill").boundingBox(),
  ]);
  // Level with the part's name, at the right of the card.
  expect(Math.abs(toggle!.y + toggle!.height / 2 - (role!.y + role!.height / 2))).toBeLessThan(4);
  expect(toggle!.x + toggle!.width).toBeGreaterThan(card!.x + card!.width * 0.85);
  // The list opens between the top row and the Ingredients.
  expect(list!.y).toBeGreaterThan(toggle!.y + toggle!.height);
  expect(list!.y + list!.height).toBeLessThanOrEqual(fill!.y);

  await options.click();
  await expect(acid.getByRole("group", { name: "Ingredients for an acid" })).toBeHidden();
});

test("a part's Add sits in its Ingredient's bottom corner", async ({ page }) => {
  await page.goto("/formulas/pan-sauce?with=chicken-thigh,garlic");
  const acid = slotItem(page, "an acid");
  const [add, row] = await Promise.all([
    acid.getByRole("button", { name: "Add Lemon to your basket" }).boundingBox(),
    acid.locator(".part-fill").boundingBox(),
  ]);
  expect(add!.y + add!.height).toBeGreaterThan(row!.y + row!.height * 0.6);
  expect(add!.x + add!.width).toBeGreaterThan(row!.x + row!.width * 0.75);
});
