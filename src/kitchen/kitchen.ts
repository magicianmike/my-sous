import {
  INGREDIENT_CATEGORIES,
  INGREDIENT_CATEGORY_HEADINGS,
  PAIRING_REASON_CATEGORIES,
  PAIRING_REASON_HEADINGS,
  type IngredientCategory,
  type PairingReasonCategory,
} from "./categories";
import type {
  Citation,
  Cuisine,
  Formula,
  IngredientContent,
  KitchenContent,
  PairingReason,
  SafetyGuidance,
  Slot,
} from "./schema";

export type { Citation, Cuisine, Formula, KitchenContent, PairingReason, SafetyGuidance, Slot };

export type Ingredient = Omit<IngredientContent, "cuisines"> & { cuisines: Cuisine[] };

/** A Pairing seen from one of its Ingredients: the other Ingredient and why they work. */
export type PairingView = {
  ingredient: Ingredient;
  reasons: PairingReason[];
  cuisines: Cuisine[];
  citations: Citation[];
};

export { PAIRING_REASON_CATEGORIES } from "./categories";

/** An Ingredient's Pairings for one Pairing Reason category, each with only that category's reasons. */
export type PairingGroup = {
  category: PairingReasonCategory;
  /** The category as the Cook sees it, such as "Aromatic bridge". */
  heading: string;
  pairings: PairingView[];
};

/** Ingredients of one kind, such as herbs, as the Ingredients page lists them. */
export type IngredientGroup = { category: IngredientCategory; heading: string; ingredients: Ingredient[] };

/** A Cuisine, the Ingredients common in it and the Pairings attested in it. */
export type CuisineView = {
  cuisine: Cuisine;
  /** In name order. */
  ingredients: Ingredient[];
  /** In content order, each with both its Ingredients. */
  pairings: { ingredients: [Ingredient, Ingredient]; reasons: PairingReason[] }[];
};

/** One thing a Blend typically includes, linked to its Ingredient when that's in MySous. */
export type BlendComponent = { name: string; ingredient?: Ingredient };

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

/** Where an Ingredient in a Slot came from: in fill order, then the Cook's own changes on the dish. */
export type FillSource = "combination" | "pairing" | "recipe" | "swap" | "added";

/** Whether the Ingredient is the Cook's own, from the Combination, not suggested or swapped in. */
export function isCooksOwn(source: FillSource): boolean {
  return source === "combination";
}

/** Whether the Cook chose the Ingredient: from the Combination, or by a change on the dish. */
export function isCooksChoice(source: FillSource): boolean {
  return source === "combination" || source === "swap" || source === "added";
}

/** One Ingredient in a Slot of a Suggestion: where it came from, and why it's there. */
export type SlotFill = {
  ingredient: Ingredient;
  source: FillSource;
  /** The Pairing between this Ingredient and another in the dish that justifies it, if any. */
  justification?: PairingView;
  /** Why it's here, in one line for the Cook. */
  reason: string;
};

/** A Slot in a Suggestion, with the Ingredients chosen for it (at most its `max`), and why. */
export type FilledSlot = {
  slot: Slot;
  /** In the order they went in; empty while nothing pairs into the Slot. */
  fills: SlotFill[];
  /** Other Ingredients that could go in the Slot, best-pairing with the rest of the dish first. */
  alternatives: Ingredient[];
  /** Why the Slot is empty, in one line for the Cook; only while it is. */
  emptyReason?: string;
};

/** A Formula recommended for a Combination, with its Slots filled and a stated reason for its rank. */
export type Suggestion = {
  formula: Formula;
  slots: FilledSlot[];
  /** The Formula's method, naming each Slot's Ingredients, or its role while it's empty. */
  method: string[];
  /** Why the Suggestion ranked where it did, in a plain sentence. */
  rankReason: string;
  /** The required Slots the Combination doesn't fill, as filled so far, in Formula order. */
  needs: FilledSlot[];
  /** Whether the Combination fills every required Slot (shown as "Ready"). */
  makeable: boolean;
};

/** A line of a Recipe's ingredient list, its name lower-case like the rest; `ingredient` is set when it fills a Slot. */
export type RecipeIngredient = { amount: string; name: string; ingredient?: Ingredient; note?: string };

