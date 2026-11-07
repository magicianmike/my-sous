# Research for issue #19: four Formulas, five Showcase Recipes, and their food safety

Fried rice, frittata, grain bowl and quick pickle join pan sauce and sheet-pan roast. There's one Showcase Recipe for each Formula that doesn't have one yet: sheet-pan roast, fried rice, frittata, grain bowl and quick pickle.

## 1. Method

- I read `docs/voice-guide.md`, `content/formulas.yaml`, `content/recipes/pan-sauce.md`, `content/cuisines.yaml`, the Ingredient files (their `slotTypes` and `cuisines`), the `0017`/`0018` research notes and `docs/journal/0019-research-batch-2.md`. I also checked `src/kitchen/schema.ts` and `index.ts` for how Slot types and coverage are enforced.
- I fetched and read every URL cited here during this research, and each one supports the claim it's attached to. Quotes are verbatim, as the fetch tool returned them. Italian quotes keep the original, with my translation. "(paraphrase)" marks text that isn't verbatim.
- I didn't use *The Flavour Thesaurus*, *The Flavor Bible* or any compound-pairing data (ADR 0001). Searches turned up Wikipedia, recipe aggregators and SEO "food science" sites, and I cite none of them.
- The Recipes are my own drafts. Technique, ratios, times and temperatures come from the cited sources, but no source's recipe is copied: amounts, order and wording are re-derived for two servings and MySous's Slots.
- **Bot blocks I didn't try to get around:** USDA FSIS (403), GialloZafferano (402), Donna Moderna, Cucchiaio d'Argento, NapoliToday and Maureen Abood (403). The pages for the FSA's rice advice on food.gov.uk and the NHS leftovers page returned 404. The FSA's current rice advice is on gov.uk, and that's what I cite.
- **Safety rule, from the voice guide:** where agencies differ, give the stricter advice or both. That changes two numbers the ticket suggested:
  - **Egg dishes:** FDA says 160°F; Health Canada says 165°F / 74°C.
  - **Pork:** FDA says 145°F plus a 3-minute rest for whole cuts; Health Canada says 160°F / 71°C for pork pieces and whole cuts.

  The safety notes below give both, and make the stricter figure the target.

### Two structural findings the author needs to decide on

1. **New Slot types bring coverage obligations.** The real-content test holds every launch Cuisine to three Ingredients for each Slot type any Formula accepts, or a sourced `slotExceptions` entry (journal 0019; `src/kitchen/index.ts`). Adding `garnish` and `sauce` means six launch Cuisines each need three garnish and three sauce Ingredients, or exceptions.
   - **Garnish today:** gremolata, za'atar and scallion.
   - **Sauce today:** nothing. Yogurt has no `slotTypes` yet.

   That's #18-style work outside this note's scope, but it blocks the build. Grain bowl needs a `sauce` Slot. Fried rice's `sauce` Slot could be dropped to keep its burden lighter, but grain bowl creates the obligation regardless.
2. **Safety notes are per Ingredient today.** A step's `safety: { slot, about }` shows *that Ingredient's* cited guidance. The rice and egg notes below fit that if the new `rice` and `eggs` Ingredients carry a `safety` block, with keys such as `storage` and `cooking`. The quick-pickle note isn't about any one Ingredient: it's about the brine and the jar. So it needs either a step-level `note` with its own citations, a schema change, or a note attached to the `acid` Slot's vinegar. I've written each note as plain text with citations, so it fits whichever shape is chosen.

### Ingredients these drafts need that don't exist yet

- **`rice`, `eggs`, `bulgur`, `farro`:** for the staple Slots the author chose.
- **`yogurt`:** needs `slotTypes: [sauce]`.
- **Optional, `soy-sauce`:** with `slotTypes: [sauce]`. It would fill fried rice's sauce Slot, and would count toward sauce coverage for Cantonese, Sichuan and Japanese, but it needs its own Pairing research.
- **Pine nuts:** appear below only as a named line, not an Ingredient.

## 2. Formulas

The YAML is written to drop into `content/formulas.yaml`. `required` defaults to true. Method steps state food-safety facts plainly, as the existing Formulas do.

### 2.1 Fried rice

```yaml
- id: fried-rice
  name: Fried rice
  description: Cold cooked rice stir-fried hot with a little meat, egg and aromatics, so every grain is separate and seasoned.
  slots:
    - id: rice
      role: cooked rice, chilled
      ingredients: [rice]
    - id: protein
      role: something to stir-fry
      accepts: protein
    - id: aromatic
      role: an aromatic
      accepts: aromatic
    - id: vegetable
      role: a vegetable
      accepts: vegetable
      required: false
    - id: sauce
      role: a seasoning sauce
      accepts: sauce
      required: false
    - id: garnish
      role: something fresh to finish
      accepts: garnish
      required: false
  method:
    - Use {rice} cooked earlier, chilled within an hour and kept in the fridge no more than a day. Break up the clumps with damp hands.
    - Cut {protein} small and stir-fry it in a very hot wok or skillet until cooked through (poultry to 165°F / 74°C; pork to 160°F / 71°C), then set it aside.
    - Scramble an egg or two until barely set, and set them aside.
    - Stir-fry {aromatic} and {vegetable} for a minute or two, then add {rice} and keep it moving until every grain is steaming hot, about 5 minutes.
    - Season with {sauce} and salt, return {protein} and the egg, and toss for 30 seconds.
    - Finish with {garnish} off the heat, and eat it straight away.
```

- **Why the vegetable is optional:** Made With Lau's ginger fried rice is rice, chicken, egg, ginger and green onion, with no other vegetable [MWL-GFR]. Woks of Life's formula has onion and an optional 3–4 cups of vegetables [WOL-FR].
- **Fillers from current content:**
  - protein: pork, chicken thigh, chicken breast, beef, lamb, salmon;
  - aromatic: ginger, garlic, scallion, onion;
  - vegetable: onion, green beans, zucchini, tomato;
  - garnish: scallion;
  - sauce: none yet (see §1).
- **Technique sources:**
  - **Cold, leftover rice.** Bill Leung (Woks of Life) takes leftover rice from the fridge and has you "gently break up any clumps with damp hands" [WOL-FR]. He warns that cold rice takes "about 5 minutes" to warm in the wok, and that warming is "very important or the sauce will not mix as well" [WOL-CFR].
  - **Name the disagreement.** Made With Lau (Daddy Lau, a Cantonese chef) prefers freshly cooked rice, because "the grains are fragrant, more tender and already hot." Day-old rice is less clumpy and firmer but less aromatic. He says to "Always microwave it before cooking and break apart any clumps" [MWL-EFR]. The ticket asks for cooked, cooled rice, which is also the version MySous can make safe with a time limit. The Formula could add a line saying some cooks fry fresh rice cooked a little dry.
  - **Order of cooking.** Woks of Life scrambles the eggs "until barely set" and takes them out, sears raw protein and sets it aside, stir-fries aromatics and harder vegetables for 2–3 minutes, adds the rice for about 3 minutes, sauces it until steam rises, then returns the protein and eggs for about 30 seconds and adds the scallions last [WOL-FR].
  - **Ginger.** Made With Lau cooks minced ginger for about 60 seconds before the rice goes in [MWL-GFR].

