import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IngredientMark } from "@/components/IngredientMark";
import { inSentence } from "@/kitchen/kitchen";
import { CombinationLink } from "../../combination";
import { IngredientLink, IngredientMarkLink } from "../../ingredient-link";
import { getKitchen } from "../../kitchen";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getKitchen()).cuisines().map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: (await getKitchen()).cuisine(id)?.cuisine.name };
}

/** A Cuisine: the Ingredients common in it and the Pairings attested in it, each leading onward. */
export default async function CuisinePage({ params }: Props) {
  const { id } = await params;
  const kitchen = await getKitchen();
  const view = kitchen.cuisine(id);
  if (!view) notFound();
  const { cuisine, ingredients, pairings } = view;
  const others = kitchen.cuisines().filter((other) => other.id !== id);

  return (
    <>
      <CombinationLink href="/cuisines" className="back-link">
        All cuisines
      </CombinationLink>
      <h1>{cuisine.name}</h1>
      <p className="lede">{cuisine.description}</p>

      <h2>Common in {cuisine.name} cooking</h2>
      <ul className="ingredient-links" aria-label={`Ingredients common in ${cuisine.name} cooking`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <IngredientLink ingredient={ingredient}>
              <IngredientMark ingredient={ingredient} size="sm" />
              {ingredient.name}
            </IngredientLink>
          </li>
        ))}
      </ul>

      <h2>Pairings</h2>
      {pairings.length === 0 ? (
        <p className="muted">No Pairings in MySous are attested in {cuisine.name} cooking yet.</p>
      ) : (
        <ul className="stack cuisine-pairings">
          {pairings.map(({ ingredients: [a, b], reasons }) => (
            <li key={`${a.id}+${b.id}`}>
              {/* A pair of names standing alone, not a sentence, with their drawings as a second way in. */}
              <div className="cuisine-pairing">
                <span className="tension-marks">
                  <IngredientMarkLink ingredient={a} />
                  <IngredientMarkLink ingredient={b} />
                </span>
                <span>
                  <IngredientLink ingredient={a} /> and{" "}
                  <IngredientLink ingredient={b}>{inSentence(b)}</IngredientLink>
                </span>
              </div>
              <p className="muted">{reasons[0].note}</p>
            </li>
          ))}
        </ul>
      )}

      {others.length > 0 && (
        <>
          <h2>Other cuisines</h2>
          <ul className="chips">
            {others.map((other) => (
              <li key={other.id}>
                <CombinationLink href={`/cuisines/${other.id}`} className="cuisine-chip">
                  {other.name}
                </CombinationLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
