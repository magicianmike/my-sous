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
  /** Why the Suggestion ranked where it did, in a plain sentence. */
  rankReason: string;
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
   * Suggestions for a Combination, one per Formula. Each Slot takes the first Combination
   * Ingredient that fits it and hasn't filled another Slot. Ranked by coherence (the number of
   * Pairings among the filled Ingredients), with ties in content order. Deterministic.
   */
  suggest(combination: Ingredient[], pantry: Ingredient[]): Suggestion[];
};

/** Explains a Suggestion's coherence: which of its filled Ingredients pair, and which don't. */
function explainRank(
  filled: Ingredient[],
  pairings: (readonly [Ingredient, Ingredient])[],
): string {
  const name = (ingredient: Ingredient) => ingredient.name.toLowerCase();
  const pairsWith = (a: Ingredient, b: Ingredient) =>
    pairings.some((pairing) => pairing.includes(a) && pairing.includes(b));

  if (filled.length === 0) return "None of your Combination fits this Formula yet.";
  if (filled.length === 1) {
    return `Only ${name(filled[0])} from your Combination fits this Formula so far.`;
  }
  if (pairings.length === 0) {
    return filled.length === 2
      ? sentence(`${name(filled[0])} and ${name(filled[1])} don't have a Pairing in MySous yet.`)
      : "None of these Ingredients pair with each other yet.";
  }
  if (filled.length > 2 && pairings.length === (filled.length * (filled.length - 1)) / 2) {
    return "Every Ingredient here pairs with every other.";
  }
  const hub = filled.find((a) => filled.every((b) => a === b || pairsWith(a, b)));
  if (hub && filled.length > 2) return `Everything pairs with ${name(hub)}.`;

  const [[a, b], ...more] = pairings;
  const alone = filled.filter((x) => filled.every((y) => x === y || !pairsWith(x, y)));
  return sentence(
    `${name(a)} and ${name(b)} pair well` +
      more.map(([c, d]) => `, and so do ${name(c)} and ${name(d)}`).join("") +
      (alone.length === 0
        ? "."
        : `, but ${list(alone.map(name))} ${alone.length === 1 ? "doesn't" : "don't"} pair with the rest.`),
  );
}

function sentence(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

function list(items: string[]): string {
  return items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

function pairingKey(a: string, b: string): string {
  return [a, b].sort().join("+");
}

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

  const pairingKeys = new Set(content.pairings.map(({ ingredients: [a, b] }) => pairingKey(a, b)));
  const pair = (a: Ingredient, b: Ingredient) => pairingKeys.has(pairingKey(a.id, b.id));

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
      const suggestions = content.formulas.map((formula) => {
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
        const filled = slots.flatMap(({ ingredient }) => ingredient ?? []);
        const pairings = filled.flatMap((a, i) =>
          filled.slice(i + 1).flatMap((b) => (pair(a, b) ? [[a, b] as const] : [])),
        );
        const rankReason = explainRank(filled, pairings);
        return { suggestion: { formula, slots, method, rankReason }, coherence: pairings.length };
      });
      // A stable sort, so ties keep the order Formulas appear in the content.
      return suggestions.sort((a, b) => b.coherence - a.coherence).map(({ suggestion }) => suggestion);
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
