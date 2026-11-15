import { Suspense } from "react";
import { VARIANTS, VariantA, VariantB, VariantC, VariantD, VariantE, type HomeData } from "./home-prototype";
import { getKitchen } from "./kitchen";
import { VariantSwitch } from "./prototype-switcher";

// PROTOTYPE: five layouts of Home on the existing / route, switchable via `?variant=A`–`E`.

export default async function Home() {
  const kitchen = await getKitchen();
  const formulas = kitchen.formulas();
  const data: HomeData = {
    ingredients: kitchen.ingredients(),
    cuisines: kitchen.cuisines(),
    formulas,
    dishes: formulas
      .map((formula) => ({ formula, image: kitchen.dishImage(kitchen.suggestion(formula.id, [])!)?.image }))
      // Real pictures first, so the doors and collages lead with them.
      .toSorted((a, b) => Number(b.image?.made === "ai-generated") - Number(a.image?.made === "ai-generated")),
  };
  const views = {
    A: <VariantA {...data} />,
    B: <VariantB {...data} />,
    C: <VariantC {...data} />,
    D: <VariantD {...data} />,
    E: <VariantE {...data} />,
  };
  return (
    <Suspense fallback={views.A}>
      <VariantSwitch variants={VARIANTS} views={views} />
    </Suspense>
  );
}
