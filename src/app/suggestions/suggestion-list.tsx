"use client";

import { useEffect, useRef } from "react";
import { buttonClass } from "@/components/Button";
import { ContentImage } from "@/components/ContentImage";
import { EmptyMark } from "@/components/EmptyMark";
import { ListRow } from "@/components/ListRow";
import { MarkGroup } from "@/components/MarkGroup";
import { Readiness } from "@/components/Readiness";
import { TrayView } from "@/components/TrayView";
import {
  COMBINATION_LIMIT,
  inSentence,
  isCooksOwn,
  joinWithAnd,
  type Ingredient,
  type Suggestion,
} from "@/kitchen/kitchen";
import { AddToCombination, CombinationLink, useCombination, useKitchen, withSearchParams } from "../combination";
import { IngredientLink, IngredientMarkLink } from "../ingredient-link";
import { ReadinessSentence } from "../readiness";

export const SuggestionList = withSearchParams(
  function SuggestionList() {
    const { kitchen } = useKitchen();
    const { combination, remove } = useCombination();
    const combinationHeading = useRef<HTMLHeadingElement>(null);
    const emptyHeading = useRef<HTMLHeadingElement>(null);
    // Removing the last Ingredient takes its heading away, so focus moves to what replaces it.
    const removedLast = useRef(false);
    const empty = combination.ingredients.length === 0;
    useEffect(() => {
      if (empty && removedLast.current) emptyHeading.current?.focus();
      removedLast.current = false;
    }, [empty]);
    // Here the Combination sits under the heading, in place of the tray.
    const shown = (
      <div className="suggestions-combination">
        <TrayView
          ingredients={combination.ingredients}
          titleId="combination-heading"
          limit={COMBINATION_LIMIT}
          unknown={combination.unknown}
          overLimit={combination.overLimit}
          titleRef={combinationHeading}
          onRemove={(ingredient) => {
            removedLast.current = combination.ingredients.length === 1;
            remove(ingredient);
            combinationHeading.current?.focus();
          }}
          renderName={(ingredient) => <IngredientLink ingredient={ingredient} />}
          renderMark={(ingredient) => <IngredientMarkLink ingredient={ingredient} />}
        />
      </div>
    );
    if (empty) {
      return (
        <section className="nothing-yet" aria-labelledby="nothing-yet-heading">
          <span className="nothing-yet-marks" aria-hidden="true">
            {Array.from({ length: COMBINATION_LIMIT }, (_, i) => (
              <EmptyMark key={i} />
            ))}
          </span>
          <h2 id="nothing-yet-heading" ref={emptyHeading} tabIndex={-1}>
            Nothing to suggest yet
          </h2>
          <p>Add an Ingredient or two to your basket, and MySous suggests what to make with them.</p>
          {combination.unknown.length > 0 && (
            <p className="muted">
              Some Ingredients in this link aren&rsquo;t in MySous yet, so they&rsquo;re left out:{" "}
              {combination.unknown.join(", ")}.
            </p>
          )}
          <CombinationLink href="/" className={buttonClass("primary")}>
            Find an Ingredient
          </CombinationLink>
        </section>
      );
    }

    const suggestions = kitchen.suggest(combination.ingredients);
    if (suggestions.length === 0) {
      return (
        <>
          {shown}
          <NothingFits basket={combination.ingredients} />
        </>
      );
    }

    return (
      <>
        {shown}
        <h2 id="suggestions-heading">
          Suggestions
        </h2>
        <p className="muted">
          Ready means your basket fills every part a dish needs. Those come first; the rest say what
          else they need.
        </p>
        <ul className="stack" aria-labelledby="suggestions-heading">
          {suggestions.map((suggestion) => (
            <li key={suggestion.formula.id}>
              <SuggestionCard suggestion={suggestion} />
            </li>
          ))}
        </ul>
      </>
    );
  },
  () => <p>Finding Suggestions…</p>,
);

const or = new Intl.ListFormat("en", { type: "disjunction" });
const COUNTS = ["no", "one", "two", "three"];

