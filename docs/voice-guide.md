# Voice guide

How MySous sounds, so every batch of content reads as one voice. The image style guide (`docs/image-style-guide.md`) does the same for pictures. The build checks the rules it can; the rest is for whoever writes and reviews the content.

## Who's speaking

A calm, well-travelled sous chef standing next to the Cook. They've cooked in many kitchens, they explain why rather than issue orders, and they never make the Cook feel slow. They're specific about what they know and honest about what varies.

- **Concrete over clever.** Say what happens in the pan: "garlic that goes past golden can turn bitter", not "garlic is temperamental".
- **The why, in plain words.** Every Pairing Reason says why two things work together, so the Cook learns the principle, not a list.
- **Short.** One idea per sentence. No exclamation marks, no puns, no "delicious".
- **Second person, present tense.** "Add the lemon off the heat." The Cook is "you" in tips and steps; essays describe the Ingredient.

## Banned words

MySous never says **easy**, **easily**, **simply**, **just** or **authentic**. The build rejects them, as whole words in any case, anywhere the Cook reads content: essays, tips, Pairing Reasons, Formulas, Recipes, Cuisine descriptions, alt text.

"Easy" and its friends make a Cook who finds something hard feel foolish. Say what makes it work instead: "it holds for a few minutes off the heat", not "it's easy". "Authentic" claims one right version of a tradition that's cooked many ways; say where something is common instead (below).

## Hedging

Regional and preference-based claims are hedged, because kitchens differ:

- **Usually, often, many cooks, some find.** "Many cooks pound the two in a mortar, and some find it gives a sweeter result."
- **Common in…, never from or the.** "Common in Levantine cooking", not "the Levantine way" or "a Levantine classic".
- **Facts aren't hedged.** Chemistry, technique and food safety are stated plainly: "heat dulls cilantro's aroma", "cook pork to 145°F / 63°C".
- **Name the disagreement.** Where cooks argue (garlic in a dish, or which chile), say that it varies rather than picking a side.

## Cuisines

Cuisines are named regionally (Sichuan, Levantine, Oaxacan), never at continental level ("Asian", "Middle Eastern"); the build rejects continental names. Describe a tradition by what's common in it, from sources inside it where possible, and don't explain it by comparison to another ("Mexican pesto").

## Writing an Ingredient

- **Essay:** two or three sentences. What it is, what it does in a dish, and the one thing that changes how you cook it.
- **Tip:** one practical sentence, in the imperative. "Zest before you juice; the zest carries much of the aroma."
- **Cultural context:** one or two sentences on where it's common and how it's used there, hedged, and sourced.
- **Safety:** only official guidance, from food-safety agencies (USDA FSIS, FDA, CDC, Health Canada, the UK FSA) or a university extension service, stated plainly, with temperatures in °F and °C, and cited. Where agencies differ, give the stricter advice or both.

## Writing a Pairing

- **Note:** one plain sentence saying why the two work together, shown on every Pairing row. It names the mechanism: acid against fat, a shared aroma, a contrast of textures, or a tradition that puts them together.
- **Detail:** one to three sentences for the Cook who opens it: when to add each, what goes wrong, how much.
- **Category:** *contrast* (one balances the other: sharp against rich, fresh against deep), *aromatic bridge* (they share or complete an aroma), *texture* (one gives the other crunch, creaminess or body), *tradition* (cooks in a Cuisine usually put them together).
- **Sources:** every Pairing cites at least one source with a link, and the build rejects one that doesn't. Cite sources that own the claim: cooks and writers from the tradition, culinary schools and institutions, academic and official sources. Never *The Flavour Thesaurus*, *The Flavor Bible* or compound-based pairing data (ADR 0001).

## Mechanics

- British spelling (flavour, colour, savoury), with the ingredient names most US home cooks use (cilantro, scallion, eggplant, zucchini, chile).
- Amounts and temperatures in both systems, US first: "½ cup / 120 ml", "425°F / 220°C".
- Sentence case for headings and names: "Chicken thigh", "Sichuan pepper".
