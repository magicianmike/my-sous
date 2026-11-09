# MySous

A kitchen assistant for what goes with what, and why. A Cook puts up to six Ingredients in a basket; MySous suggests the dishes they fit, fills each part, and says in one line why each part holds what it does. Every Pairing is hand-curated with a cited source. There is no model in the app.

- **Live:** [my-sous.vercel.app](https://my-sous.vercel.app)
- **Case Study:** [How MySous was made](https://my-sous.vercel.app/case-study), the product, design and engineering decisions
- **Spec:** [issue #2](https://github.com/magicianmike/my-sous/issues/2), with every ticket as a sub-issue

## Stack

- **Next.js 16**, static export (`output: "export"`), on Vercel. No server, database, accounts or analytics.
- **React 19**, **TypeScript** (strict).
- **Content as files:** Markdown with front matter and YAML in `content/`, parsed with **Zod**.
- **MDX** for the Case Study, with live app components in the prose.
- **sharp** makes AVIF and WebP at several widths from `content/images/` before each build.
- **Floating UI** for tooltips. Otherwise the platform: `<dialog>`, radio inputs, the URL.
- **Vitest**, **Playwright** and **axe-core**; CI on GitHub Actions.

## Architecture

- **The Kitchen** (`src/kitchen/`) is one deep module. `loadKitchen(dir)` returns a Kitchen or every content error, never a half-loaded Kitchen. Pages ask it questions (Pairings by reason, the dishes a basket fits, what to add, a Cuisine's Ingredients); no rule lives in a page. It runs at build time to render pages and again in the browser for any basket.
- **State is the URL.** The basket is `?with=a,b,c` and a Cuisine filter `&cuisine=id`; every link carries them. No client-side store. The only browser storage is the chosen theme.
- **Design tokens** (`src/design/tokens.ts`) generate the CSS custom properties for light and dark. Stylesheets may use only tokens.

```
content/        Ingredients (.md + .svg), pairings, formulas, cuisines (.yaml), recipes, images
src/kitchen/    the Kitchen: schema, loading, validation, fills, ranking
src/app/        routes: /, /ingredients, /cuisines, /formulas, /suggestions, /case-study, /design
src/components/ presentational components, props only
src/design/     tokens, contrast, theme
e2e/            Playwright specs
docs/           ADRs, decision journal, research notes, voice and image guides
```

## Development

```sh
npm install
npm run dev          # local dev server
npm run typecheck
npm test             # Vitest
npm run build        # static export to out/; fails on any content error
npm run test:e2e     # Playwright + axe against out/ (build first)
npm run images       # served images from content/images (runs before dev and build)
npm run placeholder  # a stand-in image from Ingredients' drawings, until a reviewed one arrives
```

## Testing

- **Vitest** tests the Kitchen only through `loadKitchen`, with a fixture content folder per rule, and loads the real content: sources, voice, regional Cuisine names, launch Cuisine coverage.
- **Rules as tests:** contrast for every text pairing and every Ingredient's colours in both themes; tokens only in stylesheets; no banned words in content or code.
- **Playwright** runs against the static export, never the dev server, as a phone (Pixel 7) and a desktop: journeys by mouse and keyboard, axe on every screen in both themes, reflow from 320px and at 200% zoom, 44px touch targets, focus and motion.
- **CI** runs typecheck, Vitest, the build and Playwright on every pull request.
- VoiceOver passes by hand, recorded in the journal.

## Content

- `content/ingredients/<id>.md`: front matter `name`, `category`, `tip`, `colour` (`wash`, `washDark`, `stroke`, `strokeDark`), optional `cuisines`, `slotTypes`, `typicallyIncludes`, `culturalContext`, `safety`; the body is the Ingredient's essay. `<id>.svg` is its single-line drawing on a 48-unit grid.
- `content/pairings.yaml`: each pair once, with Pairing Reasons (`category`, `note`, optional `detail`), at least one citation (`title`, `url`) and optional `cuisines`.
- `content/formulas.yaml`: Formulas, their Slots (`id`, `role`, `accepts` or staple `ingredients`, `required`) and method steps referring to Slots as `{slotId}`.
- `content/recipes/<formula id>.md`: a Formula's Recipe; safety-sensitive steps name a Slot's guidance or cite their own.
- `content/cuisines.yaml`: Cuisines, named regionally. A launch Cuisine needs three Ingredients per Slot type, or a cited `slotExceptions` entry.
- `content/images/`: AI-generated at authoring time (ADR 0005), each with alt text, provenance and a recorded review.

The build fails on a malformed file, an unknown reference, a Slot no Ingredient can fill, a Cuisine named at continental level, a Pairing without a linked source, a banned word ("easy", "easily", "simply", "just", "authentic"), or an image that's missing, unreviewed or over budget. See `docs/voice-guide.md` and `docs/image-style-guide.md`.

## How it's built

Built with Claude Code and a fixed loop of skills: a GitHub issue under the spec, decisions made by the author from options, test seams agreed before tests, tests seen failing first, two parallel reviews (repo standards and spec), a journal entry with screenshots, and a merge only on the author's word.

- `GLOSSARY.md`: the domain language (Cook, Combination, Formula, Slot, Pairing Reason, Cuisine).
- [`docs/adr/`](docs/adr): decisions, including no LLM in the app (0003) and no Pantry (0004).
- [`docs/journal/`](docs/journal): one entry per change, with before and after screenshots.
- [`docs/research/`](docs/research): primary-source research behind the Pairings.
- `docs/agents/`: how the skills use the issue tracker and domain docs.
