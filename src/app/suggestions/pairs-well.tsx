"use client";

import { Chip } from "@/components/Chip";
import { IngredientMark } from "@/components/IngredientMark";
import { PlusIcon } from "@/components/PlusIcon";
import { Tooltip } from "@/components/Tooltip";
import type { Ingredient } from "@/kitchen/kitchen";
import { useCombination, useKitchen } from "../combination";

/**
 * What pairs with the basket, best first, each one tap to add. Adding one
 * changes the address, so What to make follows; `onAdd` says where focus goes, since the chip leaves.
 */
export function PairsWell({ onAdd }: { onAdd: () => void }) {
  const { kitchen } = useKitchen();
  const { combination, add } = useCombination();
  const additions = kitchen.couldAdd(combination.ingredients);
  if (additions.length === 0) return null;
  return (
    <section className="pairs-well" aria-label="Pairs well">
      <ul>
        {additions.map(({ ingredient }) => (
          <li key={ingredient.id}>
            <Tooltip label={`Add ${ingredient.name} to your basket`}>
              <button type="button" onClick={() => addAndRefocus(ingredient)}>
                <Chip colour={ingredient.colour} dashed leading={<IngredientMark ingredient={ingredient} size="sm" />} trailing={<PlusIcon className="button-icon" />}>
                  <span className="visually-hidden">Add </span>
                  {ingredient.name}
                  <span className="visually-hidden"> to your basket</span>
                </Chip>
              </button>
            </Tooltip>
          </li>
        ))}
      </ul>
      <p className="muted">Add more Ingredients to see more dishes.</p>
    </section>
  );

  function addAndRefocus(ingredient: Ingredient) {
    add(ingredient);
    onAdd();
  }
}

