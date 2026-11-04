import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IngredientMark } from "@/components/IngredientMark";
import type { Citation } from "@/kitchen/kitchen";
import { CombinationLink } from "../../../combination";
import { IngredientLink } from "../../../ingredient-link";
import { getKitchen } from "../../../kitchen";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const kitchen = await getKitchen();
  return kitchen
    .formulas()
    .filter(({ id }) => kitchen.showcase(id))
    .map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: (await getKitchen()).showcase(id)?.name };
}

/** A source, linked when it's online. */
function Source({ citation: { title, url } }: { citation: Citation }) {
  return url ? <a href={url}>{title}</a> : <cite>{title}</cite>;
}

export default async function ShowcaseRecipePage({ params }: Props) {
  const { id } = await params;
  const recipe = (await getKitchen()).showcase(id);
  if (!recipe) notFound();
  const { formula, time } = recipe;

  return (
    <>
      <CombinationLink href={`/formulas/${formula.id}`} className="back-link">
        Back to {formula.name}
      </CombinationLink>
      <h1>{recipe.name}</h1>
      {/* Where the image of the finished dish goes (#32); until then, the drawings of what's in it. */}
      <div className="recipe-image" aria-hidden="true">
        {recipe.fills.map(({ ingredient }) => (
          <IngredientMark key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
      <p>{recipe.intro}</p>
      <dl className="recipe-facts">
        <div>
          <dt>Serves</dt>
          <dd>{recipe.serves}</dd>
        </div>
        <div>
          <dt>Prep</dt>
          <dd>{time.prep} minutes</dd>
        </div>
        <div>
          <dt>Cook</dt>
          <dd>{time.cook} minutes</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>{time.total} minutes</dd>
        </div>
      </dl>
      <h2 id="ingredients-heading">Ingredients</h2>
      <ul className="recipe-ingredients" aria-labelledby="ingredients-heading">
        {recipe.ingredients.map(({ amount, name, ingredient, note }, i) => (
          <li key={i}>
            {/* The space keeps the amount and name apart when read aloud or copied. */}
            <span className="recipe-amount">{amount}</span>{" "}
            <span>
              {ingredient ? <IngredientLink ingredient={ingredient}>{name}</IngredientLink> : name}
              {note && <span className="muted">, {note}</span>}
            </span>
          </li>
        ))}
      </ul>
      <h2 id="method-heading">Method</h2>
      <ol className="method" aria-labelledby="method-heading">
        {recipe.steps.map(({ text, safety, citations }, i) => (
          // Steps never change order.
          <li key={i}>
            {text}
            {safety && (
              <p className="safety-note">
                {/* Validation gives every safety-sensitive step at least one citation. */}
                <span className="tag">Food safety</span> Source:{" "}
                {citations.map((citation, j) => (
                  <span key={j}>
                    {j > 0 && "; "}
                    <Source citation={citation} />
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ol>
      <p>
        <CombinationLink href={`/formulas/${formula.id}`}>Fill this dish from your basket</CombinationLink>
      </p>
    </>
  );
}
