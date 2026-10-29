import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCombination, CombinationLink } from "../../combination";
import { getKitchen } from "../../kitchen";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const kitchen = await getKitchen();
  return kitchen.ingredients().map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: (await getKitchen()).ingredient(id)?.name };
}

export default async function IngredientPage({ params }: Props) {
  const { id } = await params;
  const kitchen = await getKitchen();
  const ingredient = kitchen.ingredient(id);
  if (!ingredient) notFound();

  return (
    <>
      <div className="title">
        <h1>{ingredient.name}</h1>
        <AddToCombination ingredientId={ingredient.id} />
      </div>
      <h2>Pairs well with</h2>
      <ul className="pairings">
        {kitchen.pairingsFor(id).map(({ ingredient: paired, reasons }) => (
          <li key={paired.id}>
            <div className="title">
              <CombinationLink href={`/ingredients/${paired.id}`}>{paired.name}</CombinationLink>
              <AddToCombination ingredientId={paired.id} />
            </div>
            {reasons.map((reason) => (
              <p key={reason.note}>{reason.note}</p>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
