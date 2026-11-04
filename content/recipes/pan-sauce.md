---
# A Showcase Recipe: a Formula worked through in full. The file is named for its Formula.
# `fills` gives each Slot's Ingredient (every required Slot must be filled); an ingredient line names
# a `slot` or, for anything outside the Formula, a `name`. Steps refer to Slots as {slotId}; a step
# marked `safety: true` needs at least one citation.
name: Chicken thighs with a garlic, lemon and basil pan sauce
serves: 2
time: { prep: 10, cook: 30 }
fills:
  protein: chicken-thigh
  aromatic: garlic
  acid: lemon
  herb: basil
ingredients:
  - { amount: "4", slot: protein, note: "boneless and skin-on, about 1¼ lb / 550 g; bone-in thighs take 10 to 15 minutes longer" }
  - { amount: "1 tsp", name: kosher salt }
  - { amount: "1 tbsp", name: neutral oil }
  - { amount: "3 cloves", slot: aromatic, note: thinly sliced }
  - { amount: "½ cup / 120 ml", name: chicken stock or water }
  - { amount: "2 tbsp", name: cold butter }
  - { amount: "1", slot: acid, note: "juiced, about 3 tbsp" }
  - { amount: "a small handful", slot: herb, note: leaves torn }
  - { amount: "a few grinds", name: black pepper }
steps:
  - text: Without rinsing it, pat each {protein} dry with paper towels and season it all over with the salt. Then wash your hands with soap and warm water for 20 seconds, and wash anything the raw chicken touched.
    safety: true
    citations:
      - title: "Keep Food Safe! Food Safety Basics, USDA Food Safety and Inspection Service"
        url: https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe
      - title: "Washing Food: Does it Promote Food Safety? USDA Food Safety and Inspection Service"
        url: https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/washing-food-does-it-promote-food
  - text: Heat the oil in a large skillet over medium-high heat. Lay each {protein} in skin side down and cook it without moving until the skin is deep golden and crisp, 8 to 10 minutes.
  - text: Turn the chicken and cook 5 to 7 minutes more, until an instant-read thermometer in the thickest part reads 165°F / 74°C. Move it to a clean plate, not the one that held it raw, to rest.
    safety: true
    citations:
      - title: Safe Minimum Internal Temperature Chart, USDA Food Safety and Inspection Service
        url: https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart
      - title: Chicken from Farm to Table, USDA Food Safety and Inspection Service
        url: https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/chicken-farm-table
  - text: Pour off all but a spoonful of the fat. Lower the heat to medium, add {aromatic} and stir for about a minute, until it smells sweet and barely colours.
  - text: Pour in the stock and scrape up the browned bits. Let it bubble until it has reduced by about half, 2 to 3 minutes.
  - text: Off the heat, swirl in the butter, then {acid} juice a little at a time, tasting as you go. Season with pepper.
  - text: Spoon the sauce over the chicken and scatter over {herb}.
---
A worked example of a pan sauce: crisp-skinned chicken thighs, then a sauce built in the same pan from garlic, lemon and the browned bits the chicken leaves behind. Swap any part for another that fits and the method holds.