### 2.2 Frittata

```yaml
- id: frittata
  name: Frittata
  description: Eggs cooked slowly around a cooked vegetable until set, then turned so both sides colour.
  slots:
    - id: eggs
      role: eggs
      ingredients: [eggs]
    - id: vegetable
      role: a vegetable, cooked first
      accepts: vegetable
    - id: aromatic
      role: an aromatic
      accepts: aromatic
      required: false
    - id: herb
      role: a soft herb
      accepts: soft herb
      required: false
    - id: garnish
      role: something to finish
      accepts: garnish
      required: false
  method:
    - Cook {vegetable} with {aromatic} in olive oil over medium heat until tender and lightly golden, then let it cool a little.
    - Beat {eggs} with salt, grated hard cheese and {herb}, without whisking in a lot of air, then stir in {vegetable}.
    - Pour it into an oiled skillet over low heat, cover, and cook until the edges and most of the middle have set.
    - Turn it with a plate or lid and cook the other side until no liquid egg is left in the centre (160°F / 71°C, or 165°F / 74°C to meet Health Canada).
    - Rest it a few minutes, then finish with {garnish}. Serve warm or at room temperature, and refrigerate leftovers within 2 hours.
```

- **Fillers from current content:**
  - vegetable: zucchini, potato, onion, tomato, green beans, cauliflower, eggplant;
  - aromatic: garlic, onion, scallion;
  - herb: mint, basil, parsley, cilantro;
  - garnish: gremolata, za'atar, scallion.
- **Technique sources:**
  - **Zucchini cooked first.** Don Salvatore (cook and monk at San Martino delle Scale, Monreale, on *Ricette del Convento*) fries the zucchini rounds "in abbondante olio caldo, fino a doratura" (in plenty of hot oil, until golden). He beats 8 eggs with salt, adds pecorino and plenty of parsley and basil, then "Lasciare rapprendere e girare la frittata a metà cottura, facendola dorare sui due lati" (let it set and turn it halfway through, browning both sides). Cooking takes 15 minutes [DS].
  - **Covered, low heat, then turned.** Stefano Barbato sautés zucchini rounds with a halved garlic clove "per 3-4 minuti" and beats the eggs "senza montarlo eccessivamente" (without whipping too much air in). He adds cheese and herbs (basil, parsley or mint), cooks the frittata covered on low heat, turns it "aiutandovi con un piatto o il coperchio" (with a plate or the lid), and cooks it "per altri 2-3 minuti" (2–3 minutes more) [SB].
  - **Cool the vegetable before adding the egg.** This is my own reasoning, not a source's: hot oil or vegetables can set the egg in patches.

### 2.3 Grain bowl

```yaml
- id: grain-bowl
  name: Grain bowl
  description: A bowl of warm grain with something savoury, a roasted vegetable, a cool sauce and fresh herbs, each made separately.
  slots:
    - id: grain
      role: a grain
      ingredients: [rice, bulgur, farro]
    - id: protein
      role: something savoury on top
      accepts: protein
    - id: vegetable
      role: a vegetable to roast
      accepts: vegetable
    - id: sauce
      role: a sauce to spoon over
      accepts: sauce
    - id: herb
      role: a soft herb
      accepts: soft herb
      required: false
    - id: garnish
      role: something to scatter
      accepts: garnish
      required: false
  method:
    - Cook {grain} until tender and keep it warm, covered.
    - Roast {vegetable} in a hot oven, 425°F / 220°C, until browned at the edges.
    - Cook {protein} until done (poultry to 165°F / 74°C; ground meat to 160°F / 71°C; pork to 160°F / 71°C; lamb and beef steaks and chops, and fish, to 145°F / 63°C).
    - Season {sauce} and loosen it if it's thick.
    - Spoon {grain} into bowls, top with {vegetable} and {protein}, spoon over {sauce}, and finish with {herb} and {garnish}.
```

- **Fillers from current content:**
  - protein: lamb, chicken thigh, chicken breast, beef, pork, salmon, cod;
  - vegetable: eggplant, cauliflower, zucchini, tomato, green beans, potato;
  - sauce: yogurt, once it has the `sauce` type;
  - herb: mint, parsley, cilantro, basil, shiso;
  - garnish: za'atar, gremolata, scallion.
- **Technique sources:**
  - **"Grain bowl" isn't a traditional dish name, so MySous shouldn't claim one.** Its Levantine Showcase draws on dishes that do layer these parts. Wafa Shami's eggplant fatteh tops cubed eggplant, "brush[ed] with oil with a sprinkle of sea salt" and broiled 20–30 minutes, with ground lamb ("I like to use lamb, but beef can work too"). The lamb is browned with caramelised onion, allspice, nutmeg and cinnamon, and the dish gets a yogurt sauce of 1½ cups yogurt, 2–3 crushed garlic cloves, ½ lemon and 1½ tbsp tahini [WS-FAT].
  - **Bulgur.** Simply Lebanese uses coarse bulgur, #2 or #3: "For every 1 cup of bulgur, I use 1 1/2 cups of water". It "cooks in about 15 minutes over medium-low heat", and you leave the lid on for 10 minutes more. It's served with "plain yogurt" or grilled meats [SL].
  - **The ratio is unsettled.** Maureen Abood is said to use 2:1 for pilaf, but her page returned 403, so I didn't verify that.
  - **Farro.** I found no source from the tradition for cooking it (see §6).

### 2.4 Quick pickle

```yaml
- id: quick-pickle
  name: Quick pickle
  description: Sliced vegetables in a hot, seasoned vinegar brine, kept in the fridge and ready within a day.
  slots:
    - id: vegetable
      role: a vegetable to pickle
      accepts: vegetable
    - id: acid
      role: a vinegar of at least 5% acidity
      ingredients: [cider-vinegar, white-wine-vinegar]
    - id: aromatic
      role: an aromatic
      accepts: aromatic
      required: false
    - id: heat
      role: some heat
      accepts: heat
      required: false
  method:
    - Slice {vegetable} thinly and pack it into a clean jar with {aromatic} and {heat}.
    - Bring {acid}, a little water (never more water than vinegar), salt and a little sugar to a simmer, stirring until they dissolve.
    - Pour the hot brine over, so it covers everything, and let it cool.
    - Lid the jar and refrigerate it. It's ready in a few hours and better after a day; keep it in the fridge and eat it within 2 weeks.
```

