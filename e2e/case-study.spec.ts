import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

const tensionBasket = "chicken-thigh,basil,ginger";

/** A live component on the Case Study, found by its caption. */
const embed = (page: Page, caption: RegExp) => page.getByRole("figure").filter({ hasText: caption });

const appScreens = ["/", "/ingredients/lemon?with=garlic", "/suggestions?with=garlic", "/formulas/pan-sauce"];

test("the app links to the Case Study only from beside the theme switch, and the Case Study has no tray", async ({
  page,
}) => {
  for (const path of appScreens) {
    await page.goto(path);
    const links = page.locator('a[href="/case-study"]');
    await expect(links).toBeVisible();
    await expect(page.getByRole("radiogroup", { name: "Theme" })).toBeVisible();
    const link = (await links.boundingBox())!;
    const theme = (await page.getByRole("radiogroup", { name: "Theme" }).boundingBox())!;
    // On the same row, just before the switch.
    expect(Math.abs(link.y + link.height / 2 - (theme.y + theme.height / 2))).toBeLessThan(4);
    expect(theme.x - (link.x + link.width)).toBeLessThan(40);
    expect(theme.x - (link.x + link.width)).toBeGreaterThanOrEqual(0);
    await expect(page.getByRole("contentinfo")).toHaveCount(0);
  }
  await page.getByRole("link", { name: "How MySous was made" }).click();
  await expect(page).toHaveURL(/\/case-study$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How MySous was made: a Case Study");
  // The title is the only header: no wordmark or label above it, though the theme switch stays.
  await expect(page.getByRole("link", { name: "MySous", exact: true })).toHaveCount(0);
  await expect(page.getByText("Case Study", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("radiogroup", { name: "Theme" })).toBeVisible();
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
  const basket = page.getByRole("list", { name: "In your basket" }).getByRole("listitem");
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
  expect(written).toEqual(expect.arrayContaining(["The Kitchen", "Testing", "Building with Claude", "Honest about culture"]));
});

test("every architecture diagram is an image with a name and a description in words", async ({ page }) => {
  await page.goto("/case-study");
  // Each diagram has a wide and a stacked layout; only the one that fits is shown.
  const diagrams = page.locator(".diagram svg").filter({ visible: true });
  await expect(diagrams).toHaveCount(4);
  for (const diagram of await diagrams.all()) {
    await expect(diagram).toHaveAttribute("role", "img");
    await expect(diagram).toHaveAccessibleName(/\w{4}/);
    // The description says what the picture shows, so the diagram works without seeing it.
    const description = await diagram.evaluate((svg) => svg.querySelector("desc")?.textContent ?? "");
    expect(description.split(" ").length).toBeGreaterThan(15);
    await expect(diagram).toHaveAccessibleDescription(description);
  }

  const results = await new AxeBuilder({ page })
    .include(".diagram")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("every live dish card opens the same card in the app", async ({ page }) => {
  await page.goto("/case-study");
  const embeds = await page.locator(".live-embed").all();
  expect(embeds.length).toBeGreaterThan(2);

  for (const embed of embeds) {
    await page.goto("/case-study");
    const dish = (await embed.getByRole("heading", { level: 3 }).textContent())!;
    // The card as the Case Study shows it: status, parts and rank reason.
    const promised = await embed.locator(":scope > :first-child").innerText();
    await embed.getByRole("link", { name: "Open this basket in MySous" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "What to make" })).toBeVisible();
    const inApp = page
      .locator(".stack > li")
      .filter({ has: page.getByRole("heading", { level: 3, name: dish, exact: true }) });
    expect(await inApp.innerText()).toBe(promised);
  }
});

test("every link into the app from the prose opens the basket it names", async ({ page }) => {
  await page.goto("/case-study");
  const links = page.locator("#case-study-content p > a[href^='/suggestions']");
  const hrefs = await links.evaluateAll((all) => [...new Set(all.map((link) => link.getAttribute("href")!))]);
  expect(hrefs.length).toBeGreaterThan(0);

  for (const href of hrefs) {
    await page.goto(href);
    const ids = new URL(href, "http://localhost").searchParams.get("with")!.split(",");
    await expect(page.getByRole("heading", { level: 1, name: "What to make" })).toBeVisible();
    // The basket lists those Ingredients, in that order, by name.
    const names = ids.map((id) => new RegExp(`^${id.replace(/-/g, " ")}`, "i"));
    await expect(page.getByRole("list", { name: "In your basket" }).getByRole("listitem")).toHaveText(names);
  }
});

/** The Case Study's chapter list. */
const chapters = (page: Page) => page.getByRole("navigation", { name: "Chapters" });

test("the title stays at the top while reading, without covering a chapter's heading", async ({ page }) => {
  await page.goto("/case-study");
  await chapters(page).getByRole("link", { name: "The Kitchen" }).click();
  const heading = page.getByRole("heading", { level: 2, name: "The Kitchen" });
  await expect(heading).toBeInViewport();

  const title = page.getByRole("heading", { level: 1, name: "How MySous was made: a Case Study" });
  await expect(title).toBeInViewport();
  const bar = (await title.locator("xpath=..").boundingBox())!;
  const top = (await heading.boundingBox())!;
  // Stuck at the top, below the row Back to MySous keeps.
  expect(bar.y).toBeLessThan(80);
  expect(top.y).toBeGreaterThanOrEqual(bar.y + bar.height);
});

test("Back to top returns to the top of the page, and the keyboard starts there", async ({ page, isMobile }) => {
  await page.goto("/case-study");
  // Only offered once there's a way back up to go.
  await expect(page.getByRole("link", { name: "Back to top" })).toBeHidden();
  await chapters(page).getByRole("link", { name: "What I rejected" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "What I rejected" })).toBeInViewport();

  // Pinned to the window's bottom-left corner; it shows a frame after the scroll, so wait for it.
  await expect(page.getByRole("link", { name: "Back to top" })).toBeVisible();
  const link = (await page.getByRole("link", { name: "Back to top" }).boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(viewport.height - (link.y + link.height)).toBeLessThan(40);
  expect(link.x).toBeLessThan(24);

  await page.getByRole("link", { name: "Back to top" }).click();
  const theme = page.getByRole("radiogroup", { name: "Theme" });
  await expect(theme).toBeInViewport();
  await expect(page.getByRole("link", { name: "Back to top" })).toBeHidden();
  if (!isMobile) {
    await page.keyboard.press("Tab");
    await expect(theme.getByRole("radio", { checked: true })).toBeFocused();
  }
});

test("the chapter list marks the chapter being read, and only that one", async ({ page }) => {
  await page.goto("/case-study");
  const current = chapters(page).locator('a[aria-current="location"]');
  await expect(current).toHaveText("In 60 seconds");

  for (const title of ["The Kitchen", "Honest about culture", "What I rejected, and what’s next"]) {
    await chapters(page).getByRole("link", { name: title, exact: true }).click();
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(title);
  }
});

test("Back to MySous stays in the window's top-left corner, clear of the title", async ({ page }) => {
  await page.goto("/case-study");
  const back = page.getByRole("link", { name: "Back to MySous" });
  await chapters(page).getByRole("link", { name: "The Kitchen" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "The Kitchen" })).toBeInViewport();
  await expect(back).toBeVisible();
  const corner = (await back.boundingBox())!;
  expect(corner.x).toBeLessThan(24);
  expect(corner.y).toBeLessThan(24);
  // The sticky title's words never sit under it: below it on a narrow screen, beside it on a wide one.
  const title = (await page.getByRole("heading", { level: 1 }).boundingBox())!;
  const apart =
    title.y >= corner.y + corner.height - 1 || title.x >= corner.x + corner.width - 1;
  expect(apart).toBe(true);

  await back.click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("link", { name: "MySous", exact: true })).toBeVisible();
});

test("the theme switch stays on screen while reading", async ({ page }) => {
  await page.goto("/case-study");
  await chapters(page).getByRole("link", { name: "What’s next" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "What’s next" })).toBeInViewport();
  await expect(page.getByRole("radiogroup", { name: "Theme" })).toBeInViewport({ ratio: 1 });
});

test("each diagram fits its column, stacked on a phone, so none scrolls sideways", async ({ page, isMobile }) => {
  await page.goto("/case-study");
  const shown = page.locator(".diagram svg").filter({ visible: true });
  await expect(shown).toHaveCount(4);
  for (const svg of await shown.all()) {
    const frame = svg.locator("xpath=..");
    const fits = await frame.evaluate((el) => el.scrollWidth <= el.clientWidth);
    expect(fits).toBe(true);
    // Nothing to scroll, so the frame is no stop for the keyboard.
    await expect(frame).not.toHaveAttribute("tabindex");
    // Stacked on a phone: taller than wide. Wide elsewhere.
    const { width, height } = (await svg.boundingBox())!;
    expect(height > width).toBe(!!isMobile);
  }
});
