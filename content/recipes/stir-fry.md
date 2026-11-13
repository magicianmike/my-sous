---
serves: 2
time: { prep: 15, cook: 15 }
# A placeholder until the reviewed image arrives.
image:
  file: stir-fry.png
  alt: A placeholder, the drawings of pork, green beans, garlic and soy sauce in a row.
  provenance:
    made: placeholder
    date: "2026-11-12"
fills:
  protein: pork
  vegetable: green-beans
  aromatic: garlic
  sauce: soy-sauce
  heat: dried-chile
  garnish: scallion
ingredients:
  - slot: protein
    amount: 8 oz / 225 g
    note: cut into thin strips
    for:
      pork: { amount: 8 oz / 225 g, name: boneless pork loin or shoulder, note: cut into thin strips }
  - { name: cornstarch, amount: 1 tsp }
  - { name: neutral oil, amount: 3 tbsp / 45 ml, note: divided }
  - slot: vegetable
    amount: about 12 oz / 340 g
    note: cut into bite-sized pieces
    for:
      green-beans: { amount: 12 oz / 340 g, name: green beans, note: "trimmed and cut into 2-inch / 5 cm lengths" }
  - slot: aromatic
    amount: 1 tbsp
    note: finely chopped
    for:
      garlic: { amount: 4 cloves, note: thinly sliced }
      ginger: { amount: a thumb-sized piece, note: peeled and finely chopped }
  - slot: sauce
    amount: 2 tbsp
    for:
      soy-sauce: { amount: 2 tbsp, name: light soy sauce, note: "1 tsp for the meat, the rest for the pan" }
  - { name: sugar, amount: ½ tsp }
  - slot: heat
    amount: to taste
    for:
      dried-chile: { amount: 4 to 6, name: dried chiles, note: "snipped into pieces, seeds shaken out" }
      sichuan-pepper: { amount: ½ tsp, name: Sichuan pepper, note: toasted and ground }
  - slot: garnish
    amount: a small handful
    for:
      scallion: { amount: "2", name: scallions, note: thinly sliced }
  - { name: steamed rice, amount: to serve }
steps:
  - text: Toss the {protein} with 1 tsp of the {sauce}, the cornstarch and 1 tsp oil, and leave it while you prepare the rest. Wash your hands and the board after handling the raw meat.
    safety: { slot: protein, about: handling }
  - text: Heat a wok or large skillet over high heat until it barely smokes. Add 1 tbsp oil and the {vegetable}, and stir-fry until blistered in places and tender at the edges, 5 to 6 minutes. Move the {vegetable} to a plate.
  - text: Add another 1 tbsp oil and the {protein} in one layer. Let it sear for a minute, then stir-fry it until browned and cooked through, 3 to 4 minutes in all, and set it aside on a clean plate.
    safety: { slot: protein, about: cooking }
  - text: Add the last of the oil, then the {aromatic} and {heat}, and stir for about 30 seconds, until fragrant. Don't let the chiles blacken, or they turn bitter.
  - text: Return the {vegetable} and {protein}, add the rest of the {sauce}, the sugar and 2 tbsp water, and toss until the sauce glazes everything, about a minute.
  - text: Scatter over the {garnish} and serve it straight away, over steamed rice.
---
