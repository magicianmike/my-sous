# 0006 · No dead ends: tensions and swaps

Milestone: #9 (part of #2). When a Combination doesn't hang together, MySous says which Ingredients don't pair, offers one-tap swaps, and still shows the closest Suggestions with their gaps.

## Decisions

**A tension belongs to the Combination, so `suggest()` returns it alongside the Suggestions.** #2 sketches tensions on each Suggestion, but a pair of Combination Ingredients with no Pairing is the same whichever Formula you look at; repeating it on every Suggestion would only duplicate it. `suggest()` now returns `{ suggestions, tensions }`.

**A swap proposal plays the same role and pairs with the rest.** For each side of a tension, MySous proposes the Ingredient that shares a Slot type with it (so it can stand in the same Formulas), isn't already in the Combination, and pairs with most of the rest of it; ties in content order. If nothing like it pairs with the rest, there's no proposal for that side rather than a poor one.

**The screen lists every tension once, then each helpful swap once.** Basil can be in two tensions, and the same "Swap basil for cilantro" would otherwise appear twice, which reads oddly and gives screen-reader users two identical buttons. When no swap exists, the Cook is offered removals instead, so there's always a next step.

**Accepting a swap is a Combination change, so it goes through the URL.** The swapped-in Ingredient takes the same position, back undoes it, and the tray announces it. The pressed button disappears with its tension, so focus moves to the Suggestions heading.

**Never an empty screen.** `suggest()` returns a Suggestion for every Formula, however poor the fit; the worst case (nothing fits, nothing pairs) is covered by a test and still gives each Formula with its rank reason ("None of your Combination fits this Formula yet.") and its gaps.

## Alternatives considered

- **A tension message per Suggestion.** Rejected, as above.
- **Proposing any Ingredient that pairs with the rest, whatever its kind.** Rejected: swapping chocolate for garlic because garlic pairs widely changes what the Cook is making, not just what pairs.

## Evidence

- Vitest, through `loadKitchen`: tensions with swaps for both sides (including a tie), no tensions when everything pairs, a side with no swap, and the worst case still giving every Formula.
- Playwright: `?with=chicken-thigh,basil` names the tension, "Swap basil for cilantro" updates the URL and the Suggestions ("Chicken thigh and cilantro pair well."), and back brings the tension back; swaps that ease several tensions appear once. axe passes with tensions showing, in both themes at both widths.
