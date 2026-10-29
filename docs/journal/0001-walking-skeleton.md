# 0001 · Walking skeleton

Milestone: #3 (part of #2). The thinnest real slice: a Cook opens an Ingredient page and sees its Pairings, each with a one-line Pairing Reason, rendered from content validated at build time.

## Decisions

**The Kitchen is one deep module behind `loadKitchen(contentDir)`.** It returns either a Kitchen or a list of ContentErrors, never a half-loaded Kitchen. The pages ask the Kitchen questions (`ingredients()`, `ingredient(id)`, `pairingsFor(id)`) and never touch files, YAML or schemas. Every Kitchen test goes through `loadKitchen` with a fixture content folder, so the internals can change without breaking the tests.

**Content errors fail the build, all at once.** Validation collects every problem (format errors from Zod, unknown references, self-Pairings, duplicates, missing Pairing Reasons) before failing, so an author fixes a batch of content in one pass instead of one error per build.

**Pairings are stored once and shown from both sides.** `content/pairings.yaml` holds each pair a single time, in either order (ADR 0001). The Kitchen indexes it in both directions, and treats `[a, b]` and `[b, a]` as the same Pairing when checking for duplicates.

**Static export, no runtime server.** `output: "export"` produces plain HTML. The e2e suite runs against that exact output (served from `out/`), not the dev server, so what's tested is what's deployed.

**Accessibility is checked from day one.** axe runs on every screen in light and dark themes at phone and desktop widths. The first palette is plain on purpose: visual direction is decided later by prototype rounds, and it will have to keep these checks green.

## Alternatives considered

- **Pairings as frontmatter on each Ingredient file.** Rejected: every pair would be written twice and could drift out of sync.
- **Running e2e against `next dev`.** Rejected: it doesn't exercise the static export that ships.
- **Throwing on the first content error.** Rejected: slow feedback for content authoring, which is the largest workload in the project.

## Evidence

- Before: an empty repo with a glossary and three ADRs.
- After: 10 Ingredients and 16 Pairings, deployed. Screenshots to be added from the first preview deploy.
