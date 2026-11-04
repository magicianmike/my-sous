import { ImageResponse } from "next/og";
import { palettes } from "@/design/tokens";

export const dynamic = "force-static";
export const alt = "How MySous was made: a Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The link preview: the Case Study's title on MySous's page colour, made once at build time. */
export default function PreviewImage() {
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
        <div style={{ fontSize: 40, fontStyle: "italic", fontWeight: 700 }}>MySous</div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>
          How MySous was made
        </div>
        <div style={{ fontSize: 40, color: inkMuted, marginTop: 32 }}>
          A Case Study in product, design and engineering decisions.
        </div>
      </div>
    ),
    size,
  );
}
