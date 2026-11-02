# 0010 · Suggestions and Formula

Milestone: #16 (part of #2). What to make and the Formula page reach final quality: every Suggestion says whether it's ready and where its Ingredients come from, gaps are named honestly, and swapping a Slot can be undone where the swap happened.

## Before and after

The "before" shots are what `main` showed when this work began. The 320px and zoomed ones come from a build of `main` made for this entry. Chicken thigh and garlic are in the Combination unless the row says otherwise.

| Screen | Before | After |
| --- | --- | --- |
| What to make, desktop light | ![](0010-suggestions-and-formula/before-suggestions-desktop-light.png) | ![](0010-suggestions-and-formula/after-suggestions-desktop-light.png) |
| What to make, phone dark | ![](0010-suggestions-and-formula/before-suggestions-phone-dark.png) | ![](0010-suggestions-and-formula/after-suggestions-phone-dark.png) |
| Ready (chicken thigh, garlic, lemon), desktop light | (new) | ![](0010-suggestions-and-formula/after-suggestions-ready-desktop-light.png) |
| A tension (chicken thigh, basil, ginger), desktop light | ![](0010-suggestions-and-formula/before-suggestions-tension-desktop-light.png) | ![](0010-suggestions-and-formula/after-suggestions-tension-desktop-light.png) |
| No Combination, phone dark | ![](0010-suggestions-and-formula/before-suggestions-empty-phone-dark.png) | ![](0010-suggestions-and-formula/after-suggestions-empty-phone-dark.png) |
| Pan sauce, desktop light | ![](0010-suggestions-and-formula/before-formula-desktop-light.png) | ![](0010-suggestions-and-formula/after-formula-desktop-light.png) |
| A Slot nothing pairs with (sheet-pan roast with ginger), phone dark | ![](0010-suggestions-and-formula/before-formula-missing-phone-dark.png) | ![](0010-suggestions-and-formula/after-formula-missing-phone-dark.png) |
| Swap list open, desktop dark | (new) | ![](0010-suggestions-and-formula/after-formula-swaplist-desktop-dark.png) |
| Swapped, with its Undo, phone light | (new) | ![](0010-suggestions-and-formula/after-formula-swapped-phone-light.png) |
| Undone, phone light | (new) | ![](0010-suggestions-and-formula/after-formula-undone-phone-light.png) |
| Pan sauce ready (chicken thigh, garlic, lemon), phone dark | (new) | ![](0010-suggestions-and-formula/after-formula-ready-phone-dark.png) |
| What to make at 320px | ![](0010-suggestions-and-formula/before-suggestions-320-light.png) | ![](0010-suggestions-and-formula/after-suggestions-320-light.png) |
| Pan sauce at 200% zoom (640×360) | ![](0010-suggestions-and-formula/before-formula-zoom200-light.png) | ![](0010-suggestions-and-formula/after-formula-zoom200-light.png) |

All 35 shots are in `0010-suggestions-and-formula/`.

## Decisions

The direction in 0002 settled the Ingredient page. These screens follow its language (drawings on their washes, neutral interface colour, soft serif headings), and the author chose each treatment below from options.

**A Suggestion says whether it's ready, in words.** Each card leads with a badge: "Ready", with a tick, or "Needs 1 more", with an open dashed circle like an empty Slot. When it needs more, a line says what and what would fill it: "Also needs an acid (lemon pairs best)." The badge's colour echoes the words but never stands in for them. Ready uses the solid ink fill of a primary button; 0002 keeps colour from signalling state, and this fill is neutral ink rather than a hue, but it is strong, so it waits for the author's approval (see Open).

**Ready means the Combination covers it, while MySous doesn't know the Pantry.** The Kitchen now gives each Suggestion `needs`, the required Slots its Combination and Pantry don't fill (with whatever fills them so far), and `makeable`, true when there are none. A Slot filled by a Pairing suggestion, or by a swap, still counts as needed: the Cook may not have it. There's no way to enter a Pantry yet, so What to make says so, once, above the Suggestions: "MySous doesn't know your Pantry yet, so Ready means your Combination fills every Slot a Formula needs." That sentence is the empty-Pantry state; when the Pantry arrives, it goes, and a Suggestion the Pantry helps fill reads "Ready with your Combination and Pantry."

**Where each Ingredient comes from, at a glance.** A card shows its Ingredients as drawings in labelled groups: "Yours", "Suggested" for what a required Slot still needs, and "Optional" for extras that pair but never block Ready. A required Slot nothing pairs with is a dashed empty circle in the Suggested group. Keeping the optional extras apart means "Needs 1 more" sits beside one suggested drawing, not three. Assistive technology hears each label with its names ("Yours: chicken thigh, garlic.").

**On the Formula page, every Slot says where its Ingredient came from.** A tag under the name says Yours, Suggested or Swapped, and Optional when the Slot is. The same readiness badge and sentence sit under the Formula's description and follow every swap, so "Also needs an acid (lemon pairs best)" becomes "Also needs an acid (you chose lime)". A Slot nothing pairs with shows an empty circle and "Nothing yet", and its alternatives open under "Choose" rather than "Swap".

