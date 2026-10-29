# PROTOTYPE: visual direction, round 1 (issue #4)

Throwaway. Not production code, and it never merges to `main`.

**Question:** what should MySous look like? Three variants of the Ingredient Pairings screen (Lime), each structurally different, not only restyled.

**Run:** double-click `index.html` (the side-by-side board), or open `variant.html?variant=editorial|botanical|utility` for one variant at full size. Use ← and → to switch variants, and the ◐ button to cycle the theme between system, light and dark. Fonts load from Google Fonts, so the first open needs a network connection.

| Key | Variant | Branch | Structure |
| --- | --- | --- | --- |
| A | Editorial cookbook | `prototype/editorial-cookbook` | Long-read article. Fraunces + Source Serif 4 on warm paper, with lime as the Ingredient colour. Pairing Reasons are numbered chapters of prose, Cuisines sit in the margin, and the Combination is an index card. |
| B | Botanical line | `prototype/botanical-line` | Specimen sheet. Single-line drawings on a 48-unit grid with one stroke weight, set in Nunito. A segmented Pairing Reason filter is the primary control, and every Pairing row starts with its drawing. |
| C | Modern utility | `prototype/modern-utility` | Dense board in Schibsted Grotesk, high contrast. The four Pairing Reasons are solid colour columns (bands on a phone), with a Cuisine filter and one-tap add. The prose is cut back to a notes strip. |

`prototype/visual-direction` merges all three, together with the shared harness: `data.js` (sample content, not researched), `shell.js` (state, switcher and audit) and `index.html` (the board).

## Contrast (WCAG 2.2 AA, SC 1.4.3)

The audit walks every element that has its own visible text, works out the effective background by compositing its ancestors, and checks the text against 4.5:1, or 3:1 for large text. Each frame on the board runs it live. Results at 390px and 1280px:

| Variant | Light (lowest ratio) | Dark (lowest ratio) | Failures |
| --- | --- | --- | --- |
| A Editorial | 3.82:1, the large decorative full stop (needs 3:1); body text ≥ 7:1 | 7.20:1 | 0 |
| B Botanical | 6.16:1 | 6.70:1 | 0 |
| C Utility | 6.53:1 | 5.52:1 | 0 |

No horizontal scrolling at 390px in any variant. The audit doesn't cover non-text contrast (SC 1.4.11, such as icon strokes and control borders). That check belongs in the design system ticket (#14).
