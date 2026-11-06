import { readdir, readFile, stat } from "node:fs/promises";
import { basename, join } from "node:path";
import matter from "gray-matter";
import sharp from "sharp";
import { parse } from "yaml";
import { z } from "zod";
import { createKitchen, SLOT_REFERENCE, type Kitchen } from "./kitchen";
import {
  cuisineSchema,
  formulaSchema,
  imageSchema,
  ingredientSchema,
  pairingSchema,
  recipeSchema,
  type Image,
  type IngredientContent,
  type KitchenContent,
  type RecipeContent,
} from "./schema";
import { BANNED_WORDS, BANNED_WORDS_RULE } from "./voice";

export * from "./kitchen";

export type ContentError = { file: string; message: string };

export type LoadResult = { ok: true; kitchen: Kitchen } | { ok: false; errors: ContentError[] };

/** Content as read, before its references are checked; Ingredients and Recipes keep their file for errors. */
type RawContent = Omit<KitchenContent, "ingredients" | "recipes"> & {
  ingredients: (IngredientContent & { file: string })[];
  recipes: (RecipeContent & { file: string })[];
};

/**
 * What an image must be to ship: big enough for the widest place it shows at twice the pixel density,
 * and light enough to process. The build makes the smaller files the Cook downloads.
 */
export const IMAGE_BUDGET = { minShortSide: 1024, maxMegabytes: 5 };

const SHAPE =
  /^<(path|circle|ellipse|line|polyline|rect)(\s+(d|cx|cy|r|rx|ry|x|y|x1|y1|x2|y2|width|height|points)="[-0-9.,\sa-zA-Z]*")*\s*\/>$/;

/** Names that flatten a continent or a broad region into one Cuisine. */
const CONTINENTAL =
  /\b(Asian|African|European|American|Latin American|Oceanian|Middle Eastern|Mediterranean|Oriental)\b/i;

/** Fields that hold ids, sources or settings rather than words the Cook reads. */
const NOT_COPY = new Set([
  ...["id", "file", "formula", "category", "cuisines", "slotTypes", "accepts", "fills", "slot", "about"],
  ...["citations", "provenance", "colour", "drawing"],
]);

/**
 * Whether a drawing is only self-closing shapes with geometry attributes. Drawings are rendered
 * as markup, so nothing else (scripts, event handlers, links, images) may get in.
 */
function isSimpleDrawing(drawing: string): boolean {
  const tags = drawing.match(/<[^>]*>/g) ?? [];
  const between = drawing.replace(/<[^>]*>/g, "");
  return tags.length > 0 && between.trim() === "" && tags.every((tag) => SHAPE.test(tag));
}

/**
 * Reads and validates the curated content in `contentDir`: every Cuisine in `cuisines.yaml`,
 * one Markdown file per Ingredient under `ingredients/` (frontmatter plus an essay), and every
 * Pairing, stored once, in `pairings.yaml`, every Formula in `formulas.yaml`, and any Recipes
 * under `recipes/`, one Markdown file of frontmatter each, named for its Formula.
 */
export async function loadKitchen(contentDir: string): Promise<LoadResult> {
  const errors: ContentError[] = [];
  const content = await readContent(contentDir, errors);
  if (errors.length === 0) {
    checkReferences(contentDir, content, errors);
    checkVoice(contentDir, content, errors);
  }
  if (errors.length > 0) return { ok: false, errors };
  const ingredients = content.ingredients.map(({ file: _file, ...ingredient }) => ingredient);
  const recipes = content.recipes.map(({ file: _file, ...recipe }) => recipe);
  return { ok: true, kitchen: createKitchen({ ...content, ingredients, recipes }) };
}

