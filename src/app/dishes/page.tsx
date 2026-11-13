import type { Metadata } from "next";
import { Suspense } from "react";
import { VariantSwitch } from "../prototype-switcher";
import { getKitchen } from "../kitchen";
import { VARIANTS, VariantA, VariantB, VariantC, VariantD, VariantE, type Dish } from "./dishes-prototype";

export const metadata: Metadata = { title: "Dishes" };

// PROTOTYPE: five layouts of the Dishes page on the existing /dishes route, switchable via `?variant=A`–`E`.

/**
 * Every dish, the third way in: what it is, the parts the Cook's Ingredients fill, and what it's made
 * with as written. Each opens the dish, filled from the basket.
 */
export default async function DishesPage() {
  const kitchen = await getKitchen();
  const dishes: Dish[] = kitchen.formulas().map((formula) => {
    // The dish as written: filled from its Recipe alone, with no basket.
    const asWritten = kitchen.suggestion(formula.id, [])!;
    return {
      formula,
      image: kitchen.dishImage(asWritten)?.image,
      ingredients: kitchen.recipe(asWritten)?.asWritten ?? [],
    };
  });
  const views = {
    A: <VariantA dishes={dishes} />,
    B: <VariantB dishes={dishes} />,
    C: <VariantC dishes={dishes} />,
    D: <VariantD dishes={dishes} />,
    E: <VariantE dishes={dishes} />,
  };
  return (
    <Suspense fallback={views.A}>
      <VariantSwitch variants={VARIANTS} views={views} />
    </Suspense>
  );
}
