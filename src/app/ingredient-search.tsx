"use client";

import { useRouter } from "next/navigation";
import { Combobox } from "@/components/Combobox";
import type { Ingredient } from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "./combination";

/** What both searches over the Ingredients are called. */
export const FIND_AN_INGREDIENT = "Find an ingredient";

/** What a search says when nothing matches what's typed. */
export function notInMySous(query: string): string {
  return `“${query}” isn’t in MySous yet.`;
}

/** Type-to-find over the curated Ingredients. */
export const IngredientSearch = withSearchParams(
  function IngredientSearch() {
    const { kitchen } = useKitchen();
    const { href } = useCombination();
    const router = useRouter();
    return (
      <Combobox<Ingredient>
        label={FIND_AN_INGREDIENT}
        search={kitchen.search}
        getKey={({ id }) => id}
        getLabel={({ name }) => name}
        onChoose={({ id }) => router.push(href(`/ingredients/${id}`))}
        countNoun={["ingredient", "ingredients"]}
        listboxLabel="Matching ingredients"
        noMatch={notInMySous}
        noMatchHint={
          <>
            Try another spelling, or <CombinationLink href="/ingredients">browse every ingredient</CombinationLink>.
          </>
        }
      />
    );
  },
  // Before the browser takes over, the same field, disabled so nothing typed is lost.
  () => (
    <Combobox<Ingredient>
      disabled
      label={FIND_AN_INGREDIENT}
      search={() => []}
      getKey={({ id }) => id}
      getLabel={({ name }) => name}
      onChoose={() => {}}
      noMatch={() => ""}
    />
  ),
);
