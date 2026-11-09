import type { Metadata } from "next";
import { IngredientFinder } from "./ingredient-finder";

export const metadata: Metadata = { title: "Ingredients" };

/** Every Ingredient, by kind, with a search above that narrows the list for when the Cook knows what they want. */
export default function IngredientsPage() {
  return (
    <>
      <h1>Ingredients</h1>
      <p className="lede">Open one to see what pairs with it, and why. Or add it to your basket from here.</p>
      <IngredientFinder />
    </>
  );
}
