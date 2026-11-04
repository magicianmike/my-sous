import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CombinationLink } from "../../combination";
import { getKitchen } from "../../kitchen";
import { FormulaFill } from "./formula-fill";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getKitchen()).formulas().map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: (await getKitchen()).formula(id)?.name };
}

export default async function FormulaPage({ params }: Props) {
  const { id } = await params;
  const kitchen = await getKitchen();
  const formula = kitchen.formula(id);
  if (!formula) notFound();

  return (
    <>
      <CombinationLink href="/suggestions" className="back-link">
        Back to what to make
      </CombinationLink>
      <h1>{formula.name}</h1>
      <p>{formula.description}</p>
      {kitchen.showcase(formula.id) && (
        <p>
          <CombinationLink href={`/formulas/${formula.id}/recipe`}>See a worked recipe</CombinationLink>
        </p>
      )}
      <FormulaFill formulaId={formula.id} />
    </>
  );
}
