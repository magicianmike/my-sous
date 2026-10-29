# my-sous
 MySous is your personal sous chef, helping you become a more confident cook with personalized guidance, cooking science, flavor discovery, and practical help when things go wrong.

## Development

```sh
npm install
npm run dev          # local dev server
npm run typecheck
npm test             # Vitest: the Kitchen module, through loadKitchen
npm run build        # static export to out/; fails on any content error
npm run test:e2e     # Playwright + axe against out/ (run the build first)
```

## Content

- `content/cuisines.yaml`: every Cuisine (`id`, `name`, `description`), named at regional granularity.
- `content/ingredients/<id>.md`: one file per Ingredient. The id is the filename. Frontmatter holds `name`, `category`, `tip`, and optionally `cuisines`, `slotTypes`, `typicallyIncludes` (for a Blend) and `culturalContext`. The Markdown body is the Ingredient's essay and is required.
- `content/pairings.yaml`: every Pairing, stored once per pair, with at least one Pairing Reason (`category`, a one-line `note`, optional `detail`), plus optional `cuisines` and `citations`.

The build fails on any malformed file or unknown Ingredient or Cuisine reference.

The decision journal lives in `docs/journal/`.