/** A Recipe step; a safety-sensitive one carries the cited guidance of each Ingredient it depends on. */
export type RecipeStep = { text: string; safety: { ingredient: Ingredient; guidance: SafetyGuidance }[] };

/** A Formula's Recipe, for whatever fills its Slots: quantities, timings and the full method. */
export type Recipe = {
  serves: number;
  /** In minutes. */
  time: { prep: number; cook: number; total: number };
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
};

export type Kitchen = {
  /** The validated content this Kitchen was built from, to rebuild it in the browser. */
  content: KitchenContent;
  ingredients(): Ingredient[];
  ingredient(id: string): Ingredient | undefined;
  /** Every Ingredient by category, categories in a fixed order and names in order within each; none empty. */
  ingredientsByCategory(): IngredientGroup[];
  /**
   * Ingredients whose name contains every word of `query`, in any order, ignoring case, accents,
   * apostrophes and extra spaces. Names that start with the query come first, then names where
   * every query word starts a word, then the rest; alphabetical within each.
   */
  search(query: string): Ingredient[];
  /** An Ingredient's Pairings, or only those common in a Cuisine when one is given. */
  pairingsFor(id: string, cuisineId?: string): PairingView[];
  /** The same Pairings grouped by Pairing Reason category; a Pairing with two categories is in both. */
  pairingsByReason(id: string): PairingGroup[];
  /** The Cuisines an Ingredient's Pairings are common in, once each, in content order. */
  pairingCuisines(id: string): Cuisine[];
  /** Every Cuisine, in content order. */
  cuisines(): Cuisine[];
  cuisine(id: string): CuisineView | undefined;
  /** What a Blend typically includes (by Ingredient id or in plain words); empty for others. */
  blendComponents(id: string): BlendComponent[];
  combination(ids: string[]): Combination;
  formulas(): Formula[];
  formula(id: string): Formula | undefined;
  /** The Recipe for a Suggestion's Formula, if it has one, written out for the Suggestion's fills. */
  recipe(suggestion: Suggestion): Recipe | undefined;
  /**
   * Suggestions for a Combination, one per Formula. Slots fill from the Combination first (each
   * Ingredient filling at most one Slot), then the Ingredient that pairs with most of the fill; a
   * Slot that no Pairing can justify stays empty. Ranked by fewest required Slots still needed (so
   * makeable first), then by coherence: the number of Pairings among the Ingredients the Cook
   * chose, not those suggested by Pairing. Ties keep content order. Deterministic.
   */
  suggest(combination: Ingredient[]): Suggestion[];
  /** The same Suggestion with one Ingredient in a Slot swapped for the Cook's choice; every other fill is kept. */
  swap(suggestion: Suggestion, slotId: string, replacingId: string, ingredientId: string): Suggestion;
  /** The same Suggestion with the Cook's choice added to a Slot that has room. */
  addToSlot(suggestion: Suggestion, slotId: string, ingredientId: string): Suggestion;
  /** The same Suggestion with one Ingredient taken out of a Slot. */
  removeFromSlot(suggestion: Suggestion, slotId: string, ingredientId: string): Suggestion;
};

/** What a Slot holds, before it's explained: each Ingredient and where it came from. */
type Fill = { ingredient: Ingredient; source: FillSource };

const usedIn = (fills: Fill[][]) => fills.flat().map(({ ingredient }) => ingredient);
const fits = (slot: Slot) => (ingredient: Ingredient) => ingredient.slotTypes.includes(slot.accepts);

/** Why an Ingredient is in its Slot. */
function explainFill(source: FillSource, justification: PairingView | undefined): string {
  if (justification) {
    return `Pairs with ${inSentence(justification.ingredient)}: ${justification.reasons[0].note}`;
  }
  switch (source) {
    case "combination":
      return "From your basket.";
    case "pairing":
      return "Suggested earlier. It doesn't pair with anything else here now.";
    case "recipe":
      return "From the recipe.";
    case "swap":
    case "added":
      return "Your choice. It doesn't pair with anything else here yet.";
  }
}

