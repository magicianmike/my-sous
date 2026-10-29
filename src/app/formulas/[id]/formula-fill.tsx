"use client";

import { useRef, useState } from "react";
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
    .find(({ formula }) => formula.id === formulaId)!;
  // A new Combination starts a fresh swap history.
  const key = combination.ingredients.map(({ id }) => id).join(",");
  return <SlotEditor key={key} initial={suggestion} />;
});

/** Why a Slot holds its Ingredient, in one line. */
function why({ ingredient, source, justification }: FilledSlot): string {
  if (!ingredient) return "Nothing in MySous pairs with the rest of this fill yet.";
  if (justification) {
    return `Pairs with ${justification.ingredient.name.toLowerCase()}: ${justification.reasons[0].note}`;
  }
  if (source === "combination") return "From your Combination.";
  if (source === "pantry") return "From your Pantry.";
  return "Your choice.";
}

function SlotEditor({ initial }: { initial: Suggestion }) {
  const { kitchen } = useKitchen();
  const [history, setHistory] = useState([initial]);
  const [status, setStatus] = useState("");
  const undoButton = useRef<HTMLButtonElement>(null);
  const current = history.at(-1)!;
  const canUndo = history.length > 1;

  function swap({ slot, ingredient: previous }: FilledSlot, ingredient: Ingredient) {
    setHistory([...history, kitchen.swap(current, slot.id, ingredient.id)]);
    setStatus(
      `${ingredient.name} is now ${slot.role}.` +
        (previous ? ` Undo brings back ${previous.name.toLowerCase()}.` : ""),
    );
    undoButton.current?.focus();
  }

  function undo() {
    if (!canUndo) return;
    const previous = history.at(-2)!;
    const changed = previous.slots.find(({ ingredient }, i) => ingredient !== current.slots[i].ingredient)!;
    setHistory(history.slice(0, -1));
    setStatus(
      `Undone: ${changed.ingredient ? `${changed.ingredient.name} is ${changed.slot.role} again` : `${changed.slot.role} is empty again`}.`,
    );
  }

  return (
    <>
      <div className="title">
        <h2>What goes in</h2>
        <button ref={undoButton} type="button" aria-disabled={!canUndo} onClick={undo}>
          Undo swap
        </button>
      </div>
      <p role="status" className="notice">
        {status}
      </p>
      <ul className="slots">
        {current.slots.map((filled) => {
          const { slot, ingredient, alternatives } = filled;
          return (
            <li key={slot.id}>
              <h3>
                {slot.role}
                {!slot.required && " (optional)"}
              </h3>
              <p className="slot-fill">{ingredient ? ingredient.name : "Not filled yet"}</p>
              <p className="slot-why">{why(filled)}</p>
              {alternatives.length > 0 && (
                // Keyed by the fill, so a swap closes the list.
                <details key={ingredient?.id}>
                  <summary>
                    Swap<span className="visually-hidden"> {slot.role}</span>
                  </summary>
                  <ul>
                    {alternatives.map((alternative) => (
                      <li key={alternative.id}>
                        <button type="button" onClick={() => swap(filled, alternative)}>
                          Use {alternative.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          );
        })}
      </ul>
      <h2>Method</h2>
      <ol className="method">
        {current.method.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </>
  );
}