async function readContent(contentDir: string, errors: ContentError[]): Promise<RawContent> {
  function check<T>(schema: z.ZodType<T>, data: unknown, file: string): T | undefined {
    const result = schema.safeParse(data);
    if (result.success) return result.data;
    for (const issue of result.error.issues) {
      errors.push({ file, message: `${issue.path.join(".")}: ${issue.message}` });
    }
  }

  async function readYamlList<T>(name: string, schema: z.ZodType<T>): Promise<T[]> {
    const file = join(contentDir, name);
    let data: unknown;
    try {
      data = parse(await readFile(file, "utf8"));
    } catch (error) {
      // YAML syntax errors say where they are ("at line 2, column 9"); pass that on.
      errors.push({ file, message: error instanceof Error ? error.message.split("\n")[0] : String(error) });
      return [];
    }
    return check(z.array(schema), data, file) ?? [];
  }

  const ingredients: RawContent["ingredients"] = [];
  const ingredientsDir = join(contentDir, "ingredients");

  /** An Ingredient's drawing, if it exists and only draws simple shapes. */
  async function readDrawing(id: string): Promise<string | undefined> {
    const file = join(ingredientsDir, `${id}.svg`);
    let drawing: string;
    try {
      // Whitespace between shapes would become stray text in the page.
      drawing = (await readFile(file, "utf8")).trim().replace(/>\s+</g, "><");
    } catch {
      errors.push({ file, message: `Ingredient ${id} needs a drawing in ingredients/${id}.svg.` });
      return undefined;
    }
    if (!isSimpleDrawing(drawing)) {
      errors.push({
        file,
        message: `Ingredient ${id}'s drawing may only use path, circle, ellipse, line, polyline and rect, with geometry attributes.`,
      });
      return undefined;
    }
    return drawing;
  }
  /**
   * An image checked against its file: reviewed if it should be, there, and within the budget; measured
   * for the page. Undefined, with errors, when it isn't.
   */
  async function readImage(owner: string, image: z.infer<typeof imageSchema> | undefined, file: string) {
    if (!image) return undefined;
    const report = (problem: string) => errors.push({ file, message: `${owner}'s image ${problem}` });
    const { made, review } = image.provenance;
    if (made === "placeholder" && review) {
      report("is a placeholder, so it can't be reviewed; replace it with a reviewed image.");
    } else if (made === "ai-generated" && !review) {
      report("hasn't been reviewed; check it matches what it shows, then record the review.");
    } else if (review && !review.matches) {
      report("doesn't match what it shows, by its review; regenerate it.");
    }

    const path = join(contentDir, "images", image.file);
    let size: number;
    try {
      size = (await stat(path)).size;
    } catch {
      report(`"images/${image.file}" doesn't exist.`);
      return undefined;
    }
    const { width = 0, height = 0 } = await sharp(path).metadata();
    const megabytes = size / 1_000_000;
    if (megabytes > IMAGE_BUDGET.maxMegabytes) {
      report(`is ${megabytes.toFixed(1)} MB; keep image files under ${IMAGE_BUDGET.maxMegabytes} MB.`);
    }
    if (Math.min(width, height) < IMAGE_BUDGET.minShortSide) {
      report(`is ${width}×${height}; it needs at least ${IMAGE_BUDGET.minShortSide} pixels on its shorter side.`);
    }
    return { file: image.file, alt: image.alt, width, height, made } satisfies Image;
  }

  for (const name of (await readdir(ingredientsDir)).filter((f) => f.endsWith(".md")).sort()) {
    const file = join(ingredientsDir, name);
    const id = basename(name, ".md");
    const drawing = await readDrawing(id);
    if (drawing === undefined) continue;
    const { data, content: essay } = matter(await readFile(file, "utf8"));
    const ingredient = check(ingredientSchema, { ...data, essay: essay.trim(), drawing }, file);
    if (ingredient) {
      ingredients.push({ id, file, ...ingredient, image: await readImage(`Ingredient ${id}`, ingredient.image, file) });
    }
  }

  const formulasFile = join(contentDir, "formulas.yaml");
  const formulas = await Promise.all(
    (await readYamlList("formulas.yaml", formulaSchema)).map(async (formula) => ({
      ...formula,
      image: await readImage(`Formula ${formula.id}`, formula.image, formulasFile),
    })),
  );

  const recipes: RawContent["recipes"] = [];
  const recipesDir = join(contentDir, "recipes");
  // Recipes are optional, so content can have no folder for them.
  const recipeFiles = await readdir(recipesDir).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  for (const name of recipeFiles.filter((f) => f.endsWith(".md")).sort()) {
    const file = join(recipesDir, name);
    const recipe = check(recipeSchema, matter(await readFile(file, "utf8")).data, file);
    const formula = basename(name, ".md");
    if (recipe) recipes.push({ formula, file, ...recipe, image: await readImage(`Recipe ${formula}`, recipe.image, file) });
  }

  return {
    cuisines: await readYamlList("cuisines.yaml", cuisineSchema),
    ingredients,
    pairings: await readYamlList("pairings.yaml", pairingSchema),
    formulas,
    recipes,
  };
}