/** How an Ingredient is named mid-sentence, as in "season chicken thigh". */
export function inSentence(ingredient: Ingredient): string {
  return ingredient.name.toLowerCase();
}

/** A step with each {slotId} replaced by the Slot's Ingredients ("garlic and ginger"), or its role while it's empty. */
function fillIn(step: string, slots: FilledSlot[]): string {
  return step.replace(SLOT_REFERENCE, (_, id: string) => {
    const { slot, fills } = slots.find(({ slot }) => slot.id === id)!;
    return fills.length > 0 ? joinWithAnd(fills.map(({ ingredient }) => inSentence(ingredient))) : slot.role;
  });
}

/**
 * Explains a Suggestion's coherence in a plain sentence: which of the Ingredients it uses pair,
 * and which don't. It only speaks about those Ingredients ("here"), because two Combination
 * Ingredients can fit the same Slot and only one of them gets placed.
 */
function explainRank(
  used: Ingredient[],
  arePaired: (a: Ingredient, b: Ingredient) => boolean,
  pairs: [Ingredient, Ingredient][],
): string {
  const name = inSentence;
  if (used.length === 0) return "None of your basket fits this dish yet.";
  if (used.length === 1) return `Only ${name(used[0])} from your basket is used here.`;
  if (pairs.length === 0) {
    return used.length === 2
      ? capitalise(`${name(used[0])} and ${name(used[1])} don't have a Pairing in MySous yet.`)
      : "None of these Ingredients pair with each other yet.";
  }
  if (used.length > 2 && pairs.length === (used.length * (used.length - 1)) / 2) {
    return "Every Ingredient here pairs with every other.";
  }
  const hub = used.find((a) => used.every((b) => a === b || arePaired(a, b)));
  if (hub && used.length > 2) return `Everything here pairs with ${name(hub)}.`;

  const [[a, b], ...more] = pairs;
  const alone = used.filter((x) => used.every((y) => x === y || !arePaired(x, y)));
  return capitalise(
    `${name(a)} and ${name(b)} pair well` +
      more.map(([c, d]) => `, and so do ${name(c)} and ${name(d)}`).join("") +
      (alone.length === 0
        ? "."
        : `, but ${joinWithAnd(alone.map(name))} ${alone.length === 1 ? "doesn't" : "don't"} pair with the rest.`),
  );
}

