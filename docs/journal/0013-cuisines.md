# 0013 · Cuisines

Milestone: #12 (part of #2). Cuisines become a way to browse the graph: a page for each, a list of all of them, a filter on an Ingredient's Pairings, and a tie-breaker in ranking.

## After

| Screen | After |
| --- | --- |
| Southern Italian, desktop light | ![](0013-cuisines/after-cuisine-desktop-light.png) |
| Cuisines, phone dark | ![](0013-cuisines/after-cuisines-phone-dark.png) |
| Garlic, filtered to Southern Italian, desktop light | ![](0013-cuisines/after-ingredient-filtered-desktop-light.png) |
| Home, with "Or explore by cuisine" | ![](0013-cuisines/after-home-desktop-light.png) |

## Decisions

The author chose each of these from options.

**The filter lives in the URL.** An Ingredient's Pairings have a second control under the reason filter: "Any cuisine", then the Cuisines its Pairings are common in. The choice is a query parameter beside the basket (`?with=lemon&cuisine=cantonese`). So a filtered view can be linked, Back clears it, and the basket survives the change. A line says what the filter shows ("2 Pairings common in Southern Italian cooking."). It's a polite live region that stays in the page while empty, so screen readers hear it fill. It's not a second status, so the page keeps one status, for the basket. The control appears once the page is live in the browser; before then, every Pairing shows.

**A Cuisine bonus that breaks ties, not Pairings.** When every Ingredient the Cook chose (not those MySous suggested, which pair by construction, as with Pairings) shares a Cuisine, coherence gains half a Pairing. It decides between dishes that pair equally well, but never outweighs a real Pairing. The rank reason says why: "Lamb and mint pair well. Both are common in Levantine cooking."

**A Cuisines list, linked from Home.** "Or explore by cuisine: Southern Italian, Ligurian, Cantonese and Oaxacan." sits under the ingredient grid. It's a sentence, not a second heading, so Home keeps one way in: browsing by Cuisine leads to the same Ingredients and the same basket. Each Cuisine page lists the Ingredients common in it, the Pairings attested in it (both drawings and both names lead onward), and the other Cuisines. An Ingredient's "Common in" chips now link to their Cuisines.

**Named regionally, never "authentic".** Validation rejects a Cuisine named at continental or broad-regional level ("Asian", "European", "Middle Eastern", "Mediterranean", …). A copy check fails if "authentic" appears in content or app copy. Both run against the real content in Vitest.

**Tests.**

- Vitest through `loadKitchen`: Pairings filtered by Cuisine, a Cuisine's Ingredients and Pairings, the list of Cuisines, the bonus deciding an order and its rank reason, and continental names rejected.
- Vitest content checks on the real content and copy.
- Playwright: Home → Cuisines → Southern Italian → Garlic → filtered Pairings, then cleared by "Any cuisine" and restored by Back. Also a filtered link that keeps the basket, and an Ingredient's Cuisines leading to their pages.
- axe, reflow and touch targets on the Cuisine pages and a filtered Ingredient.

## VoiceOver pass

**Status: waiting for the author.** On an iPhone and a Mac:

1. On Home, the sentence "Or explore by cuisine: …" reads as text with five links.
2. On Southern Italian, the headings are "Southern Italian", "Common in Southern Italian cooking", "Pairings" and "Other cuisines". The Ingredient list is named "Ingredients common in Southern Italian cooking".
3. On Garlic, "Show Pairings common in" reads as a radio group. Choosing "Southern Italian" announces "2 Pairings common in Southern Italian cooking."
4. "Any cuisine" clears it, and Back brings it back.

## Open

- **Author review gate:** the screens above and the preview deploy.
- The VoiceOver pass above.
- Few Pairings carry Cuisines yet (6 of 17). The research batches (#17, #18) fill this out.
