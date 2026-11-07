import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { palettes } from "@/design/tokens";

export const dynamic = "force-static";
export const alt = "How MySous was made: a Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Static instances of the site's faces: Fraunces at its softest, as the headings use it, and Nunito.
 * The image renderer can't read the site's woff2 files. Both are under the SIL Open Font License,
 * beside them in fonts/.
 */
const font = (file: string) => readFile(join(process.cwd(), "src/app/case-study/fonts", file));

/** The link preview: the Case Study's title in MySous's faces on its page colour, made once at build time. */
export default async function PreviewImage() {
  const { bg, ink, inkMuted } = palettes.light;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: bg,
          color: ink,
        }}
      >
        <div style={{ fontFamily: "Fraunces", fontSize: 40, fontStyle: "italic", fontWeight: 700 }}>MySous</div>
        <div style={{ fontFamily: "Fraunces", fontSize: 88, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>
          How MySous was made
        </div>
        <div style={{ fontFamily: "Nunito", fontSize: 40, color: inkMuted, marginTop: 32 }}>
          A Case Study in product, design and engineering decisions.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: await font("fraunces-soft-bold.ttf"), weight: 700, style: "normal" },
        { name: "Fraunces", data: await font("fraunces-soft-bold-italic.ttf"), weight: 700, style: "italic" },
        { name: "Nunito", data: await font("nunito-regular.ttf"), weight: 400, style: "normal" },
      ],
    },
  );
}
