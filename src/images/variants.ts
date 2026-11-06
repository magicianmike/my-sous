/**
 * The sizes an image is served at, shared by the build that makes them and the page that asks for them.
 * The widest is enough for the widest place an image shows (a dish's header) at twice the pixel density.
 */
export const IMAGE_WIDTHS = [480, 800, 1200, 1600];

/** Modern formats, best first; a browser takes the first it can show. */
export const IMAGE_FORMATS = ["avif", "webp"] as const;

export type ImageFormat = (typeof IMAGE_FORMATS)[number];

/** The widths made for an image this wide: each standard width below it, then its own width, up to the widest. */
export function variantWidths(width: number): number[] {
  const widest = Math.min(width, IMAGE_WIDTHS.at(-1)!);
  return [...IMAGE_WIDTHS.filter((w) => w < widest), widest];
}

/** A made file's name, such as "lemon-800.avif" for "lemon.png" at 800 pixels wide. */
export function variantName(file: string, width: number, format: ImageFormat): string {
  return `${file.replace(/\.[^.]+$/, "")}-${width}.${format}`;
}