- **Why the acid Slot lists its Ingredients rather than accepting `acid`:**
  - Pickle safety depends on vinegar of known strength. NCHFP: "White distilled and cider vinegars of 5 percent acidity (50 grain) are recommended", and "Do not alter vinegar, food, or water proportions in a recipe or use a vinegar with unknown acidity" [NCHFP]. Penn State says the same [PSU].
  - Lemon, lime, tamarind, sumac, ponzu and pomegranate molasses aren't tested brine acids.
  - Rice vinegar and black vinegar are often below 5%, but I didn't verify their strength (see §6), so they're left out.
  - White wine vinegar is in on the understanding that the label shows at least 5%.
- **Fillers from current content:**
  - vegetable: onion, zucchini, green beans, cauliflower;
  - aromatic: garlic, ginger, cumin;
  - heat: dried chile, chile, black pepper, Aleppo pepper.
- **Technique sources:**
  - **Brine ratio.** Oregon State's refrigerator pickled vegetables use 1 cup vinegar to 1 cup water [OSU-VEG], and its cucumbers ⅔ cup vinegar to ⅓ cup water [OSU-CUC]. UMaine uses "1 cup vinegar 5% acidity (apple cider or white)" with 1 cup water, 1 tbsp pickling salt and 2 tsp sugar [UME].
  - **Hard vegetables.** UMaine and Oregon State blanch hard vegetables first: carrots, green beans and cauliflower for 2–3 minutes [UME], and some vegetables for 1–2 minutes [OSU-VEG]. The Formula could add a step for green beans and cauliflower.
  - **Storage.** Covered in §4.4.

### 2.5 Small notes on the existing Formulas

- **Pan sauce and sheet-pan roast give pork 145°F / 63°C.** The stricter Health Canada figure is 160°F / 71°C for pork [HC]. The existing pork Ingredient says "158°F / 70°C held for 2 minutes in the centre meets both" US and UK. Worth aligning the two Formula method texts with that.
- **Optional `garnish` Slot on sheet-pan roast.** I left it out to keep the coverage burden light; the author's call.

## 3. Recipes

Each Recipe is written in the shape of `pan-sauce.md`. The `image` block is left out, since images come under #32. The `safety:` entries follow today's per-Ingredient shape, and §4 gives the note text each one needs.

### 3.1 Sheet-pan roast: chicken thigh, cauliflower, cumin and lemon (Punjabi-leaning)

```yaml
serves: 2
time: { prep: 15, cook: 30 }   # plus at least 1 hour marinating in the fridge
fills:
  protein: chicken-thigh
  vegetable: cauliflower
  aromatic: cumin
  acid: lemon
  herb: cilantro
ingredients:
  - slot: protein
    amount: about 1¼ lb / 550 g
    for:
      chicken-thigh: { amount: "4", name: chicken thighs, note: "boneless and skinless, about 1¼ lb / 550 g; bone-in thighs take 10 to 15 minutes longer" }
  - { name: plain whole-milk yogurt, amount: 3 tbsp / 45 g }
  - { name: ginger and garlic, amount: 1 tsp each, note: finely grated }
  - { name: Kashmiri or mild chilli powder, amount: ½ tsp }
  - { name: garam masala, amount: ½ tsp }
  - { name: kosher salt, amount: 1½ tsp, note: divided }
  - { name: neutral oil, amount: 3 tbsp / 45 ml, note: divided }
  - slot: vegetable
    amount: about 1¼ lb / 550 g
    for:
      cauliflower: { amount: "1 small head", note: "about 1¼ lb / 550 g, cut into 1½-inch / 4 cm florets" }
  - slot: aromatic
    amount: 2 tsp
    for:
      cumin: { amount: 2 tsp, note: "1 tsp ground for the marinade, 1 tsp whole seeds for the cauliflower" }
  - { name: ground turmeric, amount: ½ tsp }
  - slot: acid
    amount: 3 tbsp
    note: juice
    for:
      lemon: { amount: "1", note: "half juiced for the marinade, half cut into wedges" }
      lime: { amount: "1", note: "half juiced for the marinade, half cut into wedges" }
  - slot: herb
    amount: a small handful
    for:
      cilantro: { amount: a small handful, note: "leaves and tender stems, chopped" }
      mint: { amount: a small handful, note: leaves torn }
  - { name: red onion, amount: ¼, note: "thinly sliced, to serve (optional)" }
steps:
  - text: Mix the yogurt, ginger and garlic, chilli powder, garam masala, ground cumin, 1 tsp salt, 1 tbsp oil and the juice of half the lemon. Coat the {protein} in it, cover, and refrigerate for at least 1 hour and up to 24 hours. Wash your hands and anything the raw chicken touched.
    safety: { slot: protein, about: handling }
  - text: Heat the oven to 425°F / 220°C. Take the {protein} out of the fridge while it heats, about 15 minutes.
  - text: Toss the {vegetable} with the remaining 2 tbsp oil, ½ tsp salt, the turmeric and the cumin seeds. Spread it over a large sheet pan in a single layer, leaving room for the chicken.
  - text: Lift the {protein} out of the marinade, letting the excess drip off, and lay it on the pan. Throw the leftover marinade away.
    safety: { slot: protein, about: handling }
  - text: Roast for 25 to 30 minutes, turning the {vegetable} once, until it's browned at the edges and the {protein} is cooked through. If you'd like more colour, broil for 2 to 3 minutes at the end.
    safety: { slot: protein, about: cooking }
  - text: Squeeze over the remaining {acid}, scatter over {herb} and the red onion, and serve with the wedges.
```

- **Technique sources:**
  - **Marinade.** Izzah Cheema's tandoori chicken uses Greek yogurt, 2 tbsp lemon juice, 2 tsp cumin powder, chilli powder and garam masala, and marinates "Cover and refrigerate for at least 6 hours, up to 48 hours". She bakes at 375°F / 190°C for 30 minutes to 165°F, broils for char, and serves with cilantro, lemon or lime wedges and sliced red onion. Boneless pieces bake for about 20 minutes [TFT-TC].
  - **Marinating time is my own call.** My shorter 1 hour follows Anupy Singla's tandoori chicken (search summary only), so treat it as unverified. Cheema's 6 hours would be the sourced alternative.
  - **Cumin with cauliflower.**
    - Maunika Gowardhan's Punjabi aloo gobi fries "the hing and cumin seeds. Fry for a minute" before the florets, and finishes with "coriander, lemon juice, kasoori methi and ginger slivers" [MG-AG].
    - Singla's aloo gobi starts with "2 teaspoons cumin seeds" sizzled until they darken [SG].
  - **Roasting cauliflower.** Gowardhan roasts turmeric-oiled florets at 200°C for 15 minutes [MG-GM]. At 425°F / 220°C on a shared tray, 25–30 minutes is the existing Formula's range.
