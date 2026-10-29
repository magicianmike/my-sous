# 0007 · Ingredient depth and search

Milestone: #6 (part of #2). The Ingredient page becomes worth reading, and any Ingredient is a few keystrokes away.

## Decisions

**Pairings are grouped by Pairing Reason, in a fixed order: contrast, aromatic bridge, texture, tradition.** Each group is a labelled section, so it's a landmark for screen readers. A Pairing with reasons in two categories appears in both, each time with that category's reason. The grouping is a Kitchen capability (`pairingsByReason`), so the page only renders it; empty groups are left out.

**Every Pairing has longer text, behind "More".** ADR 0001 asks for uniform depth, so all 17 Pairings got a `detail`: practical, technique-level notes, hedged where they touch on preference. The disclosure is a native `<details>`, which is keyboard-operable and announces whether it's open; its hidden label names both Ingredients ("More about lemon and garlic") so the many "More" buttons are distinguishable. The Pairing's Cuisines show inside it too.

**Search ranks by how the name matches, then alphabetically.** Names that start with the query come first, then names with a word that does ("ch" finds Chicken thigh before Fresh chile), then names that contain it anywhere. It ignores case and surrounding spaces. It's tested through `loadKitchen`, and runs in the browser from the same Kitchen.

**The search box follows the ARIA combobox pattern.** Arrow keys move through matches (`aria-activedescendant`), Enter opens the active match or the first one, the first Escape closes the list and a second clears the field, and the match count is announced. It's a plain text field rather than `type="search"`, because browsers clear a search field on Escape themselves, which broke the two-step Escape.

**"Not in MySous yet", never a blank.** A query with no match says so and links to the full list. An Ingredient URL outside the set gets a page that says the same and points back to search.

**Blend components link when they're Ingredients.** `typicallyIncludes` takes Ingredient ids (which link) or plain words. Gremolata joins the content as the first Blend: lemon and garlic link, parsley doesn't yet.

**A YAML syntax error is a content error, too.** Writing the Pairing details surfaced that an unquoted colon in a YAML value crashed the build with a raw parser error. It now fails with the file, line and column, like every other content problem.

## Alternatives considered

- **Grouping in the page component.** Rejected: it's a domain rule (which reasons count as which category, and the order), and #2 keeps those in the Kitchen.
- **Fuzzy matching for search.** Deferred: with 10 to 100 curated names, substring matching with a sensible order finds everything, and its results are predictable.

## Evidence

- Vitest, through `loadKitchen`: search order (including ties), grouping with a two-category Pairing, Blend components with and without links, and a YAML syntax error reported with its line.
- Playwright: search → Lemon → expand; arrow keys, Enter and two-step Escape; a no-match next step; Gremolata's links; the not-in-MySous page. axe passes on an open search list, a no-match search, an expanded Pairing, a Blend and the not-in-MySous page, in both themes at both widths.
