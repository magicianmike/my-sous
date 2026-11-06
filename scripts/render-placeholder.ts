// Renders a placeholder image from Ingredients' drawings, to stand in until a reviewed AI-generated image
// arrives. One Ingredient fills the frame on its own wash; several sit in a row, as a dish.
//
//   npm run placeholder -- <image name> <ingredient id>...
//   npm run placeholder -- pan-sauce chicken-thigh garlic lemon basil
//
// Writes content/images/<image name>.png; name it in the content with `made: placeholder`.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const [name, ...ids] = process.argv.slice(2);
if (!name || ids.length === 0) {
  console.error("Usage: npm run placeholder -- <image name> <ingredient id>...");
  process.exit(1);
}

const root = join(import.meta.dirname, "..");
const ingredient = (id: string) => {
  const file = join(root, "content", "ingredients", id);
  const { colour } = matter(readFileSync(`${file}.md`, "utf8")).data as { colour: { wash: string; stroke: string } };
  return { colour, drawing: readFileSync(`${file}.svg`, "utf8").trim() };
};

// 3:2, at the size budget's smallest shorter side and the widest served width.
const width = 1600;
const height = 1067;
// The light theme's `sunk` (src/design/tokens.ts), so no harsh white. Type stripping can't load the
// tokens module here, so it's copied; a placeholder is rendered once and committed.
const ground = "#efeee6";

/** A drawing on its wash, centred on (x, y), `size` across; lines as IngredientMark draws them. */
function mark({ colour, drawing }: ReturnType<typeof ingredient>, x: number, y: number, size: number) {
  const scale = (size * 0.7) / 48;
  return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${colour.wash}"/>
    <g transform="translate(${x - 24 * scale} ${y - 24 * scale}) scale(${scale})" fill="none" stroke="${colour.stroke}"
      stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${drawing}</g>`;
}

const marks = ids.map(ingredient);
const svg =
  marks.length === 1
    ? `<rect width="${width}" height="${height}" fill="${marks[0].colour.wash}"/>${mark(marks[0], width / 2, height / 2, 820)}`
    : `<rect width="${width}" height="${height}" fill="${ground}"/>${marks
        .map((m, i) => mark(m, (width / marks.length) * (i + 0.5), height / 2, Math.min(360, (width / marks.length) * 0.85)))
        .join("")}`;

const out = join(root, "content", "images", `${name}.png`);
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${svg}</svg>`))
  .png()
  .toFile(out);
console.log(`Wrote ${out}`);
