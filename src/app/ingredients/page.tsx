import type { Metadata } from "next";
import { Suspense } from "react";
import { VariantSwitch } from "../prototype-switcher";
import { IngredientFinder } from "./ingredient-finder";
import { PrototypeFinder, VARIANTS } from "./ingredients-prototype";

export const metadata: Metadata = { title: "Ingredients" };

// PROTOTYPE: five layouts of the Ingredients page on the existing /ingredients route, switchable via `?variant=A`–`E`.

/** Every Ingredient, by kind, with a search above that narrows the list for when the Cook knows what they want. */
export default function IngredientsPage() {
  const views = {
    A: <IngredientFinder />,
    B: <PrototypeFinder layout="B" />,
    C: <PrototypeFinder layout="C" />,
    D: <PrototypeFinder layout="D" />,
    E: <PrototypeFinder layout="E" />,
  };
  return (
    <>
      <h1>Ingredients</h1>
      <p className="lede">Open one to see what pairs with it, and why. Or add it to your basket from here.</p>
      <Suspense fallback={views.A}>
        <VariantSwitch variants={VARIANTS} views={views} />
      </Suspense>
    </>
  );
}
