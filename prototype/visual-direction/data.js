// PROTOTYPE (issue #4): sample data for the Ingredient Pairings screen.
// Realistic in shape and density, NOT researched content: every line here
// gets rewritten from primary sources in the content tickets (#17, #18).
window.SAMPLE = {
  ingredient: {
    id: "lime",
    name: "Lime",
    category: "Citrus",
    cuisines: ["Oaxacan", "Punjabi"],
    essay:
      "Lime is sourness with a perfume. The juice brings acid that wakes up rich and starchy food; the zest carries most of the aroma, which is why a dish finished with both tastes brighter than one finished with juice alone. Warm limes give more juice than cold ones.",
    tip: "Zest before you cut. Once a lime is halved, the skin is much harder to grate.",
    context:
      "In Oaxacan cooking lime is usually squeezed at the table, over tacos, soups and fruit. In Punjabi kitchens it often arrives as a wedge beside dal or tandoori dishes, or pressed into a pickle with salt and spice.",
  },
  reasons: [
    { id: "contrast", label: "Contrast", blurb: "Acid against fat, richness or heat." },
    { id: "aromatic", label: "Aromatic bridge", blurb: "A shared note that carries from one to the other." },
    { id: "texture", label: "Texture", blurb: "One gives the other something to bite against." },
    { id: "tradition", label: "Tradition", blurb: "Cooked together for generations." },
  ],
  pairings: [
    {
      with: { id: "pork-shoulder", name: "Pork shoulder", category: "Meat" },
      reason: "contrast",
      note: "Lime's acid cuts through rendered pork fat, so each bite tastes lighter than it is.",
      more: "Squeeze it on at the end rather than in the braise: long cooking flattens lime's aroma, and you want the sharpness to arrive fresh.",
      cuisines: ["Oaxacan"],
    },
    {
      with: { id: "avocado", name: "Avocado", category: "Fruit" },
      reason: "contrast",
      note: "Acid sharpens avocado's mild, buttery fat and slows the cut flesh from browning.",
      more: "Salt and lime together are usually all a ripe avocado needs. Add the lime first, taste, then salt.",
      cuisines: ["Oaxacan"],
    },
    {
      with: { id: "chicken-thigh", name: "Chicken thigh", category: "Meat" },
      reason: "contrast",
      note: "Dark meat is rich enough to carry a lot of acid without tasting sour.",
      more: "In a marinade, keep lime juice to a few hours; longer and the surface turns chalky.",
      cuisines: ["Punjabi", "Oaxacan"],
    },
    {
      with: { id: "cilantro", name: "Cilantro", category: "Herb" },
      reason: "aromatic",
      note: "Both carry bright, citrus-leaning aromas, so each makes the other taste fresher.",
      more: "Chop the stems too. They hold more flavour than the leaves and stand up to lime's acid.",
      cuisines: ["Oaxacan", "Punjabi"],
    },
    {
      with: { id: "ginger", name: "Ginger", category: "Aromatic" },
      reason: "aromatic",
      note: "Ginger's lemony top note picks up lime zest and carries it into the heat.",
      more: "Grate both on the same fine grater, straight into the pan, so neither loses its aroma on the board.",
      cuisines: ["Punjabi"],
    },
    {
      with: { id: "cucumber", name: "Cucumber", category: "Vegetable" },
      reason: "texture",
      note: "Cool, crisp cucumber gives lime's sharpness something watery to land on.",
      more: "Salt the cucumber for ten minutes first, drain it, and the lime won't be diluted.",
      cuisines: ["Oaxacan", "Punjabi"],
    },
    {
      with: { id: "radish", name: "Radish", category: "Vegetable" },
      reason: "texture",
      note: "A peppery crunch that holds up under lime juice for hours.",
      more: "Slice thin and dress just before serving if you want the crunch; an hour ahead if you want a quick pickle.",
      cuisines: ["Oaxacan"],
    },
    {
      with: { id: "chaat-masala", name: "Chaat masala", category: "Blend", blend: "typically includes amchur, black salt, cumin and chilli" },
      reason: "tradition",
      note: "Squeezed and sprinkled together over fruit, salads and street snacks.",
      more: "Black salt's sulphurous edge is part of the point. Start with a pinch; it's stronger than it looks.",
      cuisines: ["Punjabi"],
    },
    {
      with: { id: "dried-chile", name: "Dried chile", category: "Spice" },
      reason: "tradition",
      note: "Lime, salt and ground chile are usually shaken together over cut fruit and corn.",
      more: "Toast whole chiles before grinding for a deeper, rounder heat.",
      cuisines: ["Oaxacan"],
    },
  ],
  // The Combination tray, pre-filled so every variant shows it in a real state.
  combination: ["lime", "chicken-thigh"],
  pantry: ["lime", "cilantro", "cucumber"],
  names: { lime: "Lime" },
};
for (const p of window.SAMPLE.pairings) window.SAMPLE.names[p.with.id] = p.with.name;
