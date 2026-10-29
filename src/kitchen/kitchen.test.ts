import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { stringify } from "yaml";
import { loadKitchen, type Kitchen } from "./index";

type FixtureIngredient = { name: string; category?: string; body?: string };

function writeContent(fixture: {
  ingredients: Record<string, FixtureIngredient>;
  pairings: unknown[];
}): string {
  const dir = mkdtempSync(join(tmpdir(), "kitchen-"));
  mkdirSync(join(dir, "ingredients"));
  for (const [id, { name, category = "produce", body = "" }] of Object.entries(
    fixture.ingredients,
  )) {
    writeFileSync(
      join(dir, "ingredients", `${id}.md`),
      `---\n${stringify({ name, category })}---\n${body}\n`,
    );
  }
  writeFileSync(join(dir, "pairings.yaml"), stringify(fixture.pairings));
  return dir;
}

const lemon = { name: "Lemon" };
const garlic = { name: "Garlic" };
const thyme = { name: "Thyme" };

function reason(note: string) {
  return { category: "contrast", note };
}

async function expectKitchen(dir: string): Promise<Kitchen> {
  const result = await loadKitchen(dir);
  if (!result.ok) throw new Error(result.errors.map((e) => e.message).join("\n"));
  return result.kitchen;
}

async function expectErrors(dir: string): Promise<string[]> {
  const result = await loadKitchen(dir);
  if (result.ok) throw new Error("expected content errors, got a Kitchen");
  return result.errors.map((e) => e.message);
}

describe("loadKitchen", () => {
  it("shows a Pairing from both of its Ingredients", async () => {
    const kitchen = await expectKitchen(
      writeContent({
        ingredients: { lemon, garlic, thyme },
        pairings: [
          {
            ingredients: ["lemon", "garlic"],
            reasons: [reason("Lemon's acid cuts through garlic's pungency.")],
          },
        ],
      }),
    );

    expect(kitchen.pairingsFor("lemon")).toEqual([
      {
        ingredient: { id: "garlic", name: "Garlic", category: "produce" },
        reasons: [{ category: "contrast", note: "Lemon's acid cuts through garlic's pungency." }],
      },
    ]);
    expect(kitchen.pairingsFor("garlic")).toEqual([
      {
        ingredient: { id: "lemon", name: "Lemon", category: "produce" },
        reasons: [{ category: "contrast", note: "Lemon's acid cuts through garlic's pungency." }],
      },
    ]);
    expect(kitchen.pairingsFor("thyme")).toEqual([]);
  });

  describe("rejects content", () => {
    it("when a Pairing refers to an unknown Ingredient", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon },
          pairings: [{ ingredients: ["lemon", "garlick"], reasons: [reason("A note.")] }],
        }),
      );

      expect(errors).toEqual(['Pairing lemon + garlick refers to unknown Ingredient "garlick".']);
    });

    it("when an Ingredient is paired with itself", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon },
          pairings: [{ ingredients: ["lemon", "lemon"], reasons: [reason("A note.")] }],
        }),
      );

      expect(errors).toEqual(["Pairing lemon + lemon pairs an Ingredient with itself."]);
    });

    it("when a Pairing is duplicated, in either order", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon, garlic },
          pairings: [
            { ingredients: ["lemon", "garlic"], reasons: [reason("A note.")] },
            { ingredients: ["garlic", "lemon"], reasons: [reason("Another note.")] },
          ],
        }),
      );

      expect(errors).toEqual(["Pairing garlic + lemon is duplicated; store each Pairing once."]);
    });

    it("when a Pairing has no Pairing Reason", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon, garlic, thyme },
          pairings: [
            { ingredients: ["lemon", "garlic"], reasons: [] },
            { ingredients: ["lemon", "thyme"] },
          ],
        }),
      );

      expect(errors).toEqual([
        "Pairing lemon + garlic has no Pairing Reason.",
        "Pairing lemon + thyme has no Pairing Reason.",
      ]);
    });

    it("when content doesn't match the content format, naming the file and field", async () => {
      const result = await loadKitchen(
        writeContent({
          ingredients: { lemon: { name: "" }, garlic },
          pairings: [
            { ingredients: ["lemon", "garlic"], reasons: [{ category: "vibes", note: "A note." }] },
          ],
        }),
      );

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.errors).toEqual([
        { file: expect.stringMatching(/ingredients\/lemon\.md$/), message: expect.stringMatching(/^name: /) },
        {
          file: expect.stringMatching(/pairings\.yaml$/),
          message: expect.stringMatching(/^0\.reasons\.0\.category: /),
        },
      ]);
    });
  });
});
