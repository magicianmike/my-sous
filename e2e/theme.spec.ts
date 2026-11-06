import { expect, test, type Page } from "@playwright/test";

/** The page's background, as the browser paints it. */
const background = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
const LIGHT = "rgb(248, 247, 242)";
const DARK = "rgb(18, 20, 18)";

const theme = (page: Page) => page.getByRole("banner").getByRole("radiogroup", { name: "Theme" });

test.describe("with the device set to light", () => {
  test.use({ colorScheme: "light" });

  test("the page follows it until the Cook chooses, and says which is on", async ({ page }) => {
    await page.goto("/");

    await expect(theme(page).getByRole("radio", { name: "Light" })).toBeChecked();
    await expect(theme(page).getByRole("radio", { name: "Dark" })).not.toBeChecked();
    expect(await background(page)).toBe(LIGHT);
  });

  test("choosing Dark switches the whole page, and holds across pages and visits", async ({ page }) => {
    await page.goto("/ingredients/lemon");
    await theme(page).getByRole("radio", { name: "Dark" }).check();

    expect(await background(page)).toBe(DARK);
    // An Ingredient's own colours follow, as they do under the device's setting.
    const hero = page.getByRole("region", { name: "Lemon" });
    await expect(hero.locator("[class*=mark]").first()).toHaveCSS("background-color", "rgb(54, 49, 26)");

    await page.getByRole("banner").getByRole("link", { name: "Cuisines" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Cuisines" })).toBeVisible();
    expect(await background(page)).toBe(DARK);

    await page.reload();
    expect(await background(page)).toBe(DARK);
    await expect(theme(page).getByRole("radio", { name: "Dark" })).toBeChecked();
  });

  test("a chosen theme is there before the page is live, so it never flashes the other", async ({ page }) => {
    await page.goto("/");
    await theme(page).getByRole("radio", { name: "Dark" }).check();
    // Without the app's scripts (its styles still load), only what the page carries in its head can apply the choice.
    await page.route(/\/_next\/static\/.*\.js$/, (route) => route.abort());

    await page.reload();

    expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
    expect(await background(page)).toBe(DARK);
  });

  test("by keyboard, the arrow keys move the choice", async ({ page }) => {
    await page.goto("/");
    await theme(page).getByRole("radio", { name: "Light" }).focus();

    await page.keyboard.press("ArrowRight");

    await expect(theme(page).getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(await background(page)).toBe(DARK);
  });
});

test.describe("with the device set to dark", () => {
  test.use({ colorScheme: "dark" });

  test("the page follows it, and choosing Light wins over it, across a reload", async ({ page }) => {
    await page.goto("/");
    await expect(theme(page).getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(await background(page)).toBe(DARK);

    await theme(page).getByRole("radio", { name: "Light" }).check();
    expect(await background(page)).toBe(LIGHT);

    await page.reload();
    expect(await background(page)).toBe(LIGHT);
  });
});
