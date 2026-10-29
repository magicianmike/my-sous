import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { inSentence, joinWithAnd, type Cuisine, type PairingGroup } from "@/kitchen/kitchen";
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

const CATEGORY_HEADINGS: Record<PairingGroup["category"], string> = {
  contrast: "Contrast",
  "aromatic bridge": "Aromatic bridge",
  texture: "Texture",
  tradition: "Tradition",
};

function commonIn(cuisines: Cuisine[]): string {
  return `Common in ${joinWithAnd(cuisines.map(({ name }) => name))} cooking.`;
}

export default async function IngredientPage({ params }: Props) {
  const { id } = await params;
  const kitchen = await getKitchen();
  const ingredient = kitchen.ingredient(id);
  if (!ingredient) notFound();
  const components = kitchen.blendComponents(id);

  return (
    <>
      <div className="title">
        <h1>{ingredient.name}</h1>
        <AddToCombination ingredientId={ingredient.id} />
      </div>
      {ingredient.cuisines.length > 0 && <p className="cuisines">{commonIn(ingredient.cuisines)}</p>}
      <div className="essay">
        {ingredient.essay.split(/\n\s*\n/).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {components.length > 0 && (
        <>
          <h2>Typically includes</h2>
          <ul className="components">
            {components.map(({ name, ingredient: component }) => (
              <li key={name}>
                {component ? (
                  <CombinationLink href={`/ingredients/${component.id}`}>{name}</CombinationLink>
                ) : (
                  name
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      <h2>Tip</h2>
      <p>{ingredient.tip}</p>
      {ingredient.culturalContext && (
        <>
          <h2>Cultural context</h2>
          <p>{ingredient.culturalContext}</p>
        </>
      )}

      <h2>Pairs well with</h2>
      {kitchen.pairingsByReason(id).map(({ category, pairings }) => {
        const headingId = `pairings-${category.replace(" ", "-")}`;
        return (
          <section key={category} aria-labelledby={headingId}>
            <h3 id={headingId}>{CATEGORY_HEADINGS[category]}</h3>
            <ul className="pairings">
              {pairings.map(({ ingredient: paired, reasons, cuisines }) => (
                <li key={paired.id}>
                  <div className="title">
                    <CombinationLink href={`/ingredients/${paired.id}`}>{paired.name}</CombinationLink>
                    <AddToCombination ingredientId={paired.id} />
                  </div>
                  {reasons.map((reason) => (
                    <div key={reason.note}>
                      <p>{reason.note}</p>
                      {(reason.detail || cuisines.length > 0) && (
                        <details>
                          <summary>
                            More
                            <span className="visually-hidden">
                              {" "}
                              about {inSentence(ingredient)} and {inSentence(paired)}
                            </span>
                          </summary>
                          {reason.detail && <p>{reason.detail}</p>}
                          {cuisines.length > 0 && <p className="cuisines">{commonIn(cuisines)}</p>}
                        </details>
                      )}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
