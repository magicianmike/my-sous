"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Disclosure } from "@/components/Disclosure";
import { EmptyMark } from "@/components/EmptyMark";
import { IngredientMark } from "@/components/IngredientMark";
import { ListRow } from "@/components/ListRow";
import { Readiness } from "@/components/Readiness";
import {
  inSentence,
  isCooksOwn,
  type FilledSlot,
  type FillSource,
  type Ingredient,
  type Suggestion,
} from "@/kitchen/kitchen";
import { useCombination, useKitchen, withSearchParams } from "../../combination";
import { IngredientLink, IngredientMarkLink } from "../../ingredient-link";
import { ReadinessSentence } from "../../readiness";

/** The Formula's Slots and method, filled from the current Combination. */
export const FormulaFill = withSearchParams(function FormulaFill({
  formulaId,
}: {
  formulaId: string;
}) {
  const { kitchen } = useKitchen();
  const { combination, add } = useCombination();
  // The part whose Ingredient was just added to the basket, so focus can return to it after the reset.
  const [added, setAdded] = useState<string>();
  const suggestion = kitchen
    .suggest(combination.ingredients, [])
    .suggestions
    .find(({ formula }) => formula.id === formulaId)!;
  // A new Combination starts a fresh swap history.
  const combinationKey = combination.ingredients.map(({ id }) => id).join(",");
  return (
    <SlotEditor
      key={combinationKey}
      initial={suggestion}
      initialFocus={added}
      onAdd={(slotId, ingredient) => {
        setAdded(slotId);
        add(ingredient);
      }}
    />
  );
});

/** A Suggestion as it stood after a swap, and the Slot that swap changed. */
type Step = { suggestion: Suggestion; swapped?: FilledSlot };

/** Where focus goes after a swap or an undo; a fresh object each time, so it moves even to the same place. */
type FocusTarget = { undo: true } | { slot: string };

/** Where a Slot's Ingredient came from, in a word; never left to colour. */
const SOURCE_TAG: Record<FillSource, string> = {
  combination: "Yours",
  pantry: "Yours",
  pairing: "Suggested",
  swap: "Swapped",
};

function SlotEditor({
  initial,
  initialFocus,
  onAdd,
}: {
  initial: Suggestion;
  /** A part to focus on arrival: the one whose Ingredient was just added to the basket. */
  initialFocus?: string;
  /** Adds a part's Ingredient to the basket, which starts the page afresh. */
  onAdd: (slotId: string, ingredient: Ingredient) => void;
}) {
  const { kitchen, announce } = useKitchen();
  const [history, setHistory] = useState<Step[]>([{ suggestion: initial }]);
  const [focus, setFocus] = useState<FocusTarget | undefined>(initialFocus ? { slot: initialFocus } : undefined);
  const undoButton = useRef<HTMLButtonElement>(null);
  const headings = useRef(new Map<string, HTMLHeadingElement>());
  const current = history.at(-1)!;
  // Only the latest swap can be undone, so only its Slot offers Undo.
  const undoable = current.swapped?.slot.id;

  useEffect(() => {
    if (!focus) return;
    if ("undo" in focus) undoButton.current?.focus();
    else headings.current.get(focus.slot)?.focus();
  }, [focus]);

  function swap(filled: FilledSlot, ingredient: Ingredient) {
    const { slot, ingredient: previous } = filled;
    const suggestion = kitchen.swap(current.suggestion, slot.id, ingredient.id);
    setHistory([...history, { suggestion, swapped: filled }]);
    announce(
      `${ingredient.name} is now ${slot.role}.` +
        (previous ? ` Undo brings back ${inSentence(previous)}.` : ""),
    );
    setFocus({ undo: true });
  }

  function undo() {
    const { slot, ingredient } = current.swapped!;
    const rest = history.slice(0, -1);
    setHistory(rest);
    announce(
      `Undone: ${ingredient ? `${ingredient.name} is ${slot.role} again` : `${slot.role} is empty again`}.`,
    );
    // To the swap before, if there is one, so the Cook can keep undoing; otherwise back to the Slot.
    setFocus(rest.length > 1 ? { undo: true } : { slot: slot.id });
  }

  return (
    <>
      <div className="formula-readiness">
        <Readiness missing={current.suggestion.needs.length} />
        <p>
          <ReadinessSentence suggestion={current.suggestion} />
        </p>
      </div>
      <h2>What goes in</h2>
      <ul className="slots stack">
        {current.suggestion.slots.map((filled) => {
          const { slot, ingredient, source, alternatives } = filled;
          return (
            <li key={slot.id}>
              <ListRow
                mark={ingredient ? <IngredientMarkLink ingredient={ingredient} /> : <EmptyMark />}
                title={
                  <>
                    <h3
                      className="slot-role"
                      tabIndex={-1}
                      ref={(heading) => {
                        if (heading) headings.current.set(slot.id, heading);
                      }}
                    >
                      {slot.role}
                    </h3>
                    <p className="slot-fill">
                      {ingredient ? <IngredientLink ingredient={ingredient} /> : "Nothing yet"}
                    </p>
                  </>
                }
                action={
                  <>
                    {(source || !slot.required) && (
                      <p className="tags">
                        {source && <span className="tag">{SOURCE_TAG[source]}</span>}
                        {!slot.required && <span className="tag">Optional</span>}
                      </p>
                    )}
                    {ingredient && source && !isCooksOwn(source) && (
                      <Button variant="primary" onClick={() => onAdd(slot.id, ingredient)}>
                        Add<span className="visually-hidden"> {ingredient.name} to your basket</span>
                      </Button>
                    )}
                    {undoable === slot.id && (
                      <Button ref={undoButton} onClick={undo}>
                        Undo<span className="visually-hidden"> swap of {slot.role}</span>
                      </Button>
                    )}
                  </>
                }
              >
                <p className="muted">{filled.reason}</p>
                {alternatives.length > 0 && (
                  // Keyed by the fill, so a swap closes the list.
                  <Disclosure
                    key={ingredient?.id}
                    summary={ingredient ? "Swap" : "Choose"}
                    hiddenSummary={slot.role}
                  >
                    <ul className="alternatives">
                      {alternatives.map((alternative) => (
                        <li key={alternative.id}>
                          <button
                            type="button"
                            className="alternative"
                            onClick={() => swap(filled, alternative)}
                          >
                            <IngredientMark ingredient={alternative} size="sm" />
                            <span className="visually-hidden">Use </span>
                            {alternative.name}
                          </button>
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
