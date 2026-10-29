import type {
  Citation,
  Cuisine,
  Formula,
  IngredientContent,
  KitchenContent,
  PairingReason,
  Slot,
} from "./schema";

export type { Citation, Cuisine, Formula, KitchenContent, PairingReason, Slot };

export type Ingredient = Omit<IngredientContent, "cuisines"> & { cuisines: Cuisine[] };

/** A Pairing seen from one of its Ingredients: the other Ingredient and why they work. */
export type PairingView = {
  ingredient: Ingredient;
  reasons: PairingReason[];
  cuisines: Cuisine[];
  citations: Citation[];
};

/** How a method step refers to a Slot: {slotId}. */
export const SLOT_REFERENCE = /\{([^}]+)\}/g;

/** The most Ingredients a Combination holds, so Suggestions stay focused. */
export const COMBINATION_LIMIT = 4;

/** A Combination read from untrusted ids (such as a URL), with what had to be dropped. */
export type Combination = {
  ingredients: Ingredient[];
  /** Ids that aren't Ingredients in MySous. */
  unknown: string[];
  /** Ingredients past the limit. */
  overLimit: Ingredient[];
};

/** A Slot in a Suggestion, with the Ingredient chosen for it, if any, and where it came from. */
export type FilledSlot = {
  slot: Slot;
  ingredient?: Ingredient;
  source?: "combination";
};

/** A Formula recommended for a Combination, with its Slots filled. */
export type Suggestion = {
  formula: Formula;
  slots: FilledSlot[];
  /** The Formula's method, naming each Slot's Ingredient, or its role while it's empty. */
  method: string[];
};

export type Kitchen = {
  /** The validated content this Kitchen was built from, to rebuild it in the browser. */
  content: KitchenContent;
  ingredients(): Ingredient[];
  ingredient(id: string): Ingredient | undefined;
  pairingsFor(id: string): PairingView[];
  combination(ids: string[]): Combination;
  formulas(): Formula[];
  formula(id: string): Formula | undefined;
  /**
   * Suggestions for a Combination, one per Formula, in content order. Each Slot takes the first
   * Combination Ingredient that fits it and hasn't filled another Slot. Deterministic.
   */
  suggest(combination: Ingredient[], pantry: Ingredient[]): Suggestion[];
};

/** Builds a Kitchen from content that `loadKitchen` has already validated. Pure: no I/O. */
export function createKitchen(content: KitchenContent): Kitchen {
  const cuisines = new Map(content.cuisines.map((cuisine) => [cuisine.id, cuisine]));
  const toCuisines = (ids: string[]) => ids.map((id) => cuisines.get(id)!);

  const ingredients = new Map<string, Ingredient>(
    content.ingredients.map((ingredient) => [
      ingredient.id,
      { ...ingredient, cuisines: toCuisines(ingredient.cuisines) },
    ]),
  );

  const pairingsByIngredient = new Map<string, PairingView[]>();
  for (const { ingredients: [a, b], reasons, cuisines, citations } of content.pairings) {
    for (const [from, to] of [[a, b], [b, a]] as const) {
      const views = pairingsByIngredient.get(from) ?? [];
      views.push({ ingredient: ingredients.get(to)!, reasons, cuisines: toCuisines(cuisines), citations });
      pairingsByIngredient.set(from, views);
    }
  }

  return {
    content,
    ingredients: () => [...ingredients.values()],
    ingredient: (id) => ingredients.get(id),
    pairingsFor: (id) => pairingsByIngredient.get(id) ?? [],

    formulas: () => content.formulas,
    formula: (id) => content.formulas.find((formula) => formula.id === id),

    suggest(combination) {
      return content.formulas.map((formula) => {
        const unused = [...combination];
        const slots = formula.slots.map((slot): FilledSlot => {
          const index = unused.findIndex(({ slotTypes }) => slotTypes.includes(slot.accepts));
          if (index === -1) return { slot };
          const [ingredient] = unused.splice(index, 1);
          return { slot, ingredient, source: "combination" };
        });
        const fills = new Map(slots.map((filled) => [filled.slot.id, filled]));
        const method = formula.method.map((step) =>
          step.replace(SLOT_REFERENCE, (_, id: string) => {
            const { slot, ingredient } = fills.get(id)!;
            return ingredient ? ingredient.name.toLowerCase() : slot.role;
          }),
        );
        return { formula, slots, method };
      });
    },

    combination(ids) {
      const known = [...new Set(ids)].flatMap((id) => ingredients.get(id) ?? []);
      return {
        ingredients: known.slice(0, COMBINATION_LIMIT),
        unknown: ids.filter((id) => !ingredients.has(id)),
        overLimit: known.slice(COMBINATION_LIMIT),
      };
    },
  };
}
