# 0004 · Suggestion ranking with rank reasons

Milestone: #7 (part of #2). Suggestions are ordered by coherence, and each one says, in a plain sentence, why it ranked where it did.

## Decisions

**Coherence is the number of Pairings among a Suggestion's filled Ingredients.** It's the third ranking rule in #2. The first two (makeable first, then fewest missing) depend on the Pantry and arrive in #10; the Cuisine bonus arrives in #12. All of it stays behind `suggest()`; the Suggestions screen only shows what it returns.

**Ties keep the order Formulas appear in the content.** A stable sort means the content author decides between equally coherent Formulas, and the same inputs always give the same order.

**The rank reason describes the shape of the fill, not a score.** The Cook never sees a number. The reason picks the most useful true sentence: "Everything pairs with garlic" when one Ingredient connects the rest, "Every Ingredient here pairs with every other" when the fill is fully connected, the pairs that work plus whatever doesn't fit ("Lemon and garlic pair well, but mint doesn't pair with the rest"), or that nothing pairs yet. Each shape has a test.

## Alternatives considered

- **Showing the score ("3 Pairings").** Rejected: a number explains nothing about *why*, which is what the Cook needs to trust the order.
- **Breaking ties alphabetically.** Rejected: it's as deterministic as content order but takes the choice away from the author.

## Evidence

- Vitest covers ordering, a tie, and each rank-reason shape through `loadKitchen`.
- Playwright: `?with=chicken-thigh,garlic,tomato` ranks Sheet-pan roast ("Everything pairs with garlic.") above Pan sauce ("Chicken thigh and garlic pair well.").
