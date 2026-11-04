import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

const tensionBasket = "chicken-thigh,basil,ginger";

/** A live component on the Case Study, found by its caption. */
const embed = (page: Page, caption: RegExp) => page.getByRole("figure").filter({ hasText: caption });

test("the app links to the Case Study only from its footer, and the Case Study has no tray", async ({ page }) => {
  for (const path of ["/", "/ingredients/lemon?with=garlic", "/suggestions?with=garlic", "/formulas/pan-sauce"]) {
    await page.goto(path);
    const links = page.locator('a[href="/case-study"]');
    await expect(links).toHaveCount(1);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "How MySous was made" })).toBeVisible();
  }
  await page.getByRole("link", { name: "How MySous was made" }).click();
  await expect(page).toHaveURL(/\/case-study$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How MySous was made");
  await expect(page.getByRole("contentinfo")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Your basket/ })).toHaveCount(0);
});

test("skip links come first and reach the reading and the chapters by keyboard", async ({ page, isMobile }) => {
  test.skip(isMobile, "skip links are for a keyboard");
  await page.goto("/case-study");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to the Case Study" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#case-study-content")).toBeFocused();

  await page.goto("/case-study");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to chapters" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "Chapters" })).toBeFocused();
});

test("every chapter in the navigation opens its section", async ({ page }) => {
  await page.goto("/case-study");
  const nav = page.getByRole("navigation", { name: "Chapters" });
  const links = nav.getByRole("link");
  const titles = await links.allTextContents();
  expect(titles.length).toBeGreaterThan(3);
  for (const title of titles) {
    await nav.getByRole("link", { name: title, exact: true }).click();
    const heading = page.getByRole("main").getByRole("heading", { level: 2, name: title, exact: true });
    await expect(heading).toBeInViewport();
  }
});

test("a live Suggestion in a tension state renders from a fixed basket, and its links carry it", async ({ page }) => {
  await page.goto("/case-study");
  const live = embed(page, /not everything pairs/);
  await expect(live.getByRole("heading", { level: 3, name: "Pan sauce" })).toBeVisible();
  await expect(live).toContainText("basil doesn't pair with the rest");
  await expect(live.getByRole("link", { name: "Pan sauce" })).toHaveAttribute(
    "href",
    `/formulas/pan-sauce?with=${tensionBasket}`,
  );
});

test("a deep link opens the app with that exact basket", async ({ page }) => {
  await page.goto("/case-study");
  await embed(page, /not everything pairs/).getByRole("link", { name: "Open this basket in MySous" }).click();
  await expect(page).toHaveURL(new RegExp(`/suggestions\\?with=${tensionBasket}$`));
  await expect(page.getByRole("heading", { name: "Not everything pairs yet" })).toBeVisible();
  await expect(page.locator(".suggestions-combination li")).toHaveText([/^Chicken thigh/, /^Basil/, /^Ginger/]);
});

test("the built page carries Open Graph and Twitter metadata for a good link preview", async () => {
  const html = readFileSync("out/case-study.html", "utf8");
  const meta = (key: string) =>
    html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`))?.[1];

  expect(meta("og:title")).toBe("How MySous was made");
  expect(meta("og:description")).toBeTruthy();
  expect(meta("og:url")).toBe("https://my-sous.vercel.app/case-study");
  expect(meta("og:image")).toMatch(/^https:\/\/my-sous\.vercel\.app\/case-study\/opengraph-image/);
  expect(meta("og:image:alt")).toBeTruthy();
  expect(meta("twitter:card")).toBe("summary_large_image");
  expect(meta("twitter:image")).toBe(meta("og:image"));

  // The image itself: a 1200×630 PNG.
  const png = readFileSync("out/case-study/opengraph-image");
  expect(png.subarray(1, 4).toString()).toBe("PNG");
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
});
