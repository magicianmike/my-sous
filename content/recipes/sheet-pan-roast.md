---
# The Recipe for a sheet-pan roast: chicken thigh and cauliflower with cumin and lemon,
# built from flavours common in Punjabi cooking. See pan-sauce.md for the fields.
serves: 2
time: { prep: 15, cook: 30 }
image:
  file: sheet-pan-roast.png
  alt: Spiced chicken thighs and golden cauliflower on a sheet pan, scattered with cilantro, with lemon wedges.
  provenance:
    made: ai-generated
    model: GPT-6 (OpenAI)
    prompt: "A natural, editorial food photograph of a plain matte sheet pan seen from overhead: four boneless, skinless chicken thighs with a browned orange-red yogurt and spice crust, turmeric-golden cauliflower florets browned at the edges and dotted with cumin seeds, scattered with chopped cilantro, with two lemon wedges on the pan, on a matte worn wood surface, soft daylight from the left, shallow depth of field, muted natural colours, true to life, slightly imperfect, home-cooked. No people, no hands, no text, no packaging, no brand names. 3:2 landscape, subject centred with space around it, the top corners left clear. Match the light, surface, colour and style of the two attached reference images, but don't copy their subjects."
    date: "2026-11-12"
    review:
      date: "2026-11-12"
      matches: true
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
  - { name: Kashmiri or mild chile powder, amount: ½ tsp }
  - { name: garam masala, amount: ½ tsp }
  - { name: kosher salt, amount: 1½ tsp, note: divided }
  - { name: neutral oil, amount: 3 tbsp / 45 ml, note: divided }
  - slot: vegetable
    amount: about 1¼ lb / 550 g
    for:
      cauliflower: { amount: 1 small head, note: "about 1¼ lb / 550 g, cut into 1½-inch / 4 cm florets" }
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
  - text: Mix the yogurt, ginger and garlic, chile powder, garam masala, ground cumin, 1 tsp salt, 1 tbsp oil and the juice of half the lemon. Coat the {protein} in it, cover, and refrigerate for at least 6 hours and up to a day. Wash your hands and anything the raw chicken touched.
    safety: { slot: protein, about: handling }
  - text: Heat the oven to 425°F / 220°C. Take the {protein} out of the fridge while it heats, about 15 minutes.
  - text: Toss the {vegetable} with the remaining 2 tbsp oil, ½ tsp salt, the turmeric and the cumin seeds, and spread it over a large sheet pan in a single layer, leaving room for the chicken.
  - text: Lift the {protein} out of the marinade, letting the excess drip off, and lay it on the pan. Throw the leftover marinade away.
    safety: { slot: protein, about: handling }
  - text: Roast for 25 to 30 minutes, turning the {vegetable} once, until it's browned at the edges and the {protein} is cooked through. For more colour, broil for 2 to 3 minutes at the end.
    safety: { slot: protein, about: cooking }
  - text: Squeeze over the remaining {acid}, scatter over {herb} and the red onion, and serve with the wedges.
---
