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
# The dish as written. A placeholder until the reviewed image arrives with the content (#19).
image:
  file: pan-sauce.png
  alt: A placeholder, the drawings of chicken thigh, garlic, lemon and basil in a row.
  provenance:
    made: placeholder
    date: "2026-11-05"
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
