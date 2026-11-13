---
serves: 4
time: { prep: 15, cook: 120 }
# A placeholder until the reviewed image arrives.
image:
  file: one-pot-braise.png
  alt: A placeholder, the drawings of lamb, onion, tomato and parsley in a row.
  provenance:
    made: placeholder
    date: "2026-11-12"
fills:
  protein: lamb
  aromatic: [onion, garlic, cumin]
  vegetable: tomato
  acid: lemon
  herb: parsley
ingredients:
  - slot: protein
    amount: about 1½ lb / 680 g
    note: cut into large pieces
    for:
      lamb: { amount: about 1½ lb / 680 g, name: boneless lamb shoulder, note: "cut into 1½-inch / 4 cm pieces" }
      beef: { amount: about 1½ lb / 680 g, name: boneless beef chuck, note: "cut into 1½-inch / 4 cm pieces" }
      chicken-thigh: { amount: "6", name: bone-in chicken thighs, note: skin removed }
  - { name: kosher salt, amount: 1½ tsp, note: divided }
  - { name: olive oil, amount: 2 tbsp / 30 ml }
  - slot: aromatic
    amount: 1 tbsp
    note: finely chopped
    for:
      onion: { amount: "1", name: large onion, note: thinly sliced }
      garlic: { amount: 4 cloves, note: thinly sliced }
      cumin: { amount: 1½ tsp, name: ground cumin }
  - slot: vegetable
    amount: about 14 oz / 400 g
    note: cut into pieces
    for:
      tomato: { amount: 14 oz / 400 g, name: tomatoes, note: "chopped, or a 14 oz / 400 g can of chopped tomatoes" }
  - { name: water or stock, amount: 1 cup / 240 ml }
  - slot: acid
    amount: to taste
    for:
      lemon: { amount: ½, note: juiced }
  - slot: herb
    amount: a small handful
    for:
      parsley: { amount: a small handful, note: "leaves, chopped" }
      cilantro: { amount: a small handful, note: "leaves and tender stems, chopped" }
  - slot: heat
    amount: to taste
    for:
      aleppo-pepper: { amount: 1 tsp, name: Aleppo pepper }
steps:
  - text: Pat the {protein} dry with paper towels and season it all over with 1 tsp salt. Throw the paper towels away and wash your hands.
    safety: { slot: protein, about: handling }
  - text: Heat the oil in a heavy, lidded pot over medium-high heat. Brown the {protein} well on all sides, in two batches so the pot isn't crowded, 8 to 10 minutes in all, and set it aside on a clean plate.
  - text: Lower the heat to medium, add ½ tsp salt and the {aromatic}, and cook, stirring, until soft and golden, 8 to 10 minutes.
  - text: Return the {protein} and its juices with the {vegetable}, {heat} and the water, scraping up the browned bits. Bring it to a simmer, cover, and cook over low heat until the {protein} is very tender, 1½ to 2 hours for lamb or beef, or 35 to 40 minutes for chicken.
    safety: { slot: protein, about: cooking }
  - text: If the sauce is thin, simmer it uncovered for a few minutes. Taste for salt, stir in the {acid}, and scatter with the {herb}.
---