**Alternatives are chips with their drawings.** Each one is a button named "Use Lime" for assistive technology and voice control, showing the drawing and "Lime".

**Undo sits on the latest swapped Slot.** The old "Undo swap" by the heading looked disabled until there was something to undo, and sat away from the change. Now only the latest swap's Slot offers Undo, named "Undo swap of an acid", and focus moves to it after a swap. Undoing moves focus to the swap before, if there is one, so the Cook can keep undoing, and otherwise to the Slot's heading. Both changes are announced from the page's live region and shown as a toast, like Combination changes ("Lime is now an acid. Undo brings back lemon.", "Undone: Lemon is an acid again.").

**A tension shows both Ingredients.** Each line in "Not everything pairs yet" has the two drawings before the sentence that names them.

**No Combination, one way forward.** What to make without a Combination used to say the same thing twice, in the Combination panel and under it. It now shows four empty circles, "Nothing to suggest yet", a sentence, and "Find an Ingredient". Removing the last Ingredient there moves focus to that heading, since the Combination's heading has gone.

**New components take props only.** EmptyMark (now also the tray bar's empty Slots), Readiness and MarkGroup join the `/design` specimen.

**Tests.** Vitest covers `makeable` and `needs` in the Kitchen: the Combination and the Pantry count, a Pairing suggestion doesn't, and an optional Slot never blocks. Playwright covers each state by its words (ready, needs more, empty Slot, empty Pantry, no Combination, tension), the swap and undo flow by keyboard with focus and announcements, and no sideways scroll on both screens from 320px to 1600px, including 200% zoom.

## After the first review

The author's review of the first build asked for five changes, made as follows:

- **No "Formula" or "Slot" on screen.** The Cook reads "dish" and "part" ("Ready means your Combination fills every part a dish needs"). Code, content and these docs keep the glossary's terms; the glossary now records both. The `/formulas/` address is unchanged for now.
- **Every drawing and every Ingredient name opens its Ingredient.** Where a name link sits beside the drawing, the drawing is a second target for the pointer only (hidden from assistive technology and skipped by Tab), so nothing is read or tabbed to twice. On a Suggestion card nothing else names them, so each drawing is a named link, in a group named "Yours", "Suggested" or "Optional". The tray bar's drawings moved out of its button so they can be links. Drawings get a full-size touch target through padding offset by a negative margin, so the layout doesn't move. Names inside curated prose (Pairing notes, essays) aren't linked.
- **Fewer underlines.** Links that stand alone (titles, names, drawings, Swap) have none and change colour under the pointer: a new `link-hover` green, or the Ingredient's own stroke colour for an Ingredient, which every Ingredient's stroke meets at 4.5:1 or better on every surface (5.83:1 at worst). A link inside a sentence keeps a fine muted underline, so it's never told apart by colour alone. Every drawing the Cook can press (a drawing link, a home tile, a Swap choice) shows a faint hairline ring in its colour.
- **The Yours, Suggested, Swapped and Optional tags** moved to each part's top-right corner and became quieter: sentence case, small, muted, on a recessed fill with no border.
- **Calmer Suggestion cards.** Group labels are plain small muted text instead of bold capitals; the needs sentence and the rank reason share one regular-weight paragraph; the description stays muted.
- **A drawing shown without its name has a tooltip** (on Suggestion cards and in the tray bar): the name, above the drawing, on hover or keyboard focus. It stays while the pointer is over it and Escape dismisses it (WCAG 1.4.13). It's visual only, since the link already carries the name. A new Tooltip component, on the `/design` specimen. Drawings beside their names don't get one.
- **Remove in the tray is a bin icon**, still named "Remove Garlic" for assistive technology and voice control.

## VoiceOver pass

**Status: waiting for the author.** Suggestions → Formula → swap → undo, on an iPhone and a Mac:

1. Open What to make with chicken thigh and garlic. On the Pan sauce card, expect the heading "Pan sauce", then "Needs 1 more", the groups "Yours" (links Chicken thigh, Garlic), "Suggested" (Lemon) and "Optional" (Basil, Fresh chile), and "Also needs an acid (lemon pairs best)."
2. Open Pan sauce. Expect "Needs 1 more" and the same sentence under the description. Each Slot reads its role (a heading), its Ingredient, and its tag ("Suggested").
3. On "an acid", open "Swap an acid" and choose "Use Lime". Expect "Lime is now an acid. Undo brings back lemon." Focus is on "Undo swap of an acid". The readiness sentence now ends "(you chose lime)".
4. Activate Undo. Expect "Undone: Lemon is an acid again." Focus moves to the heading "an acid".
5. With swipe (iOS) and VO+arrows and Tab (macOS), nothing is read twice and no control is unnamed.

Record anything that differs here, with the device and OS version.

## Open

- **Author review gate:** the shots above and the preview deploy. The "after" shots predate the changes under "After the first review"; they're retaken once the author approves the second round.
- **Author approval:** the Ready badge's solid ink fill (see the first decision).
- The VoiceOver pass above. #16 shouldn't close until its notes are recorded here.
