"use client";

import { Button } from "@/components/Button";
import { PlusIcon } from "@/components/PlusIcon";
import { Tooltip } from "@/components/Tooltip";
import { TrashIcon } from "@/components/TrashIcon";
import { useCombination, useKitchen, withSearchParams } from "../combination";

/**
 * Add an Ingredient from the list without opening it: a plus, or a bin once it's in the basket. One
 * button that changes, so keyboard focus stays on it after a press.
 */
export const QuickAdd = withSearchParams(function QuickAdd({ ingredientId }: { ingredientId: string }) {
  const { kitchen } = useKitchen();
  const { combination, add, remove } = useCombination();
  const ingredient = kitchen.ingredient(ingredientId)!;
  const added = combination.ingredients.includes(ingredient);
  const words = added ? `Remove ${ingredient.name} from your basket` : `Add ${ingredient.name} to your basket`;
  return (
    <Tooltip label={words}>
      <Button variant="quiet" className={added ? "quick-remove" : undefined} onClick={() => (added ? remove(ingredient) : add(ingredient))}>
        {added ? <TrashIcon className="button-icon" /> : <PlusIcon className="button-icon" />}
        <span className="visually-hidden">{words}</span>
      </Button>
    </Tooltip>
  );
});
