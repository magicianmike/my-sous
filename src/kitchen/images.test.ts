import { randomBytes } from "node:crypto";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { expectErrors, expectKitchen, png, writeContent } from "./test-content";

/** Noise, which barely compresses, so a PNG of it is heavy. */
function heavyPng(width: number, height: number): Promise<Buffer> {
  return sharp(randomBytes(width * height * 3), { raw: { width, height, channels: 3 } }).png().toBuffer();
}

const generated = {
  made: "ai-generated",
  model: "An image model",
  prompt: "A halved lemon on a linen cloth, soft window light.",
  date: "2026-11-01",
  review: { date: "2026-11-02", matches: true },
};
const placeholder = { made: "placeholder", date: "2026-11-05" };
const lemonImage = { file: "lemon.png", alt: "A halved lemon on a linen cloth.", provenance: generated };

const formula = {
  id: "dressing",
  name: "Dressing",
  description: "Something sharp.",
  slots: [{ id: "acid", role: "an acid", accepts: "acid" }],
  method: ["Whisk {acid}."],
};
const recipe = {
  serves: 2,
  time: { prep: 5, cook: 0 },
  fills: { acid: "lemon" },
  ingredients: [{ slot: "acid", amount: "1" }],
  steps: [{ text: "Whisk {acid}." }],
};

/** Content whose lemon has `image`, and whose dressing and its Recipe have images of their own. */
async function content(image: Record<string, unknown>, file: Buffer | null = null) {
  return writeContent({
    ingredients: { lemon: { name: "Lemon", slotTypes: ["acid"], image } },
    pairings: [],
    formulas: [{ ...formula, image: { ...lemonImage, file: "dressing.png", alt: "A jar of dressing." } }],
    recipes: { dressing: { ...recipe, image: { ...lemonImage, file: "dressing-recipe.png", alt: "Dressing as written." } } },
    images: {
      ...(file && { "lemon.png": file }),
      "dressing.png": await png(1600, 1067),
      "dressing-recipe.png": await png(1600, 1067),
    },
  });
}