- **Hedge for the Cook-facing text:** "Punjabi-leaning" is right. This is a sheet-pan dish built from flavours common in Punjabi cooking (cumin with cauliflower, a lemony spiced marinade), not a named Punjabi dish.

### 3.2 Fried rice: pork, ginger and scallion (Cantonese)

```yaml
serves: 2
time: { prep: 15, cook: 15 }   # plus the rice, cooked and chilled ahead
fills:
  rice: rice
  protein: pork
  aromatic: ginger
  garnish: scallion
ingredients:
  - slot: rice
    amount: 3 cups / about 450 g
    for:
      rice: { amount: 3 cups / about 450 g, name: cooked long-grain rice, note: "cooked earlier and chilled; about 1 cup / 200 g raw" }
  - slot: protein
    amount: 6 oz / 170 g
    for:
      pork: { amount: 6 oz / 170 g, name: boneless pork shoulder or loin, note: "cut into ½-inch / 1 cm dice" }
  - { name: light soy sauce, amount: 1 tbsp, note: "1 tsp for the pork, 2 tsp for the rice" }
  - { name: cornstarch, amount: ½ tsp }
  - { name: neutral oil, amount: 3 tbsp / 45 ml, note: divided }
  - { name: eggs, amount: "2", note: beaten with a pinch of salt }
  - slot: aromatic
    amount: 1 tbsp
    note: finely chopped
    for:
      ginger: { amount: "a 1½-inch / 4 cm piece, about 1 oz / 30 g", note: finely minced }
      garlic: { amount: 2 cloves, note: finely chopped }
  - slot: vegetable
    amount: 1 cup / 150 g
    note: cut small
    for:
      onion: { amount: ½, note: finely diced }
  - slot: sauce
    amount: to taste
  - { name: dark soy sauce, amount: 1 tsp, note: optional, for colour }
  - { name: white pepper, amount: a pinch }
  - { name: sugar, amount: ¼ tsp }
  - { name: kosher salt, amount: to taste }
  - slot: garnish
    amount: a small handful
    for:
      scallion: { amount: "3", name: scallions, note: thinly sliced }
steps:
  - text: Take the {rice} from the fridge and break up the clumps with damp hands. Use rice that went into the fridge within an hour of cooking and has been there no more than a day.
    safety: { slot: rice, about: storage }
  - text: Toss the {protein} with 1 tsp light soy sauce, the cornstarch and 1 tsp oil, and leave it while you chop. Wash your hands and the board after handling the raw pork.
    safety: { slot: protein, about: handling }
  - text: Heat a wok or large skillet over high heat until it barely smokes. Add 1 tbsp oil and the eggs, scramble them until barely set, about 30 seconds, and tip them out.
  - text: Add another 1 tbsp oil and the {protein} in one layer. Let it sear for a minute, then stir-fry it until browned and cooked through, 3 to 4 minutes in all, and set it aside on a clean plate.
    safety: { slot: protein, about: cooking }
  - text: Add the last of the oil, then {aromatic} and {vegetable}, and stir-fry for about a minute, until the ginger smells sharp and sweet.
  - text: Add the {rice} and keep it moving, pressing out any clumps, until every grain is steaming hot, about 5 minutes. Sprinkle a few drops of water on stubborn clumps.
    safety: { slot: rice, about: reheating }
  - text: Add 2 tsp light soy sauce, {sauce}, the dark soy sauce, white pepper and sugar, and toss for a minute, until the colour is even. Taste and add salt.
  - text: Return the {protein} and the egg, toss for 30 seconds, then add {garnish} off the heat. Eat it straight away.
    safety: { slot: rice, about: reheating }
```

- **Technique sources:**
  - **Rice amount and cooking.** Woks of Life: 4½–5 cups cooked rice for four, or rice cooked with about 10% less water and spread on a sheet pan to cool [WOL-FR]. My 3 cups for two scales that down.
  - **Velveting and searing.** Woks of Life velvets the protein with cornstarch, oil, oyster sauce and water, and sears it in one layer on a very hot wok [WOL-FR]. Its chicken fried rice marinates the meat in light soy, cornstarch and oil [WOL-CFR].
  - **Sauce.** Woks of Life uses light and dark soy sauce, white pepper, sugar and salt [WOL-FR][WOL-CFR].
  - **Order and timings.** These follow Woks of Life [WOL-FR][WOL-CFR] (see §2.1).
  - **Name the disagreement on doneness.** Woks of Life sears raw meat "until it is 90% cooked" and finishes it in the rice [WOL-FR]. MySous's draft cooks the pork through before it leaves the pan, so the safety step stands on its own and doesn't depend on the final toss.
  - **Ginger.** Made With Lau's ginger fried rice uses 2 oz ginger, skin on, cut into "small bits", for 2 cups raw rice, and cooks it about 60 seconds [MWL-GFR].
  - **Ginger and scallion as Cantonese.** Woks of Life calls bai qie ji, with its sauce of minced scallion, ginger, oil and salt, one of the "best-loved chicken dishes in Chinese cuisine––Cantonese cuisine more specifically" [WOL-BQJ].
- **Hedge:** "Common in Cantonese home cooking" is fair for ginger and scallion. Made With Lau's ginger fried rice page calls the dish Chinese, not Cantonese, though the site is a Cantonese family's [MWL-GFR].
- **Name worth considering:** "Ginger fried rice with pork". It's a faithful description, and it doesn't claim a named dish.

### 3.3 Frittata: zucchini and mint (frittata di zucchine, Southern Italian)

```yaml
serves: 2
time: { prep: 10, cook: 25 }
fills:
  eggs: eggs
  vegetable: zucchini
  aromatic: garlic
  herb: mint
ingredients:
  - slot: eggs
    amount: "6"
    for:
      eggs: { amount: "6", name: large eggs }
  - slot: vegetable
    amount: about 12 oz / 340 g
    for:
      zucchini: { amount: "2 medium", name: zucchini, note: "about 12 oz / 340 g, sliced into ¼-inch / 6 mm rounds" }
  - { name: extra-virgin olive oil, amount: 3 tbsp / 45 ml, note: divided }
  - slot: aromatic
    amount: to taste
    for:
      garlic: { amount: 1 clove, note: halved }
      onion: { amount: ½ small, note: thinly sliced }
  - { name: kosher salt, amount: ¾ tsp, note: divided }
  - { name: pecorino or Parmigiano, amount: ⅓ cup / 30 g, note: finely grated }
  - slot: herb
    amount: a small handful
    for:
      mint: { amount: a small handful, note: "leaves torn, a few kept back to finish" }
      basil: { amount: a small handful, note: leaves torn }
      parsley: { amount: a small handful, note: chopped }
  - { name: black pepper, amount: a few grinds }
steps:
  - text: Heat 2 tbsp oil in a 10-inch / 25 cm nonstick or well-seasoned skillet over medium heat with {aromatic}. When the garlic is golden, take it out, add the {vegetable} and ¼ tsp salt, and cook, turning now and then, until golden and tender, 8 to 10 minutes. Tip it onto a plate to cool for 5 minutes.
  - text: Beat {eggs} with the remaining ½ tsp salt, the cheese, pepper and most of the {herb}, until no streaks of white are left; don't whip in a lot of air. Stir in the {vegetable}.
  - text: Wipe the pan, add the last 1 tbsp oil and set it over low heat. Pour in the eggs, cover, and cook without stirring until the edges have set and only the very centre is loose, 8 to 10 minutes.
  - text: Run a spatula round the edge, put a plate over the pan and turn the frittata out onto it, then slide it back in, browned side up. Cook uncovered until the centre is firm with no liquid egg, 3 to 4 minutes more.
    safety: { slot: eggs, about: cooking }
  - text: Slide it onto a board and rest it 5 minutes. Scatter over the rest of the {herb} and cut it into wedges. It's good warm or at room temperature; refrigerate what's left within 2 hours.
    safety: { slot: eggs, about: storage }
```

