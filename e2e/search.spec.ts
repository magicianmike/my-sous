import { expect, test, type Page } from "@playwright/test";

function search(page: Page) {
  return page.getByRole("combobox", { name: "Find an ingredient" });
}

test("a Cook finds an Ingredient by typing, opens it and expands a Pairing", async ({ page }) => {
  await page.goto("/");
  await search(page).fill("lem");
  await expect(page.getByRole("listbox")).toBeVisible();
  await expect(page.getByRole("option")).toHaveText(["Lemon"]);
  await expect(page.getByRole("status").first()).toHaveText("1 ingredient found.");

  await search(page).press("ArrowDown");
  await expect(page.getByRole("option", { name: "Lemon" })).toHaveAttribute("aria-selected", "true");
  await search(page).press("Enter");

  await expect(page).toHaveURL(/\/ingredients\/lemon$/);
  await expect(page.getByRole("heading", { level: 1, name: "Lemon" })).toBeVisible();
  await expect(page.getByText("Common in Southern Italian cooking.")).toBeVisible();
  await expect(page.getByText("Zest before you juice")).toBeVisible();

  const contrast = page.getByRole("region", { name: "Contrast" });
  const more = contrast.getByText("More about lemon and garlic");
  const detail = contrast.getByText(/Add the lemon off the heat/);
  await expect(detail).toBeHidden();
  await more.click();
  await expect(detail).toBeVisible();
});

test("arrow keys move through matches, and Escape closes then clears", async ({ page }) => {
  await page.goto("/");
  await search(page).fill("li");
  await expect(page.getByRole("option")).toHaveText(["Lime", "Garlic", "Scallion"]);
  await search(page).press("ArrowDown");
  await search(page).press("ArrowDown");
  await expect(search(page)).toHaveAttribute(
    "aria-activedescendant",
    "ingredient-search-garlic",
  );
  await search(page).press("ArrowUp");
  await expect(page.getByRole("option", { name: "Lime" })).toHaveAttribute("aria-selected", "true");

  await search(page).press("Escape");
  await expect(page.getByRole("listbox")).toBeHidden();
  await expect(search(page)).toHaveValue("li");
  await search(page).press("Escape");
  await expect(search(page)).toHaveValue("");
});

test("a name not in MySous says so, with a next step", async ({ page }) => {
  await page.goto("/");
  await search(page).fill("mango");
  await expect(page.getByRole("status").first()).toHaveText("“mango” isn’t in MySous yet.");
  await page.getByRole("link", { name: "browse every ingredient" }).click();
  await expect(page).toHaveURL(/#all-ingredients$/);
});

test("a Blend lists what it typically includes, linking Ingredients in MySous", async ({ page }) => {
  await page.goto("/ingredients/gremolata");
  const components = page.getByRole("list").filter({ hasText: "parsley" });
  await expect(components.getByRole("listitem")).toHaveText(["Lemon", "Garlic", "parsley"]);
  await expect(components.getByRole("link")).toHaveText(["Lemon", "Garlic"]);
  await expect(page.getByText(/osso buco/)).toBeVisible();
});

test("an Ingredient that isn't in MySous gets a gentle page", async ({ page }) => {
  await page.goto("/ingredients/mango");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This isn’t in MySous yet");
  await page.getByRole("link", { name: "Find an ingredient that is" }).click();
  await expect(search(page)).toBeVisible();
});
