"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Disclosure } from "@/components/Disclosure";
import { IngredientMark } from "@/components/IngredientMark";
import { ListRow } from "@/components/ListRow";
import type { FilledSlot, Ingredient, Suggestion } from "@/kitchen/kitchen";
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
    .suggestions
    .find(({ formula }) => formula.id === formulaId)!;
  // A new Combination starts a fresh swap history.
  const combinationKey = combination.ingredients.map(({ id }) => id).join(",");
  return <SlotEditor key={combinationKey} initial={suggestion} />;
});

/** A Suggestion as it stood after a swap, and the Slot that swap changed. */
type Step = { suggestion: Suggestion; swapped?: FilledSlot };

function SlotEditor({ initial }: { initial: Suggestion }) {
  const { kitchen } = useKitchen();
  const [history, setHistory] = useState<Step[]>([{ suggestion: initial }]);
  const [status, setStatus] = useState("");
  const undoButton = useRef<HTMLButtonElement>(null);
  const current = history.at(-1)!;
  const canUndo = history.length > 1;

  function swap(filled: FilledSlot, ingredient: Ingredient) {
    const { slot, ingredient: previous } = filled;
    const suggestion = kitchen.swap(current.suggestion, slot.id, ingredient.id);
    setHistory([...history, { suggestion, swapped: filled }]);
    setStatus(
      `${ingredient.name} is now ${slot.role}.` +
        (previous ? ` Undo brings back ${previous.name.toLowerCase()}.` : ""),
    );
    undoButton.current?.focus();
  }

  function undo() {
    if (!canUndo) return;
    const { slot, ingredient } = current.swapped!;
    setHistory(history.slice(0, -1));
    setStatus(
      `Undone: ${ingredient ? `${ingredient.name} is ${slot.role} again` : `${slot.role} is empty again`}.`,
    );
  }

  return (
    <>
      <div className="title">
        <h2>What goes in</h2>
        <Button ref={undoButton} aria-disabled={!canUndo} onClick={undo}>
          Undo swap
        </Button>
      </div>
      <p role="status" className="notice">
        {status}
      </p>
      <ul className="slots stack">
        {current.suggestion.slots.map((filled) => {
          const { slot, ingredient, alternatives } = filled;
          return (
            <li key={slot.id}>
              <ListRow
                mark={ingredient && <IngredientMark ingredient={ingredient} size="sm" />}
                title={
                  <>
                    <h3 className="slot-role">
                      {slot.role}
                      {!slot.required && " (optional)"}
                    </h3>
                    <p className="slot-fill">{ingredient ? ingredient.name : "Not filled yet"}</p>
                  </>
                }
              >
                <p className="muted">{filled.reason}</p>
                {alternatives.length > 0 && (
                  // Keyed by the fill, so a swap closes the list.
                  <Disclosure key={ingredient?.id} summary="Swap" hiddenSummary={slot.role}>
                    <ul className="actions">
                      {alternatives.map((alternative) => (
                        <li key={alternative.id}>
                          <Button onClick={() => swap(filled, alternative)}>Use {alternative.name}</Button>
                        </li>
                      ))}
                    </ul>
                  </Disclosure>
                )}
              </ListRow>
            </li>
          );
        })}
      </ul>
      <h2>Method</h2>
      <ol className="method">
        {current.suggestion.method.map((step, i) => (
          // Steps can repeat once filled in, and their order never changes.
          <li key={i}>{step}</li>
        ))}
      </ol>
    </>
  );
}