- **Technique sources:**
  - **Cooking the zucchini.** Don Salvatore fries the zucchini until golden. His mix is 8 eggs, pecorino, parsley and basil, and onion softened in oil. He lets it set, turns it halfway, browns both sides, and cooks for 15 minutes in all [DS].
  - **Garlic, covered low heat, turning.** Barbato sautés zucchini with a halved garlic clove for 3–4 minutes, beats the eggs without much air, cooks covered on low heat, turns the frittata with a plate or lid, and cooks it 2–3 minutes more. Mint is one of his herb options [SB].
  - **Timings are mine.** I lengthened the covered time for 6 eggs in a 10-inch pan, so it's thicker than Barbato's four-egg version. This needs the kitchen test.
- **Zucchini with mint in Southern Italy:** in Neapolitan zucchine alla scapece, fried zucchini rounds are finished with "foglie di menta" (mint leaves) [LCG]. `cuisines.yaml` already cites this. It's a good basis for "zucchini and mint are often paired in Neapolitan cooking, as in scapece". I found no fetchable source that calls frittata di zucchine e menta specifically Neapolitan or Southern Italian. Many Italian home versions use mint, but the ones I could read were blogs. So the Cook-facing text should say the frittata is common across Italy, and that the mint is a nod to Neapolitan scapece, not a regional claim.
- **Why I used garlic, not onion, as the fill:** both sources fit [SB][DS]; garlic is Barbato's and is lighter with mint.

### 3.4 Grain bowl: lamb, eggplant, yogurt and mint over bulgur (Levantine)

```yaml
serves: 2
time: { prep: 15, cook: 35 }
fills:
  grain: bulgur
  protein: lamb
  vegetable: eggplant
  sauce: yogurt
  herb: mint
ingredients:
  - slot: grain
    amount: ¾ cup raw
    for:
      bulgur: { amount: ¾ cup / 130 g, name: coarse bulgur, note: "#2 or #3" }
      rice: { amount: ¾ cup / 150 g, name: long-grain rice, note: rinsed }
      farro: { amount: ¾ cup / 140 g, name: farro }
  - { name: water or chicken stock, amount: 1⅛ cups / 270 ml, note: for bulgur }
  - { name: olive oil, amount: 4 tbsp / 60 ml, note: divided }
  - { name: kosher salt, amount: 1½ tsp, note: divided }
  - slot: vegetable
    amount: about 1 lb / 450 g
    for:
      eggplant: { amount: "1 large", name: eggplant, note: "about 1 lb / 450 g, cut into 1-inch / 2.5 cm cubes" }
  - slot: protein
    amount: 8 oz / 225 g
    for:
      lamb: { amount: 8 oz / 225 g, name: ground lamb }
  - { name: onion, amount: ½ small, note: finely chopped }
  - { name: ground allspice and cinnamon, amount: ½ tsp and ¼ tsp }
  - slot: sauce
    amount: ¾ cup / 180 g
    for:
      yogurt: { amount: ¾ cup / 180 g, name: plain whole-milk yogurt }
  - { name: garlic, amount: 1 small clove, note: crushed with a pinch of salt }
  - { name: lemon juice, amount: 2 tsp }
  - slot: herb
    amount: a large handful
    for:
      mint: { amount: a large handful, note: "leaves, half chopped for the yogurt, half torn to finish" }
      parsley: { amount: a large handful, note: chopped }
  - slot: garnish
    amount: 2 tbsp
    note: "toasted pine nuts or almonds, or a pinch of za'atar"
steps:
  - text: Heat the oven to 425°F / 220°C. Toss the {vegetable} with 3 tbsp oil and ½ tsp salt, spread it on a sheet pan, and roast until deep golden and soft, 25 to 30 minutes, stirring once halfway.
  - text: Meanwhile, warm 1 tsp oil in a saucepan, stir in the {grain} for a minute, then add the water and ½ tsp salt. Bring it to a boil, cover, and cook over low heat until the liquid is absorbed, about 15 minutes. Leave it covered off the heat for 10 minutes.
  - text: Heat the rest of the oil in a skillet over medium heat and cook the onion until golden, 6 to 8 minutes. Add the {protein}, allspice, cinnamon and ½ tsp salt, and cook, breaking it up, until browned with no pink left, 6 to 8 minutes. Wash your hands after handling the raw lamb.
    safety: { slot: protein, about: cooking }
  - text: Stir the garlic, lemon juice and chopped {herb} into the {sauce}, with a spoonful of water if it's very thick. Taste for salt.
  - text: Fluff the {grain} with a fork and divide it between two bowls. Top with the {vegetable} and {protein}, spoon over the {sauce}, and finish with the torn {herb} and {garnish}.
```

- **Technique sources:**
  - **The parts of the bowl.** Shami's eggplant fatteh gives the eggplant (oiled, salted, broiled 20–30 minutes), the ground lamb with caramelised onion, allspice, nutmeg and cinnamon, browned "until fully cooked", and the garlic-lemon yogurt sauce [WS-FAT].
  - **The yogurt and mint sauce.** Shami's cucumber mint yogurt salad uses "1 cup plain yogurt", "1 clove crushed garlic" and "1-2 tablespoons finely chopped fresh mint leaves". She thins very thick yogurt with "2 tablespoons of water", and serves it beside rice dishes such as maqlubeh and musakhan [WS-CYS].
  - **Bulgur.** 1 : 1½ water, about 15 minutes over medium-low heat, then 10 minutes with the lid on [SL]. My ¾ cup takes 1⅛ cups.
  - **Rice and farro amounts.** These are placeholders. Each grain needs its own water and time, so the `for` entries need a per-grain note, or the method should say to cook the grain as its package directs. I didn't verify either (§6).
  - **Roasting the eggplant.** Roasting at 425°F replaces Shami's broiling, because it shares the oven timing. She notes that "the traditional method is deep-frying" (paraphrase) [WS-FAT].