function checkReferences(contentDir: string, content: RawContent, errors: ContentError[]) {
  const cuisineIds = new Set(content.cuisines.map(({ id }) => id));
  const ingredientIds = new Set(content.ingredients.map(({ id }) => id));

  const cuisinesFile = join(contentDir, "cuisines.yaml");
  for (const { id, name } of content.cuisines.filter(({ name }) => CONTINENTAL.test(name))) {
    errors.push({
      file: cuisinesFile,
      message:
        `Cuisine ${id} is named "${name}"; name Cuisines regionally, ` +
        `such as "Sichuan" or "Levantine".`,
    });
  }

  for (const { id, file, cuisines } of content.ingredients) {
    for (const cuisine of cuisines.filter((c) => !cuisineIds.has(c))) {
      errors.push({ file, message: `Ingredient ${id} refers to unknown Cuisine "${cuisine}".` });
    }
  }

  const pairingsFile = join(contentDir, "pairings.yaml");
  const seen = new Set<string>();
  for (const { ingredients: [a, b], reasons, cuisines, citations } of content.pairings) {
    const pairing = `Pairing ${a} + ${b}`;
    const report = (problem: string) =>
      errors.push({ file: pairingsFile, message: `${pairing} ${problem}` });

    const key = [a, b].sort().join(" + ");
    if (seen.has(key)) report("is duplicated; store each Pairing once.");
    seen.add(key);
    for (const id of [a, b].filter((id) => !ingredientIds.has(id))) {
      report(`refers to unknown Ingredient "${id}".`);
    }
    for (const id of cuisines.filter((id) => !cuisineIds.has(id))) {
      report(`refers to unknown Cuisine "${id}".`);
    }
    if (a === b) report("pairs an Ingredient with itself.");
    if (reasons.length === 0) report("has no Pairing Reason.");
    if (citations.length === 0) report("cites no source; cite at least one, with a link.");
    for (const { title } of citations.filter(({ url }) => !url)) {
      report(`cites "${title}" without a link; cite a source the reader can open.`);
    }
  }

  const formulasFile = join(contentDir, "formulas.yaml");
  const fillable = new Set(content.ingredients.flatMap(({ slotTypes }) => slotTypes));
  for (const formula of content.formulas) {
    for (const slot of formula.slots.filter(({ accepts }) => !fillable.has(accepts))) {
      errors.push({
        file: formulasFile,
        message: `Formula ${formula.id} has a Slot "${slot.id}" that no Ingredient can fill (it accepts "${slot.accepts}").`,
      });
    }
    const slotIds = new Set(formula.slots.map(({ id }) => id));
    for (const [, id] of formula.method.flatMap((step) => [...step.matchAll(SLOT_REFERENCE)])) {
      if (!slotIds.has(id)) {
        errors.push({
          file: formulasFile,
          message: `Formula ${formula.id}'s method refers to unknown Slot "{${id}}".`,
        });
      }
    }
  }

  const ingredientsById = new Map(content.ingredients.map((ingredient) => [ingredient.id, ingredient]));
  for (const { formula: formulaId, file, fills, ingredients, steps } of content.recipes) {
    const report = (problem: string) => errors.push({ file, message: `Recipe ${formulaId} ${problem}` });
    const formula = content.formulas.find(({ id }) => id === formulaId);
    if (!formula) {
      report(`is for unknown Formula "${formulaId}"; name its file for a Formula.`);
      continue;
    }
    const slotFor = (id: string) => formula.slots.find((slot) => slot.id === id);

    for (const [slotId, ingredientIds] of Object.entries(fills)) {
      const slot = slotFor(slotId);
      if (!slot) {
        report(`fills unknown Slot "${slotId}".`);
        continue;
      }
      for (const ingredientId of ingredientIds) {
        const ingredient = ingredientsById.get(ingredientId);
        if (!ingredient) report(`fills "${slotId}" with unknown Ingredient "${ingredientId}".`);
        else if (!ingredient.slotTypes.includes(slot.accepts)) {
          report(`fills "${slotId}" with ${ingredientId}, which isn't ${slot.role}.`);
        }
      }
    }
    for (const slot of formula.slots.filter(({ id, required }) => required && !(id in fills))) {
      report(`leaves the required Slot "${slot.id}" without an Ingredient as written.`);
    }

    const seen = new Set<string>();
    for (const line of ingredients) {
      if (line.slot === undefined) continue;
      if (seen.has(line.slot)) report(`lists "${line.slot}" twice; give each Slot one ingredient line.`);
      seen.add(line.slot);
      const slot = slotFor(line.slot);
      if (!slot) {
        report(`lists unknown Slot "${line.slot}".`);
        continue;
      }
      for (const ingredientId of Object.keys(line.for ?? {})) {
        const ingredient = ingredientsById.get(ingredientId);
        if (!ingredient) report(`gives an amount for unknown Ingredient "${ingredientId}".`);
        else if (!ingredient.slotTypes.includes(slot.accepts)) {
          report(`gives an amount of ${ingredientId} for "${slot.id}", which it can't fill.`);
        }
      }
    }
    // Whatever fills a part, the Cook is told how much of it to use.
    const listed = new Set(ingredients.map(({ slot }) => slot));
    for (const slot of formula.slots.filter(({ id }) => !listed.has(id))) {
      report(`doesn't say how much to use for "${slot.id}"; give it an ingredient line.`);
    }

    steps.forEach(({ text, safety }, i) => {
      for (const [, id] of text.matchAll(SLOT_REFERENCE)) {
        if (!slotFor(id)) report(`refers to unknown Slot "{${id}}" in step ${i + 1}.`);
      }
      if (!safety) return;
      const slot = slotFor(safety.slot);
      if (!slot) {
        report(`marks step ${i + 1} safety-sensitive for unknown Slot "${safety.slot}".`);
        return;
      }
      // The Cook can put in any Ingredient that fits, so each needs the guidance.
      for (const { id } of content.ingredients.filter(
        ({ slotTypes, safety: guidance }) => slotTypes.includes(slot.accepts) && !guidance?.[safety.about],
      )) {
        report(
          `marks step ${i + 1} safety-sensitive for "${slot.id}", so ${id}, which can fill it, ` +
            `needs safety guidance on ${safety.about}.`,
        );
      }
    });
  }
}

