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
  formulas?: unknown[];
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
  writeFileSync(join(dir, "formulas.yaml"), stringify(fixture.formulas ?? []));
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

  describe("a Combination", () => {
    const ingredients = {
      lemon,
      garlic,
      thyme,
      basil: { name: "Basil" },
      tomato: { name: "Tomato" },
    };

    it("keeps known Ingredients in order and drops duplicates", async () => {
      const kitchen = await expectKitchen(writeContent({ ingredients, pairings: [] }));

      const combination = kitchen.combination(["garlic", "lemon", "garlic"]);

      expect(combination.ingredients.map(({ id }) => id)).toEqual(["garlic", "lemon"]);
      expect(combination.unknown).toEqual([]);
      expect(combination.overLimit).toEqual([]);
    });

    it("drops unknown ids and reports them", async () => {
      const kitchen = await expectKitchen(writeContent({ ingredients, pairings: [] }));

      const combination = kitchen.combination(["lemon", "unicorn", "garlic"]);

      expect(combination.ingredients.map(({ id }) => id)).toEqual(["lemon", "garlic"]);
      expect(combination.unknown).toEqual(["unicorn"]);
    });

    it("holds at most four Ingredients and reports the rest", async () => {
      const kitchen = await expectKitchen(writeContent({ ingredients, pairings: [] }));

      const combination = kitchen.combination(["lemon", "garlic", "thyme", "basil", "tomato"]);

      expect(combination.ingredients.map(({ id }) => id)).toEqual([
        "lemon",
        "garlic",
        "thyme",
        "basil",
      ]);
      expect(combination.overLimit.map(({ id }) => id)).toEqual(["tomato"]);
    });
  });

  describe("suggest", () => {
    const fixture = {
      ingredients: {
        lemon: { ...lemon, slotTypes: ["acid"] },
        garlic: { ...garlic, slotTypes: ["aromatic"] },
        thyme: { ...thyme, slotTypes: ["herb"] },
        basil: { name: "Basil", slotTypes: ["herb"] },
      },
      pairings: [],
      formulas: [
        {
          id: "pan-sauce",
          name: "Pan sauce",
          description: "A quick sauce from the pan.",
          slots: [
            { id: "aromatic", role: "an aromatic", accepts: "aromatic" },
            { id: "acid", role: "an acid", accepts: "acid" },
            { id: "herb", role: "a herb", accepts: "herb", required: false },
          ],
          method: ["Soften {aromatic}, add {acid}, finish with {herb}."],
        },
        {
          id: "herb-salad",
          name: "Herb salad",
          description: "Two herbs, dressed.",
          slots: [
            { id: "first-herb", role: "a herb", accepts: "herb" },
            { id: "second-herb", role: "another herb", accepts: "herb" },
            { id: "acid", role: "an acid", accepts: "acid" },
          ],
          method: ["Toss {first-herb} and {second-herb} with {acid}."],
        },
      ],
    };

    function fills(suggestion: { formula: { id: string }; slots: { slot: { id: string }; ingredient?: { id: string } }[] }) {
      return [
        suggestion.formula.id,
        Object.fromEntries(suggestion.slots.map(({ slot, ingredient }) => [slot.id, ingredient?.id])),
      ];
    }

    it("fills each Formula's Slots from the Combination, in order, one Slot per Ingredient", async () => {
      const kitchen = await expectKitchen(writeContent(fixture));

      const suggestions = kitchen.suggest(kitchen.combination(["basil", "lemon", "thyme"]).ingredients, []);

      expect(suggestions.map(fills)).toEqual([
        ["pan-sauce", { aromatic: undefined, acid: "lemon", herb: "basil" }],
        ["herb-salad", { "first-herb": "basil", "second-herb": "thyme", acid: "lemon" }],
      ]);
      expect(suggestions[0].method).toEqual(["Soften an aromatic, add lemon, finish with basil."]);
      expect(suggestions[1].slots.map(({ source }) => source)).toEqual([
        "combination",
        "combination",
        "combination",
      ]);
    });

    it("gives the same Suggestions every time for the same Combination", async () => {
      const suggestFrom = async () => {
        const kitchen = await expectKitchen(writeContent(fixture));
        return kitchen.suggest(kitchen.combination(["thyme", "garlic", "basil"]).ingredients, []);
      };

      expect(await suggestFrom()).toEqual(await suggestFrom());
    });
  });

  describe("ranking Suggestions", () => {
    const pairs = (...ids: [string, string][]) =>
      ids.map((ingredients) => ({ ingredients, reasons: [reason("A note.")] }));
    /** A Formula whose Slots each accept one Ingredient, by id. */
    const formula = (id: string, slots: string[]) => ({
      id,
      name: id,
      description: "A Formula.",
      slots: slots.map((slot) => ({ id: slot, role: `some ${slot}`, accepts: slot })),
      method: ["Cook."],
    });
    const fixture = {
      ingredients: Object.fromEntries(
        ["lamb", "mint", "lemon", "garlic", "chocolate"].map((id) => [
          id,
          { name: id[0].toUpperCase() + id.slice(1), slotTypes: [id] },
        ]),
      ),
      pairings: pairs(["lamb", "mint"], ["lamb", "lemon"], ["lamb", "garlic"], ["lemon", "garlic"]),
    };

    async function rank(formulas: unknown[], ids: string[]) {
      const kitchen = await expectKitchen(writeContent({ ...fixture, formulas }));
      return kitchen.suggest(kitchen.combination(ids).ingredients, []);
    }

    it("puts Suggestions with more Pairings among their fills first", async () => {
      const suggestions = await rank(
        [
          formula("loose", ["mint", "chocolate"]),
          formula("tight", ["lamb", "lemon", "garlic"]),
          formula("middling", ["lamb", "mint"]),
        ],
        ["lamb", "mint", "lemon", "garlic"],
      );

      expect(suggestions.map(({ formula }) => formula.id)).toEqual(["tight", "middling", "loose"]);
    });

    it("breaks ties by the order Formulas appear in the content", async () => {
      const suggestions = await rank(
        [formula("second-in-name", ["lamb", "mint"]), formula("a-first-in-name", ["lamb", "lemon"])],
        ["lamb", "mint", "lemon"],
      );

      expect(suggestions.map(({ formula }) => formula.id)).toEqual([
        "second-in-name",
        "a-first-in-name",
      ]);
    });

    it.each([
      [["lamb", "mint", "lemon"], "Everything here pairs with lamb."],
      [["lamb", "mint"], "Lamb and mint pair well."],
      [["lamb", "lemon", "garlic"], "Every Ingredient here pairs with every other."],
      [["lemon", "garlic", "mint"], "Lemon and garlic pair well, but mint doesn't pair with the rest."],
      [["mint", "chocolate"], "Mint and chocolate don't have a Pairing in MySous yet."],
      [["mint", "chocolate", "garlic"], "None of these Ingredients pair with each other yet."],
      [["mint"], "Only mint from your Combination is used here."],
      [[], "None of your Combination fits this Formula yet."],
    ])("explains its rank when it uses %j", async (fills, expected) => {
      const [suggestion] = await rank(
        [formula("dish", ["lamb", "mint", "lemon", "garlic", "chocolate"])],
        // An unknown id is dropped, which leaves an empty Combination.
        fills.length > 0 ? fills : ["not-an-ingredient"],
      );

      expect(suggestion.rankReason).toBe(expected);
    });
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

    it("when a Formula has a Slot no Ingredient can fill", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon: { ...lemon, slotTypes: ["acid"] } },
          pairings: [],
          formulas: [
            {
              id: "dressing",
              name: "Dressing",
              description: "A sharp dressing.",
              slots: [
                { id: "acid", role: "an acid", accepts: "acid" },
                { id: "oil", role: "an oil", accepts: "fat" },
              ],
              method: ["Whisk {acid} into {oil}."],
            },
          ],
        }),
      );

      expect(errors).toEqual([
        'Formula dressing has a Slot "oil" that no Ingredient can fill (it accepts "fat").',
      ]);
    });

    it("when a Formula's method refers to a Slot it doesn't have", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon: { ...lemon, slotTypes: ["acid"] } },
          pairings: [],
          formulas: [
            {
              id: "dressing",
              name: "Dressing",
              description: "A sharp dressing.",
              slots: [{ id: "acid", role: "an acid", accepts: "acid" }],
              method: ["Whisk {acid} into {oil}."],
            },
          ],
        }),
      );

      expect(errors).toEqual(['Formula dressing\'s method refers to unknown Slot "{oil}".']);
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