- **Hedges:**
  - Lamb with eggplant and yogurt is common in Palestinian fatteh [WS-FAT].
  - Shami offers beef or a mix, so the Cook-facing text could say "many cooks use beef".
  - Tahini goes into Shami's sauce; I left it out to keep the yogurt and mint clear, and it could be an optional named line.

### 3.5 Quick pickle: onion in cider vinegar with dried chile (Oaxacan, after the pickled onion of piedrazo)

```yaml
serves: 6   # about 2 cups / 500 ml, as a condiment
time: { prep: 10, cook: 5 }   # plus at least 1 hour in the fridge
fills:
  vegetable: onion
  acid: cider-vinegar
  aromatic: garlic
  heat: dried-chile
ingredients:
  - slot: vegetable
    amount: about 8 oz / 225 g
    for:
      onion: { amount: "1 medium", name: white or red onion, note: "about 8 oz / 225 g, sliced ¼ inch / 6 mm thick" }
  - slot: acid
    amount: 1 cup / 240 ml
    note: "at least 5% acidity; check the label"
    for:
      cider-vinegar: { amount: 1 cup / 240 ml, name: apple cider vinegar, note: "at least 5% acidity; check the label" }
  - { name: water, amount: ½ cup / 120 ml }
  - { name: piloncillo or brown sugar, amount: 1 tbsp }
  - { name: kosher salt, amount: 1 tsp }
  - slot: aromatic
    amount: to taste
    for:
      garlic: { amount: 2 cloves, note: halved }
  - { name: bay leaf, amount: "1" }
  - { name: dried thyme or oregano, amount: ¼ tsp }
  - slot: heat
    amount: to taste
    for:
      dried-chile: { amount: 1 to 2, note: "pasilla oaxaqueño, or another dried chile, torn into strips, seeds shaken out" }
steps:
  - text: Wash a 1-pint / 500 ml jar and its lid in hot soapy water and rinse them. Pack the {vegetable} into it with {heat}.
  - text: In a small saucepan, bring {acid}, the water, sugar, salt, {aromatic}, bay leaf and thyme to a simmer, stirring until the sugar and salt dissolve, about 3 minutes.
  - text: Pour the hot brine over the {vegetable}, pressing it down so it's covered. Leave it uncovered until it's no longer steaming, about 20 minutes.
  - text: Lid the jar and refrigerate it. It's ready in an hour and better after a day. Keep it in the fridge, take it out with a clean fork, and eat it within 2 weeks.
    safety: { note: quick-pickle }   # needs a step-level note; see §1
```

