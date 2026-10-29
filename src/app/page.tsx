import { IngredientMark } from "@/components/IngredientMark";
import { CombinationLink } from "./combination";
import { IngredientSearch } from "./ingredient-search";
import { getKitchen } from "./kitchen";

export default async function Home() {
  const kitchen = await getKitchen();
  return (
    <>
      <h1>Find what goes with what, and why.</h1>
      <h2>Start from an ingredient</h2>
      <IngredientSearch />
      <ul id="all-ingredients" className="ingredient-links" aria-label="Every ingredient">
        {kitchen.ingredients().map((ingredient) => (
          <li key={ingredient.id}>
            <CombinationLink href={`/ingredients/${ingredient.id}`}>
              <IngredientMark ingredient={ingredient} size="sm" />
              {ingredient.name}
            </CombinationLink>
          </li>
        ))}
      </ul>
    </>
  );
}
