import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <h1>{ingredient.name}</h1>
      <h2>Pairs well with</h2>
      <ul className="pairings">
        {kitchen.pairingsFor(id).map(({ ingredient: paired, reasons }) => (
          <li key={paired.id}>
            <Link href={`/ingredients/${paired.id}`}>{paired.name}</Link>
            {reasons.map((reason) => (
              <p key={reason.note}>{reason.note}</p>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