/** Every word the Cook reads in the content, checked against the voice guide's banned words. */
function checkVoice(contentDir: string, content: RawContent, errors: ContentError[]) {
  function check(file: string, owner: string, value: unknown, path: string[] = []) {
    if (typeof value === "string") {
      const word = value.match(BANNED_WORDS)?.[0];
      if (word) errors.push({ file, message: `${owner}'s ${path.join(".")} says "${word}"; ${BANNED_WORDS_RULE}` });
    } else if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        if (!NOT_COPY.has(key)) check(file, owner, child, [...path, key]);
      }
    }
  }

  const cuisinesFile = join(contentDir, "cuisines.yaml");
  for (const cuisine of content.cuisines) check(cuisinesFile, `Cuisine ${cuisine.id}`, cuisine);
  for (const ingredient of content.ingredients) check(ingredient.file, `Ingredient ${ingredient.id}`, ingredient);
  const pairingsFile = join(contentDir, "pairings.yaml");
  for (const { ingredients: [a, b], reasons } of content.pairings) {
    check(pairingsFile, `Pairing ${a} + ${b}`, { reasons });
  }
  const formulasFile = join(contentDir, "formulas.yaml");
  for (const formula of content.formulas) check(formulasFile, `Formula ${formula.id}`, formula);
  for (const recipe of content.recipes) check(recipe.file, `Recipe ${recipe.formula}`, recipe);
}
