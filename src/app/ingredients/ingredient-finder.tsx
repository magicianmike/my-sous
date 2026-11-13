"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilterField } from "@/components/FilterField";
import { IngredientMark } from "@/components/IngredientMark";
import type { Ingredient } from "@/kitchen/kitchen";
import { AddToCombination, useCombination, useKitchen, withSearchParams } from "../combination";
import { IngredientLink } from "../ingredient-link";
import { FIND_AN_INGREDIENT, notInMySous } from "../ingredient-search";

/**
 * Every Ingredient, by kind, with a search that narrows the list in place: the list is the result, so
 * there's no dropdown. Enter opens the one Ingredient that matches. On a wide screen the search and the
 * kinds stay in a sidebar beside the drawings.
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
      <FinderLayout
        field={
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
        }
        matching={matches}
        inBasket={combination.ingredients}
      />
    );
  },
  // Before the browser takes over, every Ingredient, under the same field, disabled so nothing typed is lost.
  function IngredientFinderLoading() {
    return (
      <FinderLayout
        field={<FilterField label={FIND_AN_INGREDIENT} value="" onChange={() => {}} status="" disabled />}
      />
    );
  },
);

type GroupsProps = { matching?: Ingredient[]; inBasket?: Ingredient[] };

/** The kinds with any Ingredients `matching`, when given, each with only those; or every kind. */
function useGroups(matching?: Ingredient[]) {
  const { kitchen } = useKitchen();
  return kitchen
    .ingredientsByCategory()
    .map((group) => ({
      ...group,
      ingredients: group.ingredients.filter((i) => !matching || matching.includes(i)),
    }))
    .filter(({ ingredients }) => ingredients.length > 0);
}

/** The search and an index of the kinds, in a sidebar that stays in view; the drawings beside it. */
function FinderLayout({ field, ...groups }: GroupsProps & { field: React.ReactNode }) {
  return (
    <div className="ingredient-finder">
      <div className="ingredient-sidebar">
        {field}
        <KindIndex matching={groups.matching} />
      </div>
      <div>
        <IngredientGroups {...groups} />
      </div>
    </div>
  );
}

/** A link to each kind on the page, with how many it holds: a column beside the drawings, or a row above them on a phone. */
function KindIndex({ matching }: GroupsProps) {
  const groups = useGroups(matching);
  if (groups.length === 0) return null;
  return (
    <nav aria-label="Kinds of ingredient">
      <ul className="kind-index">
        {groups.map(({ category, heading, ingredients }) => (
          <li key={category}>
            <a href={`#category-${category}`}>
              {heading} <span className="kind-count">{ingredients.length}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * The Ingredients by kind, or only those `matching` when given, leaving out kinds with none of them. Each is a
 * tile with its drawing large and an outlined Add, quieter than an Ingredient's page's own, since there are dozens;
 * those `inBasket` are marked as chosen.
 */
function IngredientGroups({ matching, inBasket = [] }: GroupsProps) {
  return useGroups(matching).map(({ category, heading, ingredients }) => (
    <section key={category} className="ingredient-group" aria-labelledby={`category-${category}`}>
      <h2 id={`category-${category}`}>{heading}</h2>
      <ul className="ingredient-gallery">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className={inBasket.includes(ingredient) ? "in-basket" : undefined}>
            <IngredientLink ingredient={ingredient}>
              <IngredientMark ingredient={ingredient} size="md" />
              {ingredient.name}
            </IngredientLink>
            <span className="tile-add">
              <AddToCombination ingredientId={ingredient.id} emphasis="secondary" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  ));
}
