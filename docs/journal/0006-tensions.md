# 0006 · No dead ends: tensions and swaps

Milestone: #9 (part of #2). When a Combination doesn't hang together, MySous says which Ingredients don't pair, offers one-tap swaps, and still shows the closest Suggestions with their gaps.

## Decisions

**A tension belongs to the Combination, so `suggest()` returns it alongside the Suggestions.** #2 sketches tensions on each Suggestion, but a pair of Combination Ingredients with no Pairing is the same whichever Formula you look at; repeating it on every Suggestion would only duplicate it. `suggest()` now returns `{ suggestions, tensions, fixes }`.

**Every Ingredient in a tension gets exactly one fix, and a swap has to resolve it.** A proposed swap shares a Slot type with the Ingredient it replaces (so it can stand in the same Formulas), isn't already in the Combination, and pairs with *all* the rest of it, so accepting it leaves that Ingredient in no tension; the first such Ingredient in content order is proposed. When nothing qualifies, the fix is to remove the Ingredient. The first version proposed whatever paired with *most* of the rest, and review caught it offering "Swap anchovy for caper" for chocolate and anchovy, when caper doesn't pair with chocolate either; a swap that keeps or creates a tension isn't a fix.

**One fix per Ingredient means no duplicate buttons and no tension without a next step.** Basil can be in two tensions, but it gets one fix. The Kitchen works out the fixes; the screen only lists the tensions and then the fixes ("Swap one?", "Removing one would help." or "Swap or remove one?").

**Accepting a swap is a Combination change, so it goes through the URL.** The swapped-in Ingredient takes the same position, back undoes it, and the tray announces it. The pressed button disappears with its tension, so focus moves to the Suggestions heading.

**Never an empty screen.** `suggest()` returns a Suggestion for every Formula, however poor the fit; the worst case (nothing fits, nothing pairs) is covered by a test and still gives each Formula with its rank reason ("None of your Combination fits this Formula yet.") and its gaps.

## Alternatives considered

- **A tension message per Suggestion.** Rejected, as above.
- **Proposing any Ingredient that pairs with the rest, whatever its kind.** Rejected: swapping chocolate for garlic because garlic pairs widely changes what the Cook is making, not just what pairs.
- **Proposing the best partial improvement.** Rejected after review, as above.

## Evidence

- Vitest, through `loadKitchen`: tensions with one fix per Ingredient (swaps only when they pair with all the rest, removals otherwise), no tensions when everything pairs, and the worst case still giving every Formula.
- Playwright: `?with=chicken-thigh,basil` names the tension, "Swap basil for cilantro" updates the URL and the Suggestions ("Chicken thigh and cilantro pair well."), and back brings the tension back; with two tensions, every Ingredient involved gets one button and "Remove basil" works. axe passes with tensions showing, in both themes at both widths.
