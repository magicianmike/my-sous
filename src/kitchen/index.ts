import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import matter from "gray-matter";
import { parse } from "yaml";
import { z } from "zod";
import { createKitchen, SLOT_REFERENCE, type Kitchen } from "./kitchen";
import {
  cuisineSchema,
  formulaSchema,
  ingredientSchema,
  pairingSchema,
  type IngredientContent,
  type KitchenContent,
} from "./schema";

export * from "./kitchen";

export type ContentError = { file: string; message: string };

export type LoadResult = { ok: true; kitchen: Kitchen } | { ok: false; errors: ContentError[] };

/** Content as read, before its references are checked; each Ingredient keeps its file for errors. */
type RawContent = Omit<KitchenContent, "ingredients"> & {
  ingredients: (IngredientContent & { file: string })[];
};

/**
 * Reads and validates the curated content in `contentDir`: every Cuisine in `cuisines.yaml`,
 * one Markdown file per Ingredient under `ingredients/` (frontmatter plus an essay), and every
 * Pairing, stored once, in `pairings.yaml`, and every Formula in `formulas.yaml`.
 */
export async function loadKitchen(contentDir: string): Promise<LoadResult> {
  const errors: ContentError[] = [];
  const content = await readContent(contentDir, errors);
  if (errors.length === 0) checkReferences(contentDir, content, errors);
  if (errors.length > 0) return { ok: false, errors };
  const ingredients = content.ingredients.map(({ file: _file, ...ingredient }) => ingredient);
  return { ok: true, kitchen: createKitchen({ ...content, ingredients }) };
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
    formulas: await readYamlList("formulas.yaml", formulaSchema),
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
}
