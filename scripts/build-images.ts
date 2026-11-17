// Makes the image files the site serves, before `next build` and `next dev`. See src/images/build.ts.
import { join } from "node:path";
import { buildImages } from "../src/images/build.ts";

const root = join(import.meta.dirname, "..");
// What each image was made from is kept beside the cache rather than in public/, which the site serves.
const made = await buildImages(
  join(root, "content", "images"),
  join(root, "public", "images"),
  join(root, "node_modules", ".cache", "images", "made-from.json"),
);
console.log(made.length > 0 ? `Images made: ${made.join(", ")}.` : "Images are up to date.");
