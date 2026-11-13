// Builds Storybook into public/storybook, before `next build`, so the static export serves it at /storybook.
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const out = join(root, "public", "storybook");
execFileSync("npx", ["storybook", "build", "--quiet", "-o", out], { cwd: root, stdio: "inherit" });

// Vercel's clean URLs serve it at /storybook, with no trailing slash, so its relative paths need a base.
// It goes first in the head: a URL before the base would still resolve against the page's own.
for (const page of ["index.html", "iframe.html"]) {
  const file = join(out, page);
  const html = await readFile(file, "utf8");
  if (!html.includes("<head>")) throw new Error(`Storybook's ${page} has no <head> to put the base in.`);
  await writeFile(file, html.replace("<head>", '<head><base href="/storybook/" />'));
}
console.log("Storybook made, for /storybook.");
