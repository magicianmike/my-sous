"use client";

import { useCombination, useKitchen, withSearchParams } from "../../combination";

/** The Formula's Slots and method, filled from the current Combination. */
export const FormulaFill = withSearchParams(function FormulaFill({
  formulaId,
}: {
  formulaId: string;
}) {
  const { kitchen } = useKitchen();
  const { combination } = useCombination();
  const suggestion = kitchen
    .suggest(combination.ingredients, [])
    .find(({ formula }) => formula.id === formulaId)!;
  const fills = new Map(suggestion.slots.map((filled) => [filled.slot.id, filled]));

  return (
    <>
      <h2>What goes in</h2>
      <dl className="slots">
        {suggestion.slots.map(({ slot, ingredient }) => (
          <div key={slot.id}>
            <dt>
              {slot.role}
              {!slot.required && " (optional)"}
            </dt>
            <dd>{ingredient ? ingredient.name : "Not filled yet"}</dd>
          </div>
        ))}
      </dl>
      <h2>Method</h2>
      <ol className="method">
        {suggestion.formula.method.map((step) => (
          <li key={step}>
            {step.replace(/\{([^}]+)\}/g, (_, id: string) => {
              const { slot, ingredient } = fills.get(id)!;
              return ingredient ? ingredient.name.toLowerCase() : slot.role;
            })}
          </li>
        ))}
      </ol>
    </>
  );
});
