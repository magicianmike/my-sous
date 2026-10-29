import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { stringify } from "yaml";
import { loadKitchen, type Kitchen, type Suggestion, type Tension } from "./index";

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

      const { suggestions } = kitchen.suggest(
        kitchen.combination(["basil", "lemon", "thyme"]).ingredients,
        [],
      );

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

  describe("filling Slots", () => {
    const ingredient = (name: string, slotType: string) => ({ name, slotTypes: [slotType] });
    const pairing = (a: string, b: string, note: string) => ({
      ingredients: [a, b],
      reasons: [reason(note)],
    });
    const fixture = {
      ingredients: {
        lamb: ingredient("Lamb", "protein"),
        chicken: ingredient("Chicken", "protein"),
        lemon: ingredient("Lemon", "acid"),
        lime: ingredient("Lime", "acid"),
        vinegar: ingredient("Vinegar", "acid"),
        mint: ingredient("Mint", "herb"),
        parsley: ingredient("Parsley", "herb"),
        basil: ingredient("Basil", "herb"),
      },
      pairings: [
        pairing("lamb", "mint", "Mint's coolness lifts rich lamb."),
        pairing("lamb", "lemon", "Lemon cuts lamb's richness."),
        pairing("lemon", "mint", "Lemon sharpens mint."),
        pairing("lamb", "parsley", "Parsley freshens lamb."),
        pairing("chicken", "lime", "Lime brightens chicken."),
        pairing("lime", "basil", "Basil softens lime."),
      ],
      formulas: [
        {
          id: "plate",
          name: "Plate",
          description: "Something seared, sharpened and finished.",
          slots: [
            { id: "protein", role: "something to sear", accepts: "protein" },
            { id: "acid", role: "an acid", accepts: "acid" },
            { id: "herb", role: "a herb", accepts: "herb", required: false },
          ],
          method: ["Sear {protein}, squeeze over {acid}, scatter {herb}."],
        },
      ],
    };

    async function plate(combination: string[], pantry: string[] = []) {
      const kitchen = await expectKitchen(writeContent(fixture));
      const ingredients = (ids: string[]) => kitchen.combination(ids).ingredients;
      const [suggestion] = kitchen.suggest(ingredients(combination), ingredients(pantry)).suggestions;
      return { kitchen, suggestion };
    }

    const fill = (suggestion: Suggestion) =>
      suggestion.slots.map(({ slot, ingredient, source }) => [slot.id, ingredient?.id, source]);

    it("fills from the Combination first, then the Pantry, then the best-pairing Ingredient", async () => {
      const { suggestion } = await plate(["lamb"], ["vinegar"]);

      expect(fill(suggestion)).toEqual([
        ["protein", "lamb", "combination"],
        ["acid", "vinegar", "pantry"],
        ["herb", "mint", "pairing"],
      ]);
    });

    it("picks the Ingredient that pairs with most of the fill", async () => {
      const { suggestion } = await plate(["lamb"]);

      // Lemon pairs with lamb; mint pairs with lamb and lemon, parsley only with lamb.
      expect(fill(suggestion)).toEqual([
        ["protein", "lamb", "combination"],
        ["acid", "lemon", "pairing"],
        ["herb", "mint", "pairing"],
      ]);
    });

    it("leaves a Slot empty rather than fill it with an Ingredient no Pairing justifies", async () => {
      const { suggestion } = await plate(["vinegar"]);

      expect(fill(suggestion)).toEqual([
        ["protein", undefined, undefined],
        ["acid", "vinegar", "combination"],
        ["herb", undefined, undefined],
      ]);
    });

    it("fills a Slot once a later fill gives it a Pairing", async () => {
      const { suggestion } = await plate(["basil"]);

      // Nothing pairs with basil as a protein, but lime does as an acid, and chicken pairs with lime.
      expect(fill(suggestion)).toEqual([
        ["protein", "chicken", "pairing"],
        ["acid", "lime", "pairing"],
        ["herb", "basil", "combination"],
      ]);
    });

    it("says in one line why each Slot holds what it does", async () => {
      const { kitchen, suggestion } = await plate(["vinegar", "lamb"]);
      const reasons = (s: Suggestion) => s.slots.map(({ reason }) => reason);

      expect(reasons(suggestion)).toEqual([
        "Pairs with mint: Mint's coolness lifts rich lamb.",
        "From your Combination.",
        "Pairs with lamb: Mint's coolness lifts rich lamb.",
      ]);
      // Swapping lamb out leaves mint, which was there for lamb, without a Pairing.
      expect(reasons(kitchen.swap(suggestion, "protein", "chicken"))).toEqual([
        "Your choice. It doesn't pair with anything else here yet.",
        "From your Combination.",
        "Suggested earlier. It doesn't pair with anything else here now.",
      ]);
      expect(reasons((await plate(["vinegar"])).suggestion)[0]).toBe(
        "No Pairing here points to something to sear yet.",
      );
    });

    it("gives each filled Slot the Pairing that justifies it", async () => {
      const { suggestion } = await plate(["lamb"]);

      expect(
        suggestion.slots.map(({ slot, justification }) => [
          slot.id,
          justification?.ingredient.id,
          justification?.reasons[0].note,
        ]),
      ).toEqual([
        ["protein", "lemon", "Lemon cuts lamb's richness."],
        ["acid", "lamb", "Lemon cuts lamb's richness."],
        ["herb", "lamb", "Mint's coolness lifts rich lamb."],
      ]);
    });

    it("ranks each Slot's alternatives by how well they pair with the rest of the fill", async () => {
      const { suggestion } = await plate(["lamb"]);

      expect(
        suggestion.slots.map(({ slot, alternatives }) => [slot.id, alternatives.map(({ id }) => id)]),
      ).toEqual([
        // Ties keep content order.
        ["protein", ["chicken"]],
        ["acid", ["lime", "vinegar"]],
        ["herb", ["parsley", "basil"]],
      ]);
    });

    it("swaps a Slot, and the method, justification and alternatives follow", async () => {
      const { kitchen, suggestion } = await plate(["lamb"]);

      const swapped = kitchen.swap(suggestion, "herb", "parsley");

      expect(fill(swapped)).toEqual([
        ["protein", "lamb", "combination"],
        ["acid", "lemon", "pairing"],
        ["herb", "parsley", "swap"],
      ]);
      expect(swapped.method).toEqual(["Sear lamb, squeeze over lemon, scatter parsley."]);
      const herb = swapped.slots[2];
      expect(herb.justification?.reasons[0].note).toBe("Parsley freshens lamb.");
      expect(herb.alternatives.map(({ id }) => id)).toEqual(["mint", "basil"]);
      expect(fill(suggestion)[2]).toEqual(["herb", "mint", "pairing"]);
    });
  });

  describe("tensions", () => {
    const ingredient = (name: string, slotType: string) => ({ name, slotTypes: [slotType] });
    const pairing = (a: string, b: string) => ({ ingredients: [a, b], reasons: [reason("A note.")] });
    const fixture = {
      ingredients: {
        chocolate: ingredient("Chocolate", "sweet"),
        fig: ingredient("Fig", "sweet"),
        honey: ingredient("Honey", "sweet"),
        anchovy: ingredient("Anchovy", "salty"),
        caper: ingredient("Caper", "salty"),
        "sea-salt": ingredient("Sea salt", "salty"),
        basil: ingredient("Basil", "herb"),
        mint: ingredient("Mint", "herb"),
      },
      pairings: [
        pairing("anchovy", "basil"),
        pairing("fig", "anchovy"),
        pairing("fig", "basil"),
        pairing("honey", "basil"),
        pairing("caper", "basil"),
        pairing("sea-salt", "chocolate"),
        pairing("mint", "chocolate"),
      ],
      formulas: [
        {
          id: "dessert",
          name: "Dessert",
          description: "Something sweet with a herb.",
          slots: [
            { id: "sweet", role: "something sweet", accepts: "sweet" },
            { id: "herb", role: "a herb", accepts: "herb" },
          ],
          method: ["Serve {sweet} with {herb}."],
        },
      ],
    };

    async function suggestFor(ids: string[]) {
      const kitchen = await expectKitchen(writeContent(fixture));
      return kitchen.suggest(kitchen.combination(ids).ingredients, []);
    }

    const describeTensions = ({ tensions }: { tensions: Tension[] }) =>
      tensions.map(({ ingredients, swaps }) => [
        ingredients.map(({ id }) => id),
        swaps.map(({ replace, with: replacement }) => `${replace.id} → ${replacement.id}`),
      ]);

    it("names each pair in the Combination with no Pairing, and proposes a swap for each side", async () => {
      const result = await suggestFor(["chocolate", "anchovy", "basil"]);

      expect(describeTensions(result)).toEqual([
        // Fig pairs with anchovy and basil; caper and sea salt each pair with one, so content order.
        [["chocolate", "anchovy"], ["chocolate → fig", "anchovy → caper"]],
        // Mint pairs with chocolate; nothing of the same kind pairs with anchovy too.
        [["chocolate", "basil"], ["chocolate → fig", "basil → mint"]],
      ]);
    });

    it("reports no tensions when every Ingredient pairs with every other", async () => {
      expect((await suggestFor(["anchovy", "basil"])).tensions).toEqual([]);
    });

    it("leaves out a swap when nothing of the same kind pairs with the rest", async () => {
      const result = await suggestFor(["chocolate", "caper"]);

      expect(describeTensions(result)).toEqual([[["chocolate", "caper"], ["caper → sea-salt"]]]);
    });

    it("still gives a Suggestion for every Formula when nothing fits or pairs", async () => {
      const { suggestions, tensions } = await suggestFor(["anchovy", "caper", "sea-salt"]);

      expect(suggestions.map(({ formula, rankReason }) => [formula.id, rankReason])).toEqual([
        ["dessert", "None of your Combination fits this Formula yet."],
      ]);
      expect(suggestions[0].slots.map(({ ingredient }) => ingredient)).toEqual([undefined, undefined]);
      expect(tensions).toHaveLength(3);
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
      return kitchen.suggest(kitchen.combination(ids).ingredients, []).suggestions;
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

    it("ranks and explains by the Ingredients the Cook chose, not those suggested by Pairing", async () => {
      const suggestions = await rank(
        // Lamb fills "with-extra" by Pairing, since it pairs with mint and lemon.
        [formula("with-extra", ["mint", "lemon", "lamb"]), formula("chosen-pair", ["lemon", "garlic"])],
        ["mint", "lemon", "garlic"],
      );

      expect(suggestions.map(({ formula, rankReason }) => [formula.id, rankReason])).toEqual([
        ["chosen-pair", "Lemon and garlic pair well."],
        ["with-extra", "Mint and lemon don't have a Pairing in MySous yet."],
      ]);
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
      // A Formula with a Slot for each fill, so nothing else is added by Pairing. Chocolate pairs
      // with nothing, so with an empty Combination its Slot stays empty.
      const [suggestion] = await rank(
        [formula("dish", fills.length > 0 ? fills : ["chocolate"])],
        fills,
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
