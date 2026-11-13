import type { Metadata } from "next";
import { Suspense } from "react";
import { getKitchen } from "../kitchen";
import { VariantSwitch } from "../prototype-switcher";
import { VARIANTS, VariantA, VariantB, VariantC, VariantD, VariantE } from "./cuisines-prototype";

export const metadata: Metadata = { title: "Cuisines" };

// PROTOTYPE: five layouts of the Cuisines page on the existing /cuisines route, switchable via `?variant=A`–`E`.

/**
 * Every Cuisine, named regionally: a second way into the same Ingredients and Pairings. Each is told apart
 * by the Ingredients it leans on, drawn, rather than by a flag, since a regional Cuisine isn't a country's.
 */
export default async function CuisinesPage() {
  const kitchen = await getKitchen();
  const views = kitchen.cuisines().map(({ id }) => kitchen.cuisine(id)!);
  const variants = {
    A: <VariantA views={views} />,
    B: <VariantB views={views} />,
    C: <VariantC views={views} />,
    D: <VariantD views={views} />,
    E: <VariantE views={views} />,
  };
  return (
    <Suspense fallback={variants.A}>
      <VariantSwitch variants={VARIANTS} views={variants} />
    </Suspense>
  );
}
