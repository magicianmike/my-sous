import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import matter from "gray-matter";
import { parse } from "yaml";
import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
});

const pairingReasonSchema = z.object({
  category: z.enum(["contrast", "aromatic bridge", "texture", "tradition"]),
  note: z.string().min(1),
});

const pairingSchema = z.object({
  ingredients: z.tuple([z.string(), z.string()]),
  reasons: z.array(pairingReasonSchema).default([]),
});

export type Ingredient = { id: string } & z.infer<typeof ingredientSchema>;
export type PairingReason = z.infer<typeof pairingReasonSchema>;
type Pairing = z.infer<typeof pairingSchema>;

/** A Pairing seen from one of its Ingredients: the other Ingredient and why they work. */
export type PairingView = { ingredient: Ingredient; reasons: PairingReason[] };

export type Kitchen = {
  ingredients(): Ingredient[];
  ingredient(id: string): Ingredient | undefined;
  pairingsFor(id: string): PairingView[];
};

export type ContentError = { file: string; message: string };

export type LoadResult = { ok: true; kitchen: Kitchen } | { ok: false; errors: ContentError[] };

/**
 * Reads and validates the curated content in `contentDir`: one Markdown file per
 * Ingredient under `ingredients/`, and every Pairing, stored once, in `pairings.yaml`.
 */
export async function loadKitchen(contentDir: string): Promise<LoadResult> {
  const errors: ContentError[] = [];

  function check<T>(schema: z.ZodType<T>, data: unknown, file: string): T | undefined {
    const result = schema.safeParse(data);
    if (result.success) return result.data;
    for (const issue of result.error.issues) {
      errors.push({ file, message: `${issue.path.join(".")}: ${issue.message}` });
    }
  }

  const ingredients = new Map<string, Ingredient>();
  const ingredientsDir = join(contentDir, "ingredients");
  for (const name of (await readdir(ingredientsDir)).filter((f) => f.endsWith(".md")).sort()) {
    const file = join(ingredientsDir, name);
    const id = basename(name, ".md");
    const data = check(ingredientSchema, matter(await readFile(file, "utf8")).data, file);
    if (data) ingredients.set(id, { id, ...data });
  }

  const pairingsFile = join(contentDir, "pairings.yaml");
  const pairings: Pairing[] =
    check(z.array(pairingSchema), parse(await readFile(pairingsFile, "utf8")), pairingsFile) ?? [];
  if (errors.length > 0) return { ok: false, errors };

  const seen = new Set<string>();
  for (const { ingredients: [a, b], reasons } of pairings) {
    const fail = (message: string) => errors.push({ file: pairingsFile, message });
    const key = [a, b].sort().join(" + ");
    if (seen.has(key)) fail(`Pairing ${key} is duplicated; store each Pairing once.`);
    seen.add(key);
    for (const id of [a, b].filter((id) => !ingredients.has(id))) {
      fail(`Pairing ${a} + ${b} refers to unknown Ingredient "${id}".`);
    }
    if (a === b) fail(`Pairing ${a} + ${b} pairs an Ingredient with itself.`);
    if (reasons.length === 0) fail(`Pairing ${a} + ${b} has no Pairing Reason.`);
  }
  if (errors.length > 0) return { ok: false, errors };

  const views = new Map<string, PairingView[]>();
  for (const { ingredients: [a, b], reasons } of pairings) {
    for (const [from, to] of [[a, b], [b, a]] as const) {
      const list = views.get(from) ?? [];
      list.push({ ingredient: ingredients.get(to)!, reasons });
      views.set(from, list);
    }
  }

  return {
    ok: true,
    kitchen: {
      ingredients: () => [...ingredients.values()],
      ingredient: (id) => ingredients.get(id),
      pairingsFor: (id) => views.get(id) ?? [],
    },
  };
}
