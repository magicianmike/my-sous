# my-sous
 MySous is your personal sous chef, helping you become a more confident cook with personalized guidance, cooking science, flavor discovery, and practical help when things go wrong.

## Development

```sh
npm install
npm run dev          # local dev server
npm run typecheck
npm test             # Vitest: the Kitchen module, through loadKitchen
npm run build        # static export to out/; fails on any content error
npm run images       # makes the served image files from content/images (runs before build and dev)
npm run test:e2e     # Playwright + axe against out/ (run the build first)
```

## Content

- `content/cuisines.yaml`: every Cuisine (`id`, `name`, `description`), named at regional granularity.
- `content/ingredients/<id>.md`: one file per Ingredient. The id is the filename. Frontmatter holds `name`, `category` (one of herb, allium, aromatic, citrus, produce, meat or blend, the groups on the Ingredients page), `tip`, and optionally `cuisines`, `slotTypes`, `typicallyIncludes` (for a Blend: Ingredient ids, which link, or plain words) and `culturalContext`. The Markdown body is the Ingredient's essay and is required.
- `content/pairings.yaml`: every Pairing, stored once per pair, with at least one Pairing Reason (`category`, a one-line `note`, optional `detail`), plus optional `cuisines` and `citations`.
- `content/formulas.yaml`: every Formula, with its Slots (`id`, `role`, the Slot type it `accepts`, `required` unless set to false) and method steps that refer to Slots as `{slotId}`.
- `content/recipes/<formula id>.md`: a Formula's Recipe, as frontmatter; the file's comments describe its fields.
- `content/images/`: image files, each named by an Ingredient's, Formula's or Recipe's `image` with its alt text and provenance. See `docs/image-style-guide.md` for how they look, are made and are reviewed, and how to render a placeholder (`npm run placeholder`).

The build fails on any malformed file, unknown Ingredient or Cuisine reference, Slot that no Ingredient can fill, method step that refers to an unknown Slot, or Cuisine named at continental level (such as "Asian" or "Mediterranean"; name them regionally). It also fails on an image that's missing, has no alt text or provenance, hasn't been reviewed (or is a placeholder marked as reviewed), or falls outside the size budget.

## Design system

Tokens (colour, type, spacing, radius, elevation, motion, focus) live in `src/design/tokens.ts`, which generates the CSS; dark is a token swap. Core components are in `src/components/` and take props only. `/design` shows each one from fixture props.

Every Ingredient needs a `colour` in its frontmatter (`wash`, `washDark`, `stroke`, `strokeDark`) and a single-line drawing in `content/ingredients/<id>.svg` (shapes only, on a 48-unit grid). Tests check every colour's contrast in both themes.

The decision journal lives in `docs/journal/`.
