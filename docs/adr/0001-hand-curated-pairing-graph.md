# Hand-curated pairing graph over a compound-based dataset

Pairings are original, hand-curated content, each with a Pairing Reason grounded in primary sources, rather than derived from an open flavor-compound dataset or adapted from published pairing books. The obvious dataset (Ahn et al. 2011, "Flavor network and the principles of food pairing") supports a contested hypothesis: shared aroma compounds predicted pairings in Western cuisines but the effect reversed in East Asian ones, so presenting it as fact would break the project's rule against unfounded culinary claims. The best-known books (*The Flavour Thesaurus*, *The Flavor Bible*) are copyrighted, and so is their content. A smaller, honest graph is also what lets the demo run deterministically, with no external service.

## Considered Options

- **Compound-based dataset**: large coverage for free, but scientifically contested and culturally skewed.
- **Adapting existing pairing books**: rejected on IP grounds.
- **Hand-curated (chosen)**: start with 30–40 Ingredients and grow to about 100, with every Pairing given uniform written depth.

## Consequences

Content authoring is the largest workload in the project and grows in batches. Pairings are unordered (stored once per pair), and a Pairing can be attested in one or more regional Cuisines.
