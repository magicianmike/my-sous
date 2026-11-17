import { createHash } from "node:crypto";
import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";
// With its extension, since `npm run images` runs this under Node's type stripping, which needs one.
import { IMAGE_FORMATS, variantName, variantWidths, type ImageFormat } from "./variants.ts";

/** Lossy settings for photographic images; AVIF holds up at a lower quality number than WebP. */
const QUALITY: Record<ImageFormat, number> = { avif: 55, webp: 75 };

/**
 * Makes the files the Cook downloads from content's images: each in every format at each of its widths,
 * into `outDir`. An image is made again only when what's in it, or how it's made, has changed since its
 * files were made, or one of them is missing. That goes by content rather than file times, which a fresh
 * checkout resets, so CI can restore `outDir` from a cache and make only what a change touched.
 * Returns the images it made again, by file name.
 */
export async function buildImages(
  sourceDir: string,
  outDir: string,
  manifestFile = join(outDir, ".made-from.json"),
): Promise<string[]> {
  const files = await readdir(sourceDir).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  await mkdir(outDir, { recursive: true });
  // What each image's files were made from, by file name: a hash of the image and the settings.
  const madeFrom: Record<string, string> = JSON.parse(await readFile(manifestFile, "utf8").catch(() => "{}"));
  const rebuilt: string[] = [];
  for (const file of files.filter((name) => /\.(png|jpe?g|webp)$/i.test(name)).sort()) {
    const source = await readFile(join(sourceDir, file));
    const hash = createHash("sha256").update(JSON.stringify(QUALITY)).update(source).digest("hex");
    const { width = 0 } = await sharp(source).metadata();
    const targets = variantWidths(width).flatMap((w) => IMAGE_FORMATS.map((format) => ({ w, format })));
    const missing = await Promise.all(
      targets.map(({ w, format }) => access(join(outDir, variantName(file, w, format))).then(() => false, () => true)),
    );
    if (madeFrom[file] === hash && !missing.some(Boolean)) continue;
    await Promise.all(
      targets.map(({ w, format }) =>
        sharp(source)
          .resize({ width: w })
          .toFormat(format, { quality: QUALITY[format] })
          .toFile(join(outDir, variantName(file, w, format))),
      ),
    );
    madeFrom[file] = hash;
    rebuilt.push(file);
  }
  await mkdir(dirname(manifestFile), { recursive: true });
  await writeFile(manifestFile, JSON.stringify(madeFrom, null, 2));
  return rebuilt;
}
