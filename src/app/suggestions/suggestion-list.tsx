"use client";

import { CombinationLink, useCombination, useKitchen, withSearchParams } from "../combination";

export const SuggestionList = withSearchParams(
  function SuggestionList() {
    const { kitchen } = useKitchen();
    const { combination } = useCombination();
    if (combination.ingredients.length === 0) {
      return (
        <p>
          Add an Ingredient to your Combination to see what to make.{" "}
          <CombinationLink href="/">Start from an ingredient</CombinationLink>
        </p>
      );
    }

    return (
      <ul className="suggestions">
        {kitchen.suggest(combination.ingredients, []).map(({ formula, slots, rankReason }) => {
          const used = slots.flatMap(({ ingredient }) => ingredient?.name ?? []);
          const needs = slots.filter(({ slot, ingredient }) => slot.required && !ingredient);
          return (
            <li key={formula.id}>
              <h2>
                <CombinationLink href={`/formulas/${formula.id}`}>{formula.name}</CombinationLink>
              </h2>
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
    );
  },
  () => <p>Finding Suggestions…</p>,
);
