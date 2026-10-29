# 0007 · Ingredient depth and search

Milestone: #6 (part of #2). The Ingredient page becomes worth reading, and any Ingredient is a few keystrokes away.

## Decisions

**Pairings are grouped by Pairing Reason, in a fixed order: contrast, aromatic bridge, texture, tradition.** Each group is a labelled section, so it's a landmark for screen readers. A Pairing with reasons in two categories appears in both, each time with that category's reason. The grouping is a Kitchen capability (`pairingsByReason`), so the page only renders it; empty groups are left out.

**Every Pairing has longer text, behind "More".** ADR 0001 asks for uniform depth, so all 17 Pairings got a `detail`: practical, technique-level notes. Review caught several stating preference or contested technique as fact (that pounding basil beats blending it, that lime makes chile heat "shorter"); those are now hedged ("many cooks find…") or narrowed to what holds. Citations for all of it are #17's job. The disclosure is a native `<details>`, which is keyboard-operable and announces whether it's open; its hidden label names both Ingredients and the category ("More about lemon and garlic, contrast"), so the many "More" buttons are distinguishable even when a Pairing appears in two groups. The Pairing's Cuisines show inside it too.

**Search ranks by how the name matches, then alphabetically.** Names that start with the query come first, then names where every query word starts a word ("ch" finds Chicken thigh before Fresh chile), then names that contain them anywhere. Words can come in any order, and case, accents, apostrophes and extra spaces are ignored, so "zaatar" finds Za'atar, "jalapeno" finds Jalapeño, and a phone's curly apostrophe doesn't matter. Ties sort by plain code points, so the order is identical in Node and every browser. It's tested through `loadKitchen`, and runs in the browser from the same Kitchen.

**The search box follows the ARIA combobox pattern.** Arrow keys move through matches (`aria-activedescendant`), from no selection Down goes to the first and Up to the last, and both wrap. Enter opens the active match, or the first, only while the list is open. The first Escape closes the list and a second clears the field; focusing the field reopens it. The match count is announced while the list is open, and a no-match message whenever there's nothing to show. It's a plain text field rather than `type="search"`, because browsers clear a search field on Escape themselves, which broke the two-step Escape.

**"Not in MySous yet", never a blank.** A query with no match says so and links to the full list. Any URL outside the site (an Ingredient or anything else) gets a page that says it isn't in MySous yet and points back to search.

**Blend components link when they're Ingredients.** `typicallyIncludes` takes Ingredient ids (which link) or plain words. Gremolata joins the content as the first Blend: lemon and garlic link, parsley doesn't yet.

**A YAML syntax error is a content error, too.** Writing the Pairing details surfaced that an unquoted colon in a YAML value crashed the build with a raw parser error. It now fails with the file, line and column, like every other content problem.

## Alternatives considered

- **Grouping in the page component.** Rejected: it's a domain rule (which reasons count as which category, the order, and their headings), and #2 keeps those in the Kitchen. The categories and headings live in one small module that both the content schema and the Kitchen import.
- **Fuzzy matching for search.** Deferred: with 10 to 100 curated names, substring matching with a sensible order finds everything, and its results are predictable.

## Evidence

- Vitest, through `loadKitchen`: search order (including ties), grouping with a two-category Pairing, Blend components with and without links, and a YAML syntax error reported with its line.
- Playwright: search → Lemon → expand; arrow keys, Enter and two-step Escape; a no-match next step; Gremolata's links; the not-in-MySous page. axe passes on an open search list, a no-match search, an expanded Pairing, a Blend and the not-in-MySous page, in both themes at both widths.
