---
serves: 2
time: { prep: 10, cook: 20 }
# A placeholder until the reviewed image arrives.
image:
  file: seared-plate.png
  alt: A placeholder, the drawings of beef, pasilla salsa, onion and lime in a row.
  provenance:
    made: placeholder
    date: "2026-11-12"
fills:
  protein: beef
  sauce: pasilla-salsa
  vegetable: onion
  acid: lime
  herb: cilantro
ingredients:
  - slot: protein
    amount: about 1 lb / 450 g
    for:
      beef: { amount: about 1 lb / 450 g, name: skirt or flank steak }
  - { name: kosher salt, amount: 1 tsp }
  - { name: neutral oil, amount: 2 tbsp / 30 ml, note: divided }
  - slot: sauce
    amount: ½ cup / 120 ml
    note: at room temperature
    for:
      pasilla-salsa: { amount: ½ cup / 120 ml, note: "homemade or bought, at room temperature" }
  - slot: vegetable
    amount: about 12 oz / 340 g
    note: cut into large pieces
    for:
      onion: { amount: "1", name: large white onion, note: "cut into 8 wedges through the root, so they hold together" }
  - slot: acid
    amount: to taste
    for:
      lime: { amount: "1", note: cut into wedges }
      lemon: { amount: "1", note: cut into wedges }
  - slot: herb
    amount: a small handful
    for:
      cilantro: { amount: a small handful, note: "leaves and tender stems, roughly chopped" }
  - { name: warm corn tortillas, amount: to serve, note: optional }
steps:
  - text: Pat the {protein} dry with paper towels and season it all over with the salt. Throw the paper towels away and wash your hands.
    safety: { slot: protein, about: handling }
  - text: Heat 1 tbsp oil in a large heavy skillet over high heat. Add the {vegetable} cut side down and cook, turning once, until charred in places and tender, 8 to 10 minutes. Move it to a plate and sprinkle it with salt.
  - text: Add the rest of the oil. Lay in the {protein} and sear it without moving until well browned, 3 to 4 minutes, then turn it and cook until done at the thickest point, 3 to 4 minutes more for a thin steak. Rest it on a board for 3 to 5 minutes.
    safety: { slot: protein, about: cooking }
  - text: Slice the {protein} thinly across the grain. Serve it with the {vegetable}, spoon over the {sauce}, squeeze over the {acid}, and scatter with the {herb}. Add warm tortillas, if you like.
---
