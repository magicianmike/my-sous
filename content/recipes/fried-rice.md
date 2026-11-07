---
# The Showcase Recipe for fried rice: pork, ginger and scallion, after Cantonese home cooking.
# See pan-sauce.md for the fields.
serves: 2
time: { prep: 15, cook: 15 }
image:
  file: fried-rice.png
  alt: A placeholder, the drawings of rice, pork, ginger and scallion in a row.
  provenance:
    made: placeholder
    date: "2026-11-07"
fills:
  rice: rice
  protein: pork
  aromatic: ginger
  sauce: soy-sauce
  garnish: scallion
ingredients:
  - slot: rice
    amount: 3 cups / about 450 g
    for:
      rice: { amount: 3 cups / about 450 g, name: cooked long-grain rice, note: "cooked earlier and chilled; about 1 cup / 200 g raw" }
  - slot: protein
    amount: 6 oz / 170 g
    note: cut into ½-inch / 1 cm dice
    for:
      pork: { amount: 6 oz / 170 g, name: boneless pork shoulder or loin, note: "cut into ½-inch / 1 cm dice" }
  - { name: cornstarch, amount: ½ tsp }
  - { name: neutral oil, amount: 3 tbsp / 45 ml, note: divided }
  - { name: eggs, amount: "2", note: beaten with a pinch of salt }
  - slot: aromatic
    amount: 1 tbsp
    note: finely chopped
    for:
      ginger: { amount: "a 1½-inch / 4 cm piece", note: finely minced }
      garlic: { amount: 2 cloves, note: finely chopped }
  - slot: vegetable
    amount: 1 cup / 150 g
    note: cut small
    for:
      onion: { amount: ½, note: finely diced }
  - slot: sauce
    amount: to taste
    for:
      soy-sauce: { amount: 1 tbsp, name: light soy sauce, note: "1 tsp for the pork, 2 tsp for the rice" }
  - { name: dark soy sauce, amount: 1 tsp, note: "optional, for colour" }
  - { name: white pepper, amount: a pinch }
  - { name: sugar, amount: ¼ tsp }
  - { name: kosher salt, amount: to taste }
  - slot: garnish
    amount: a small handful
    for:
      scallion: { amount: "3", name: scallions, note: thinly sliced }
steps:
  - text: Take the {rice} from the fridge and break up the clumps with damp hands. Use rice that went into the fridge within an hour of cooking and has been there no more than a day.
    safety: { slot: rice, about: handling }
  - text: Toss the {protein} with 1 tsp of the {sauce}, the cornstarch and 1 tsp oil, and leave it while you chop. Wash your hands and the board after handling the raw meat.
    safety: { slot: protein, about: handling }
  - text: Heat a wok or large skillet over high heat until it barely smokes. Add 1 tbsp oil and the eggs, scramble them until barely set, about 30 seconds, and tip them out.
  - text: Add another 1 tbsp oil and the {protein} in one layer. Let it sear for a minute, then stir-fry it until browned and cooked through, 3 to 4 minutes in all, and set it aside on a clean plate.
    safety: { slot: protein, about: cooking }
  - text: Add the last of the oil, then {aromatic} and {vegetable}, and stir-fry for about a minute, until fragrant.
  - text: Add the {rice} and keep it moving, pressing out any clumps, until every grain is steaming hot, about 5 minutes. Sprinkle a few drops of water on stubborn clumps.
    safety: { slot: rice, about: cooking }
  - text: Add the rest of the {sauce}, the dark soy sauce, white pepper and sugar, and toss for a minute, until the colour is even. Taste and add salt.
  - text: Return the {protein} and the egg, toss for 30 seconds, then add {garnish} off the heat. Eat it straight away.
---
