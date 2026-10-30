"use client";

import { useRouter } from "next/navigation";
import { Combobox } from "@/components/Combobox";
import type { Ingredient } from "@/kitchen/kitchen";
import { useCombination, useKitchen, withSearchParams } from "./combination";

/** Type-to-find over the curated Ingredients. */
export const IngredientSearch = withSearchParams(
  function IngredientSearch() {
    const { kitchen } = useKitchen();
    const { href } = useCombination();
    const router = useRouter();
    return (
      <Combobox<Ingredient>
        label="Find an ingredient"
        search={kitchen.search}
        getKey={({ id }) => id}
        getLabel={({ name }) => name}
        onChoose={({ id }) => router.push(href(`/ingredients/${id}`))}
        countNoun={["ingredient", "ingredients"]}
        listboxLabel="Matching ingredients"
        noMatch={(query) => `“${query}” isn’t in MySous yet.`}
        noMatchHint={
          <>
            Try another spelling, or <a href="#all-ingredients">browse every ingredient</a>.
          </>
        }
      />
    );
  },
  // Before the browser takes over, the same field, disabled so nothing typed is lost.
  () => (
    <Combobox<Ingredient>
      disabled
      label="Find an ingredient"
      search={() => []}
      getKey={({ id }) => id}
      getLabel={({ name }) => name}
      onChoose={() => {}}
      noMatch={() => ""}
    />
  ),
);
