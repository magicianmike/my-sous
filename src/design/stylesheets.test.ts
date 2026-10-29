import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, it } from "vitest";

const root = join(process.cwd(), "src");

function stylesheets(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return stylesheets(path);
    return entry.name.endsWith(".css") ? [path] : [];
  });
}

it("stylesheets take colour, type and spacing from tokens, not raw values", () => {
  const raw = [
    /#[0-9a-f]{3,8}\b/i, // colours
    /\b(rgb|rgba|hsl|hsla)\(/i,
    /(?<![\w.-])-?\d*\.?\d+(px|rem)\b/, // lengths (em stays allowed, for sizes relative to the text)
    /font-weight:\s*\d/,
    /letter-spacing:\s*-?\d/,
  ];
  const failures = stylesheets(root).flatMap((file) =>
    readFileSync(file, "utf8")
      .split("\n")
      .flatMap((line, i) =>
        // Media queries can't read custom properties, so breakpoints are written out.
        !line.trim().startsWith("@media") && raw.some((pattern) => pattern.test(line))
          ? [`${relative(root, file)}:${i + 1}: ${line.trim()}`]
          : [],
      ),
  );

  expect(failures).toEqual([]);
});
