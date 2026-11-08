"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilterField } from "@/components/FilterField";
import { IngredientMark } from "@/components/IngredientMark";
import type { Ingredient } from "@/kitchen/kitchen";
import { useCombination, useKitchen, withSearchParams } from "../combination";
import { IngredientLink } from "../ingredient-link";
import { FIND_AN_INGREDIENT, notInMySous } from "../ingredient-search";
import { QuickAdd } from "./quick-add";

/**
 * Every Ingredient, by kind, under a search that narrows the list in place: the list is the result, so
 * there's no dropdown. Enter opens the one Ingredient that matches.
 */
export const IngredientFinder = withSearchParams(
  function IngredientFinder() {
    const { kitchen } = useKitchen();
    const { href, combination } = useCombination();
    const router = useRouter();
    const [query, setQuery] = useState("");
    const typed = query.trim();
    const matches = typed ? kitchen.search(typed) : undefined;
    return (
      <>
        <FilterField
          label={FIND_AN_INGREDIENT}
          value={query}
          onChange={setQuery}
          onEnter={() => matches?.length === 1 && router.push(href(`/ingredients/${matches[0].id}`))}
          status={
            !matches
              ? ""
              : matches.length === 0
                ? notInMySous(typed)
                : `${matches.length} ${matches.length === 1 ? "ingredient matches" : "ingredients match"}.`
          }
          hint={matches?.length === 0 && "Try another spelling, or clear the search to see every ingredient."}
        />
        <IngredientGroups matching={matches} inBasket={combination.ingredients} />
      </>
    );
  },
  // Before the browser takes over, every Ingredient, under the same field, disabled so nothing typed is lost.
  function IngredientFinderLoading() {
    return (
      <>
        <FilterField label={FIND_AN_INGREDIENT} value="" onChange={() => {}} status="" disabled />
        <IngredientGroups />
      </>
    );
  },
);

/**
 * The Ingredients by kind, or only those `matching` when given, leaving out kinds with none of them. Those
 * `inBasket` are marked as chosen.
 */
function IngredientGroups({ matching, inBasket = [] }: { matching?: Ingredient[]; inBasket?: Ingredient[] }) {
  const { kitchen } = useKitchen();
  return kitchen
    .ingredientsByCategory()
    .map((group) => ({ ...group, ingredients: group.ingredients.filter((i) => !matching || matching.includes(i)) }))
    .filter(({ ingredients }) => ingredients.length > 0)
    .map(({ category, heading, ingredients }) => (
      <section key={category} className="ingredient-group" aria-labelledby={`category-${category}`}>
        <h2 id={`category-${category}`}>{heading}</h2>
        <ul className="ingredient-links">
          {ingredients.map((ingredient) => (
            <li key={ingredient.id} className={inBasket.includes(ingredient) ? "in-basket" : undefined}>
              <IngredientLink ingredient={ingredient}>
                <IngredientMark ingredient={ingredient} size="sm" />
                {ingredient.name}
              </IngredientLink>
              <span className="quick-add">
                <QuickAdd ingredientId={ingredient.id} />
              </span>
            </li>
          ))}
        </ul>
      </section>
    ));
}
