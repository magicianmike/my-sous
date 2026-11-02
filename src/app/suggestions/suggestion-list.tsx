"use client";

import { useEffect, useRef } from "react";
import { Button, buttonClass } from "@/components/Button";
import { EmptyMark } from "@/components/EmptyMark";
import { IngredientMark } from "@/components/IngredientMark";
import { ListRow } from "@/components/ListRow";
import { MarkGroup } from "@/components/MarkGroup";
import { Panel } from "@/components/Panel";
import { Readiness } from "@/components/Readiness";
import { TrayView } from "@/components/TrayView";
import {
  COMBINATION_LIMIT,
  inSentence,
  type CombinationFix,
  type Suggestion,
  type Tension,
} from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "../combination";
import { readinessSentence } from "../readiness";

export const SuggestionList = withSearchParams(
  function SuggestionList() {
    const { kitchen } = useKitchen();
    const { combination, remove, replace } = useCombination();
    const heading = useRef<HTMLHeadingElement>(null);
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
          renderName={({ id, name }) => <CombinationLink href={`/ingredients/${id}`}>{name}</CombinationLink>}
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
          <p>Add an Ingredient or two to your Combination, and MySous suggests what to make with them.</p>
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

    const { suggestions, tensions, fixes } = kitchen.suggest(combination.ingredients, []);
    // Applying a fix removes the button that was pressed, so focus moves to the Suggestions.
    function applyFix({ ingredient, replacement }: CombinationFix) {
      if (replacement) replace(ingredient, replacement);
      else remove(ingredient);
      heading.current?.focus();
    }

    return (
      <>
        {shown}
        {tensions.length > 0 && (
          <Tensions tensions={tensions} fixes={fixes} onFix={applyFix} />
        )}
        <h2 id="suggestions-heading" ref={heading} tabIndex={-1}>
          Suggestions
        </h2>
        <p className="muted">
          MySous doesn&rsquo;t know your Pantry yet, so Ready means your Combination fills every Slot a Formula
          needs.
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

/** One Suggestion: whether it's ready, what fills it and from where, why it ranks here. */
function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const { formula, slots, rankReason, needs, makeable } = suggestion;
  const yours = slots.flatMap(({ ingredient, source }) =>
    ingredient && (source === "combination" || source === "pantry") ? [ingredient] : [],
  );
  const suggested = slots.flatMap(({ ingredient, source }) =>
    ingredient && source === "pairing" ? [ingredient] : [],
  );
  const open = slots.filter(({ slot, ingredient }) => slot.required && !ingredient).length;
  return (
    <ListRow
      title={
        <h3>
          <CombinationLink href={`/formulas/${formula.id}`}>{formula.name}</CombinationLink>
        </h3>
      }
      action={<Readiness needs={needs.length} />}
    >
      <div className="mark-groups">
        {yours.length > 0 && <MarkGroup label="Yours" ingredients={yours} />}
        {(suggested.length > 0 || open > 0) && (
          <MarkGroup
            label="Suggested"
            ingredients={suggested}
            empty={open}
            emptyLabel={`${open} Slot${open === 1 ? "" : "s"} nothing pairs with yet`}
          />
        )}
      </div>
      {!makeable && <p className="needs">{readinessSentence(suggestion)}</p>}
      <p className="rank-reason">{rankReason}</p>
      <p className="muted">{formula.description}</p>
    </ListRow>
  );
}

/** Every tension, then the one fix offered for each Ingredient involved. */
function Tensions({
  tensions,
  fixes,
  onFix,
}: {
  tensions: Tension[];
  fixes: CombinationFix[];
  onFix: (fix: CombinationFix) => void;
}) {
  const swaps = fixes.filter(({ replacement }) => replacement).length;
  const prompt =
    swaps === fixes.length ? "Swap one?" : swaps === 0 ? "Removing one would help." : "Swap or remove one?";

  return (
    <Panel title="Not everything pairs yet" titleId="tensions-heading">
      <ul className="stack">
        {tensions.map(({ ingredients: [a, b] }) => (
          <li key={`${a.id}+${b.id}`} className="tension">
            <span className="tension-marks" aria-hidden="true">
              <IngredientMark ingredient={a} size="sm" />
              <IngredientMark ingredient={b} size="sm" />
            </span>
            <span>
              {a.name} and {inSentence(b)} don&rsquo;t have a Pairing in MySous.
            </span>
          </li>
        ))}
      </ul>
      <p>{prompt}</p>
      <div className="actions">
        {fixes.map((fix) => (
          <Button key={fix.ingredient.id} variant={fix.replacement ? "primary" : "secondary"} onClick={() => onFix(fix)}>
            {fix.replacement
              ? `Swap ${inSentence(fix.ingredient)} for ${inSentence(fix.replacement)}`
              : `Remove ${inSentence(fix.ingredient)}`}
          </Button>
        ))}
      </div>
    </Panel>
  );
}
