# 0005 · Slot alternatives, swap and undo

Milestone: #8 (part of #2). A Formula arrives with every Slot it can justify already filled, each fill says which Pairing put it there, and any Slot can be swapped for a ranked alternative and undone.

## Decisions

**Defaults, not forms: Slots fill from the Combination, then the Pantry, then the best-pairing Ingredient.** The third step picks the Ingredient that pairs with most of what's already in the fill, with ties in content order. The Pantry step is in place and tested; the Pantry itself arrives in #10.

**A Slot no Pairing justifies stays empty.** Filling it with any Ingredient that fits would look helpful but couldn't say why it belongs, which breaks "every choice shows its reason". An empty Slot says so plainly and still offers its alternatives.

**The justifying Pairing is the first one, in fill order, between the Ingredient and the rest of the fill.** It shows in one line: "Pairs with chicken thigh: Lemon's acid balances the rich fat of chicken thigh."

**A swap keeps every other fill.** `kitchen.swap(suggestion, slotId, ingredientId)` returns a new Suggestion with only that Slot changed, and the method, justifications, alternatives and rank reason worked out again. Re-filling the other Slots after a swap would move things the Cook didn't touch.

**Undo is a history of Suggestions on the Formula screen.** Each swap pushes the new Suggestion; Undo pops it. The history lives in the screen, not the URL, and a new Combination starts a fresh one. The Undo button is always present (marked unavailable when there's nothing to undo), so keyboard focus can land on it after a swap and stay on it after an undo. Each change is announced in a live region.

**Best-pairing fills count toward ranking.** Coherence counts Pairings among all filled Ingredients (#2's rule), so a Formula whose suggested additions pair well now ranks higher. On today's content, Sheet-pan roast outranks Pan sauce for chicken thigh and garlic, and garlic, which pairs with most Ingredients, becomes the hub of many rank reasons.

## Alternatives considered

- **Swapping with a `<select>`.** Rejected: some browsers fire a change on every arrow key in a closed select, which would swap on each keystroke. A native disclosure of "Use Lime" buttons is keyboard-operable and announces its state.
- **Keeping swaps in the URL.** Deferred: it would make swapped Formulas shareable and deep-linkable for the Case Study, but #8 only asks for undo. Worth revisiting with the ADR 0002 split.

## Evidence

- Vitest covers fill order, best-pairing choice, the empty-Slot case, justifications, ranked alternatives (with a tie) and a swap, all through `loadKitchen`.
- Playwright covers swap → method updates → undo, with the mouse and with the keyboard alone, including focus landing on Undo and the announcements.
