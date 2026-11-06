# Image style guide

How MySous's images look and how they're made, so they read as one set and stay honest (ADR 0005). Images add to the line drawings and never replace them. A drawing is still an Ingredient's mark at every small size. An image appears only where there's room: an Ingredient's page, a dish's header, a Suggestion card.

## The look

- **Light.** Soft daylight from one side, as from a window. No flash, no hard shadows, no dramatic spotlight. Highlights stay soft, so nothing blows out to white.
- **Angle.** Ingredients from about 45 degrees, close enough to read their texture. Dishes from overhead, or from 45 degrees when height matters (a stack, a glossy sauce).
- **Surface.** Matte, natural and muted: linen, unglazed ceramic, worn wood, stone. Never a pure white or pure black background. The images sit on light and dark pages, and a white ground glares in the dark theme. Pans and plates are plain, with no pattern.
- **Framing.** The subject in the middle third, with room around it. Pages crop to a wide banner on a phone and to a low strip on a card. Leave the top corners clear, because the "AI-generated image" note sits there on banners and cards.
- **Food.** Real, cooked by hand, slightly imperfect: crumbs, a drip of sauce, uneven cuts. Not glossy advertising food. A dish shows exactly what its Recipe says, as written: the same Ingredients, garnish, portion and doneness.
- **Colour.** True to the food. No heavy grading or filters, no added saturation.

## Never show

- hands, faces or people;
- brand names, packaging or logos;
- text, numbers or labels in the image;
- Ingredients the dish or Ingredient doesn't have, including garnishes the Recipe doesn't list;
- raw meat or poultry beside food that's ready to eat, or anything a food safety reviewer would wince at;
- impossible food: melting geometry, extra fingers of ginger fused together, steam that doesn't rise.

## Base prompt

Start from this, then add the subject and anything the Recipe specifies:

> A natural, editorial food photograph of {subject}, on a matte {linen | stone | worn wood} surface, soft daylight from the left, shallow depth of field, muted natural colours, true to life, slightly imperfect, home-cooked. No people, no hands, no text, no packaging, no brand names. 3:2 landscape, subject centred with space around it.

For a dish, {subject} is the Recipe as written, in plain words: "chicken thighs in a glossy lemon and garlic pan sauce, scattered with torn basil, two portions, in a plain steel skillet".

## Format

An image is a file under `content/images/`, named in its owner's frontmatter (an Ingredient's Markdown file, a Formula in `formulas.yaml`, or a Recipe's Markdown file):

```yaml
image:
  file: lemon.png
  alt: A halved lemon on a linen cloth, one half cut side up.
  provenance:
    made: ai-generated
    model: The model and version
    prompt: The full prompt, as sent
    date: "2026-11-05"
    review:
      date: "2026-11-06"
      matches: true
```

- **Alt text** describes what the image shows, for a Cook who can't see it, in a sentence. It doesn't start with "Image of". Where an image only repeats its heading (a Suggestion card), the page hides it from screen readers itself.
- **Review.** Record it only after checking the image against this guide and against what it's for. For a Recipe, that means against the cooked dish. If it doesn't match, set `matches: false` and regenerate it; the build refuses it until then.
- **Size budget.** At least 1024 pixels on the shorter side, and under 5 MB. The build makes the files the Cook downloads (AVIF and WebP, 480 to 1600 pixels wide) with `npm run images`, which runs before `npm run build` and `npm run dev`.

## Placeholders

Until an image is made and reviewed, a placeholder can stand in. It's rendered from the drawings, so it can't be mistaken for a photograph:

```sh
npm run placeholder -- lemon lemon                                # one Ingredient, on its wash
npm run placeholder -- pan-sauce chicken-thigh garlic lemon basil  # a dish, its drawings in a row
```

Give it `provenance: { made: placeholder, date: … }` with no review. The page labels it "Placeholder image". Replace it with the reviewed image under the same file name, or a new one, and update the provenance.
