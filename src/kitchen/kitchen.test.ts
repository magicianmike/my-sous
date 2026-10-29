import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { stringify } from "yaml";
import { loadKitchen, type Kitchen } from "./index";

/** Frontmatter for one Ingredient file, plus its essay body. Required fields get defaults. */
type FixtureIngredient = { name: string; body?: string } & Record<string, unknown>;

function writeContent(fixture: {
  ingredients: Record<string, FixtureIngredient>;
  pairings: unknown[];
  cuisines?: unknown[];
}): string {
  const dir = mkdtempSync(join(tmpdir(), "kitchen-"));
  mkdirSync(join(dir, "ingredients"));
  for (const [id, { body = "An essay.", ...frontmatter }] of Object.entries(fixture.ingredients)) {
    writeFileSync(
      join(dir, "ingredients", `${id}.md`),
      `---\n${stringify({ category: "produce", tip: "A tip.", ...frontmatter })}---\n${body}\n`,
    );
  }
  writeFileSync(join(dir, "pairings.yaml"), stringify(fixture.pairings));
  writeFileSync(join(dir, "cuisines.yaml"), stringify(fixture.cuisines ?? []));
  return dir;
}

const lemon = { name: "Lemon" };
const garlic = { name: "Garlic" };
const thyme = { name: "Thyme" };
const levantine = {
  id: "levantine",
  name: "Levantine",
  description: "The cooking of the eastern Mediterranean coast.",
};

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

    const note = "Lemon's acid cuts through garlic's pungency.";
    expect(
      kitchen.pairingsFor("lemon").map((p) => [p.ingredient.id, p.reasons[0].note]),
    ).toEqual([["garlic", note]]);
    expect(
      kitchen.pairingsFor("garlic").map((p) => [p.ingredient.id, p.reasons[0].note]),
    ).toEqual([["lemon", note]]);
    expect(kitchen.pairingsFor("thyme")).toEqual([]);
  });

  it("gives an Ingredient's written content, Slot types and the Cuisines it's common in", async () => {
    const kitchen = await expectKitchen(
      writeContent({
        cuisines: [levantine],
        ingredients: {
          zaatar: {
            name: "Za'atar",
            category: "blend",
            typicallyIncludes: ["dried thyme", "sumac", "sesame"],
            cuisines: ["levantine"],
            slotTypes: ["seasoning"],
            tip: "Bloom it in olive oil.",
            culturalContext: "Often eaten with bread and olive oil.",
            body: "A tangy, herbal blend.\n\nIt burns quickly.",
          },
        },
        pairings: [],
      }),
    );

    expect(kitchen.ingredient("zaatar")).toEqual({
      id: "zaatar",
      name: "Za'atar",
      category: "blend",
      typicallyIncludes: ["dried thyme", "sumac", "sesame"],
      cuisines: [levantine],
      slotTypes: ["seasoning"],
      tip: "Bloom it in olive oil.",
      culturalContext: "Often eaten with bread and olive oil.",
      essay: "A tangy, herbal blend.\n\nIt burns quickly.",
    });
  });

  it("gives a Pairing's Cuisines, longer text and citations", async () => {
    const citation = { title: "A cookbook", url: "https://example.com/book" };
    const kitchen = await expectKitchen(
      writeContent({
        cuisines: [levantine],
        ingredients: { lemon, garlic },
        pairings: [
          {
            ingredients: ["lemon", "garlic"],
            reasons: [{ ...reason("A note."), detail: "A longer explanation." }],
            cuisines: ["levantine"],
            citations: [citation],
          },
        ],
      }),
    );

    const [pairing] = kitchen.pairingsFor("garlic");
    expect(pairing.reasons).toEqual([
      { category: "contrast", note: "A note.", detail: "A longer explanation." },
    ]);
    expect(pairing.cuisines).toEqual([levantine]);
    expect(pairing.citations).toEqual([citation]);
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

    it("when a Pairing refers to an unknown Cuisine", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon, garlic },
          cuisines: [levantine],
          pairings: [
            {
              ingredients: ["lemon", "garlic"],
              reasons: [reason("A note.")],
              cuisines: ["levantine", "asian"],
            },
          ],
        }),
      );

      expect(errors).toEqual(['Pairing lemon + garlic refers to unknown Cuisine "asian".']);
    });

    it("when an Ingredient refers to an unknown Cuisine", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon: { ...lemon, cuisines: ["levantine", "asian"] } },
          cuisines: [levantine],
          pairings: [],
        }),
      );

      expect(errors).toEqual(['Ingredient lemon refers to unknown Cuisine "asian".']);
    });

    it("when an Ingredient has no essay", async () => {
      const errors = await expectErrors(
        writeContent({ ingredients: { lemon: { ...lemon, body: "  \n" } }, pairings: [] }),
      );

      expect(errors).toEqual(["essay: the Ingredient needs an essay below its frontmatter"]);
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
