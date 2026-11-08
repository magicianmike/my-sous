import { expect, test, type Page } from "@playwright/test";

const sheet = (page: Page) => page.getByRole("dialog", { name: /Your basket/ });
const opener = (page: Page) => page.getByRole("button", { name: /^Your basket/ });

test.describe("on a phone, the tray is a bar that opens a sheet", () => {
  test.skip(({ isMobile }) => !isMobile, "the sheet is the phone layout");

  test("the bar shows the Combination at a glance", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await expect(opener(page)).toHaveAccessibleName("Your basket 2 of 6: Lemon, Garlic");
    await expect(page.getByRole("link", { name: "See what to make" })).toBeVisible();
    await expect(sheet(page)).toBeHidden();
  });

  test("the bar shows an empty circle for each slot still free, and leads with See what to make", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    const marks = page.locator(".tray-bar [class*=marks] > *");
    await expect(marks).toHaveCount(6);
    await expect(marks.locator("svg")).toHaveCount(2);

    const [action, bar] = await Promise.all([
      page.getByRole("link", { name: "See what to make" }).boundingBox(),
      opener(page).boundingBox(),
    ]);
    expect(action!.y).toBeLessThan(bar!.y);
  });

  test("a drawing in the bar opens its Ingredient", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await page.locator(".tray-bar a.mark-link").nth(1).click();
    await expect(page).toHaveURL(/\/ingredients\/garlic\?with=lemon,garlic$/);
  });

  test("an empty Combination shows no empty circles", async ({ page }) => {
    await page.goto("/ingredients/lemon");
    await expect(opener(page)).toHaveAccessibleName("Your basket 0 of 6");
    await expect(page.locator(".tray-bar [class*=marks]")).toHaveCount(0);
  });

  test("opening moves focus in, contains it, and closing returns it", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await opener(page).click();

    await expect(sheet(page)).toBeVisible();
    await expect(sheet(page).getByRole("heading", { name: /Your basket/ })).toBeFocused();
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
      // Rounded: the sliding sheet can leave a control a sub-pixel short of its 44px.
      expect(Math.round(box.height), (await control.textContent()) ?? "").toBeGreaterThanOrEqual(44);
    }
    const bar = (await opener(page).boundingBox())!;
    expect(bar.height).toBeGreaterThanOrEqual(44);
  });

  test("changes made in the open sheet are announced from within it", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await opener(page).click();
    await sheet(page).getByRole("button", { name: "Remove Garlic" }).click();

    // The page behind a modal is inert, so the sheet needs its own live region.
    await expect(sheet(page).getByRole("status")).toHaveText("Garlic removed from your basket, 1 of 6.");
    await expect(sheet(page).getByRole("heading", { name: /Your basket/ })).toBeFocused();
  });

  test("a change made in the open sheet shows as a toast on top, just above the sheet", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await opener(page).click();
    await sheet(page).getByRole("button", { name: "Remove Garlic" }).click();

    const toast = sheet(page).locator(".toast-spot p");
    await expect(toast).toHaveText("Garlic removed from your basket, 1 of 6.");
    const placement = () =>
      toast.evaluate((el) => {
        const { left, top, width, height, bottom } = el.getBoundingClientRect();
        const hit = document.elementFromPoint(left + width / 2, top + height / 2);
        const sheetTop = document.querySelector(".tray-sheet")!.getBoundingClientRect().top;
        // Just above the sheet: clear of it, and close by.
        return { onTop: el.contains(hit), justAbove: sheetTop - bottom >= 0 && sheetTop - bottom <= 24 };
      });
    // The sheet shrinks by a row as Garlic goes, and the toast follows it within a frame.
    await expect.poll(placement).toEqual({ onTop: true, justAbove: true });
  });

  test("the page behind the open sheet is dimmed and blurred", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon");
    await opener(page).click();
    const backdrop = await sheet(page).evaluate((el) => getComputedStyle(el, "::backdrop").backdropFilter);
    expect(backdrop).toMatch(/^blur\(/);
  });

  test("changes made with the sheet closed are announced", async ({ page }) => {
    await page.goto("/ingredients/lemon?with=lemon");
    await page.getByRole("button", { name: "Add Garlic to your basket" }).click();
    await expect(page.getByRole("status")).toHaveText("Garlic added to your basket, 2 of 6.");
    await expect(opener(page)).toHaveAccessibleName("Your basket 2 of 6: Lemon, Garlic");
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
    const tray = page.getByRole("complementary", { name: /Your basket/ });
    await expect(tray.getByRole("listitem")).toHaveText([/^Lemon/, /^Garlic/]);
    await expect(opener(page)).toBeHidden();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});

test.describe("when the screen changes size", () => {
  test.skip(({ isMobile }) => isMobile, "each test sets its own viewport");

  test("widening with the sheet open moves focus to the side panel", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ingredients/lemon?with=lemon,garlic");
    await opener(page).click();
    await expect(sheet(page)).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(sheet(page)).toBeHidden();
    const panel = page.getByRole("complementary", { name: /Your basket/ });
    await expect(panel.getByRole("heading", { name: /Your basket/ })).toBeFocused();
  });

  // 320px wide, and a 1280×720 screen at 200% zoom.
  for (const viewport of [
    { width: 320, height: 640 },
    { width: 640, height: 360 },
  ]) {
    const size = `${viewport.width}×${viewport.height}`;
    test(`the open sheet fits and every control is reachable at ${size}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/ingredients/lemon?with=lemon,garlic,basil,tomato");
      await opener(page).click();
      await expect(sheet(page)).toBeVisible();

      const overflow = await sheet(page).evaluate((el) => el.scrollWidth - el.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      // The sheet scrolls within itself, so its last control comes into view.
      const close = sheet(page).getByRole("button", { name: "Close" });
      await close.scrollIntoViewIfNeeded();
      await expect(close).toBeInViewport();
      await close.click();
      await expect(sheet(page)).toBeHidden();
    });
  }
});

test("on a wider screen, a drawing in the bar shows its name on hover", async ({ page, isMobile }) => {
  test.skip(isMobile, "hover is for a pointer");
  await page.setViewportSize({ width: 700, height: 800 });
  await page.goto("/ingredients/lemon?with=lemon,garlic");
  await page.locator(".tray-bar a.mark-link").nth(1).hover();
  await expect(page.locator(".tray-bar").getByText("Garlic", { exact: true })).toBeVisible();
});
