import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { stringify } from "yaml";
import { loadKitchen, type Kitchen } from "./index";

/** Fixture content for tests that go through `loadKitchen`: a content folder written to a temp directory. */

/**
 * Frontmatter for one Ingredient file, plus its essay body and drawing (`null` for none).
 * Required fields get defaults.
 */
type FixtureIngredient = { name: string; body?: string; drawing?: string | null } & Record<
  string,
  unknown
>;

export const defaultColour = { wash: "#dcebc4", washDark: "#26361a", stroke: "#2f5714", strokeDark: "#c3e39a" };
export const defaultDrawing = '<circle cx="24" cy="24" r="17"/>';
export const defaultCitation = { title: "A source", url: "https://example.com/a-source" };

export function writeContent(fixture: {
  ingredients: Record<string, FixtureIngredient>;
  pairings: Record<string, unknown>[];
  cuisines?: unknown[];
  formulas?: unknown[];
  /** Recipes by Formula id: each file's frontmatter. */
  recipes?: Record<string, Record<string, unknown>>;
  /** Image files by name, under `images/`. */
  images?: Record<string, Buffer>;
}): string {
  const dir = mkdtempSync(join(tmpdir(), "kitchen-"));
  mkdirSync(join(dir, "ingredients"));
  for (const [id, { body = "An essay.", drawing = defaultDrawing, ...frontmatter }] of Object.entries(
    fixture.ingredients,
  )) {
    writeFileSync(
      join(dir, "ingredients", `${id}.md`),
      `---\n${stringify({ category: "produce", tip: "A tip.", colour: defaultColour, ...frontmatter })}---\n${body}\n`,
    );
    if (drawing !== null) writeFileSync(join(dir, "ingredients", `${id}.svg`), drawing);
  }
  // Every Pairing needs a cited source; fixtures get one unless they say otherwise.
  const pairings = fixture.pairings.map((pairing) => ({ citations: [defaultCitation], ...pairing }));
  writeFileSync(join(dir, "pairings.yaml"), stringify(pairings));
  writeFileSync(join(dir, "cuisines.yaml"), stringify(fixture.cuisines ?? []));
  writeFileSync(join(dir, "formulas.yaml"), stringify(fixture.formulas ?? []));
  if (fixture.recipes) {
    mkdirSync(join(dir, "recipes"));
    for (const [id, frontmatter] of Object.entries(fixture.recipes)) {
      writeFileSync(join(dir, "recipes", `${id}.md`), `---\n${stringify(frontmatter)}---\n`);
    }
  }
  if (fixture.images) {
    mkdirSync(join(dir, "images"));
    for (const [name, data] of Object.entries(fixture.images)) writeFileSync(join(dir, "images", name), data);
  }
  return dir;
}

/** A plain image of the given size, as a PNG. */
export function png(width: number, height: number): Promise<Buffer> {
  return sharp({ create: { width, height, channels: 3, background: "#d8c79a" } }).png().toBuffer();
}

export function reason(note: string) {
  return { category: "contrast", note };
}

export async function expectKitchen(dir: string): Promise<Kitchen> {
  const result = await loadKitchen(dir);
  if (!result.ok) throw new Error(result.errors.map((e) => e.message).join("\n"));
  return result.kitchen;
}

export async function expectErrors(dir: string): Promise<string[]> {
  const result = await loadKitchen(dir);
  if (result.ok) throw new Error("expected content errors, got a Kitchen");
  return result.errors.map((e) => e.message);
}

