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

it("has Ingredients common in every Cuisine in the real content", async () => {
  const result = await loadKitchen(join(process.cwd(), "content"));
  if (!result.ok) throw new Error("the real content doesn't load");
  const { kitchen } = result;

  const empty = kitchen.cuisines().filter(({ id }) => kitchen.cuisine(id)!.ingredients.length === 0);
  expect(empty.map(({ name }) => name)).toEqual([]);
});
