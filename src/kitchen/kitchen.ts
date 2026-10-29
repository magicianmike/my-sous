import {
  PAIRING_REASON_CATEGORIES,
  PAIRING_REASON_HEADINGS,
  type PairingReasonCategory,
} from "./categories";
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

export { PAIRING_REASON_CATEGORIES } from "./categories";

/** An Ingredient's Pairings for one Pairing Reason category, each with only that category's reasons. */
export type PairingGroup = {
  category: PairingReasonCategory;
  /** The category as the Cook sees it, such as "Aromatic bridge". */
  heading: string;
  pairings: PairingView[];
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

/** Where a Slot's Ingredient came from: in fill order, then a swap by the Cook. */
export type FillSource = "combination" | "pantry" | "pairing" | "swap";

/** A Slot in a Suggestion, with the Ingredient chosen for it, if any, and why. */
export type FilledSlot = {
  slot: Slot;
  ingredient?: Ingredient;
  source?: FillSource;
  /** The Pairing between this Ingredient and another in the fill that justifies it, if any. */
  justification?: PairingView;
  /** Other Ingredients that could fill the Slot, best-pairing with the rest of the fill first. */
  alternatives: Ingredient[];
  /** Why the Slot holds what it does (or nothing), in one line for the Cook. */
  reason: string;
};

/** A Formula recommended for a Combination, with its Slots filled and a stated reason for its rank. */
export type Suggestion = {
  formula: Formula;
  slots: FilledSlot[];
  /** The Formula's method, naming each Slot's Ingredient, or its role while it's empty. */
  method: string[];
  /** Why the Suggestion ranked where it did, in a plain sentence. */
  rankReason: string;
};

/** Two Combination Ingredients with no Pairing between them. */
export type Tension = { ingredients: [Ingredient, Ingredient] };

/**
 * The next step for one Ingredient in a tension: swap it for `replacement`, which pairs with
 * all the rest of the Combination, or, when nothing does, remove it.
 */
export type CombinationFix = { ingredient: Ingredient; replacement?: Ingredient };

/** What `suggest` gives for a Combination: ranked Suggestions, never empty while Formulas exist. */
export type SuggestResult = {
  suggestions: Suggestion[];
  /** Pairs of Combination Ingredients with no Pairing between them, in Combination order. */
  tensions: Tension[];
  /** One fix for each Ingredient in a tension, in Combination order. */
  fixes: CombinationFix[];
};

export type Kitchen = {
  /** The validated content this Kitchen was built from, to rebuild it in the browser. */
  content: KitchenContent;
  ingredients(): Ingredient[];
  ingredient(id: string): Ingredient | undefined;
  /**
   * Ingredients whose name contains every word of `query`, in any order, ignoring case, accents,
   * apostrophes and extra spaces. Names that start with the query come first, then names where
   * every query word starts a word, then the rest; alphabetical within each.
   */
  search(query: string): Ingredient[];
  pairingsFor(id: string): PairingView[];
  /** The same Pairings grouped by Pairing Reason category; a Pairing with two categories is in both. */
  pairingsByReason(id: string): PairingGroup[];
  /** What a Blend typically includes (by Ingredient id or in plain words); empty for others. */
  blendComponents(id: string): BlendComponent[];
  combination(ids: string[]): Combination;
  formulas(): Formula[];
  formula(id: string): Formula | undefined;
  /**
   * Suggestions for a Combination, one per Formula. Slots fill from the Combination first, then
   * the Pantry (each Ingredient filling at most one Slot), then the Ingredient that pairs with
   * most of the fill; a Slot that no Pairing can justify stays empty. Ranked by coherence (the
   * number of Pairings among the Ingredients the Cook chose, from the Combination or Pantry, not
   * those suggested by Pairing), with ties in content order. Deterministic.
   */
  suggest(combination: Ingredient[], pantry: Ingredient[]): SuggestResult;
  /** The same Suggestion with one Slot holding the Cook's choice; every other fill is kept. */
  swap(suggestion: Suggestion, slotId: string, ingredientId: string): Suggestion;
};

type Fill = { ingredient: Ingredient; source: FillSource } | undefined;

const usedIn = (fills: Fill[]) => fills.flatMap((fill) => fill?.ingredient ?? []);
const fits = (slot: Slot) => (ingredient: Ingredient) => ingredient.slotTypes.includes(slot.accepts);

/** Why a Slot holds its Ingredient, or why it's empty. */
function explainFill(slot: Slot, fill: Fill, justification: PairingView | undefined): string {
  if (justification) {
    return `Pairs with ${inSentence(justification.ingredient)}: ${justification.reasons[0].note}`;
  }
  switch (fill?.source) {
    case undefined:
      return `No Pairing here points to ${slot.role} yet.`;
    case "combination":
      return "From your Combination.";
    case "pantry":
      return "From your Pantry.";
    case "pairing":
      return "Suggested earlier. It doesn't pair with anything else here now.";
    case "swap":
      return "Your choice. It doesn't pair with anything else here yet.";
  }
}

/** How an Ingredient is named mid-sentence, as in "season chicken thigh". */
export function inSentence(ingredient: Ingredient): string {
  return ingredient.name.toLowerCase();
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
  if (used.length === 0) return "None of your Combination fits this Formula yet.";
  if (used.length === 1) return `Only ${name(used[0])} from your Combination is used here.`;
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

/** "a", "a and b", "a, b and c". */
/** The hedged way MySous ties something to Cuisines: "Common in Southern Italian cooking." */
export function commonIn(cuisines: Cuisine[]): string {
  return `Common in ${joinWithAnd(cuisines.map(({ name }) => name))} cooking.`;
}

function joinWithAnd(items: string[]): string {
  return items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
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

  /** How many of `others` an Ingredient pairs with. */
  const pairsWithCount = (ingredient: Ingredient, others: Ingredient[]) =>
    others.filter((other) => arePaired(ingredient, other)).length;

  /** Ingredients that fit a Slot and aren't used, best-pairing with `rest` first; ties in content order. */
  const rankByPairing = (slot: Slot, used: Ingredient[], rest: Ingredient[]) =>
    [...ingredients.values()]
      .filter((i) => fits(slot)(i) && !used.includes(i))
      .map((ingredient) => ({ ingredient, score: pairsWithCount(ingredient, rest) }))
      .sort((a, b) => b.score - a.score);

  /**
   * Tensions in a Combination, and one fix per Ingredient involved. A swap must share a Slot
   * type with the Ingredient it replaces (so it plays the same role), not be in the Combination
   * already, and pair with all the rest, so accepting it leaves that Ingredient in no tension.
   * The first such Ingredient in content order is proposed; with none, the fix is removal.
   */
  function findTensions(combination: Ingredient[]): Pick<SuggestResult, "tensions" | "fixes"> {
    const tensions = combination.flatMap((a, i) =>
      combination
        .slice(i + 1)
        .filter((b) => !arePaired(a, b))
        .map((b): Tension => ({ ingredients: [a, b] })),
    );
    const fixes = combination
      .filter((ingredient) => tensions.some(({ ingredients }) => ingredients.includes(ingredient)))
      .map((ingredient): CombinationFix => {
        const rest = combination.filter((other) => other !== ingredient);
        const replacement = [...ingredients.values()].find(
          (candidate) =>
            !combination.includes(candidate) &&
            candidate.slotTypes.some((type) => ingredient.slotTypes.includes(type)) &&
            rest.every((other) => arePaired(candidate, other)),
        );
        return { ingredient, replacement };
      });
    return { tensions, fixes };
  }

  /** Everything derived from a Formula's fills: justifications, alternatives, method, rank. */
  function deriveSuggestion(
    formula: Formula,
    fills: Fill[],
  ): { suggestion: Suggestion; coherence: number } {
    const used = usedIn(fills);
    const slots = formula.slots.map((slot, i): FilledSlot => {
      const fill = fills[i];
      const rest = used.filter((other) => other !== fill?.ingredient);
      // The first Ingredient, in Slot order, that this one pairs with.
      const partner = fill && rest.find((other) => arePaired(fill.ingredient, other));
      const justification =
        partner &&
        pairingsByIngredient.get(fill.ingredient.id)!.find(({ ingredient }) => ingredient === partner);
      return {
        slot,
        ...fill,
        justification,
        alternatives: rankByPairing(slot, used, rest).map(({ ingredient }) => ingredient),
        reason: explainFill(slot, fill, justification),
      };
    });
    const method = formula.method.map((step) =>
      step.replace(SLOT_REFERENCE, (_, id: string) => {
        const { slot, ingredient } = slots.find(({ slot }) => slot.id === id)!;
        return ingredient ? inSentence(ingredient) : slot.role;
      }),
    );
    // Rank by what the Cook chose: Ingredients suggested by Pairing pair by construction.
    const chosen = usedIn(fills.filter((fill) => fill?.source !== "pairing"));
    const pairs = chosen.flatMap((a, i) =>
      chosen.slice(i + 1).flatMap((b): [Ingredient, Ingredient][] => (arePaired(a, b) ? [[a, b]] : [])),
    );
    const rankReason = explainRank(chosen, arePaired, pairs);
    return { suggestion: { formula, slots, method, rankReason }, coherence: pairs.length };
  }

  return {
    content,
    ingredients: () => [...ingredients.values()],
    ingredient: (id) => ingredients.get(id),

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
    pairingsFor: (id) => pairingsByIngredient.get(id) ?? [],

    pairingsByReason(id) {
      const views = pairingsByIngredient.get(id) ?? [];
      return PAIRING_REASON_CATEGORIES.map((category) => ({
        category,
        heading: PAIRING_REASON_HEADINGS[category],
        pairings: views.flatMap((view) => {
          const reasons = view.reasons.filter((reason) => reason.category === category);
          return reasons.length > 0 ? [{ ...view, reasons }] : [];
        }),
      })).filter(({ pairings }) => pairings.length > 0);
    },

    blendComponents(id) {
      return (ingredients.get(id)?.typicallyIncludes ?? []).map((component) => {
        const ingredient = ingredients.get(component);
        return { name: ingredient?.name ?? component, ingredient };
      });
    },

    formulas: () => content.formulas,
    formula: (id) => content.formulas.find((formula) => formula.id === id),

    suggest(combination, pantry) {
      const suggestions = content.formulas.map((formula) => {
        const fills: Fill[] = formula.slots.map(() => undefined);
        const used = () => usedIn(fills);

        for (const [source, pool] of [["combination", combination], ["pantry", pantry]] as const) {
          const unused = pool.filter((ingredient) => !used().includes(ingredient));
          formula.slots.forEach((slot, i) => {
            const index = fills[i] ? -1 : unused.findIndex(fits(slot));
            if (index !== -1) fills[i] = { ingredient: unused.splice(index, 1)[0], source };
          });
        }
        // Repeat until nothing changes: a fill can give an earlier Slot its first Pairing.
        for (let changed = true; changed; ) {
          changed = false;
          formula.slots.forEach((slot, i) => {
            const [best] = fills[i] ? [] : rankByPairing(slot, used(), used());
            if (best?.score > 0) {
              fills[i] = { ingredient: best.ingredient, source: "pairing" };
              changed = true;
            }
          });
        }

        return deriveSuggestion(formula, fills);
      });
      // A stable sort, so ties keep the order Formulas appear in the content.
      return {
        suggestions: suggestions
          .sort((a, b) => b.coherence - a.coherence)
          .map(({ suggestion }) => suggestion),
        ...findTensions(combination),
      };
    },

    swap(suggestion, slotId, ingredientId) {
      const slot = suggestion.formula.slots.find(({ id }) => id === slotId);
      const chosen = ingredients.get(ingredientId);
      if (!slot || !chosen || !fits(slot)(chosen)) {
        throw new Error(`${ingredientId} can't fill Slot "${slotId}" in ${suggestion.formula.id}`);
      }
      const fills: Fill[] = suggestion.slots.map(({ slot, ingredient, source }) =>
        slot.id === slotId
          ? { ingredient: chosen, source: "swap" as const }
          : ingredient && source && { ingredient, source },
      );
      return deriveSuggestion(suggestion.formula, fills).suggestion;
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
