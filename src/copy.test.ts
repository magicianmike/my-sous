import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, it } from "vitest";
import { loadKitchen } from "./kitchen";

/** Every file whose words can reach the Cook: the curated content, and the app's own code and copy. */
function wordsTheCookReads(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return wordsTheCookReads(path);
    // Copy is built in .ts too (rank reasons, "common in…"); tests are left out.
    return /\.(md|mdx|yaml|tsx?)$/.test(entry.name) && !entry.name.endsWith(".test.ts") ? [path] : [];
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

it("names every Cuisine in the real content regionally, never at continental level", async () => {
  const result = await loadKitchen(join(process.cwd(), "content"));

  expect(result.ok ? [] : result.errors.map(({ message }) => message)).toEqual([]);
});
