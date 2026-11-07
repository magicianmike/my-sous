"use client";

import Link from "next/link";
import { FixedCombination, hrefWith, useKitchen } from "../combination";
import { SuggestionCard } from "../suggestions/suggestion-list";
import { CHAPTERS, type ChapterId } from "./chapters";

/** A chapter: its section and heading, titled and anchored from the one list of chapters. */
export function Chapter({ id, children }: { id: ChapterId; children: React.ReactNode }) {
  const { title } = CHAPTERS.find((chapter) => chapter.id === id)!;
  return (
    <section id={id} className="chapter" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} tabIndex={-1}>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** A link that opens What to make with a given basket, so a reader can check a claim for themselves. */
export function AppLink({ basket, children }: { basket: string[]; children: React.ReactNode }) {
  return <Link href={hrefWith("/suggestions", basket)}>{children}</Link>;
}

/**
 * A real Suggestion card, rendered by the app's own component for a fixed basket: not a screenshot.
 * Links inside it carry that basket.
 */
export function LiveSuggestion({ basket, dish, caption }: {
  basket: string[];
  dish: string;
  caption: React.ReactNode;
}) {
  const { kitchen } = useKitchen();
  const suggestion = kitchen
    .suggest(kitchen.combination(basket).ingredients)
    .find(({ formula }) => formula.id === dish);
  if (!suggestion) throw new Error(`The Case Study embeds an unknown dish, "${dish}".`);
  return (
    <figure className="live-embed">
      <FixedCombination ids={basket}>
        <SuggestionCard suggestion={suggestion} />
      </FixedCombination>
      <figcaption>
        {/* A sentence, so its link reads as one: underlined, and sized as text rather than a button. */}
        <p>
          <span className="live-label">Live from MySous</span> {caption}{" "}
          <AppLink basket={basket}>Open this basket in MySous</AppLink>.
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * A prototype's render, from public/case-study/<name>.webp, for what no longer exists to embed live:
 * a cut feature, a rejected variant, a direction as it was chosen. Each is cropped to 960×600, so
 * its space is kept before it loads.
 */
export function Screenshot({ name, alt, caption }: { name: string; alt: string; caption: React.ReactNode }) {
  return (
    <figure className="shot">
      <img src={`/case-study/${name}.webp`} alt={alt} width={960} height={600} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
