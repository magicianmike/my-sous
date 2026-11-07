import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

const tensionBasket = "chicken-thigh,basil,ginger";

/** A live component on the Case Study, found by its caption. */
const embed = (page: Page, caption: RegExp) => page.getByRole("figure").filter({ hasText: caption });

const appScreens = ["/", "/ingredients/lemon?with=garlic", "/suggestions?with=garlic", "/formulas/pan-sauce"];

test("the app links to the Case Study only from its footer, and the Case Study has no tray", async ({
  page,
}) => {
  for (const path of appScreens) {
    await page.goto(path);
    const links = page.locator('a[href="/case-study"]');
    await expect(links).toHaveCount(1);
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "How MySous was made" })).toBeVisible();
  }
  await page.getByRole("link", { name: "How MySous was made" }).click();
  await expect(page).toHaveURL(/\/case-study$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How MySous was made");
  await expect(page.getByRole("contentinfo")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Your basket/ })).toHaveCount(0);
});

test("skip links come first and reach the reading and the chapters by keyboard", async ({
  page,
  isMobile,
}) => {
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

test("a live Suggestion in a tension state renders from a fixed basket, and its links carry it", async ({
  page,
}) => {
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
  await expect(page.getByRole("heading", { name: "Suggestions" })).toBeVisible();
  const basket = page.locator(".suggestions-combination li");
  await expect(basket).toHaveText([/^Chicken thigh/, /^Basil/, /^Ginger/]);
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

test("the chapter navigation lists every chapter, in the order they're written", async ({ page }) => {
  await page.goto("/case-study");
  const listed = await page.getByRole("navigation", { name: "Chapters" }).getByRole("link").allTextContents();
  const written = await page.locator("#case-study-content .chapter > h2").allTextContents();

  expect(listed).toEqual(written);
  expect(written).toEqual(expect.arrayContaining(["Architecture", "What I rejected", "Honest about culture"]));
});

test("every architecture diagram is an image with a name and a description in words", async ({ page }) => {
  await page.goto("/case-study");
  const diagrams = page.locator(".diagram svg");
  await expect(diagrams).toHaveCount(4);
  for (const diagram of await diagrams.all()) {
    await expect(diagram).toHaveAttribute("role", "img");
    await expect(diagram).toHaveAccessibleName(/\w{4}/);
    // The description says what the picture shows, so the diagram works without seeing it.
    const description = await diagram.evaluate((svg) => svg.querySelector("desc")?.textContent ?? "");
    expect(description.split(" ").length).toBeGreaterThan(15);
    await expect(diagram).toHaveAccessibleDescription(description);
  }
});

test("every link into the app opens the basket or dish it promises", async ({ page }) => {
  await page.goto("/case-study");
  const hrefs = await page
    .locator('#case-study-content a[href^="/suggestions"], #case-study-content a[href^="/formulas/"]')
    .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")!))]);
  expect(hrefs.length).toBeGreaterThan(3);

  for (const href of hrefs) {
    await page.goto(href);
    const url = new URL(href, "http://localhost");
    const basket = url.searchParams.get("with")?.split(",") ?? [];
    if (url.pathname === "/suggestions") {
      await expect(page.getByRole("heading", { level: 1, name: "What to make" })).toBeVisible();
      await expect(page.locator(".suggestions-combination li")).toHaveCount(basket.length);
    } else {
      // A dish: its page opens with the basket still in the address.
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page).toHaveURL(href);
    }
  }
});
