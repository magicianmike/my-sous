// Makes the image files the site serves, before `next build` and `next dev`. See src/images/build.ts.
import { join } from "node:path";
import { buildImages } from "../src/images/build.ts";

const root = join(import.meta.dirname, "..");
const made = await buildImages(join(root, "content", "images"), join(root, "public", "images"));
console.log(made.length > 0 ? `Images made: ${made.join(", ")}.` : "Images are up to date.");
