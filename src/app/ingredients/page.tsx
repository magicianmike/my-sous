import type { Metadata } from "next";
import { IngredientMark } from "@/components/IngredientMark";
import { IngredientLink } from "../ingredient-link";
import { IngredientSearch } from "../ingredient-search";
import { getKitchen } from "../kitchen";

export const metadata: Metadata = { title: "Ingredients" };

/** Every Ingredient, by kind, with the search above for when the Cook knows what they want. */
export default async function IngredientsPage() {
  const kitchen = await getKitchen();
  return (
    <>
      <h1>Ingredients</h1>
      <p className="lede">Open one to see what pairs with it, and why.</p>
      <IngredientSearch />
      {kitchen.ingredientsByCategory().map(({ category, heading, ingredients }) => (
        <section key={category} className="ingredient-group" aria-labelledby={`category-${category}`}>
          <h2 id={`category-${category}`}>{heading}</h2>
          <ul className="ingredient-links">
            {ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <IngredientLink ingredient={ingredient}>
                  <IngredientMark ingredient={ingredient} size="sm" />
                  {ingredient.name}
                </IngredientLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
