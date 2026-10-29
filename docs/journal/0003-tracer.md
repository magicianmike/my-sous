# 0003 · Tracer: Combination to Suggestions to Formula

Milestone: #5 (part of #2). The whole core journey, rough but real: from an Ingredient, the Cook adds Ingredients to a Combination, sees it in a tray on every screen, taps "See what to make", gets Suggestions for 2 Formulas and opens one with its Slots filled.

## Decisions

**The Combination lives in the URL, and nowhere else.** `?with=chicken-thigh,garlic` is the source of truth. Adding or removing an Ingredient pushes a new URL, so back and forward step through Combination changes for free, a copied link reopens the exact Combination, and the Case Study can deep-link into any state. Every link between app screens carries the parameter along.

**The Kitchen runs in the browser too.** The site is a static export with no server, and the Cook can build any Combination, so Suggestions can't be prerendered. The Kitchen module is split three ways: `schema.ts` (the content format), `kitchen.ts` (pure, browser-safe, built from validated content by `createKitchen`) and `index.ts` (`loadKitchen`, which reads and checks the files at build time). The layout hands the validated content to the browser, which rebuilds the same Kitchen. Tests still go through `loadKitchen`, so both paths share one tested core.

**Combination rules belong to the Kitchen, not the UI.** `kitchen.combination(ids)` keeps known Ingredients in order, drops duplicates, and reports unknown ids and anything past four, so the tray can say what was left out and why. Adding a fifth explains the limit instead of silently refusing.

**`suggest()` fills Slots from the Combination only, for now.** Each Slot takes the first Combination Ingredient that fits and hasn't filled another Slot. Formulas come in content order. The Pantry, best-pairing fills, ranking and rank reasons arrive in #7, #8 and #10; the `pantry` parameter is already in the interface so those tickets don't change its shape.

**Method steps name Slots, not Ingredients.** A step reads `Season {protein} with salt…`, and `suggest()` fills in the chosen Ingredient, or the Slot's role ("an acid") when it's empty. The build fails if a step names a Slot the Formula doesn't have, or if any Slot can't be filled by any Ingredient.

## Alternatives considered

- **A client-side store (or localStorage) for the Combination.** Rejected: it breaks back/forward and shareable links, which #2 asks for, and the Case Study's deep links.
- **Prerendering Suggestions for every Combination.** Rejected: with 100 Ingredients and up to four per Combination, there are millions of them.
- **Disabling "Add" at the limit.** Rejected: a disabled button can't be focused or explain itself. The button stays active, and the tray shows and announces why nothing was added.
- **Replacing "Add" with a plain "In your Combination" label.** Rejected after review: swapping the focused button for text dropped keyboard focus to the page. The same button now switches between "Add" and "Remove", so focus stays where the Cook left it.

## Evidence

- The Playwright journey covers Ingredient → add two Ingredients → Suggestions → Formula, then back and forward, then a copied URL in a new tab, plus the same journey with the keyboard alone.
- axe passes on the home, Ingredient, Suggestions and Formula screens, with and without a Combination, in both themes at phone and desktop widths.
- Screenshots to be added from the PR's preview deploy.
