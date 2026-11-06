import { expect, test, type Locator, type Page } from "@playwright/test";

/** An image's files, as the page asks for them: each format's srcset, and the fallback. */
async function sources(image: Locator) {
  const picture = image.locator("xpath=..");
  return {
    avif: await picture.locator('source[type="image/avif"]').getAttribute("srcset"),
    webp: await picture.locator('source[type="image/webp"]').getAttribute("srcset"),
    src: await image.getAttribute("src"),
  };
}

/** Where something sits, to compare before and after: within a pixel, since layout rounds. */
function expectSamePlace(after: { x: number; y: number; width: number; height: number } | null, before: typeof after) {
  for (const key of ["x", "y", "width", "height"] as const) expect(Math.abs(after![key] - before![key])).toBeLessThan(1);
}

/** Holds back every image file, so the page can be measured before any arrives. */
async function holdImages(page: Page) {
  let release!: () => void;
  const held = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/images/**", async (route) => {
    await held;
    await route.continue();
  });
  return release;
}

test.describe("an Ingredient's page", () => {
  test("shows its image above its drawing, with alt text and a note saying what it is", async ({ page }) => {
    await page.goto("/ingredients/lemon");
    const hero = page.getByRole("region", { name: "Lemon" });
    const image = hero.getByRole("img", { name: "A placeholder, the drawing of a lemon on its pale yellow." });

    await expect(image).toBeVisible();
    await expect(hero.getByText("Placeholder image", { exact: true })).toBeVisible();
    // The drawing stays the Ingredient's mark.
    await expect(hero.locator(".hero-mark svg")).toBeVisible();
    // On the first screen, so it isn't left to load lazily.
    await expect(image).not.toHaveAttribute("loading", "lazy");
    expect(await sources(image)).toEqual({
      avif: "/images/lemon-480.avif 480w, /images/lemon-800.avif 800w, /images/lemon-1200.avif 1200w, /images/lemon-1600.avif 1600w",
      webp: "/images/lemon-480.webp 480w, /images/lemon-800.webp 800w, /images/lemon-1200.webp 1200w, /images/lemon-1600.webp 1600w",
      src: "/images/lemon-800.webp",
    });
  });

  test("keeps its image's space before the file arrives, so nothing shifts", async ({ page }) => {
    const release = await holdImages(page);
    // Not waiting for the page's load, which waits for the images.
    await page.goto("/ingredients/lemon", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: "Add Lemon to your basket" })).toBeVisible();
    const image = page.getByRole("region", { name: "Lemon" }).locator("picture img");
    const before = await image.boundingBox();
    const add = await page.getByRole("button", { name: "Add Lemon to your basket" }).boundingBox();

    release();
    await expect(image).toHaveJSProperty("complete", true);
    expect(before!.height).toBeGreaterThan(100);
    expectSamePlace(await image.boundingBox(), before);
    expectSamePlace(await page.getByRole("button", { name: "Add Lemon to your basket" }).boundingBox(), add);
  });

  test("on a phone, still has Add to basket on the first screen, above the docked basket", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "the first screen is a phone's");
    await page.goto("/ingredients/lemon");
    const add = await page.getByRole("button", { name: "Add Lemon to your basket" }).boundingBox();
    const bar = await page.locator(".tray-bar").boundingBox();

    expect(add!.y + add!.height).toBeLessThanOrEqual(bar!.y);
  });
});

test.describe("a dish's page", () => {
  test("shows its Recipe's image, captioned as the dish as written, whatever fills it now", async ({ page }) => {
    await page.goto("/formulas/pan-sauce?with=chicken-thigh,lime");
    const figure = page.getByRole("main").getByRole("figure");
    const image = figure.getByRole("img", {
      name: "A placeholder, the drawings of chicken thigh, garlic, lemon and basil in a row.",
    });

    await expect(image).toBeVisible();
    await expect(figure).toContainText("As written: chicken thigh, garlic, lemon and basil.");
    await expect(figure).toContainText("Placeholder image");
    await expect(image).not.toHaveAttribute("loading", "lazy");
    // The image takes the place of the drawings.
    await expect(page.locator(".recipe-image")).toHaveCount(0);
  });

  test("on a phone, keeps its image low, so the dish isn't all image", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the first screen is a phone's");
    await page.goto("/formulas/pan-sauce?with=chicken-thigh,lime");
    const image = await page.getByRole("main").getByRole("figure").locator("img").boundingBox();

    expect(image!.height).toBeLessThanOrEqual(page.viewportSize()!.height * 0.28 + 1);
  });

  test("without an image, shows no frame for one", async ({ page }) => {
    await page.goto("/formulas/sheet-pan-roast?with=ginger");

    await expect(page.getByRole("main").getByRole("figure")).toHaveCount(0);
    await expect(page.getByRole("main").getByText(/^(Placeholder|AI-generated) image$/)).toHaveCount(0);
  });

  test("keeps its image's space before the file arrives", async ({ page }) => {
    const release = await holdImages(page);
    await page.goto("/formulas/pan-sauce", { waitUntil: "domcontentloaded" });
    const image = page.getByRole("main").getByRole("figure").locator("img");
    await expect(image).toBeVisible();
    const before = await image.boundingBox();

    release();
    await expect(image).toHaveJSProperty("complete", true);
    expect(before!.height).toBeGreaterThan(100);
    expectSamePlace(await image.boundingBox(), before);
  });
});

test.describe("a Suggestion card", () => {
  const card = (page: Page, name: string) =>
    page
      .getByRole("list", { name: "Suggestions" })
      .getByRole("listitem")
      .filter({ has: page.getByRole("heading", { name }) });

  test("shows its dish's image, hidden from screen readers since the heading names it, and lazily", async ({ page }) => {
    await page.goto("/suggestions?with=chicken-thigh,garlic");
    const panSauce = card(page, "Pan sauce");
    const image = panSauce.locator("picture img");

    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("alt", "");
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(panSauce.getByText("Placeholder image", { exact: true })).toBeVisible();
    // The card's drawings stay.
    await expect(panSauce.getByRole("link", { name: "Garlic" }).first()).toBeVisible();
  });

  test("keeps its image's space before the file arrives", async ({ page }) => {
    const release = await holdImages(page);
    await page.goto("/suggestions?with=chicken-thigh,garlic", { waitUntil: "domcontentloaded" });
    const image = card(page, "Pan sauce").locator("picture img");
    await image.scrollIntoViewIfNeeded();
    const before = await image.boundingBox();
    const sheetPan = await card(page, "Sheet-pan roast").boundingBox();

    release();
    await expect(image).toHaveJSProperty("complete", true);
    expect(before!.height).toBeGreaterThan(50);
    expectSamePlace(await image.boundingBox(), before);
    expectSamePlace(await card(page, "Sheet-pan roast").boundingBox(), sheetPan);
  });

  test("without an image, shows none", async ({ page }) => {
    await page.goto("/suggestions?with=chicken-thigh,garlic");

    await expect(card(page, "Sheet-pan roast").locator("picture")).toHaveCount(0);
  });
});
