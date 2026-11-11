---
# The Recipe for a quick pickle: onion in cider vinegar with dried chile, after the pickled
# onion of piedrazo, a street snack in Oaxaca. See pan-sauce.md for the fields.
serves: 6
time: { prep: 10, cook: 5 }
image:
  file: quick-pickle.png
  alt: A glass jar of pickled red onion with garlic, a bay leaf and dried red chiles, a fork beside it.
  provenance:
    made: ai-generated
    model: GPT-6 (OpenAI)
    prompt: "A natural, editorial food photograph of a plain one-pint glass jar with no label, packed with quick-pickled red onion slices in a clear amber cider-vinegar brine, with halved garlic cloves, a bay leaf and a few strips of dark dried chile visible through the glass, a fork resting beside the jar, seen from about 45 degrees, on a matte worn wood surface, soft daylight from the left, shallow depth of field, muted natural colours, true to life, slightly imperfect, home-cooked. No people, no hands, no text, no packaging, no brand names. 3:2 landscape, subject centred with space around it, the top corners left clear. Match the light, surface, colour and style of the two attached reference images, but don't copy their subjects."
    date: "2026-11-11"
    review:
      date: "2026-11-11"
      matches: true
fills:
  vegetable: onion
  acid: cider-vinegar
  aromatic: garlic
  heat: dried-chile
ingredients:
  - slot: vegetable
    amount: about 8 oz / 225 g
    for:
      onion: { amount: 1 medium, name: white or red onion, note: "about 8 oz / 225 g, sliced ¼ inch / 6 mm thick" }
  - slot: acid
    amount: 1 cup / 240 ml
    note: "at least 5% acidity; check the label"
    for:
      cider-vinegar: { amount: 1 cup / 240 ml, name: apple cider vinegar, note: "at least 5% acidity; check the label" }
  - { name: water, amount: ½ cup / 120 ml }
  - { name: piloncillo or brown sugar, amount: 1 tbsp }
  - { name: kosher salt, amount: 1 tsp }
  - slot: aromatic
    amount: to taste
    for:
      garlic: { amount: 2 cloves, note: halved }
  - { name: bay leaf, amount: "1" }
  - { name: dried thyme or oregano, amount: ¼ tsp }
  - slot: heat
    amount: to taste
    for:
      dried-chile: { amount: 1 or 2, name: dried chiles, note: "pasilla oaxaqueño or another, torn into strips, seeds shaken out" }
steps:
  - text: Wash a 1-pint / 500 ml jar and its lid in hot, soapy water and rinse them. Pack the {vegetable} into it with {heat}.
  - text: In a small saucepan, bring {acid}, the water, sugar, salt, {aromatic}, bay leaf and thyme to a simmer, stirring until the sugar and salt dissolve, about 3 minutes.
    guidance:
      note: Use vinegar of at least 5% acidity, check the label, and never more water than vinegar; the acid is what keeps a pickle safe, so don't change the proportions.
      citations:
        - title: General Information on Pickling, National Center for Home Food Preservation
          url: https://nchfp.uga.edu/how/pickle/general-information-pickling/general-information-on-pickling/
        - title: "Let's Preserve: Quick Process Pickles, Penn State Extension"
          url: https://extension.psu.edu/lets-preserve-quick-process-pickles
  - text: Pour the hot brine over the {vegetable}, pressing it down so it's covered, and leave it uncovered until it's no longer steaming, about 20 minutes.
  - text: Lid the jar and refrigerate it. It's ready in an hour and better after a day; take it out with a clean fork, and eat it within 2 weeks.
    guidance:
      note: A quick pickle isn't heat-processed, so it isn't shelf-stable; keep it in the fridge at 40°F / 4°C or below and eat it within 2 weeks.
      citations:
        - title: Refrigerator Pickles, University of Maine Cooperative Extension
          url: https://extension.umaine.edu/food-health/recipes/refrigerator-pickles/
        - title: "Let's Preserve: Quick Process Pickles, Penn State Extension"
          url: https://extension.psu.edu/lets-preserve-quick-process-pickles
---
