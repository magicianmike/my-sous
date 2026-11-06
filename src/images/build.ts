import { mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
// With its extension, since `npm run images` runs this under Node's type stripping, which needs one.
import { IMAGE_FORMATS, variantName, variantWidths, type ImageFormat } from "./variants.ts";

/** Lossy settings for photographic images; AVIF holds up at a lower quality number than WebP. */
const QUALITY: Record<ImageFormat, number> = { avif: 55, webp: 75 };

/**
 * Makes the files the Cook downloads from content's images: each in every format at each of its widths,
 * into `outDir`. An image is made again only when its file is newer than what was made from it.
 * Returns the images it made again, by file name.
 */
export async function buildImages(sourceDir: string, outDir: string): Promise<string[]> {
  const files = await readdir(sourceDir).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  await mkdir(outDir, { recursive: true });
  const rebuilt: string[] = [];
  for (const file of files.filter((name) => /\.(png|jpe?g|webp)$/i.test(name)).sort()) {
    const source = join(sourceDir, file);
    const changed = (await stat(source)).mtimeMs;
    const { width = 0 } = await sharp(source).metadata();
    const targets = variantWidths(width).flatMap((w) => IMAGE_FORMATS.map((format) => ({ w, format })));
    const stale = await Promise.all(
      targets.map(async ({ w, format }) => {
        const built = await stat(join(outDir, variantName(file, w, format))).catch(() => undefined);
        return !built || built.mtimeMs < changed;
      }),
    );
    if (!stale.some(Boolean)) continue;
    await Promise.all(
      targets.map(({ w, format }) =>
        sharp(source)
          .resize({ width: w })
          .toFormat(format, { quality: QUALITY[format] })
          .toFile(join(outDir, variantName(file, w, format))),
      ),
    );
    rebuilt.push(file);
  }
  return rebuilt;
}
