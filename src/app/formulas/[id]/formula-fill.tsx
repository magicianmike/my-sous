"use client";

import { useEffect, useRef, useState } from "react";
import { BasketIcon } from "@/components/BasketIcon";
import { Button } from "@/components/Button";
import { Disclosure } from "@/components/Disclosure";
import { EmptyMark } from "@/components/EmptyMark";
import { IngredientMark } from "@/components/IngredientMark";
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
import { RecipeBody, RecipeHeader } from "./recipe";

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
    .suggest(combination.ingredients)
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

/** A Suggestion as it stood after one of the Cook's changes, the Slot it changed, and what undoing it says. */
type Step = { suggestion: Suggestion; changed?: { slotId: string; undone: string } };

/** Where focus goes after a change or an undo; a fresh object each time, so it moves even to the same place. */
type FocusTarget = { undo: true } | { slot: string };

/** Where an Ingredient in a part came from, in a word; never left to colour. */
const SOURCE_TAG: Record<FillSource, string> = {
  combination: "Yours",
  pairing: "Suggested",
  recipe: "Suggested",
  swap: "Swapped",
  added: "Added",
};

/** The Cook's changes to a part, each with what it changed. */
type PartActions = {
  swap: (filled: FilledSlot, previous: Ingredient, ingredient: Ingredient) => void;
  add: (filled: FilledSlot, ingredient: Ingredient) => void;
  remove: (filled: FilledSlot, ingredient: Ingredient) => void;
  addToBasket: (slotId: string, ingredient: Ingredient) => void;
  undo: () => void;
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
  const recipe = kitchen.recipe(current.suggestion);
  // Only the latest change can be undone, so only its part offers Undo.
  const undoable = current.changed?.slotId;

  useEffect(() => {
    if (!focus) return;
    if ("undo" in focus) undoButton.current?.focus();
    else headings.current.get(focus.slot)?.focus();
  }, [focus]);

  function record(slotId: string, suggestion: Suggestion, done: string, undone: string) {
    setHistory([...history, { suggestion, changed: { slotId, undone } }]);
    announce(done);
    setFocus({ undo: true });
  }

  const actions: PartActions = {
    swap({ slot }, previous, ingredient) {
      record(
        slot.id,
        kitchen.swap(current.suggestion, slot.id, previous.id, ingredient.id),
        `${ingredient.name} is now ${slot.role}. Undo brings back ${inSentence(previous)}.`,
        `${previous.name} is ${slot.role} again`,
      );
    },
    add({ slot, fills }, ingredient) {
      record(
        slot.id,
        kitchen.addToSlot(current.suggestion, slot.id, ingredient.id),
        `${ingredient.name} is now ${fills.length > 0 ? "also " : ""}${slot.role}. Undo takes it out.`,
        `${ingredient.name} taken out of ${slot.role}`,
      );
    },
    remove({ slot }, ingredient) {
      record(
        slot.id,
        kitchen.removeFromSlot(current.suggestion, slot.id, ingredient.id),
        `${ingredient.name} taken out of ${slot.role}. Undo puts it back.`,
        `${ingredient.name} is back in ${slot.role}`,
      );
    },
    addToBasket: onAdd,
    undo() {
      const { slotId, undone } = current.changed!;
      const rest = history.slice(0, -1);
      setHistory(rest);
      announce(`Undone: ${undone}.`);
      // To the change before, if there is one, so the Cook can keep undoing; otherwise back to the part.
      setFocus(rest.length > 1 ? { undo: true } : { slot: slotId });
    },
  };

  return (
    <>
      {recipe && <RecipeHeader recipe={recipe} suggestion={current.suggestion} />}
      <div className="formula-readiness">
        <Readiness missing={current.suggestion.needs.length} />
        <p>
          <ReadinessSentence suggestion={current.suggestion} />
        </p>
      </div>
      <h2>What goes in</h2>
      <ul className="slots stack">
        {current.suggestion.slots.map((filled) => (
          <li key={filled.slot.id} className="part">
            <PartCard
              filled={filled}
              actions={actions}
              headingRef={(heading) => {
                if (heading) headings.current.set(filled.slot.id, heading);
              }}
              undoRef={undoable === filled.slot.id ? undoButton : undefined}
            />
          </li>
        ))}
      </ul>
      {recipe ? (
        <RecipeBody recipe={recipe} />
      ) : (
        <>
          <h2>Method</h2>
          <ol className="method">
            {current.suggestion.method.map((step, i) => (
              // Steps can repeat once filled in, and their order never changes.
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}

/** Ingredients to choose from, each a button that says what choosing it does. */
function Choices({ ingredients, verb, onChoose }: { ingredients: Ingredient[]; verb: string; onChoose: (ingredient: Ingredient) => void }) {
  return (
    <ul className="alternatives">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <button type="button" className="alternative" onClick={() => onChoose(ingredient)}>
            <IngredientMark ingredient={ingredient} size="sm" />
            <span className="visually-hidden">{verb} </span>
            {ingredient.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

/**
 * One part of the dish: its role as a label across the top, then each Ingredient in it, with why it's
 * there, Swap, Remove (while there's more than one) and Add to the basket; then Add another while the
 * part has room, and Undo after the Cook's latest change here.
 */
function PartCard({
  filled,
  actions,
  headingRef,
  undoRef,
}: {
  filled: FilledSlot;
  actions: PartActions;
  headingRef: (heading: HTMLHeadingElement | null) => void;
  /** Set on the part whose change can be undone. */
  undoRef?: React.Ref<HTMLButtonElement>;
}) {
  const { slot, fills, alternatives, emptyReason } = filled;
  const room = fills.length < slot.max && alternatives.length > 0;
  return (
    <>
      <div className="part-head">
        <h3 className="slot-role" tabIndex={-1} ref={headingRef}>
          {slot.role}
        </h3>
        {!slot.required && (
          <p className="tags">
            <span className="tag">Optional</span>
          </p>
        )}
      </div>
      {fills.length === 0 ? (
        <div className="part-fill">
          <EmptyMark size="md" />
          <div className="part-detail">
            <p className="slot-fill">Nothing yet</p>
            <p className="muted">{emptyReason}</p>
          </div>
        </div>
      ) : (
        <ul className="part-fills">
          {fills.map(({ ingredient, source, reason }) => (
            <li key={ingredient.id} className="part-fill">
              <IngredientMarkLink ingredient={ingredient} size="md" />
              <div className="part-detail">
                <div className="part-fill-title">
                  <p className="slot-fill">
                    <IngredientLink ingredient={ingredient} />
                  </p>
                  <span className="tag">{SOURCE_TAG[source]}</span>
                </div>
                <p className="muted">{reason}</p>
                {/* Swap and Remove at the start, Add to the basket at the end. */}
                <div className="slot-actions">
                  {alternatives.length > 0 && (
                    // Keyed by the fill, so a swap closes the list.
                    <Disclosure key={ingredient.id} summary="Swap" hiddenSummary={`${inSentence(ingredient)} in ${slot.role}`}>
                      <Choices
                        ingredients={alternatives}
                        verb="Use"
                        onChoose={(choice) => actions.swap(filled, ingredient, choice)}
                      />
                    </Disclosure>
                  )}
                  {fills.length > 1 && (
                    <Button onClick={() => actions.remove(filled, ingredient)}>
                      Remove<span className="visually-hidden"> {inSentence(ingredient)} from {slot.role}</span>
                    </Button>
                  )}
                  {!isCooksOwn(source) && (
                    <Button variant="primary" className="slot-add" onClick={() => actions.addToBasket(slot.id, ingredient)}>
                      <BasketIcon className="button-icon" />
                      Add<span className="visually-hidden"> {ingredient.name} to your basket</span>
                    </Button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {(room || undoRef) && (
        <div className="part-foot">
          {room && (
            // Keyed by what's in the part, so a choice closes the list.
            <Disclosure
              key={fills.map(({ ingredient }) => ingredient.id).join()}
              summary={fills.length === 0 ? "Choose" : "Add another"}
              hiddenSummary={fills.length === 0 ? slot.role : `to ${slot.role}`}
            >
              <Choices ingredients={alternatives} verb="Add" onChoose={(choice) => actions.add(filled, choice)} />
            </Disclosure>
          )}
          {undoRef && (
            <Button ref={undoRef} onClick={actions.undo}>
              Undo<span className="visually-hidden"> change to {slot.role}</span>
            </Button>
          )}
        </div>
      )}
    </>
  );
}
