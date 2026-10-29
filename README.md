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

- `content/ingredients/<id>.md`: one file per Ingredient. The id is the filename; frontmatter holds `name` and `category`.
- `content/pairings.yaml`: every Pairing, stored once per pair, each with at least one Pairing Reason (`category` plus a one-line `note`).

The decision journal lives in `docs/journal/`.
