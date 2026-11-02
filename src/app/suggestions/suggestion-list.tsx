"use client";

import { useRef } from "react";
import { Button } from "@/components/Button";
import { ListRow } from "@/components/ListRow";
import { Panel } from "@/components/Panel";
import { TrayView } from "@/components/TrayView";
import { COMBINATION_LIMIT, inSentence, type CombinationFix, type Tension } from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "../combination";

export const SuggestionList = withSearchParams(
  function SuggestionList() {
    const { kitchen } = useKitchen();
    const { combination, remove, replace } = useCombination();
    const heading = useRef<HTMLHeadingElement>(null);
    const combinationHeading = useRef<HTMLHeadingElement>(null);
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
            remove(ingredient);
            combinationHeading.current?.focus();
          }}
          renderName={({ id, name }) => <CombinationLink href={`/ingredients/${id}`}>{name}</CombinationLink>}
        />
      </div>
    );
    if (combination.ingredients.length === 0) {
      return (
        <>
          {shown}
          <p>
            Add an Ingredient to your Combination to see what to make.{" "}
            <CombinationLink href="/">Start from an ingredient</CombinationLink>
          </p>
        </>
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
        <ul className="stack" aria-labelledby="suggestions-heading">
          {suggestions.map(({ formula, slots, rankReason }) => {
            const used = slots.flatMap(({ ingredient }) => ingredient?.name ?? []);
            const needs = slots.filter(({ slot, ingredient }) => slot.required && !ingredient);
            return (
              <li key={formula.id}>
                <ListRow
                  title={
                    <h3>
                      <CombinationLink href={`/formulas/${formula.id}`}>{formula.name}</CombinationLink>
                    </h3>
                  }
                >
                  <p className="rank-reason">{rankReason}</p>
                  <p>{formula.description}</p>
                  <p className="muted">
                    Uses {used.length > 0 ? used.join(", ") : "none of your Combination yet"}.
                  </p>
                  {needs.length > 0 && (
                    <p className="muted">Still needs {needs.map(({ slot }) => slot.role).join(", ")}.</p>
                  )}
                </ListRow>
              </li>
            );
          })}
        </ul>
      </>
    );
  },
  () => <p>Finding Suggestions…</p>,
);

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
          <li key={`${a.id}+${b.id}`}>
            {a.name} and {inSentence(b)} don&rsquo;t have a Pairing in MySous.
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
