"use client";

import { useRef } from "react";
import type { Ingredient, Tension } from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "../combination";

export const SuggestionList = withSearchParams(
  function SuggestionList() {
    const { kitchen } = useKitchen();
    const { combination, remove, replace } = useCombination();
    const heading = useRef<HTMLHeadingElement>(null);
    if (combination.ingredients.length === 0) {
      return (
        <p>
          Add an Ingredient to your Combination to see what to make.{" "}
          <CombinationLink href="/">Start from an ingredient</CombinationLink>
        </p>
      );
    }

    const { suggestions, tensions } = kitchen.suggest(combination.ingredients, []);
    // Resolving a tension removes the button that was pressed, so focus moves to the Suggestions.
    const then = (change: () => void) => () => {
      change();
      heading.current?.focus();
    };

    return (
      <>
        {tensions.length > 0 && (
          <Tensions
            tensions={tensions}
            onSwap={(ingredient, replacement) => then(() => replace(ingredient, replacement))}
            onRemove={(ingredient) => then(() => remove(ingredient))}
          />
        )}
        <h2 id="suggestions-heading" ref={heading} tabIndex={-1}>
          Suggestions
        </h2>
        <ul className="suggestions" aria-labelledby="suggestions-heading">
          {suggestions.map(({ formula, slots, rankReason }) => {
            const used = slots.flatMap(({ ingredient }) => ingredient?.name ?? []);
            const needs = slots.filter(({ slot, ingredient }) => slot.required && !ingredient);
            return (
              <li key={formula.id}>
                <h3>
                  <CombinationLink href={`/formulas/${formula.id}`}>{formula.name}</CombinationLink>
                </h3>
                <p className="rank-reason">{rankReason}</p>
                <p>{formula.description}</p>
                <p>Uses {used.length > 0 ? used.join(", ") : "none of your Combination yet"}.</p>
                {needs.length > 0 && (
                  <p>Still needs {needs.map(({ slot }) => slot.role).join(", ")}.</p>
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  },
  () => <p>Finding Suggestions…</p>,
);

/** Every tension in one note, then each swap (or removal) that would help, offered once. */
function Tensions({
  tensions,
  onSwap,
  onRemove,
}: {
  tensions: Tension[];
  onSwap: (ingredient: Ingredient, replacement: Ingredient) => () => void;
  onRemove: (ingredient: Ingredient) => () => void;
}) {
  const lower = (ingredient: Ingredient) => ingredient.name.toLowerCase();
  const swaps = [
    ...new Map(
      tensions.flatMap(({ swaps }) => swaps).map((swap) => [`${swap.replace.id}>${swap.with.id}`, swap]),
    ).values(),
  ];
  const involved = [...new Set(tensions.flatMap(({ ingredients }) => ingredients))];

  return (
    <section className="tensions" aria-labelledby="tensions-heading">
      <h2 id="tensions-heading">Not everything pairs yet</h2>
      <ul>
        {tensions.map(({ ingredients: [a, b] }) => (
          <li key={`${a.id}+${b.id}`}>
            {a.name} and {lower(b)} don&rsquo;t have a Pairing in MySous.
          </li>
        ))}
      </ul>
      <p>{swaps.length > 0 ? "Swap one?" : "Removing one would help."}</p>
      <div className="actions">
        {swaps.length > 0
          ? swaps.map(({ replace, with: replacement }) => (
              <button
                key={`${replace.id}>${replacement.id}`}
                type="button"
                onClick={onSwap(replace, replacement)}
              >
                Swap {lower(replace)} for {lower(replacement)}
              </button>
            ))
          : involved.map((ingredient) => (
              <button key={ingredient.id} type="button" onClick={onRemove(ingredient)}>
                Remove {lower(ingredient)}
              </button>
            ))}
      </div>
    </section>
  );
}
