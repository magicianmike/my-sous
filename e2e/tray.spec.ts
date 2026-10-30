import { expect, test, type Page } from "@playwright/test";

const sheet = (page: Page) => page.getByRole("dialog", { name: /Your Combination/ });
const opener = (page: Page) => page.getByRole("button", { name: /^Your Combination/ });

test.describe("on a phone, the tray is a bar that opens a sheet", () => {
  test.skip(({ isMobile }) => !isMobile, "the sheet is the phone layout");

  test("the bar shows the Combination at a glance", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await expect(opener(page)).toHaveAccessibleName("Your Combination 2 of 4: Lemon, Garlic");
    await expect(page.getByRole("link", { name: "See what to make" })).toBeVisible();
    await expect(sheet(page)).toBeHidden();
  });

  test("opening moves focus in, contains it, and closing returns it", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await opener(page).click();

    await expect(sheet(page)).toBeVisible();
    await expect(sheet(page).getByRole("heading", { name: /Your Combination/ })).toBeFocused();
    await expect(sheet(page).getByRole("listitem")).toHaveText([/^Lemon/, /^Garlic/]);

    // The page behind is inert, and Tab and Shift+Tab cycle within the sheet.
    for (const key of [...Array(8).fill("Tab"), ...Array(8).fill("Shift+Tab")]) {
      await page.keyboard.press(key);
      const inside = await page.evaluate(() => !!document.activeElement?.closest("dialog"));
      expect(inside).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(sheet(page)).toBeHidden();
    await expect(opener(page)).toBeFocused();

    await opener(page).click();
    await sheet(page).getByRole("button", { name: "Close" }).click();
    await expect(sheet(page)).toBeHidden();
    await expect(opener(page)).toBeFocused();
  });

  test("every control in the sheet is big enough to tap", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await opener(page).click();
    for (const control of await sheet(page).locator("a, button").all()) {
      const box = (await control.boundingBox())!;
      expect(box.height, await control.textContent()).toBeGreaterThanOrEqual(44);
    }
    const bar = (await opener(page).boundingBox())!;
    expect(bar.height).toBeGreaterThanOrEqual(44);
  });

  test("following a link from the sheet closes it", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await opener(page).click();
    await sheet(page).getByRole("link", { name: "Garlic" }).click();

    await expect(page.getByRole("heading", { level: 1, name: "Garlic" })).toBeVisible();
    await expect(sheet(page)).toBeHidden();
  });
});

test.describe("on desktop, the tray is a side panel", () => {
  test.skip(({ isMobile }) => isMobile, "the side panel is the desktop layout");

  test("it is always there and doesn't trap focus", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    const tray = page.getByRole("complementary", { name: /Your Combination/ });
    await expect(tray.getByRole("listitem")).toHaveText([/^Lemon/, /^Garlic/]);
    await expect(opener(page)).toBeHidden();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