describe("Images", () => {
  it("gives an Ingredient, a Formula and a Recipe their Image, with its size and how it was made", async () => {
    const kitchen = await expectKitchen(await content(lemonImage, await png(1600, 1067)));

    expect(kitchen.ingredient("lemon")!.image).toEqual({
      file: "lemon.png",
      alt: "A halved lemon on a linen cloth.",
      width: 1600,
      height: 1067,
      made: "ai-generated",
    });
    expect(kitchen.formula("dressing")!.image).toMatchObject({ file: "dressing.png", alt: "A jar of dressing." });
    const [dressing] = kitchen.suggest([]);
    const written = kitchen.recipe(dressing)!;
    expect(written.image).toMatchObject({ file: "dressing-recipe.png", width: 1600 });
    expect(written.asWritten.map(({ id }) => id)).toEqual(["lemon"]);
  });

  describe("a dish's image", () => {
    async function dish({ formulaImage, recipeImage }: { formulaImage?: boolean; recipeImage?: boolean }) {
      const kitchen = await expectKitchen(
        writeContent({
          ingredients: { lemon: { name: "Lemon", slotTypes: ["acid"] } },
          pairings: [],
          formulas: [{ ...formula, ...(formulaImage && { image: { ...lemonImage, file: "typical.png" } }) }],
          recipes: { dressing: { ...recipe, ...(recipeImage && { image: { ...lemonImage, file: "as-written.png" } }) } },
          images: { "typical.png": await png(1600, 1067), "as-written.png": await png(1600, 1067) },
        }),
      );
      const [suggestion] = kitchen.suggest([]);
      return kitchen.dishImage(suggestion);
    }

    it("is its Recipe's, with what it's made with as written", async () => {
      const image = await dish({ formulaImage: true, recipeImage: true });

      expect(image?.image.file).toBe("as-written.png");
      expect(image?.asWritten?.map(({ id }) => id)).toEqual(["lemon"]);
    });

    it("is otherwise its Formula's, a typical one", async () => {
      const image = await dish({ formulaImage: true });

      expect(image?.image.file).toBe("typical.png");
      expect(image?.asWritten).toBeUndefined();
    });

    it("is none without either", async () => {
      expect(await dish({})).toBeUndefined();
    });
  });

  it("lets content go without Images", async () => {
    const kitchen = await expectKitchen(
      writeContent({ ingredients: { lemon: { name: "Lemon" } }, pairings: [] }),
    );

    expect(kitchen.ingredient("lemon")!.image).toBeUndefined();
  });

  it("accepts a placeholder, which isn't reviewed", async () => {
    const kitchen = await expectKitchen(await content({ ...lemonImage, provenance: placeholder }, await png(1600, 1067)));

    expect(kitchen.ingredient("lemon")!.image!.made).toBe("placeholder");
  });

  describe("rejects content", () => {
    const small = () => png(800, 600);

    it("when an image's file is missing", async () => {
      expect(await expectErrors(await content(lemonImage))).toEqual([
        'Ingredient lemon\'s image "images/lemon.png" doesn\'t exist.',
      ]);
    });

    it("when an image has no alt text", async () => {
      const { alt: _alt, ...unlabelled } = lemonImage;
      const message = "image.alt: give the image alt text, written for the Cook";

      expect(await expectErrors(await content({ ...lemonImage, alt: "" }, await png(1600, 1067)))).toEqual([message]);
      expect(await expectErrors(await content(unlabelled, await png(1600, 1067)))).toEqual([message]);
    });

    it("when an AI-generated image doesn't say its model or prompt", async () => {
      const { model: _model, prompt: _prompt, ...unsourced } = generated;

      expect(await expectErrors(await content({ ...lemonImage, provenance: unsourced }, await png(1600, 1067)))).toEqual([
        "image.provenance.model: name the model that made the image",
        "image.provenance.prompt: give the prompt the image was made from",
      ]);
    });

    it("when an image has no provenance", async () => {
      const { provenance: _provenance, ...unsourced } = lemonImage;

      expect(await expectErrors(await content(unsourced, await png(1600, 1067)))).toEqual([
        'image.provenance: say how the image was made: "ai-generated" (with its model, prompt and date) or "placeholder"',
      ]);
    });

    it("when an AI-generated image hasn't been reviewed", async () => {
      const { review: _review, ...unreviewed } = generated;

      expect(await expectErrors(await content({ ...lemonImage, provenance: unreviewed }, await png(1600, 1067)))).toEqual([
        "Ingredient lemon's image hasn't been reviewed; check it matches what it shows, then record the review.",
      ]);
    });

    it("when a review found the image doesn't match", async () => {
      const provenance = { ...generated, review: { date: "2026-11-02", matches: false } };

      expect(await expectErrors(await content({ ...lemonImage, provenance }, await png(1600, 1067)))).toEqual([
        "Ingredient lemon's image doesn't match what it shows, by its review; regenerate it.",
      ]);
    });

    it("when a placeholder is marked as reviewed", async () => {
      const provenance = { ...placeholder, review: { date: "2026-11-06", matches: true } };

      expect(await expectErrors(await content({ ...lemonImage, provenance }, await png(1600, 1067)))).toEqual([
        "Ingredient lemon's image is a placeholder, so it can't be reviewed; replace it with a reviewed image.",
      ]);
    });

    it("when an image is too small", async () => {
      expect(await expectErrors(await content(lemonImage, await small()))).toEqual([
        "Ingredient lemon's image is 800×600; it needs at least 1024 pixels on its shorter side.",
      ]);
    });

    it("when an image file is too heavy", async () => {
      expect(await expectErrors(await content(lemonImage, await heavyPng(1400, 1400)))).toEqual([
        expect.stringMatching(/^Ingredient lemon's image is 5\.\d MB; keep image files under 5 MB\.$/),
      ]);
    });

    it("names a Formula's or a Recipe's image as theirs", async () => {
      const dir = writeContent({
        ingredients: { lemon: { name: "Lemon", slotTypes: ["acid"] } },
        pairings: [],
        formulas: [{ ...formula, image: { ...lemonImage, file: "dressing.png" } }],
        recipes: { dressing: { ...recipe, image: { ...lemonImage, file: "recipe.png" } } },
        images: { "dressing.png": await small(), "recipe.png": await small() },
      });

      expect(await expectErrors(dir)).toEqual([
        "Formula dressing's image is 800×600; it needs at least 1024 pixels on its shorter side.",
        "Recipe dressing's image is 800×600; it needs at least 1024 pixels on its shorter side.",
      ]);
    });
  });
});
