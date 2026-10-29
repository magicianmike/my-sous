import type { Metadata } from "next";
import { getKitchen } from "../kitchen";
import { Specimen, type SpecimenIngredient } from "./specimen";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
};

/** Every core component, rendered from fixture props alone, in the current theme. */
export default async function DesignPage() {
  const kitchen = await getKitchen();
  const ingredients: SpecimenIngredient[] = kitchen
    .ingredients()
    .map(({ id, name, colour, drawing }) => ({ id, name, colour, drawing }));
  return <Specimen ingredients={ingredients} />;
}
