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
  const formula = (await getKitchen()).formula(id);
  if (!formula) notFound();

  return (
    <>
      <CombinationLink href="/suggestions">Back to what to make</CombinationLink>
      <h1>{formula.name}</h1>
      <p>{formula.description}</p>
      <FormulaFill formulaId={formula.id} />
    </>
  );
}
