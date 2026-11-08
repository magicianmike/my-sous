"use client";

import { basketWords } from "@/components/AddToBasketButton";
import { Button } from "@/components/Button";
import { PlusIcon } from "@/components/PlusIcon";
import { Tooltip } from "@/components/Tooltip";
import { TrashIcon } from "@/components/TrashIcon";
import { useBasketToggle, withSearchParams } from "../combination";

/**
 * Add an Ingredient from the list without opening it: a plus, or a bin once it's in the basket. One
 * button that changes, so keyboard focus stays on it after a press. Both are icons alone, so both keep
 * their words in a tooltip, where Add's Remove has its words on it.
 */
export const QuickAdd = withSearchParams(function QuickAdd({ ingredientId }: { ingredientId: string }) {
  const { ingredient, added, toggle } = useBasketToggle(ingredientId);
  const words = basketWords(ingredient.name, added);
  return (
    <Tooltip label={words}>
      <Button variant="quiet" className={added ? "quick-remove" : undefined} onClick={toggle}>
        {added ? <TrashIcon className="button-icon" /> : <PlusIcon className="button-icon" />}
        <span className="visually-hidden">{words}</span>
      </Button>
    </Tooltip>
  );
});
