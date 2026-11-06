import { mkdtempSync, utimesSync, writeFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { png } from "../kitchen/test-content";
import { buildImages } from "./build";

/** Content's image folder with these files in it, and an empty folder for what the build makes. */
async function folders(files: Record<string, Buffer>) {
  const source = mkdtempSync(join(tmpdir(), "images-"));
  for (const [name, data] of Object.entries(files)) writeFileSync(join(source, name), data);
  return { source, out: mkdtempSync(join(tmpdir(), "built-")) };
}

describe("buildImages", () => {
  it("makes AVIF and WebP files at each width up to the image's own, never wider than 1600", async () => {
    const { source, out } = await folders({ "lemon.png": await png(2400, 1600), "dish.png": await png(1100, 1100) });

    await buildImages(source, out);

    expect((await readdir(out)).sort()).toEqual([
      "dish-1100.avif",
      "dish-1100.webp",
      "dish-480.avif",
      "dish-480.webp",
      "dish-800.avif",
      "dish-800.webp",
      "lemon-1200.avif",
      "lemon-1200.webp",
      "lemon-1600.avif",
      "lemon-1600.webp",
      "lemon-480.avif",
      "lemon-480.webp",
      "lemon-800.avif",
      "lemon-800.webp",
    ]);
    expect(await sharp(join(out, "lemon-800.avif")).metadata()).toMatchObject({ format: "heif", width: 800, height: 533 });
    expect(await sharp(join(out, "lemon-800.webp")).metadata()).toMatchObject({ format: "webp", width: 800, height: 533 });
  });

  it("only makes again what's changed since the last build", async () => {
    const { source, out } = await folders({ "lemon.png": await png(1600, 1067), "dish.png": await png(1600, 1067) });
    expect(await buildImages(source, out)).toEqual(["dish.png", "lemon.png"]);

    expect(await buildImages(source, out)).toEqual([]);

    const later = new Date(Date.now() + 60_000);
    utimesSync(join(source, "lemon.png"), later, later);
    expect(await buildImages(source, out)).toEqual(["lemon.png"]);
  });

  it("makes nothing when content has no images", async () => {
    const out = mkdtempSync(join(tmpdir(), "built-"));

    expect(await buildImages(join(out, "missing"), out)).toEqual([]);
  });
});