- **Technique sources:**
  - **Rick Bayless's piedrazo.** He simmers 1 cup cider vinegar and ¾ cup water with piloncillo or brown sugar, salt, bay, thyme and halved garlic, cooks the carrot briefly, stirs in the onion sliced ¼ inch, then takes it off the heat and lets it cool covered. White onion is typical in Oaxaca; red gives more colour [RB-PIE].
  - **The chile.** "Some vendors add a sliced large pasilla oaxaqueño to the vinegar mixture" (paraphrase of the page's note) [RB-PIE]. Bayless doesn't say whether the chile goes in dried or rehydrated, so pasilla oaxaqueño as a dried chile should be checked.
  - **Why the ratio changes.** My 2 : 1 vinegar to water is more acidic than Bayless's 4 : 3. It matches Oregon State's refrigerator cucumbers, ⅔ to ⅓ [OSU-CUC], and is stronger than the 1 : 1 that Oregon State and UMaine use for vegetables [OSU-VEG][UME]. It stays within tested proportions while keeping Bayless's seasoning.
  - **Pouring rather than simmering.** I pour the brine over raw onion instead of simmering the onion. That keeps the onion crisper, and it's the common refrigerator-pickle method [UME][OSU-VEG].
- **Hedges:**
  - Say "after the pickled onion of piedrazo, a street snack in Oaxaca", not "the Oaxacan pickled onion".
  - Bayless describes piedrazo as sold by vendors in Oaxaca, with hard bread soaking up vinegar, chile and salt [RB-PIE]. `cider-vinegar.md` already makes this claim.

## 4. Safety

Each note is one or two plain sentences, in the voice guide's register, with °F and °C. Where agencies differ, the stricter figure comes first, or both are given.

### 4.1 Cooked rice (fried rice, steps 1, 6 and 8; grain bowl if made ahead)

- **Proposed home:** a `safety` block on the new `rice` Ingredient, with two notes.
- **`storage`, for step 1:** "Cooked rice can carry spores that survive cooking and make a toxin if it cools slowly, and reheating won't destroy it. Cool rice you're keeping as fast as you can, spread out or in shallow containers, refrigerate it within an hour, and use it within a day."
  - [FSA-HFFC]:
    - "If you have leftover rice you should chill it as quickly as possible, ideally within one hour."
    - "Put the rice in the fridge and consume within 24 hours."
    - "Keep rice in the fridge for no more than one day until reheating."
  - [FSS]: "do not keep rice for longer than 24 hours and only reheat it once."
  - [WA] (Government of Western Australia, Department of Health):
    - "Uncooked rice often contains the bacteria Bacillus cereus." Spores can survive cooking and, if rice cools slowly, make a toxin (paraphrase).
    - "reheating cooked rice before eating does not kill the spores."
    - Divide rice into "smaller, clean shallow containers less than 10 cm deep".
  - [FDA-SFH] (the US outer limit, which the UK's 1 hour is stricter than):
    - "Refrigerate or freeze meat, poultry, eggs, seafood, and other perishables within 2 hours of cooking or purchasing."
    - "Divide large amounts of leftovers into shallow containers for quicker cooling in the refrigerator."
- **`reheating`, for steps 6 and 8:** "Fry the rice until it's steaming hot all the way through, 165°F / 74°C, and eat it straight away. Reheat rice only once, so don't keep fried rice to warm up again."
  - [FSA-HFFC]:
    - "You should never reheat rice more than once."
    - "always check the dish is steaming hot all the way through."
  - [FSS]: "make sure it's steaming hot all the way through".
  - [FDA-SFH]: "Leftovers and Casseroles" "165oF".
  - [HC]: leftovers "74°C (165°F)".
- **Takeaway rice.** FSS adds that if you're unsure how takeaway rice was cooked and stored, "it's best not to reheat it" [FSS]. That might fit an Ingredient tip on rice.

### 4.2 Eggs (frittata, steps 4 and 5; fried rice eggs)

- **Proposed home:** a `safety` block on the new `eggs` Ingredient.
- **`cooking`, for frittata step 4:** "Cook a frittata until the centre is firm with no liquid egg, 160°F / 71°C in the middle; Health Canada advises 165°F / 74°C for egg dishes."
  - [FDA-EGG]:
    - "Casseroles and other dishes containing eggs should be cooked to 160° F."
    - "Cook eggs until both the yolk and the white are firm."
  - [FDA-SFH]: "Egg dishes" "160oF".
  - [HC]: "Egg dishes" "74°C (165°F)".
  - **Stricter option:** if the author prefers to lead with the stricter figure, write "165°F / 74°C in the middle (the FDA gives 160°F / 71°C)".
- **`storage`, for frittata step 5:** "Don't leave a cooked egg dish out for more than 2 hours, or 1 hour above 90°F / 32°C; refrigerate leftovers at 40°F / 4°C or below."
  - [FDA-EGG]:
    - "Never leave cooked eggs or egg dishes out of the refrigerator for more than 2 hours", with 1 hour above 90°F.
    - "Store promptly in a clean refrigerator at a temperature of 40° F or below."
- **Fried rice eggs.** The eggs in fried rice are scrambled "barely set", then heated again in the rice. I didn't flag that step, since the whole dish reaches steaming hot in step 8. The author could add the `eggs` cooking note there too.
- **A UK note, if wanted:** FSS says people in good health "are unlikely to experience food poisoning through consuming UK hen eggs". Vulnerable people should eat non-Lion eggs thoroughly cooked [FSS]. That doesn't change a frittata, which is cooked through.

### 4.3 Poultry and pork

These Ingredients already carry `handling` and `cooking` notes with citations (`chicken-thigh.md`, `pork.md`, `lamb.md`). The Recipes point to them.

- **Sheet-pan roast, steps 1 and 4 (`chicken-thigh` `handling`).**
  - The existing note covers washing hands and not rinsing the chicken.
  - **Recipe-specific addition:** "Marinate chicken in the fridge, not on the counter, and throw the used marinade away." Two sources support it:
    - Cheema marinates covered in the fridge [TFT-TC].
    - `lamb.md` cites Texas A&M AgriLife on marinades: "don't reuse a marinade that held raw meat unless you boil it first". I didn't re-fetch that page in this session, so check it before reusing it for chicken.
- **Sheet-pan roast, step 5 (`chicken-thigh` `cooking`).** "Cook chicken until an instant-read thermometer in the thickest part reads 165°F / 74°C." This is the existing note.
  - [FDA-MOMS]: "Cook all poultry to minimal safe internal temperature of 165° F (74° C)."
  - [FDA-SFH]: poultry "165oF".
  - [HC]: chicken pieces "74°C (165°F)".
  - **Agencies differ slightly.** Food Standards Scotland gives 75°C [FSS], and the FSA says the middle should reach "70°C for 2 minutes" or an equivalent combination [FSA-COOK]. 165°F / 74°C, measured with a thermometer, is what MySous already uses; the author may want to note FSS's 75°C.
- **Fried rice, steps 2 and 4 (`pork` `handling` and `cooking`).**
  - The existing `pork.md` note gives 145°F / 63°C with a 3-minute rest for whole cuts, and 160°F / 71°C ground, and says that 158°F / 70°C for 2 minutes meets the UK too.
  - **For small diced pork,** the step note should read: "Cook diced pork until no pink is left in the largest piece, 160°F / 71°C."
    - [HC]: pork "pieces and whole cuts" "71°C (160°F)".
    - [FSA-COOK]: "Poultry … and pork can have bacteria all the way through the meat", so cook them right through.
    - [FSS]: pork should have "no pink meat".
  - **Recommendation:** update `pork.md`'s cooking note to lead with Health Canada's 160°F / 71°C, which is the stricter figure, under the voice guide's rule.
- **Grain bowl, step 3 (`lamb` `cooking`).** "Cook ground lamb until an instant-read thermometer reads 160°F / 71°C." This is the existing note.
  - [FDA-MOMS]: "Cook ground beef, veal, lamb, and pork to at least 160° F (71° C)."
  - [HC]: ground lamb "71°C (160°F)".

### 4.4 Quick refrigerator pickles (quick pickle, step 4)

- **Proposed step-level note:** "A quick pickle isn't heat-processed, so it isn't shelf-stable: keep it in the fridge at 40°F / 4°C or below and eat it within 2 weeks. Use vinegar of at least 5% acidity and never more water than vinegar, because the acid is what keeps it safe."
  - **The 2-week limit, which is stricter.** [UME]: "Use within 2 weeks."
  - **The wider range.** [OSU-VEG]: "Store jars only in the refrigerator", "within 3 months". [OSU-CUC]: "Store pickles in the refrigerator", "Use within 3 months".
  - **The acid.**
    - [NCHFP]: "There must be a minimum, uniform level of acid throughout the mixed product to prevent the growth of botulinum bacteria."
    - [NCHFP]: "White distilled and cider vinegars of 5 percent acidity (50 grain) are recommended."
    - [NCHFP]: "Do not alter vinegar, food, or water proportions in a recipe or use a vinegar with unknown acidity."
    - [PSU]: "The level of acidity in a pickled product is as important to its safety as it is to taste and texture."
  - **Why it isn't shelf-stable.** [PSU]: canned pickles are shelf-stable only processed and "as long as lids remain vacuum sealed"; an unsealed jar must be reprocessed "or store[d] in the refrigerator".
  - **Fridge temperature.** [FDA-SFH]: "consistently 40° F or below".
- **Unverified Listeria concern (not cited):** an Ask Extension answer says "USDA has some reservations about making refrigerator pickles" because Listeria grows at fridge temperatures, and advises against serving them to pregnant women, older adults and people with weakened immune systems. The answerer is listed only as "Washington County Oregon". I couldn't find the USDA statement it refers to, so I don't cite it.

## 5. Citation key

[DS] Ricette del Convento: frittata di zucchine napoletane (Don Salvatore, San Martino delle Scale), La Cucina in TV. https://lacucinaintv.it/ricette-del-convento-frittata-di-zucchine-napoletane/
[FDA-EGG] What You Need to Know About Egg Safety, U.S. Food and Drug Administration. https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety
[FDA-MOMS] Meat, Poultry & Seafood (Food Safety for Moms-to-Be), U.S. Food and Drug Administration. https://www.fda.gov/food/people-risk-foodborne-illness/meat-poultry-seafood-food-safety-moms-be
[FDA-SFH] Safe Food Handling, U.S. Food and Drug Administration. https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling
[FSA-COOK] Cooking your food, Food Standards Agency. https://www.gov.uk/government/publications/cooking-your-food/cooking-your-food
[FSA-HFFC] Home food fact checker, Food Standards Agency. https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker
[FSS] Cooking food safely, Food Standards Scotland. https://www.foodstandards.gov.scot/consumer-advice/food-safety/food-safety-in-the-kitchen/cooking
[HC] Safe internal cooking temperatures, Health Canada. https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html
[LCG] Zucchine alla scapece, La cuoca galante. https://lacuocagalante.com/recipe-items/zucchine-alla-scapece/
[MG-AG] Punjabi Aloo Gobi, Maunika Gowardhan. https://maunikagowardhan.co.uk/cook-in-a-curry/punjabi-aloo-gobi/
[MG-GM] Gobi Matar ki Sabzi, Maunika Gowardhan. https://maunikagowardhan.co.uk/cook-in-a-curry/gobi-matar-ki-sabzi/
[MWL-EFR] Egg Fried Rice, Made With Lau. https://www.madewithlau.com/recipes/egg-fried-rice
[MWL-GFR] Ginger Fried Rice, Made With Lau. https://www.madewithlau.com/recipes/ginger-fried-rice
[NCHFP] General Information on Pickling, National Center for Home Food Preservation, University of Georgia. https://nchfp.uga.edu/how/pickle/general-information-pickling/general-information-on-pickling/
[OSU-CUC] Refrigerator Pickled Cucumbers, Oregon State University Extension Service. https://extension.oregonstate.edu/imported-publication/refrigerator-pickled-cucumbers
[OSU-VEG] Refrigerator Pickled Vegetables, Oregon State University Extension Service. https://extension.oregonstate.edu/imported-publication/refrigerator-pickled-vegetables
[PSU] Let's Preserve: Quick Process Pickles, Penn State Extension. https://extension.psu.edu/lets-preserve-quick-process-pickles
[RB-PIE] Oaxacan Piedrazo Bar Snack or Salad, Rick Bayless. https://www.rickbayless.com/recipe/oaxacan-piedrazo-bar-snack-or-salad/
[SB] Frittata di Zucchine, Stefano Barbato. https://www.chefstefanobarbato.com/ita/ricette/frittata-di-zucchine-la-ricetta-originale-italiana/
[SG] Stovetop: Punjabi Aloo Gobi, Anupy Singla, Indian As Apple Pie. https://www.indianasapplepie.com/blogs/indian-as-apple-pie/aloo-gobi
[SL] Tomato Bulgur Pilaf, Iman, Simply Lebanese. https://www.simplyleb.com/recipe/bulgur/
[TFT-TC] Tandoori Chicken, Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/tandoori-chicken/
[UME] Refrigerator Pickles, University of Maine Cooperative Extension. https://extension.umaine.edu/food-health/recipes/refrigerator-pickles/
[WA] Safe cooling of cooked rice, HealthyWA, Government of Western Australia Department of Health. https://www.healthywa.wa.gov.au/Articles/S_T/Safe-cooling-of-cooked-rice
[WOL-BQJ] Cantonese Poached Chicken with Ginger Scallion Oil (Bai Qie Ji), Bill Leung, The Woks of Life. https://thewoksoflife.com/cantonese-poached-chicken-w-ginger-scallion-oil-bai-qie-ji/
[WOL-CFR] Chicken Fried Rice, Bill Leung, The Woks of Life. https://thewoksoflife.com/classic-chicken-fried-rice/
[WOL-FR] How to Make Fried Rice: An Easy Formula, Bill Leung, The Woks of Life. https://thewoksoflife.com/how-to-make-fried-rice-formula/
[WS-CYS] Cucumber Mint Yogurt Salad, Wafa Shami, Palestine in a Dish. https://palestineinadish.com/recipes/cucumber-yogurt-salad-%D8%B3%D9%84%D8%B7%D8%A9-%D8%AE%D9%8A%D8%A7%D8%B1-%D8%A8%D8%A7%D9%84%D9%84%D8%A8%D9%86/
[WS-FAT] Eggplant Fatteh, Wafa Shami, Palestine in a Dish. https://palestineinadish.com/recipes/eggplant-fateh-fatet-batenjan-%D9%81%D8%AA%D8%A9-%D8%A8%D8%A7%D8%B0%D9%86%D8%AC%D8%A7%D9%86/

**Banned words in source names.** [WOL-FR]'s title contains "Easy", and [SL]'s site name, Simply Lebanese, contains "Simply". If citation titles are shown to the Cook and the build checks them, cite it as "How to Make Fried Rice (formula), Bill Leung, The Woks of Life", or lean on [WOL-CFR].

## 6. What I couldn't verify

- **USDA FSIS:** 403 again, so it isn't cited. FDA, Health Canada, the FSA, FSS and HealthyWA cover every claim.
- **Food.gov.uk's own rice page:** 404. The FSA's rice advice is cited from its gov.uk "Home food fact checker", which is current.
- **CDC:** I found no CDC rice page (404 at the URL I tried). A search for FDA material on *Bacillus cereus* was refused by the search tool. The spore and toxin explanation rests on HealthyWA, an official state health department, plus the FSA's time limits.
- **The Wisconsin Extension pickle bulletin:** B2267, on refrigerator pickles kept up to 1 month at 40°F. The PDF is scanned and I couldn't extract its text, so it isn't cited.
- **The Ask Extension Listeria remark:** see §4.4.
- **Southern Italian frittata di zucchine with mint:** no fetchable Neapolitan or Southern Italian source names this dish with mint.
  - GialloZafferano, Cucchiaio, Donna Moderna and NapoliToday blocked me.
  - Don Salvatore's version uses basil and parsley [DS], and Barbato lists mint as one option [SB].
  - [DS] is a transcription of a TV recipe on an Italian TV-recipe site, not the broadcaster's own page.
  - Barbato's page doesn't say where he's from.
  - The zucchini-and-mint link rests on Neapolitan scapece [LCG].
- **Farro and rice in the grain bowl:** I didn't source water ratios or times for either. The amounts are placeholders.
- **Maureen Abood's bulgur pilaf:** 403; her 2 : 1 ratio comes from a search summary only, and isn't cited.
- **Pasilla oaxaqueño:** Bayless mentions vendors adding a sliced pasilla oaxaqueño, but not whether it's dried, toasted or soaked.
- **Rice vinegar and black vinegar acidity:** unverified, so they're left out of the quick-pickle acid Slot.
- **Marinating time for the sheet-pan chicken:** Cheema's minimum is 6 hours. My 1 hour rests on an Indian As Apple Pie stovetop tandoori recipe I saw only in a search summary. Either use 6 hours, or verify that page.
- **Kitchen testing:** every timing in §3 is a draft from sources, scaled to two servings. The author's kitchen test (#19's review gate) has to confirm them, especially:
  - the frittata's covered time;
  - the sheet-pan's 25–30 minutes for boneless thighs;
  - how the 2 : 1 brine tastes on the onion.
