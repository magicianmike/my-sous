// Writes the validated content as one JSON file the browser's Kitchen is built from, before `next build`,
// `next dev` and the typecheck. Bundled into the app's script once, rather than passed down from the layout,
// where it would be written into every page.
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = join(import.meta.dirname, "..");
const cache = join(root, "node_modules", ".cache", "kitchen-content");

// The Kitchen's modules import without extensions, as the app's bundler allows, so they're bundled to run here.
const loader = join(cache, "load.mjs");
await build({
  entryPoints: [join(root, "src", "kitchen", "index.ts")],
  outfile: loader,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  logLevel: "error",
});
const { loadKitchen } = await import(pathToFileURL(loader).href);
const result = await loadKitchen(join(root, "content"));
await rm(cache, { recursive: true, force: true });

if (!result.ok) {
  for (const { file, message } of result.errors) console.error(`  ${relative(root, file)}: ${message}`);
  throw new Error("Content errors: the Kitchen's content wasn't written.");
}
const out = join(root, "src", "generated", "kitchen-content.json");
await mkdir(join(root, "src", "generated"), { recursive: true });
await writeFile(out, JSON.stringify(result.kitchen.content));
console.log(`Kitchen content written, for the browser: ${relative(root, out)}.`);
