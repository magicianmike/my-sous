import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import matter from "gray-matter";
import { parse } from "yaml";
import { z } from "zod";

const cuisineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

const ingredientSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  /** For a Blend: what it typically includes, in plain words. */
  typicallyIncludes: z.array(z.string().min(1)).optional(),
  cuisines: z.array(z.string()).default([]),
  slotTypes: z.array(z.string().min(1)).default([]),
  tip: z.string().min(1),
  culturalContext: z.string().min(1).optional(),
  essay: z.string().min(1, "the Ingredient needs an essay below its frontmatter"),
});

const pairingReasonSchema = z.object({
  category: z.enum(["contrast", "aromatic bridge", "texture", "tradition"]),
  note: z.string().min(1),
  detail: z.string().min(1).optional(),
});

const citationSchema = z.object({
  title: z.string().min(1),
  url: z.url().optional(),
});

const pairingSchema = z.object({
  ingredients: z.tuple([z.string(), z.string()]),
  reasons: z.array(pairingReasonSchema).default([]),
  cuisines: z.array(z.string()).default([]),
  citations: z.array(citationSchema).default([]),
});

export type Cuisine = z.infer<typeof cuisineSchema>;
export type PairingReason = z.infer<typeof pairingReasonSchema>;
export type Citation = z.infer<typeof citationSchema>;
export type Ingredient = { id: string } & Omit<z.infer<typeof ingredientSchema>, "cuisines"> & {
  cuisines: Cuisine[];
};

/** A Pairing seen from one of its Ingredients: the other Ingredient and why they work. */
export type PairingView = {
  ingredient: Ingredient;
  reasons: PairingReason[];
  cuisines: Cuisine[];
  citations: Citation[];
};

export type Kitchen = {
  ingredients(): Ingredient[];
  ingredient(id: string): Ingredient | undefined;
  pairingsFor(id: string): PairingView[];
};

export type ContentError = { file: string; message: string };

export type LoadResult = { ok: true; kitchen: Kitchen } | { ok: false; errors: ContentError[] };

type RawIngredient = { id: string; file: string } & z.infer<typeof ingredientSchema>;
type RawPairing = z.infer<typeof pairingSchema>;
type RawContent = { cuisines: Cuisine[]; ingredients: RawIngredient[]; pairings: RawPairing[] };

/**
 * Reads and validates the curated content in `contentDir`: every Cuisine in `cuisines.yaml`,
 * one Markdown file per Ingredient under `ingredients/` (frontmatter plus an essay), and every
 * Pairing, stored once, in `pairings.yaml`.
 */
export async function loadKitchen(contentDir: string): Promise<LoadResult> {
  const errors: ContentError[] = [];
  const content = await readContent(contentDir, errors);
  if (errors.length === 0) checkReferences(contentDir, content, errors);
  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, kitchen: buildKitchen(content) };
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
    return check(z.array(schema), parse(await readFile(file, "utf8")), file) ?? [];
  }

  const ingredients: RawIngredient[] = [];
  const ingredientsDir = join(contentDir, "ingredients");
  for (const name of (await readdir(ingredientsDir)).filter((f) => f.endsWith(".md")).sort()) {
    const file = join(ingredientsDir, name);
    const { data, content: essay } = matter(await readFile(file, "utf8"));
    const ingredient = check(ingredientSchema, { ...data, essay: essay.trim() }, file);
    if (ingredient) ingredients.push({ id: basename(name, ".md"), file, ...ingredient });
  }

  return {
    cuisines: await readYamlList("cuisines.yaml", cuisineSchema),
    ingredients,
    pairings: await readYamlList("pairings.yaml", pairingSchema),
  };
}

function checkReferences(contentDir: string, content: RawContent, errors: ContentError[]) {
  const cuisineIds = new Set(content.cuisines.map(({ id }) => id));
  const ingredientIds = new Set(content.ingredients.map(({ id }) => id));

  for (const { id, file, cuisines } of content.ingredients) {
    for (const cuisine of cuisines.filter((c) => !cuisineIds.has(c))) {
      errors.push({ file, message: `Ingredient ${id} refers to unknown Cuisine "${cuisine}".` });
    }
  }

  const pairingsFile = join(contentDir, "pairings.yaml");
  const seen = new Set<string>();
  for (const { ingredients: [a, b], reasons, cuisines } of content.pairings) {
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
  }
}

function buildKitchen(content: RawContent): Kitchen {
  const cuisines = new Map(content.cuisines.map((cuisine) => [cuisine.id, cuisine]));
  const toCuisines = (ids: string[]) => ids.map((id) => cuisines.get(id)!);

  const ingredients = new Map<string, Ingredient>(
    content.ingredients.map(({ file: _file, ...ingredient }) => [
      ingredient.id,
      { ...ingredient, cuisines: toCuisines(ingredient.cuisines) },
    ]),
  );

  const pairingsByIngredient = new Map<string, PairingView[]>();
  for (const { ingredients: [a, b], reasons, cuisines, citations } of content.pairings) {
    for (const [from, to] of [[a, b], [b, a]] as const) {
      const views = pairingsByIngredient.get(from) ?? [];
      views.push({ ingredient: ingredients.get(to)!, reasons, cuisines: toCuisines(cuisines), citations });
      pairingsByIngredient.set(from, views);
    }
  }

  return {
    ingredients: () => [...ingredients.values()],
    ingredient: (id) => ingredients.get(id),
    pairingsFor: (id) => pairingsByIngredient.get(id) ?? [],
  };
}
