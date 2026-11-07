import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadKitchen, type Kitchen, type Suggestion } from "./index";
import { defaultColour, defaultDrawing, expectErrors, expectKitchen, reason, writeContent } from "./test-content";

/** The Cook swaps one Ingredient for another as they do on the page: tick the new one, untick the old. */
const swap = (kitchen: Kitchen, suggestion: Suggestion, slotId: string, out: string, chosen: string) =>
  kitchen.removeFromSlot(kitchen.addToSlot(suggestion, slotId, chosen), slotId, out);

const lemon = { name: "Lemon" };
const garlic = { name: "Garlic" };
const thyme = { name: "Thyme" };
const levantine = {
  id: "levantine",
  name: "Levantine",
  description: "The cooking of the eastern Mediterranean coast.",
};
/** Levantine as the Kitchen gives it back, with the defaults a Cuisine gets. */
const levantineAsLoaded = { ...levantine, launch: false, slotExceptions: [] };

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
      cuisines: [levantineAsLoaded],
      slotTypes: ["seasoning"],
      tip: "Bloom it in olive oil.",
      culturalContext: "Often eaten with bread and olive oil.",
      essay: "A tangy, herbal blend.\n\nIt burns quickly.",
      colour: defaultColour,
      drawing: defaultDrawing,
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
    expect(pairing.cuisines).toEqual([levantineAsLoaded]);
    expect(pairing.citations).toEqual([citation]);
  });

  it("groups an Ingredient's Pairings by Pairing Reason category, in a fixed order", async () => {
    const kitchen = await expectKitchen(
      writeContent({
        ingredients: { lemon, garlic, thyme, basil: { name: "Basil" } },
        pairings: [
          {
            ingredients: ["lemon", "garlic"],
            reasons: [
              { category: "tradition", note: "Garlic and lemon, traditionally." },
              { category: "contrast", note: "Lemon cuts garlic." },
            ],
          },
          {
            ingredients: ["thyme", "lemon"],
            reasons: [{ category: "aromatic bridge", note: "Thyme and lemon share a resinous note." }],
          },
          { ingredients: ["lemon", "basil"], reasons: [{ category: "contrast", note: "Lemon lifts basil." }] },
        ],
      }),
    );

    expect(
      kitchen
        .pairingsByReason("lemon")
        .map(({ category, pairings }) => [
          category,
          pairings.map(({ ingredient, reasons }) => [ingredient.id, reasons.map(({ note }) => note)]),
        ]),
    ).toEqual([
      [
        "contrast",
        [
          ["garlic", ["Lemon cuts garlic."]],
          ["basil", ["Lemon lifts basil."]],
        ],
      ],
      ["aromatic bridge", [["thyme", ["Thyme and lemon share a resinous note."]]]],
      // No texture Pairings, so no texture group.
      ["tradition", [["garlic", ["Garlic and lemon, traditionally."]]]],
    ]);
  });

  it("lists what a Blend typically includes, linking components that are Ingredients", async () => {
    const kitchen = await expectKitchen(
      writeContent({
        ingredients: { thyme, zaatar: { name: "Za'atar", typicallyIncludes: ["thyme", "sumac", "sesame"] } },
        pairings: [],
      }),
    );

    expect(
      kitchen.blendComponents("zaatar").map(({ name, ingredient }) => [name, ingredient?.id]),
    ).toEqual([
      ["Thyme", "thyme"],
      ["sumac", undefined],
      ["sesame", undefined],
    ]);
    expect(kitchen.blendComponents("thyme")).toEqual([]);
  });

  describe("search", () => {
    const names = ["Lemon", "Lime", "Chicken thigh", "Fresh chile", "Basil", "Scallion", "Za'atar", "Jalapeño"];
    const ingredients = Object.fromEntries(
      names.map((name, i) => [`ingredient-${i}`, { name }]),
    );

    async function search(query: string) {
      const kitchen = await expectKitchen(writeContent({ ingredients, pairings: [] }));
      return kitchen.search(query).map(({ name }) => name);
    }

    it("matches part of a name, ignoring case and surrounding spaces", async () => {
      expect(await search("  LEM ")).toEqual(["Lemon"]);
      expect(await search("li")).toEqual(["Lime", "Scallion"]);
    });

    it("puts names that start with the query first, then words that do, then the rest", async () => {
      expect(await search("ch")).toEqual(["Chicken thigh", "Fresh chile"]);
      // Within each group, alphabetical.
      expect(await search("l")).toEqual([
        "Lemon",
        "Lime",
        "Basil",
        "Fresh chile",
        "Jalapeño",
        "Scallion",
      ]);
    });

    it("ignores accents, apostrophes, extra spaces and word order", async () => {
      expect(await search("zaatar")).toEqual(["Za'atar"]);
      expect(await search("Za’atar")).toEqual(["Za'atar"]);
      expect(await search("jalapeno")).toEqual(["Jalapeño"]);
      expect(await search("chicken   thigh")).toEqual(["Chicken thigh"]);
      expect(await search("thigh chicken")).toEqual(["Chicken thigh"]);
    });

    it("finds nothing for an empty query or a name not in MySous", async () => {
      expect(await search("   ")).toEqual([]);
      expect(await search("mango")).toEqual([]);
    });
  });

  it("groups every Ingredient by category, in a fixed order of categories and by name within each", async () => {
    const kitchen = await expectKitchen(
      writeContent({
        ingredients: {
          lemon: { ...lemon, category: "citrus" },
          garlic: { ...garlic, category: "allium" },
          thyme: { ...thyme, category: "herb" },
          basil: { name: "Basil", category: "herb" },
        },
        pairings: [],
      }),
    );

    const groups = kitchen.ingredientsByCategory();
    expect(groups.map(({ heading, ingredients }) => [heading, ingredients.map(({ id }) => id)])).toEqual([
      ["Herbs", ["basil", "thyme"]],
      ["Alliums", ["garlic"]],
      ["Citrus", ["lemon"]],
    ]);
  });

  describe("Cuisines", () => {
    const sichuan = { id: "sichuan", name: "Sichuan", description: "The cooking of Sichuan province." };
    const fixture = {
      cuisines: [levantine, sichuan],
      ingredients: {
        lemon: { ...lemon, cuisines: ["levantine"] },
        garlic: { ...garlic, cuisines: ["levantine", "sichuan"] },
        thyme: { ...thyme, cuisines: ["levantine"] },
        chile: { name: "Chile", cuisines: ["sichuan"] },
      },
      pairings: [
        {
          ingredients: ["lemon", "garlic"],
          reasons: [reason("Lemon cuts garlic.")],
          cuisines: ["levantine"],
        },
        { ingredients: ["garlic", "chile"], reasons: [reason("Heat and pungency.")], cuisines: ["sichuan"] },
        { ingredients: ["garlic", "thyme"], reasons: [reason("Herbal and sweet.")] },
      ],
    };

    it("filters an Ingredient's Pairings to the ones common in a Cuisine", async () => {
      const kitchen = await expectKitchen(writeContent(fixture));
      const others = (id: string, cuisine?: string) =>
        kitchen.pairingsFor(id, cuisine).map(({ ingredient }) => ingredient.id);

      expect(others("garlic")).toEqual(["lemon", "chile", "thyme"]);
      expect(others("garlic", "sichuan")).toEqual(["chile"]);
      expect(others("garlic", "levantine")).toEqual(["lemon"]);
      expect(kitchen.pairingCuisines("garlic").map(({ id }) => id)).toEqual(["levantine", "sichuan"]);
      expect(kitchen.pairingCuisines("thyme")).toEqual([]);
    });

    it("gives a Cuisine's Ingredients, in name order, and the Pairings common in it", async () => {
      const kitchen = await expectKitchen(writeContent(fixture));

      const view = kitchen.cuisine("levantine")!;

      expect(view.cuisine).toMatchObject(levantine);
      expect(view.ingredients.map(({ id }) => id)).toEqual(["garlic", "lemon", "thyme"]);
      const pairings = view.pairings.map(({ ingredients, reasons }) => [
        ingredients.map(({ id }) => id),
        reasons[0].note,
      ]);
      expect(pairings).toEqual([[["lemon", "garlic"], "Lemon cuts garlic."]]);
      expect(kitchen.cuisine("atlantis")).toBeUndefined();
    });

    it("lists every Cuisine, in content order", async () => {
      const kitchen = await expectKitchen(writeContent(fixture));

      expect(kitchen.cuisines().map(({ id }) => id)).toEqual(["levantine", "sichuan"]);
    });

    const pan = {
      id: "pan",
      name: "Pan",
      description: "Something in a pan.",
      slots: [
        { id: "herb", role: "a soft herb", accepts: "soft herb" },
        { id: "heat", role: "some heat", accepts: "heat" },
      ],
      method: ["Cook {heat}, then add {herb}."],
    };
    const fewHerbs = {
      slotType: "soft herb",
      reason: "Sichuan cooking seldom finishes a dish with soft herbs.",
      citations: [{ title: "A source", url: "https://example.com/sichuan" }],
    };

    /** Content with a launch Cuisine, Sichuan, that has the given Slot exception. */
    const withException = (exception: Record<string, unknown>) =>
      writeContent({
        ...fixture,
        ingredients: { ...fixture.ingredients, basil: { name: "Basil", slotTypes: ["soft herb", "heat"] } },
        cuisines: [levantine, { ...sichuan, launch: true, slotExceptions: [exception] }],
        formulas: [pan],
      });

    it("says which Cuisines are launch Cuisines, and the Slot types each uses fewer of", async () => {
      const kitchen = await expectKitchen(withException(fewHerbs));

      const [plain, launch] = kitchen.cuisines();
      expect([plain.launch, plain.slotExceptions]).toEqual([false, []]);
      expect([launch.launch, launch.slotExceptions]).toEqual([true, [fewHerbs]]);
    });

    describe("rejects one", () => {
      const errorsFor = (exception: Record<string, unknown>) => expectErrors(withException(exception));

      it("whose exception is for a Slot type no Formula has", async () => {
        expect(await errorsFor({ ...fewHerbs, slotType: "garnish" })).toEqual([
          'Cuisine sichuan has an exception for "garnish", but no Formula has a Slot that accepts it.',
        ]);
      });

      it("whose exception cites a source without a link", async () => {
        expect(await errorsFor({ ...fewHerbs, citations: [{ title: "A book" }] })).toEqual([
          "1.slotExceptions.0.citations.0.url: cite a web page, with a link starting https:// or http://",
        ]);
      });

      it("whose exception cites no source", async () => {
        expect(await errorsFor({ ...fewHerbs, citations: [] })).toEqual([
          "1.slotExceptions.0.citations: cite at least one source for an exception",
        ]);
      });
    });
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

    function fills(suggestion: Suggestion) {
      return [
        suggestion.formula.id,
        Object.fromEntries(suggestion.slots.map(({ slot, fills }) => [slot.id, fills[0]?.ingredient.id])),
      ];
    }

    it("fills each Formula's Slots from the Combination, in order, each Ingredient in one Slot", async () => {
      const kitchen = await expectKitchen(writeContent(fixture));

      const suggestions = kitchen.suggest(kitchen.combination(["basil", "lemon", "thyme"]).ingredients);

      // The herb salad comes first: the Combination fills it, while the pan sauce still needs an aromatic.
      expect(suggestions.map(fills)).toEqual([
        ["herb-salad", { "first-herb": "basil", "second-herb": "thyme", acid: "lemon" }],
        ["pan-sauce", { aromatic: undefined, acid: "lemon", herb: "basil" }],
      ]);
      // Thyme fits the pan sauce's herb too, and goes in beside basil.
      expect(suggestions[1].method).toEqual(["Soften an aromatic, add lemon, finish with basil and thyme."]);
      expect(suggestions[0].slots.map(({ fills }) => fills[0].source)).toEqual([
        "combination",
        "combination",
        "combination",
      ]);
    });

    it("is makeable when the Combination fills every required Slot, else names what it needs", async () => {
      const kitchen = await expectKitchen(writeContent(fixture));

      const suggestions = kitchen.suggest(kitchen.combination(["garlic", "lemon"]).ingredients);
      const [panSauce, herbSalad] = suggestions;

      // The optional herb is empty, which doesn't stop a pan sauce.
      expect(panSauce).toMatchObject({ makeable: true, needs: [] });
      expect(herbSalad.makeable).toBe(false);
      expect(herbSalad.needs.map(({ slot }) => slot.id)).toEqual(["first-herb", "second-herb"]);
    });

    it("still needs a required Slot that only a Pairing suggestion or a swap fills", async () => {
      const kitchen = await expectKitchen(
        writeContent({
          ...fixture,
          pairings: [{ ingredients: ["garlic", "lemon"], reasons: [reason("A note.")] }],
        }),
      );

      const suggestions = kitchen.suggest(kitchen.combination(["garlic"]).ingredients);
      const panSauce = suggestions.find(({ formula }) => formula.id === "pan-sauce")!;

      expect(panSauce.slots.find(({ slot }) => slot.id === "acid")!.fills).toMatchObject([{ source: "pairing" }]);
      expect(panSauce.makeable).toBe(false);
      expect(panSauce.needs.map(({ slot }) => slot.id)).toEqual(["acid"]);
    });

    it("gives the same Suggestions every time for the same Combination", async () => {
      const suggestFrom = async () => {
        const kitchen = await expectKitchen(writeContent(fixture));
        return kitchen.suggest(kitchen.combination(["thyme", "garlic", "basil"]).ingredients);
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

    async function plate(combination: string[]) {
      const kitchen = await expectKitchen(writeContent(fixture));
      const [suggestion] = kitchen.suggest(kitchen.combination(combination).ingredients);
      return { kitchen, suggestion };
    }

    const fill = (suggestion: Suggestion) =>
      suggestion.slots.map(({ slot, fills: [first] }) => [slot.id, first?.ingredient.id, first?.source]);

    it("fills from the Combination first, then the best-pairing Ingredient", async () => {
      const { suggestion } = await plate(["lamb", "vinegar"]);

      expect(fill(suggestion)).toEqual([
        ["protein", "lamb", "combination"],
        ["acid", "vinegar", "combination"],
        ["herb", "mint", "pairing"],
      ]);
    });

    it("fills a Slot that lists its Ingredients only from that list, whatever their Slot types", async () => {
      const kitchen = await expectKitchen(
        writeContent({
          ...fixture,
          ingredients: { ...fixture.ingredients, farro: { name: "Farro" }, rice: { name: "Rice" } },
          pairings: [...fixture.pairings, pairing("farro", "lamb", "Nutty farro soaks up lamb's juices.")],
          formulas: [
            {
              id: "bowl",
              name: "Bowl",
              description: "A grain with something on it.",
              slots: [
                { id: "grain", role: "a grain", ingredients: ["farro", "rice"] },
                { id: "protein", role: "something to sear", accepts: "protein" },
              ],
              method: ["Cook {grain} and top it with {protein}."],
            },
          ],
        }),
      );

      const [bowl] = kitchen.suggest(kitchen.combination(["lamb"]).ingredients);

      expect(fill(bowl)).toEqual([
        ["grain", "farro", "pairing"],
        ["protein", "lamb", "combination"],
      ]);
      expect(bowl.slots[0].choices.map(({ ingredient }) => ingredient.id)).toEqual(["farro", "rice"]);
      expect(bowl.method).toEqual(["Cook farro and top it with lamb."]);
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
      const reasons = (s: Suggestion) => s.slots.map(({ fills, emptyReason }) => fills[0]?.reason ?? emptyReason);

      expect(reasons(suggestion)).toEqual([
        "Pairs with mint: Mint's coolness lifts rich lamb.",
        "From your basket.",
        "Pairs with lamb: Mint's coolness lifts rich lamb.",
      ]);
      // Swapping lamb out leaves mint, which was there for lamb, without a Pairing.
      expect(reasons(swap(kitchen, suggestion, "protein", "lamb", "chicken"))).toEqual([
        "Your choice. It doesn't pair with anything else here yet.",
        "From your basket.",
        "Suggested earlier. It doesn't pair with anything else here now.",
      ]);
      expect(reasons((await plate(["vinegar"])).suggestion)[0]).toBe(
        "No Pairing here points to something to sear yet.",
      );
    });

    it("lets the Cook take out a Slot's last Ingredient, leaving it empty and needed, saying what pairs best", async () => {
      const { kitchen, suggestion } = await plate(["lamb"]);

      const emptied = kitchen.removeFromSlot(suggestion, "protein", "lamb");

      expect(fill(emptied)[0]).toEqual(["protein", undefined, undefined]);
      expect(emptied.slots[0].emptyReason).toBe("Empty for now. Lamb pairs best with the rest of the dish.");
      expect(emptied.makeable).toBe(false);
      // The acid was already needed: lemon is a Pairing suggestion.
      expect(emptied.needs.map(({ slot }) => slot.id)).toEqual(["protein", "acid"]);
      expect(emptied.method).toEqual(["Sear something to sear, squeeze over lemon, scatter mint."]);
      // Nothing refills it until the Cook ticks one.
      expect(kitchen.removeFromSlot(emptied, "herb", "mint").slots[0].fills).toEqual([]);
    });

    it("gives each filled Slot the Pairing that justifies it", async () => {
      const { suggestion } = await plate(["lamb"]);

      expect(
        suggestion.slots.map(({ slot, fills: [{ justification }] }) => [
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

    it("lists every Ingredient that could be in each Slot, ranked by pairing with the rest of the dish", async () => {
      const { suggestion } = await plate(["lamb"]);

      expect(
        suggestion.slots.map(({ slot, choices }) => [slot.id, choices.map(({ ingredient }) => ingredient.id)]),
      ).toEqual([
        // What's in the Slot is listed too; ties keep content order.
        ["protein", ["lamb", "chicken"]],
        ["acid", ["lemon", "lime", "vinegar"]],
        ["herb", ["mint", "parsley", "basil"]],
      ]);
      expect(suggestion.slots[2].choices.map(({ pairsWith }) => pairsWith.map(({ id }) => id))).toEqual([
        ["lamb", "lemon"],
        ["lamb"],
        [],
      ]);
    });

    it("swaps a Slot, and the method and justification follow while the choices keep their order", async () => {
      const { kitchen, suggestion } = await plate(["lamb"]);

      const swapped = swap(kitchen, suggestion, "herb", "mint", "parsley");

      expect(fill(swapped)).toEqual([
        ["protein", "lamb", "combination"],
        ["acid", "lemon", "pairing"],
        ["herb", "parsley", "added"],
      ]);
      expect(swapped.method).toEqual(["Sear lamb, squeeze over lemon, scatter parsley."]);
      const herb = swapped.slots[2];
      expect(herb.fills[0].justification?.reasons[0].note).toBe("Parsley freshens lamb.");
      expect(herb.choices.map(({ ingredient }) => ingredient.id)).toEqual(["mint", "parsley", "basil"]);
      expect(fill(suggestion)[2]).toEqual(["herb", "mint", "pairing"]);
    });
  });

  describe("Slots that hold any number of Ingredients", () => {
    const fixture = {
      ingredients: {
        garlic: { ...garlic, slotTypes: ["aromatic"] },
        ginger: { name: "Ginger", slotTypes: ["aromatic"] },
        scallion: { name: "Scallion", slotTypes: ["aromatic", "garnish"] },
        shallot: { name: "Shallot", slotTypes: ["aromatic"] },
        lemon: { ...lemon, slotTypes: ["acid"] },
      },
      pairings: [],
      formulas: [
        {
          id: "stir-fry",
          name: "Stir-fry",
          description: "Quick and hot.",
          slots: [
            { id: "aromatic", role: "an aromatic", accepts: "aromatic" },
            { id: "acid", role: "an acid", accepts: "acid" },
            { id: "garnish", role: "a garnish", accepts: "garnish", required: false },
          ],
          method: ["Fry {aromatic}, add {acid}, finish with {garnish}."],
        },
      ],
    };

    async function stirFry(ids: string[]) {
      const kitchen = await expectKitchen(writeContent(fixture));
      const [suggestion] = kitchen.suggest(kitchen.combination(ids).ingredients);
      return { kitchen, suggestion };
    }

    const held = (suggestion: Suggestion) =>
      Object.fromEntries(suggestion.slots.map(({ slot, fills }) => [slot.id, fills.map(({ ingredient }) => ingredient.id)]));

    it("puts every basket Ingredient that fits into a Slot and names them all in the method", async () => {
      const { suggestion } = await stirFry(["garlic", "ginger", "shallot", "lemon"]);

      expect(held(suggestion)).toEqual({ aromatic: ["garlic", "ginger", "shallot"], acid: ["lemon"], garnish: [] });
      expect(suggestion.method).toEqual(["Fry garlic, ginger and shallot, add lemon, finish with a garnish."]);
      expect(suggestion.makeable).toBe(true);
    });

    it("gives every Slot one basket Ingredient before any Slot takes a second", async () => {
      // Scallion could be a second aromatic, but it's the only garnish.
      expect(held((await stirFry(["garlic", "scallion"])).suggestion)).toMatchObject({
        aromatic: ["garlic"],
        garnish: ["scallion"],
      });
      expect(held((await stirFry(["garlic", "ginger", "scallion"])).suggestion).aromatic).toEqual(["garlic", "ginger"]);
    });

    it("lets the Cook add to a Slot, take one out, or swap one, keeping the rest", async () => {
      const { kitchen, suggestion } = await stirFry(["garlic", "lemon"]);

      const added = kitchen.addToSlot(suggestion, "aromatic", "ginger");
      expect(added.slots[0].fills.map(({ ingredient, source }) => [ingredient.id, source])).toEqual([
        ["garlic", "combination"],
        ["ginger", "added"],
      ]);
      // There's no limit: every aromatic can go in.
      const all = kitchen.addToSlot(kitchen.addToSlot(added, "aromatic", "scallion"), "aromatic", "shallot");
      expect(held(all).aromatic).toEqual(["garlic", "ginger", "scallion", "shallot"]);

      expect(held(swap(kitchen, added, "aromatic", "garlic", "scallion")).aromatic).toEqual(["ginger", "scallion"]);
      expect(held(kitchen.removeFromSlot(added, "aromatic", "garlic")).aromatic).toEqual(["ginger"]);
      // An Ingredient goes in a dish once.
      expect(() => kitchen.addToSlot(suggestion, "aromatic", "garlic")).toThrow("in this dish already");
    });

    it("needs a required Slot until everything in it is from the basket", async () => {
      const { kitchen, suggestion } = await stirFry(["garlic", "lemon"]);
      expect(suggestion.makeable).toBe(true);

      const added = kitchen.addToSlot(suggestion, "aromatic", "ginger");

      expect(added.makeable).toBe(false);
      expect(added.needs.map(({ slot }) => slot.id)).toEqual(["aromatic"]);
    });

    it("puts a basket Ingredient back as the Cook's own when they take it out and tick it again", async () => {
      const { kitchen, suggestion } = await stirFry(["garlic", "lemon"]);

      const out = swap(kitchen, suggestion, "aromatic", "garlic", "ginger");
      const again = kitchen.addToSlot(out, "aromatic", "garlic");

      expect(again.slots[0].fills.map(({ ingredient, source }) => [ingredient.id, source])).toEqual([
        ["ginger", "added"],
        ["garlic", "combination"],
      ]);
      expect(kitchen.removeFromSlot(again, "aromatic", "ginger").makeable).toBe(true);
    });

    it("keeps a Slot's choices in one order as the Cook ticks them, saying what each pairs with in the dish", async () => {
      const kitchen = await expectKitchen(
        writeContent({
          ...fixture,
          // Without its garnish, so scallion is free to be a second aromatic.
          formulas: [{ ...fixture.formulas[0], slots: fixture.formulas[0].slots.slice(0, 2), method: ["Fry {aromatic}, add {acid}."] }],
          pairings: [{ ingredients: ["garlic", "scallion"], reasons: [reason("A note.")] }],
        }),
      );
      const [suggestion] = kitchen.suggest(kitchen.combination(["garlic", "lemon"]).ingredients);
      const choices = (s: Suggestion) =>
        s.slots[0].choices.map(({ ingredient, pairsWith }) => [ingredient.id, pairsWith.map(({ id }) => id)]);

      expect(choices(suggestion)).toEqual([
        ["garlic", []],
        ["ginger", []],
        ["scallion", ["garlic"]],
        ["shallot", []],
      ]);
      // Ranked against what's outside the Slot, so ticking scallion moves nothing.
      expect(choices(kitchen.addToSlot(suggestion, "aromatic", "scallion"))).toEqual([
        ["garlic", ["scallion"]],
        ["ginger", []],
        ["scallion", ["garlic"]],
        ["shallot", []],
      ]);
    });
  });

  it("still gives a Suggestion for every Formula when nothing fits or pairs", async () => {
    const kitchen = await expectKitchen(
      writeContent({
        ingredients: { anchovy: { name: "Anchovy", slotTypes: ["salty"] }, basil: { name: "Basil", slotTypes: ["herb"] } },
        pairings: [],
        formulas: [
          {
            id: "dessert",
            name: "Dessert",
            description: "Something sweet with a herb.",
            slots: [
              { id: "sweet", role: "something sweet", accepts: "salty" },
              { id: "herb", role: "a herb", accepts: "herb" },
            ],
            method: ["Serve {sweet} with {herb}."],
          },
        ],
      }),
    );

    const suggestions = kitchen.suggest([]);

    expect(suggestions.map(({ formula, rankReason }) => [formula.id, rankReason])).toEqual([
      ["dessert", "None of your basket fits this dish yet."],
    ]);
    expect(suggestions[0].slots.map(({ fills }) => fills)).toEqual([[], []]);
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
      return kitchen.suggest(kitchen.combination(ids).ingredients);
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

    it("puts what the Combination fills first, then fewer Slots still needed, then more Pairings", async () => {
      const suggestions = await rank(
        [
          formula("tight-needs-two", ["lamb", "lemon", "garlic"]),
          formula("loose-ready", ["mint", "chocolate"]),
          formula("tight-needs-one", ["lamb", "mint", "lemon"]),
        ],
        ["mint", "chocolate", "lamb"],
      );

      expect(suggestions.map(({ formula, needs }) => [formula.id, needs.length])).toEqual([
        ["loose-ready", 0],
        ["tight-needs-one", 1],
        ["tight-needs-two", 2],
      ]);
    });

    it("breaks a tie in Pairings in favour of Ingredients that share a Cuisine, and says so", async () => {
      const kitchen = await expectKitchen(
        writeContent({
          cuisines: [levantine],
          ingredients: {
            ...fixture.ingredients,
            lamb: { ...fixture.ingredients.lamb, cuisines: ["levantine"] },
            mint: { ...fixture.ingredients.mint, cuisines: ["levantine"] },
          },
          pairings: fixture.pairings,
          formulas: [
            formula("first-in-content", ["lemon", "garlic"]),
            formula("shared-cuisine", ["lamb", "mint"]),
          ],
        }),
      );

      const basket = kitchen.combination(["lamb", "mint", "lemon", "garlic"]).ingredients;
      const suggestions = kitchen.suggest(basket);

      expect(suggestions.map(({ formula, rankReason }) => [formula.id, rankReason])).toEqual([
        ["shared-cuisine", "Lamb and mint pair well. Both are common in Levantine cooking."],
        ["first-in-content", "Lemon and garlic pair well."],
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
      [["mint"], "Only mint from your basket is used here."],
      [[], "None of your basket fits this dish yet."],
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

  describe("Recipes", () => {
    const cookedThrough = {
      note: "Cook chicken to 165°F / 74°C.",
      citations: [{ title: "A food safety guide", url: "https://example.org/guide" }],
    };
    const fixture = {
      ingredients: {
        chicken: { name: "Chicken", slotTypes: ["protein"], safety: { cooking: cookedThrough } },
        lemon: { ...lemon, slotTypes: ["acid"] },
        lime: { name: "Lime", slotTypes: ["acid"] },
        garlic: { ...garlic, slotTypes: ["aromatic"] },
        thyme: { ...thyme, slotTypes: ["herb"] },
      },
      pairings: [],
      formulas: [
        {
          id: "pan-sauce",
          name: "Pan sauce",
          description: "A quick sauce from the pan.",
          slots: [
            { id: "protein", role: "something to sear", accepts: "protein" },
            { id: "aromatic", role: "an aromatic", accepts: "aromatic" },
            { id: "acid", role: "an acid", accepts: "acid" },
            { id: "herb", role: "a herb", accepts: "herb", required: false },
          ],
          method: ["Sear {protein}, soften {aromatic}, add {acid}, finish with {herb}."],
        },
        {
          id: "dressing",
          name: "Dressing",
          description: "A sharp dressing.",
          slots: [{ id: "acid", role: "an acid", accepts: "acid" }],
          method: ["Whisk {acid} with oil."],
        },
      ],
    };
    const recipe = {
      serves: 2,
      time: { prep: 5, cook: 10 },
      fills: { protein: "chicken", aromatic: "garlic", acid: "lemon" },
      ingredients: [
        { slot: "protein", amount: "300 g", for: { chicken: { amount: "2", name: "chicken thighs", note: "skin on" } } },
        { slot: "aromatic", amount: "1 tbsp", for: { garlic: { amount: "2 cloves", note: "thinly sliced" } } },
        { slot: "acid", amount: "2 tbsp", note: "juiced", for: { lemon: { amount: "1", note: "juiced" } } },
        { slot: "herb", amount: "a handful" },
        { name: "butter", amount: "2 tbsp", note: "cold" },
      ],
      steps: [
        { text: "Cook {protein} through.", safety: { slot: "protein", about: "cooking" } },
        { text: "Soften {aromatic}, then add {acid} and {herb}." },
      ],
    };

    function panSauce(kitchen: Kitchen, ids: string[]): Suggestion {
      const { ingredients } = kitchen.combination(ids);
      return kitchen.suggest(ingredients).find(({ formula }) => formula.id === "pan-sauce")!;
    }

    it("fills a dish's empty parts from its recipe, after the basket and Pairings", async () => {
      const kitchen = await expectKitchen(writeContent({ ...fixture, recipes: { "pan-sauce": recipe } }));

      const { slots, needs } = panSauce(kitchen, ["lime"]);

      expect(slots.map(({ slot, fills }) => [slot.id, fills.map(({ ingredient, source }) => [ingredient.id, source])])).toEqual([
        ["protein", [["chicken", "recipe"]]],
        ["aromatic", [["garlic", "recipe"]]],
        ["acid", [["lime", "combination"]]],
        ["herb", []],
      ]);
      expect(slots[0].fills[0].reason).toBe("From the recipe.");
      expect(needs.map(({ slot }) => slot.id)).toEqual(["protein", "aromatic"]);
    });

    it("gives amounts for whatever fills each part, the steps filled in, and the time", async () => {
      const kitchen = await expectKitchen(writeContent({ ...fixture, recipes: { "pan-sauce": recipe } }));

      const { serves, time, ingredients, steps } = kitchen.recipe(panSauce(kitchen, ["lime"]))!;

      expect(serves).toBe(2);
      expect(time).toEqual({ prep: 5, cook: 10, total: 15 });
      // Lime has no amount of its own, so it takes the part's amount and note; the empty optional herb has no line.
      expect(ingredients.map(({ amount, name, ingredient, note }) => [amount, name, ingredient?.id, note])).toEqual([
        ["2", "chicken thighs", "chicken", "skin on"],
        ["2 cloves", "garlic", "garlic", "thinly sliced"],
        ["2 tbsp", "lime", "lime", "juiced"],
        ["2 tbsp", "butter", undefined, "cold"],
      ]);
      expect(steps.map(({ text }) => text)).toEqual(["Cook chicken through.", "Soften garlic, then add lime and a herb."]);
    });

    it("follows a swap", async () => {
      const kitchen = await expectKitchen(writeContent({ ...fixture, recipes: { "pan-sauce": recipe } }));

      const swapped = swap(kitchen, panSauce(kitchen, ["lime"]), "acid", "lime", "lemon");
      const { ingredients, steps } = kitchen.recipe(swapped)!;

      expect(ingredients[2]).toMatchObject({ amount: "1", name: "lemon", note: "juiced" });
      expect(steps[1].text).toBe("Soften garlic, then add lemon and a herb.");
    });

    it("gives each Ingredient in a part its full amount", async () => {
      const content = {
        ...fixture,
        ingredients: { ...fixture.ingredients, ginger: { name: "Ginger", slotTypes: ["aromatic"] } },
      };
      const ginger = { amount: "a thumb", note: "grated" };
      const ingredients = recipe.ingredients.map((line) =>
        line.slot === "aromatic" ? { ...line, for: { ...line.for, ginger } } : line,
      );
      const kitchen = await expectKitchen(writeContent({ ...content, recipes: { "pan-sauce": { ...recipe, ingredients } } }));

      const { ingredients: lines, steps } = kitchen.recipe(panSauce(kitchen, ["garlic", "ginger"]))!;

      expect(lines.slice(1, 3).map(({ amount, name }) => `${amount} ${name}`)).toEqual(["2 cloves garlic", "a thumb ginger"]);
      expect(steps[1].text).toBe("Soften garlic and ginger, then add lemon and a herb.");
    });

    it("gives a safety step the cited guidance of the Ingredient that fills its part", async () => {
      const kitchen = await expectKitchen(writeContent({ ...fixture, recipes: { "pan-sauce": recipe } }));

      const { steps } = kitchen.recipe(panSauce(kitchen, []))!;

      expect(steps[0].safety).toEqual([{ ingredient: kitchen.ingredient("chicken"), guidance: cookedThrough }]);
      expect(steps[1].safety).toEqual([]);
    });

    it("gives a step its own cited guidance, for a staple that isn't an Ingredient's to give", async () => {
      const cooled = {
        note: "Cool cooked rice quickly and refrigerate it within 1 hour.",
        citations: [{ title: "Rice guidance", url: "https://example.org/rice" }],
      };
      const steps = [
        { text: "Cook {protein} through.", safety: { slot: "protein", about: "cooking" }, guidance: cooled },
        ...recipe.steps.slice(1),
      ];
      const kitchen = await expectKitchen(writeContent({ ...fixture, recipes: { "pan-sauce": { ...recipe, steps } } }));

      const [first] = kitchen.recipe(panSauce(kitchen, []))!.steps;

      expect(first.safety).toEqual([
        { ingredient: kitchen.ingredient("chicken"), guidance: cookedThrough },
        { guidance: cooled },
      ]);
    });

    it("has none for a dish without one, which fills from the basket and Pairings alone", async () => {
      const kitchen = await expectKitchen(writeContent({ ...fixture, recipes: { "pan-sauce": recipe } }));

      const dressing = kitchen.suggest([]).find(({ formula }) => formula.id === "dressing")!;

      expect(kitchen.recipe(dressing)).toBeUndefined();
      expect(dressing.slots[0].fills).toEqual([]);
    });

    describe("rejects one", () => {
      async function errorsFor(recipes: Record<string, Record<string, unknown>>, ingredients = fixture.ingredients) {
        return expectErrors(writeContent({ ...fixture, ingredients, recipes }));
      }

      it("when a step's own safety guidance cites no source with a link", async () => {
        const steps = [{ text: "Cool the rice.", guidance: { note: "Cool it fast.", citations: [{ title: "A book" }] } }];

        expect(await errorsFor({ "pan-sauce": { ...recipe, steps } })).toEqual([
          "steps.0.guidance.citations.0.url: cite a web page, with a link starting https:// or http://",
        ]);
      });

      it("when it's for a Formula that doesn't exist", async () => {
        expect(await errorsFor({ "pan-sauce": recipe, "fried-rice": recipe })).toEqual([
          'Recipe fried-rice is for unknown Formula "fried-rice"; name its file for a Formula.',
        ]);
      });

      it("when it leaves a required Slot without an Ingredient as written", async () => {
        const { acid: _acid, ...fills } = recipe.fills;

        expect(await errorsFor({ "pan-sauce": { ...recipe, fills } })).toEqual([
          'Recipe pan-sauce leaves the required Slot "acid" without an Ingredient as written.',
        ]);
      });

      it("when a fill names an unknown Slot or Ingredient, or doesn't fit its Slot", async () => {
        const fills = { ...recipe.fills, sauce: "lemon", herb: "basil", aromatic: "lemon" };

        expect(await errorsFor({ "pan-sauce": { ...recipe, fills } })).toEqual([
          'Recipe pan-sauce fills "aromatic" with lemon, which isn\'t an aromatic.',
          'Recipe pan-sauce fills unknown Slot "sauce".',
          'Recipe pan-sauce fills "herb" with unknown Ingredient "basil".',
        ]);
      });

      it("when a Slot has no ingredient line, or a line names an unknown Slot", async () => {
        const ingredients = [...recipe.ingredients.filter(({ slot }) => slot !== "herb"), { slot: "oil", amount: "1 tbsp" }];

        expect(await errorsFor({ "pan-sauce": { ...recipe, ingredients } })).toEqual([
          'Recipe pan-sauce lists unknown Slot "oil".',
          'Recipe pan-sauce doesn\'t say how much to use for "herb"; give it an ingredient line.',
        ]);
      });

      it("when an amount is given for an unknown Ingredient, or one that doesn't fit its Slot", async () => {
        const ingredients = [
          ...recipe.ingredients.slice(0, 2),
          { slot: "acid", amount: "2 tbsp", for: { yuzu: { amount: "1" }, garlic: { amount: "1" } } },
          ...recipe.ingredients.slice(3),
        ];

        expect(await errorsFor({ "pan-sauce": { ...recipe, ingredients } })).toEqual([
          'Recipe pan-sauce gives an amount for unknown Ingredient "yuzu".',
          'Recipe pan-sauce gives an amount of garlic for "acid", which it can\'t fill.',
        ]);
      });

      it("when a step refers to a Slot the Formula doesn't have", async () => {
        const steps = [...recipe.steps, { text: "Pour over {sauce}." }];

        expect(await errorsFor({ "pan-sauce": { ...recipe, steps } })).toEqual([
          'Recipe pan-sauce refers to unknown Slot "{sauce}" in step 3.',
        ]);
      });

      it("when a safety step's part could hold an Ingredient with no guidance for it", async () => {
        const ingredients = { ...fixture.ingredients, tofu: { name: "Tofu", slotTypes: ["protein"] } };

        expect(await errorsFor({ "pan-sauce": recipe }, ingredients)).toEqual([
          'Recipe pan-sauce marks step 1 safety-sensitive for "protein", so tofu, which can fill it, needs safety guidance on cooking.',
        ]);
      });

      it("when an amount has a key it doesn't know, as an unquoted comma in YAML makes", async () => {
        const ingredients = recipe.ingredients.map((line) =>
          line.slot === "acid" ? { ...line, for: { lemon: { amount: "1", note: "juiced", "about 3 tbsp": null } } } : line,
        );

        expect(await errorsFor({ "pan-sauce": { ...recipe, ingredients } })).toEqual([
          'ingredients.2.for.lemon: Unrecognized key: "about 3 tbsp"',
        ]);
      });

      it("when it lists a Slot twice", async () => {
        const ingredients = [...recipe.ingredients, { slot: "acid", amount: "1 tbsp" }];

        expect(await errorsFor({ "pan-sauce": { ...recipe, ingredients } })).toEqual([
          'Recipe pan-sauce lists "acid" twice; give each Slot one ingredient line.',
        ]);
      });

      it("when an ingredient line has both a slot and a name", async () => {
        const ingredients = [...recipe.ingredients, { amount: "1", slot: "acid", name: "lemon" }];

        expect(await errorsFor({ "pan-sauce": { ...recipe, ingredients } })).toEqual([
          "ingredients.5: give either a slot or a name",
        ]);
      });
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

    it.each(["Asian", "European Home Cooking", "Middle Eastern", "Latin American"])(
      "when a Cuisine is named at continental level, as %j",
      async (name) => {
        const errors = await expectErrors(
          writeContent({
            ingredients: { lemon },
            cuisines: [{ id: "broad", name, description: "Too broad." }],
            pairings: [],
          }),
        );

        expect(errors).toEqual([
          `Cuisine broad is named "${name}"; name Cuisines regionally, such as "Sichuan" or "Levantine".`,
        ]);
      },
    );

    it("when an Ingredient's category isn't one MySous groups by", async () => {
      const errors = await expectErrors(
        writeContent({ ingredients: { lemon: { ...lemon, category: "fruity" } }, pairings: [] }),
      );

      expect(errors).toEqual([expect.stringMatching(/^category: Invalid option: expected one of "herb"\|/)]);
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

    it("when a Formula's Slot gives both the Slot type it accepts and the Ingredients it lists, or neither", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon: { ...lemon, slotTypes: ["acid"] } },
          pairings: [],
          formulas: [
            {
              id: "bowl",
              name: "Bowl",
              description: "A grain with something on it.",
              slots: [
                { id: "grain", role: "a grain", ingredients: ["lemon", "quinoa"] },
                { id: "acid", role: "an acid", accepts: "acid", ingredients: ["lemon"] },
                { id: "herb", role: "a herb" },
              ],
              method: ["Cook {grain}, add {acid} and {herb}."],
            },
          ],
        }),
      );

      expect(errors).toEqual([
        "0.slots.1: give a Slot exactly one of the Slot type it accepts or the Ingredients it lists",
        "0.slots.2: give a Slot exactly one of the Slot type it accepts or the Ingredients it lists",
      ]);
    });

    it("when a Formula's Slot lists an Ingredient that isn't in MySous", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon },
          pairings: [],
          formulas: [
            {
              id: "bowl",
              name: "Bowl",
              description: "A grain.",
              slots: [{ id: "grain", role: "a grain", ingredients: ["lemon", "quinoa"] }],
              method: ["Cook {grain}."],
            },
          ],
        }),
      );

      expect(errors).toEqual(['Formula bowl\'s Slot "grain" lists unknown Ingredient "quinoa".']);
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

    it("when a YAML file can't be read, naming the file and line", async () => {
      const dir = writeContent({ ingredients: { lemon }, pairings: [] });
      writeFileSync(join(dir, "pairings.yaml"), "- ingredients: [lemon, garlic]\n  note: a: b\n");

      const result = await loadKitchen(dir);

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.errors).toEqual([
        { file: expect.stringMatching(/pairings\.yaml$/), message: expect.stringMatching(/line 2/) },
      ]);
    });

    it("when an Ingredient has no drawing", async () => {
      const errors = await expectErrors(
        writeContent({ ingredients: { lemon: { ...lemon, drawing: null } }, pairings: [] }),
      );

      expect(errors).toEqual(["Ingredient lemon needs a drawing in ingredients/lemon.svg."]);
    });

    it.each([
      ['<script>alert(1)</script>'],
      ['<path d="M0 0" onload="alert(1)"/>'],
      ['<image href="https://example.com/x.png"/>'],
    ])("when a drawing uses more than simple shapes: %s", async (drawing) => {
      const errors = await expectErrors(
        writeContent({ ingredients: { lemon: { ...lemon, drawing } }, pairings: [] }),
      );

      expect(errors).toEqual([
        "Ingredient lemon's drawing may only use path, circle, ellipse, line, polyline and rect, with geometry attributes.",
      ]);
    });

    it("when an Ingredient's colour isn't a hex colour", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon: { ...lemon, colour: { ...defaultColour, stroke: "green" } } },
          pairings: [],
        }),
      );

      expect(errors).toEqual([expect.stringMatching(/^colour\.stroke: /)]);
    });

    it("when an Ingredient's safety guidance has no citation", async () => {
      const errors = await expectErrors(
        writeContent({ ingredients: { lemon: { ...lemon, safety: { handling: { note: "Wash it." } } } }, pairings: [] }),
      );

      expect(errors).toEqual(["safety.handling.citations: Invalid input: expected array, received undefined"]);
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

    it("when a Pairing cites no source, or a source without a link", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon, garlic, thyme },
          pairings: [
            { ingredients: ["lemon", "garlic"], reasons: [reason("A note.")], citations: [] },
            { ingredients: ["lemon", "thyme"], reasons: [reason("A note.")], citations: [{ title: "A book" }] },
          ],
        }),
      );

      expect(errors).toEqual([
        "Pairing lemon + garlic cites no source; cite at least one, with a link.",
        'Pairing lemon + thyme cites "A book" without a link; cite a source the reader can open.',
      ]);
    });

    it("when a citation's link isn't a web page", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon, garlic },
          pairings: [
            {
              ingredients: ["lemon", "garlic"],
              reasons: [reason("A note.")],
              citations: [{ title: "A script", url: "javascript:alert(1)" }],
            },
          ],
        }),
      );

      expect(errors).toEqual(["0.citations.0.url: cite a web page, with a link starting https:// or http://"]);
    });

    it.each(["easy", "Easily", "simply", "Just", "authentic"])(
      "when copy the Cook reads says %j, naming where",
      async (word) => {
        const errors = await expectErrors(
          writeContent({
            ingredients: { lemon: { ...lemon, tip: `${word} zest it first.` }, garlic },
            pairings: [{ ingredients: ["lemon", "garlic"], reasons: [reason(`It's ${word} good.`)] }],
          }),
        );

        const rule = `MySous doesn't say "easy", "easily", "simply", "just" or "authentic" (docs/voice-guide.md).`;
        expect(errors).toEqual([
          `Ingredient lemon's tip says "${word}"; ${rule}`,
          `Pairing lemon + garlic's reasons.0.note says "${word}"; ${rule}`,
        ]);
      },
    );

    it("when a Cuisine, a Formula or a Recipe says a banned word", async () => {
      const errors = await expectErrors(
        writeContent({
          ingredients: { lemon: { ...lemon, slotTypes: ["acid"] } },
          cuisines: [{ ...levantine, description: "Simply the eastern Mediterranean." }],
          pairings: [],
          formulas: [
            {
              id: "dressing",
              name: "Dressing",
              description: "A sharp dressing.",
              slots: [{ id: "acid", role: "an acid", accepts: "acid" }],
              method: ["Whisk {acid} with oil.", "It's easy to over-salt."],
            },
          ],
          recipes: {
            dressing: {
              serves: 2,
              time: { prep: 5, cook: 0 },
              fills: { acid: "lemon" },
              ingredients: [{ slot: "acid", amount: "1 tbsp", note: "just squeezed" }],
              steps: [{ text: "Whisk {acid} with oil." }],
            },
          },
        }),
      );

      expect(errors.map((error) => error.split(";")[0])).toEqual([
        'Cuisine levantine\'s description says "Simply"',
        'Formula dressing\'s method.1 says "easy"',
        'Recipe dressing\'s ingredients.0.note says "just"',
      ]);
    });

    it("lets words that only contain a banned one through, such as adjust and justice", async () => {
      await expectKitchen(
        writeContent({
          ingredients: { lemon: { ...lemon, tip: "Adjust the salt; do justice to the zest." } },
          pairings: [],
        }),
      );
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
