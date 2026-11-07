---
# The Showcase Recipe for a grain bowl: lamb, eggplant, yogurt and mint over bulgur, drawing on the
# layers of Palestinian eggplant fatteh. "Grain bowl" names the Formula, not a traditional dish.
# See pan-sauce.md for the fields.
serves: 2
time: { prep: 15, cook: 35 }
image:
  file: grain-bowl.png
  alt: A placeholder, the drawings of bulgur, lamb, eggplant, yogurt and mint in a row.
  provenance:
    made: placeholder
    date: "2026-11-07"
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
      bulgur: { amount: ¾ cup / 130 g, name: coarse bulgur, note: "#2 or #3; cook it in 1⅛ cups / 270 ml water or stock" }
      rice: { amount: ¾ cup / 150 g, name: long-grain rice, note: "rinsed, and cooked as its packet directs" }
  - { name: olive oil, amount: 4 tbsp / 60 ml, note: divided }
  - { name: kosher salt, amount: 1½ tsp, note: divided }
  - slot: vegetable
    amount: about 1 lb / 450 g
    for:
      eggplant: { amount: 1 large, name: eggplant, note: "about 1 lb / 450 g, cut into 1-inch / 2.5 cm cubes" }
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
    amount: a pinch
    for:
      zaatar: { amount: a pinch, name: za'atar }
steps:
  - text: Heat the oven to 425°F / 220°C. Toss the {vegetable} with 3 tbsp oil and ½ tsp salt, spread it on a sheet pan, and roast until deep golden and soft, 25 to 30 minutes, stirring once halfway.
  - text: Meanwhile, warm 1 tsp oil in a saucepan, stir in the {grain} for a minute, then add its water and ½ tsp salt. Bring it to a boil, cover, and cook over low heat until the liquid is absorbed, about 15 minutes for bulgur, then leave it covered off the heat for 10 minutes.
  - text: Heat the rest of the oil in a skillet over medium heat and cook the onion until golden, 6 to 8 minutes. Add the {protein}, allspice, cinnamon and ½ tsp salt, and cook, breaking it up, until browned with no pink left, 6 to 8 minutes.
    safety: { slot: protein, about: cooking }
  - text: Stir the garlic, lemon juice and chopped {herb} into the {sauce}, with a spoonful of water if it's very thick, and taste for salt.
  - text: Fluff the {grain} with a fork and divide it between two bowls. Top with the {vegetable} and {protein}, spoon over the {sauce}, and finish with the torn {herb} and {garnish}.
---
