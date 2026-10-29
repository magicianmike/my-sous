import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadKitchen } from "@/kitchen";
import { contrastRatio, nonTextPairings, palettes, textPairings } from "./tokens";

describe("design tokens", () => {
  it("are worked out the way WCAG does", () => {
    // Known values: black on white is 21:1, and #767676 on white is the classic 4.54:1.
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#767676", "#ffffff")).toBeCloseTo(4.54, 2);
  });

  for (const [theme, palette] of Object.entries(palettes)) {
    describe(`in the ${theme} theme`, () => {
      it.each(textPairings)("%s text on %s meets AA (4.5:1)", (fg, bg) => {
        expect(contrastRatio(palette[fg], palette[bg])).toBeGreaterThanOrEqual(4.5);
      });

      it.each(nonTextPairings)("%s on %s is visible as a control (3:1)", (fg, bg) => {
        expect(contrastRatio(palette[fg], palette[bg])).toBeGreaterThanOrEqual(3);
      });
    });
  }

  it("every Ingredient's colours read in both themes", async () => {
    const result = await loadKitchen(join(process.cwd(), "content"));
    if (!result.ok) throw new Error(result.errors.map(({ message }) => message).join("\n"));

    const failures = result.kitchen.ingredients().flatMap(({ id, colour }) =>
      [
        ["light", palettes.light.ink, colour.wash, colour.stroke],
        ["dark", palettes.dark.ink, colour.washDark, colour.strokeDark],
      ].flatMap(([theme, ink, wash, stroke]) => [
        ...(contrastRatio(ink, wash) < 4.5 ? [`${id} (${theme}): text on wash`] : []),
        ...(contrastRatio(stroke, wash) < 3 ? [`${id} (${theme}): stroke on wash`] : []),
        // Controls sit on washes (the tray's chips), so the focus ring must show on them too.
        ...(contrastRatio(theme === "light" ? palettes.light.focus : palettes.dark.focus, wash) < 3
          ? [`${id} (${theme}): focus ring on wash`]
          : []),
      ]),
    );

    expect(failures).toEqual([]);
  });
});
