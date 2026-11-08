"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BasketIcon } from "@/components/BasketIcon";
import { Button } from "@/components/Button";
import { DisclosureToggle } from "@/components/Disclosure";
import { EmptyMark } from "@/components/EmptyMark";
import { IngredientMark } from "@/components/IngredientMark";
import { Readiness } from "@/components/Readiness";
import {
  inSentence,
  isCooksOwn,
  joinWithAnd,
  type FilledSlot,
  type FillSource,
  type Ingredient,
  type Suggestion,
} from "@/kitchen/kitchen";
import { useCombination, useKitchen, withSearchParams } from "../../combination";
import { IngredientLink, IngredientMarkLink } from "../../ingredient-link";
import { ReadinessSentence } from "../../readiness";
import { DishImage, RecipeBody, RecipeHeader } from "./recipe";

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
  const suggestion = kitchen.suggestion(formulaId, combination.ingredients)!;
  // A new Combination starts a fresh history of changes.
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

/** Where focus goes after an undo; a fresh object each time, so it moves even to the same place. */
type FocusTarget = { undo: true } | { slot: string };

/** Where an Ingredient in a part came from, in a word; never left to colour. */
const SOURCE_TAG: Record<FillSource, string> = {
  combination: "Yours",
  pairing: "Suggested",
  recipe: "Suggested",
  added: "Added",
};

/** The Cook's changes to a part, each with what it changed. */
type PartActions = {
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
    // Focus stays on the checkbox the Cook just changed, ready for the next.
    announce(done);
  }

  const actions: PartActions = {
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
      <DishImage suggestion={current.suggestion} recipe={recipe} />
      {recipe && <RecipeHeader recipe={recipe} />}
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

/**
 * Every Ingredient that could be in a part, ticked while it's in it: ticking adds one, unticking takes
 * one out, so a swap is one of each. Unticking the last leaves the part empty.
 */
function Checklist({ filled, actions }: { filled: FilledSlot; actions: PartActions }) {
  const { slot, fills, choices } = filled;
  const id = useId();
  return (
    <fieldset className="checklist">
      <legend className="visually-hidden">Ingredients for {slot.role}</legend>
      <ul>
        {choices.map(({ ingredient, pairsWith }) => {
          const ticked = fills.some((fill) => fill.ingredient === ingredient);
          const hint = `${id}-${ingredient.id}`;
          return (
            <li key={ingredient.id}>
              <label className="check">
                <input
                  type="checkbox"
                  checked={ticked}
                  aria-describedby={pairsWith.length > 0 ? hint : undefined}
                  onChange={() => (ticked ? actions.remove(filled, ingredient) : actions.add(filled, ingredient))}
                />
                <span className="check-box" aria-hidden="true" />
                <IngredientMark ingredient={ingredient} size="sm" />
                {ingredient.name}
              </label>
              {pairsWith.length > 0 && (
                <span id={hint} className="muted check-hint">
                  pairs with {joinWithAnd(pairsWith.map(inSentence))}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

/**
 * One part of the dish: its role as a label across the top, with Options at the end to tick what's in
 * it, opening just below; then each Ingredient in it, with why it's there and Add to the basket; then
 * Undo after the Cook's latest change here.
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
  const { slot, fills, choices, emptyReason } = filled;
  const [open, setOpen] = useState(false);
  const optionsId = useId();
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
        {choices.length > 0 && (
          <DisclosureToggle
            summary="Options"
            hiddenSummary={`for ${slot.role}`}
            open={open}
            controls={optionsId}
            onToggle={() => setOpen(!open)}
          />
        )}
      </div>
      {choices.length > 0 && (
        <div id={optionsId} className="part-options" hidden={!open}>
          <Checklist filled={filled} actions={actions} />
        </div>
      )}
      {fills.length === 0 ? (
        <div className="part-fill">
          <EmptyMark size="md" />
          <div className="part-detail">
            <p className="slot-fill">{slot.required ? `Needs ${slot.role}` : "Nothing yet"}</p>
            <p className="muted">
              {emptyReason}
              {choices.length > 0 && " Choose one in Options."}
            </p>
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
                {!isCooksOwn(source) && (
                  <div className="slot-actions">
                    <Button variant="primary" onClick={() => actions.addToBasket(slot.id, ingredient)}>
                      <BasketIcon className="button-icon" />
                      Add<span className="visually-hidden"> {ingredient.name} to your basket</span>
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {undoRef && (
        <div className="part-foot">
          <Button ref={undoRef} onClick={actions.undo}>
            Undo<span className="visually-hidden"> change to {slot.role}</span>
          </Button>
        </div>
      )}
    </>
  );
}
