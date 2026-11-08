"use client";

import { Chip } from "@/components/Chip";
import { IngredientMark } from "@/components/IngredientMark";
import { PlusIcon } from "@/components/PlusIcon";
import { joinWithAnd, type Ingredient } from "@/kitchen/kitchen";
import { useCombination, useKitchen } from "../combination";

/**
 * What pairs with the basket, each one tap to add, and the dishes each would bring in. Adding one
 * changes the address, so What to make follows; `onAdd` says where focus goes, since the chip leaves.
 */
export function PairsWell({ onAdd }: { onAdd: () => void }) {
  const { kitchen } = useKitchen();
  const { combination, add } = useCombination();
  const additions = kitchen.couldAdd(combination.ingredients);
  if (additions.length === 0) return null;
  const bringing = additions.filter(({ bringsIn }) => bringsIn.length > 0);
  return (
    <section className="pairs-well" aria-label="Pairs well">
      <ul>
        {additions.map(({ ingredient }) => (
          <li key={ingredient.id}>
            <button type="button" onClick={() => addAndRefocus(ingredient)}>
              <Chip colour={ingredient.colour} dashed leading={<IngredientMark ingredient={ingredient} size="sm" />} trailing={<PlusIcon className="button-icon" />}>
                <span className="visually-hidden">Add </span>
                {ingredient.name}
                <span className="visually-hidden"> to your basket</span>
              </Chip>
            </button>
          </li>
        ))}
      </ul>
      {bringing.length > 0 && (
        <p className="muted">
          {bringing
            .map(({ ingredient, bringsIn }) => `${ingredient.name} brings in ${joinWithAnd(bringsIn.map(({ name }) => name))}.`)
            .join(" ")}
        </p>
      )}
    </section>
  );

  function addAndRefocus(ingredient: Ingredient) {
    add(ingredient);
    onAdd();
  }
}