function capitalise(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

/** A name or query reduced for matching: "Za’atar" and "zaatar" match, as do "Jalapeño" and "jalapeno". */
function forSearch(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

/** The hedged way MySous ties something to Cuisines: "Common in Southern Italian cooking." */
export function commonIn(cuisines: Cuisine[]): string {
  return `${capitalise(commonInPhrase(cuisines))}.`;
}

/** The same, mid-sentence: "common in Southern Italian cooking". */
function commonInPhrase(cuisines: Cuisine[]): string {
  return `common in ${joinWithAnd(cuisines.map(({ name }) => name))} cooking`;
}

/** "a", "a and b", "a, b and c". */
function joinWithAnd(items: string[]): string {
  return items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/** Name order by plain code-point comparison, so it's the same in Node and every browser. */
function byName(a: Ingredient, b: Ingredient): number {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

/** The same key for a Pairing whichever order its Ingredients come in. */
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
  const arePaired = (a: Ingredient, b: Ingredient) => pairingKeys.has(pairingKey(a.id, b.id));

  const pairingsByIngredient = new Map<string, PairingView[]>();
  for (const { ingredients: [a, b], reasons, cuisines, citations } of content.pairings) {
    for (const [from, to] of [[a, b], [b, a]] as const) {
      const views = pairingsByIngredient.get(from) ?? [];
      views.push({ ingredient: ingredients.get(to)!, reasons, cuisines: toCuisines(cuisines), citations });
      pairingsByIngredient.set(from, views);
    }
  }

  function pairingsFor(id: string, cuisineId?: string): PairingView[] {
    const views = pairingsByIngredient.get(id) ?? [];
    return cuisineId ? views.filter(({ cuisines }) => cuisines.some(({ id }) => id === cuisineId)) : views;
  }

  /** How many of `others` an Ingredient pairs with. */
  const pairsWithCount = (ingredient: Ingredient, others: Ingredient[]) =>
    others.filter((other) => arePaired(ingredient, other)).length;

  /** Ingredients that fit a Slot and aren't used, best-pairing with `rest` first; ties in content order. */
  const rankByPairing = (slot: Slot, used: Ingredient[], rest: Ingredient[]) =>
    [...ingredients.values()]
      .filter((i) => fits(slot)(i) && !used.includes(i))
      .map((ingredient) => ({ ingredient, score: pairsWithCount(ingredient, rest) }))
      .sort((a, b) => b.score - a.score);

  /** Everything derived from a Formula's fills: justifications, alternatives, method, rank. */
  function deriveSuggestion(
    formula: Formula,
    fills: Fill[][],
  ): { suggestion: Suggestion; coherence: number } {
    const used = usedIn(fills);
    const slots = formula.slots.map((slot, i): FilledSlot => {
      const slotFills = fills[i].map(({ ingredient, source }): SlotFill => {
        // The first Ingredient, in Slot order, that this one pairs with.
        const partner = used.find((other) => other !== ingredient && arePaired(ingredient, other));
        const justification =
          partner && pairingsByIngredient.get(ingredient.id)!.find((view) => view.ingredient === partner);
        return { ingredient, source, justification, reason: explainFill(source, justification) };
      });
      // Alternatives rank by pairing with the rest of the dish: with room, as a companion to everything
      // (what's in the Slot included); when full, as a swap, with everything outside the Slot.
      const room = fills[i].length < slot.max;
      const rest = room ? used : used.filter((other) => !fills[i].some(({ ingredient }) => ingredient === other));
      return {
        slot,
        fills: slotFills,
        alternatives: rankByPairing(slot, used, rest).map(({ ingredient }) => ingredient),
        ...(slotFills.length === 0 && { emptyReason: `No Pairing here points to ${slot.role} yet.` }),
      };
    });
    const method = formula.method.map((step) => fillIn(step, slots));
    // Rank by what the Cook chose: Ingredients suggested by Pairing pair by construction, and
    // those from a Recipe weren't chosen for this Combination.
    const chosen = fills
      .flat()
      .filter(({ source }) => isCooksChoice(source))
      .map(({ ingredient }) => ingredient);
    const pairs = chosen.flatMap((a, i) =>
      chosen.slice(i + 1).flatMap((b): [Ingredient, Ingredient][] => (arePaired(a, b) ? [[a, b]] : [])),
    );
    // Ingredients the Cook chose that all share a Cuisine: a tie-breaker worth half a Pairing, so it
    // decides between equally paired dishes but never outweighs a Pairing.
    const shared =
      chosen.length < 2 ? [] : chosen[0].cuisines.filter((c) => chosen.every((i) => i.cuisines.includes(c)));
    const rankReason =
      explainRank(chosen, arePaired, pairs) +
      (shared.length > 0
        ? ` ${chosen.length === 2 ? "Both are" : "All are"} ${commonInPhrase(shared)}.`
        : "");
    // What the Cook brought: a Pairing suggestion or a swap is something the dish still needs.
    // A required Slot is covered only when everything in it is from the basket.
    const needs = slots.filter(
      ({ slot, fills }) => slot.required && (fills.length === 0 || fills.some(({ source }) => !isCooksOwn(source))),
    );
    return {
      suggestion: { formula, slots, method, rankReason, needs, makeable: needs.length === 0 },
      coherence: pairs.length + (shared.length > 0 ? 0.5 : 0),
    };
  }

  /** A Suggestion with one Slot's fills changed by the Cook; every other fill is kept. */
  function change(
    suggestion: Suggestion,
    slotId: string,
    ingredientId: string,
    update: (fills: Fill[], chosen: Ingredient, slot: Slot) => Fill[],
  ): Suggestion {
    const slot = suggestion.formula.slots.find(({ id }) => id === slotId);
    const chosen = ingredients.get(ingredientId);
    if (!slot || !chosen || !fits(slot)(chosen)) {
      throw new Error(`${ingredientId} can't fill Slot "${slotId}" in ${suggestion.formula.id}`);
    }
    const fills = suggestion.slots.map(({ slot: { id }, fills }) => {
      const kept = fills.map(({ ingredient, source }) => ({ ingredient, source }));
      return id === slotId ? update(kept, chosen, slot) : kept;
    });
    return deriveSuggestion(suggestion.formula, fills).suggestion;
  }

  const formula = (id: string) => content.formulas.find((formula) => formula.id === id);
  const recipes = new Map(content.recipes.map((recipe) => [recipe.formula, recipe]));

  return {
    content,
    ingredients: () => [...ingredients.values()],
    ingredient: (id) => ingredients.get(id),

    ingredientsByCategory: () =>
      INGREDIENT_CATEGORIES.map((category) => ({
        category,
        heading: INGREDIENT_CATEGORY_HEADINGS[category],
        ingredients: [...ingredients.values()].filter((i) => i.category === category).sort(byName),
      })).filter(({ ingredients }) => ingredients.length > 0),

    search(query) {
      const q = forSearch(query);
      if (!q) return [];
      const queryWords = q.split(" ");
      const rank = (name: string) => {
        if (name.startsWith(q)) return 0;
        const words = name.split(" ");
        return queryWords.every((qw) => words.some((word) => word.startsWith(qw))) ? 1 : 2;
      };
      return [...ingredients.values()]
        .map((ingredient) => ({ ingredient, name: forSearch(ingredient.name) }))
        .filter(({ name }) => queryWords.every((word) => name.includes(word)))
        .map((match) => ({ ...match, rank: rank(match.name) }))
        // Plain code-point comparison, so the order is the same in Node and every browser.
        .sort((a, b) => a.rank - b.rank || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map(({ ingredient }) => ingredient);
    },
    pairingsFor,

    pairingsByReason(id) {
      const views = pairingsFor(id);
      return PAIRING_REASON_CATEGORIES.map((category) => ({
        category,
        heading: PAIRING_REASON_HEADINGS[category],
        pairings: views.flatMap((view) => {
          const reasons = view.reasons.filter((reason) => reason.category === category);
          return reasons.length > 0 ? [{ ...view, reasons }] : [];
        }),
      })).filter(({ pairings }) => pairings.length > 0);
    },

    pairingCuisines: (id) =>
      content.cuisines.filter(({ id: cuisine }) => pairingsFor(id, cuisine).length > 0),

    cuisines: () => content.cuisines,

    cuisine(id) {
      const cuisine = cuisines.get(id);
      if (!cuisine) return undefined;
      return {
        cuisine,
        ingredients: [...ingredients.values()].filter((i) => i.cuisines.includes(cuisine)).sort(byName),
        pairings: content.pairings
          .filter(({ cuisines }) => cuisines.includes(id))
          .map(({ ingredients: [a, b], reasons }) => ({
            ingredients: [ingredients.get(a)!, ingredients.get(b)!],
            reasons,
          })),
      };
    },

    blendComponents(id) {
      return (ingredients.get(id)?.typicallyIncludes ?? []).map((component) => {
        const ingredient = ingredients.get(component);
        return { name: ingredient?.name ?? component, ingredient };
      });
    },

    formulas: () => content.formulas,
    formula,
    recipe({ formula: { id }, slots }) {
      const recipe = recipes.get(id);
      if (!recipe) return undefined;
      const filled = (slotId: string) => slots.find(({ slot }) => slot.id === slotId)!;
      return {
        serves: recipe.serves,
        time: { ...recipe.time, total: recipe.time.prep + recipe.time.cook },
        ingredients: recipe.ingredients.flatMap(({ slot: slotId, name, amount, note, for: amounts }) => {
          if (slotId === undefined) return [{ amount, name: name!, note }];
          const { slot, fills } = filled(slotId);
          if (fills.length === 0) {
            // An optional part with nothing in it isn't needed; a required one is named by its role.
            return slot.required ? [{ amount, name: slot.role }] : [];
          }
          // Each Ingredient in a part keeps its full amount, as the recipe gives it.
          return fills.map(({ ingredient }) => {
            const own = amounts?.[ingredient.id];
            return own
              ? { amount: own.amount, name: own.name ?? inSentence(ingredient), ingredient, note: own.note }
              : { amount, name: inSentence(ingredient), ingredient, note };
          });
        }),
        steps: recipe.steps.map(({ text, safety }) => ({
          text: fillIn(text, slots),
          safety: safety
            ? filled(safety.slot).fills.flatMap(({ ingredient }) => {
                const guidance = ingredient.safety?.[safety.about];
                return guidance ? [{ ingredient, guidance }] : [];
              })
            : [],
        })),
      };
    },

    suggest(combination) {
      const suggestions = content.formulas.map((formula) => {
        const fills: Fill[][] = formula.slots.map(() => []);
        const used = () => usedIn(fills);

        // The basket first: one Ingredient per Slot, in Slot order, then what's left into Slots with room.
        const unused = [...combination];
        const fromBasket = (slot: Slot, i: number, room: number) => {
          while (fills[i].length < room) {
            const index = unused.findIndex(fits(slot));
            if (index === -1) return;
            fills[i].push({ ingredient: unused.splice(index, 1)[0], source: "combination" });
          }
        };
        formula.slots.forEach((slot, i) => fromBasket(slot, i, 1));
        formula.slots.forEach((slot, i) => fromBasket(slot, i, slot.max));
        // Repeat until nothing changes: a fill can give an earlier Slot its first Pairing. Pairings
        // only fill empty Slots, with one Ingredient each.
        const fillByPairing = () => {
          for (let changed = true; changed; ) {
            changed = false;
            formula.slots.forEach((slot, i) => {
              const [best] = fills[i].length > 0 ? [] : rankByPairing(slot, used(), used());
              if (best?.score > 0) {
                fills[i].push({ ingredient: best.ingredient, source: "pairing" });
                changed = true;
              }
            });
          }
        };
        fillByPairing();
        // Slots nothing pairs into take the Recipe's Ingredients, those not used already; those can
        // then give other Slots a Pairing.
        const written = recipes.get(formula.id)?.fills ?? {};
        formula.slots.forEach((slot, i) => {
          if (fills[i].length > 0) return;
          for (const id of written[slot.id] ?? []) {
            const ingredient = ingredients.get(id)!;
            if (!used().includes(ingredient)) fills[i].push({ ingredient, source: "recipe" });
          }
        });
        fillByPairing();

        return deriveSuggestion(formula, fills);
      });
      // A stable sort, so ties keep the order Formulas appear in the content.
      const neededCount = ({ suggestion }: { suggestion: Suggestion }) => suggestion.needs.length;
      return suggestions
        .sort((a, b) => neededCount(a) - neededCount(b) || b.coherence - a.coherence)
        .map(({ suggestion }) => suggestion);
    },

    swap(suggestion, slotId, replacingId, ingredientId) {
      return change(suggestion, slotId, ingredientId, (fills, chosen) => {
        if (!fills.some(({ ingredient }) => ingredient.id === replacingId)) {
          throw new Error(`${replacingId} isn't in Slot "${slotId}"`);
        }
        return fills.map((fill) => (fill.ingredient.id === replacingId ? { ingredient: chosen, source: "swap" } : fill));
      });
    },

    addToSlot(suggestion, slotId, ingredientId) {
      const inDish = suggestion.slots.some(({ fills }) => fills.some(({ ingredient }) => ingredient.id === ingredientId));
      if (inDish) throw new Error(`${ingredientId} is in this dish already`);
      return change(suggestion, slotId, ingredientId, (fills, chosen, slot) => {
        if (fills.length >= slot.max) throw new Error(`Slot "${slotId}" holds at most ${slot.max}`);
        return [...fills, { ingredient: chosen, source: "added" }];
      });
    },

    removeFromSlot(suggestion, slotId, ingredientId) {
      return change(suggestion, slotId, ingredientId, (fills) => {
        // The Cook swaps the last one instead: an empty Slot would read as one nothing pairs into.
        if (fills.length < 2) throw new Error(`Slot "${slotId}" keeps at least one Ingredient`);
        return fills.filter(({ ingredient }) => ingredient.id !== ingredientId);
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
