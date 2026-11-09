---
# A Formula's Recipe: quantities, timings and the full method. The file is named for its Formula.
# `fills` is the recipe as written: an Ingredient for every required Slot, used for any part the
# Cook's basket and its Pairings leave empty. Every Slot needs an ingredient line: `amount` and `note`
# are for whatever fills it, and `for` gives particular Ingredients their own amount, note, and the
# name as it reads after that amount (a plural, such as "limes"). Lines outside
# the Formula give a `name` instead. Steps refer to Slots as {slotId}; a step whose safety depends on
# a Slot's Ingredient names it in `safety`, and shows that Ingredient's cited guidance; a step can also
# carry its own cited `guidance` (a `note` and `citations`), for a staple such as cooked rice.
serves: 2
time: { prep: 10, cook: 30 }
# The dish as written.
image:
  file: pan-sauce.png
  alt: Four golden chicken thighs in a glossy lemon and garlic pan sauce, scattered with basil, in a steel skillet.
  provenance:
    made: ai-generated
    model: GPT-6 (OpenAI)
    prompt: "A natural, editorial food photograph of four boneless, skin-on chicken thighs, the skin deep golden and crisp, in a glossy pale-gold lemon, garlic and butter pan sauce with thin slices of garlic, scattered with torn basil leaves and a few grinds of black pepper, two portions, in a plain steel skillet, seen from overhead, on a matte worn wood surface, soft daylight from the left, shallow depth of field, muted natural colours, true to life, slightly imperfect, home-cooked. No people, no hands, no text, no packaging, no brand names. 3:2 landscape, subject centred with space around it, the top corners left clear."
    date: "2026-11-09"
    review:
      date: "2026-11-09"
      matches: true
fills:
  protein: chicken-thigh
  aromatic: garlic
  acid: lemon
  herb: basil
ingredients:
  - slot: protein
    amount: about 1¼ lb / 550 g
    for:
      chicken-thigh: { amount: "4", name: chicken thighs, note: "boneless and skin-on, about 1¼ lb / 550 g; bone-in thighs take 10 to 15 minutes longer" }
  - { name: kosher salt, amount: 1 tsp }
  - { name: neutral oil, amount: 1 tbsp }
  - slot: aromatic
    amount: 1 tbsp
    note: finely chopped
    for:
      garlic: { amount: 3 cloves, note: thinly sliced }
      ginger: { amount: a thumb-sized piece, note: peeled and cut into fine matchsticks }
      scallion: { amount: "3", name: scallions, note: white parts thinly sliced }
  - { name: chicken stock or water, amount: ½ cup / 120 ml }
  - { name: butter, amount: 2 tbsp, note: cold }
  - slot: acid
    amount: 3 tbsp
    note: juice
    for:
      lemon: { amount: "1", note: "juiced, about 3 tbsp" }
      lime: { amount: "2", name: limes, note: "juiced, about 3 tbsp" }
  - slot: herb
    amount: a small handful
    for:
      basil: { amount: a small handful, note: leaves torn }
      cilantro: { amount: a small handful, note: "leaves and tender stems, roughly chopped" }
  - slot: heat
    amount: to taste
    for:
      chile: { amount: ½ to 1, note: thinly sliced }
  - { name: black pepper, amount: a few grinds }
steps:
  - text: Pat each piece of {protein} dry with paper towels and season it all over with the salt. Throw the paper towels away.
    safety: { slot: protein, about: handling }
  - text: Heat the oil in a large skillet over medium-high heat. Lay in the {protein}, skin side down if it has skin, and cook it without moving until deep golden underneath, 8 to 10 minutes.
  - text: Turn it and cook 5 to 7 minutes more (10 to 15 minutes longer if it's on the bone), until cooked through. Move it to a clean plate to rest.
    safety: { slot: protein, about: cooking }
  - text: Pour off all but a spoonful of the fat. Lower the heat to medium, add {aromatic} and stir for about a minute, until fragrant.
  - text: Pour in the stock and scrape up the browned bits. Let it bubble until it has reduced by about half, 2 to 3 minutes.
  - text: Off the heat, swirl in the butter, then {acid} juice a little at a time, tasting as you go. Season with pepper.
  - text: Spoon the sauce over the {protein} and scatter over {herb} and {heat}.
---
