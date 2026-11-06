import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, it } from "vitest";
import { loadKitchen } from "./kitchen";

/** Every file whose words can reach the Cook: the curated content, and the app's own code and copy. */
function wordsTheCookReads(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return wordsTheCookReads(path);
    // Copy is built in .ts too (rank reasons, "common in…").
    // The voice rule names the banned words; tests are left out.
    if (entry.name === "voice.ts" || entry.name.endsWith(".test.ts")) return [];
    return /\.(md|mdx|yaml|tsx?)$/.test(entry.name) ? [path] : [];
  });
}

it('never calls a dish or a tradition "authentic"; MySous says "common in…" instead', () => {
  const files = ["content", "src"].flatMap((dir) => wordsTheCookReads(join(process.cwd(), dir)));
  const failures = files.flatMap((file) =>
    readFileSync(file, "utf8")
      .split("\n")
      .flatMap((line, i) => (/\bauthentic/i.test(line) ? [`${relative(process.cwd(), file)}:${i + 1}`] : [])),
  );

  expect(failures).toEqual([]);
});

it("loads the real content with no errors: references, sources, voice and regional Cuisine names", async () => {
  const result = await loadKitchen(join(process.cwd(), "content"));

  expect(result.ok ? [] : result.errors.map(({ message }) => message)).toEqual([]);
});

/** The Kitchen built from the real content. */
async function realKitchen() {
  const result = await loadKitchen(join(process.cwd(), "content"));
  if (!result.ok) throw new Error("the real content doesn't load");
  return result.kitchen;
}

it("has Ingredients common in every Cuisine in the real content", async () => {
  const kitchen = await realKitchen();

  const empty = kitchen.cuisines().filter(({ id }) => kitchen.cuisine(id)!.ingredients.length === 0);
  expect(empty.map(({ name }) => name)).toEqual([]);
});

it("launches with six Cuisines", async () => {
  const kitchen = await realKitchen();

  expect(kitchen.cuisines().filter(({ launch }) => launch).map(({ name }) => name)).toEqual([
    "Southern Italian",
    "Oaxacan",
    "Levantine",
    "Sichuan",
    "Punjabi",
    "Japanese home cooking",
  ]);
});

it("can fill every Formula Slot three ways in each launch Cuisine, or says why it can't", async () => {
  const kitchen = await realKitchen();
  const slotTypes = [...new Set(kitchen.formulas().flatMap(({ slots }) => slots.map(({ accepts }) => accepts)))];

  const problems = kitchen
    .cuisines()
    .filter(({ launch }) => launch)
    .flatMap(({ id, name, slotExceptions }) => {
      const common = kitchen.cuisine(id)!.ingredients;
      return slotTypes.flatMap((slotType) => {
        const count = common.filter(({ slotTypes }) => slotTypes.includes(slotType)).length;
        const excepted = slotExceptions.some((exception) => exception.slotType === slotType);
        if (count < 3 && !excepted) return [`${name}: ${count} for "${slotType}"`];
        if (count >= 3 && excepted) return [`${name}: ${count} for "${slotType}", so its exception can go`];
        return [];
      });
    });

  expect(problems).toEqual([]);
});

it("links every Blend component that's an Ingredient in MySous", async () => {
  const kitchen = await realKitchen();
  const names = new Map(kitchen.ingredients().map(({ id, name }) => [name.toLowerCase(), id]));

  const unlinked = kitchen
    .ingredients()
    .filter(({ category }) => category === "blend")
    .flatMap(({ id }) =>
      kitchen
        .blendComponents(id)
        .filter(({ name, ingredient }) => !ingredient && names.has(name.toLowerCase()))
        .map(({ name }) => `${id}: "${name}" should be written as ${names.get(name.toLowerCase())}`),
    );

  expect(unlinked).toEqual([]);
});
