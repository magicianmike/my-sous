---
# The Recipe for a frittata: zucchini and mint. Frittata di zucchine is common across Italy;
# the mint is a nod to Neapolitan zucchine alla scapece. See pan-sauce.md for the fields.
serves: 2
time: { prep: 10, cook: 25 }
image:
  file: frittata.png
  alt: A placeholder, the drawings of eggs, zucchini, garlic and mint in a row.
  provenance:
    made: placeholder
    date: "2026-11-06"
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
      zucchini: { amount: 2 medium, name: zucchini, note: "about 12 oz / 340 g, sliced into ¼-inch / 6 mm rounds" }
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
  - slot: garnish
    amount: to taste
steps:
  - text: Heat 2 tbsp oil in a 10-inch / 25 cm nonstick or well-seasoned skillet over medium heat with {aromatic}. When the garlic is golden, take it out, add the {vegetable} and ¼ tsp salt, and cook, turning now and then, until golden and tender, 8 to 10 minutes. Tip it onto a plate to cool for 5 minutes.
  - text: Beat {eggs} with the remaining ½ tsp salt, the cheese, pepper and most of the {herb} until no streaks of white are left, without whipping in a lot of air. Stir in the {vegetable}.
  - text: Wipe the pan, add the last 1 tbsp oil and set it over low heat. Pour in the eggs, cover, and cook without stirring until the edges have set and only the very centre is loose, 8 to 10 minutes.
  - text: Run a spatula round the edge, put a plate over the pan and turn the frittata out onto it, then slide it back in, browned side up. Cook uncovered until the centre is firm with no liquid egg, 3 to 4 minutes more.
    safety: { slot: eggs, about: cooking }
  - text: Slide it onto a board and rest it 5 minutes. Scatter over the rest of the {herb} and {garnish}, and cut it into wedges. It's good warm or at room temperature; refrigerate what's left within 2 hours.
    safety: { slot: eggs, about: handling }
---