/** For a basket no dish fits yet: the closest dishes, the parts each needs, and what to add for each. */
function NothingFits({ basket }: { basket: Ingredient[] }) {
  const { kitchen } = useKitchen();
  return (
    <section className="nothing-fits" aria-labelledby="nothing-fits-heading">
      <h2 id="nothing-fits-heading">No dish fits your basket yet</h2>
      <p className="muted">
        A dish fits once your basket covers at least half the parts it needs. These are closest.
      </p>
      <ul className="stack" aria-label="Closest dishes">
        {kitchen.closest(basket).map(({ formula, toFit, needs }) => {
          // The parts nothing from the basket is in yet, each with the best-pairing Ingredient to add.
          const open = needs.filter(({ fills }) => !fills.some(({ source }) => isCooksOwn(source)));
          return (
            <li key={formula.id} className="closest">
              <h3>
                <CombinationLink href={`/formulas/${formula.id}`}>{formula.name}</CombinationLink>
              </h3>
              <p>
                Add {COUNTS[toFit] ?? toFit} of these parts: {or.format(open.map(({ slot }) => slot.role))}.
              </p>
              <ul className="stack">
                {open.flatMap(({ slot, choices }) => {
                  const best = choices.find(({ ingredient }) => !basket.includes(ingredient));
                  if (!best) return [];
                  const { ingredient, pairsWith } = best;
                  return [
                    <li key={slot.id}>
                      <ListRow
                        mark={<IngredientMarkLink ingredient={ingredient} size="md" />}
                        title={<IngredientLink ingredient={ingredient} />}
                        action={<AddToCombination ingredientId={ingredient.id} />}
                      >
                        <p>
                          For {slot.role}.
                          {pairsWith.length > 0 &&
                            ` Pairs with ${joinWithAnd(pairsWith.map(inSentence))}.`}
                        </p>
                      </ListRow>
                    </li>,
                  ];
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** One Suggestion: whether it's ready, what fills it and from where, why it ranks here. */
export function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const { kitchen } = useKitchen();
  const { formula, slots, rankReason, needs } = suggestion;
  // The card's heading names the dish, so its image is decorative.
  const image = kitchen.dishImage(suggestion)?.image;
  const fills = slots.flatMap(({ slot, fills }) => fills.map((fill) => ({ ...fill, required: slot.required })));
  const yours = fills.flatMap(({ ingredient, source }) => (isCooksOwn(source) ? [ingredient] : []));
  // Suggested: what a required Slot still needs. Optional: extras, which never block Ready.
  const suggested = fills.flatMap(({ ingredient, source, required }) =>
    !isCooksOwn(source) && required ? [ingredient] : [],
  );
  const optional = fills.flatMap(({ ingredient, source, required }) =>
    !isCooksOwn(source) && !required ? [ingredient] : [],
  );
  const open = needs.filter(({ fills }) => fills.length === 0).length;
  // Nothing else on the card names these Ingredients, so each drawing carries its name, and shows it on hover.
  const markLink = (ingredient: Ingredient) => <IngredientMarkLink ingredient={ingredient} named alone />;
  return (
    <ListRow
      media={
        image && (
          <ContentImage image={image} sizes="(min-width: 50rem) 40rem, 100vw" decorative noteOnImage className="card-image" />
        )
      }
      title={
        <h3>
          <CombinationLink href={`/formulas/${formula.id}`}>{formula.name}</CombinationLink>
        </h3>
      }
      action={<Readiness missing={needs.length} />}
    >
      <div className="mark-groups">
        {yours.length > 0 && <MarkGroup label="Yours" ingredients={yours} renderMark={markLink} />}
        {(suggested.length > 0 || open > 0) && (
          <MarkGroup
            label="Suggested"
            ingredients={suggested}
            empty={{ count: open, label: `${open} part${open === 1 ? "" : "s"} nothing pairs with yet` }}
            renderMark={markLink}
          />
        )}
        {optional.length > 0 && <MarkGroup label="Optional" ingredients={optional} renderMark={markLink} />}
      </div>
      {/* Why it ranks here: whether the basket fills it, then how well its Ingredients pair. */}
      <p>
        <ReadinessSentence suggestion={suggestion} /> {rankReason}
      </p>
      <p className="muted">{formula.description}</p>
    </ListRow>
  );
}
