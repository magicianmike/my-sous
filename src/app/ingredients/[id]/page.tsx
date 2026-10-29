import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip } from "@/components/Chip";
import { Disclosure } from "@/components/Disclosure";
import { hueStyle, IngredientMark } from "@/components/IngredientMark";
import { ListRow } from "@/components/ListRow";
import { commonIn, inSentence } from "@/kitchen/kitchen";
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
  const components = kitchen.blendComponents(id);

  return (
    <>
      <section className="hero" aria-labelledby="ingredient-name" style={hueStyle(ingredient.colour)}>
        <IngredientMark ingredient={ingredient} size="lg" />
        <div className="title">
          <h1 id="ingredient-name">{ingredient.name}</h1>
          <AddToCombination ingredientId={ingredient.id} />
        </div>
        {ingredient.cuisines.length > 0 && (
          <p className="muted">
            <span className="visually-hidden">{commonIn(ingredient.cuisines)}</span>
            <span aria-hidden="true" className="chips">
              {ingredient.cuisines.map((cuisine) => (
                <Chip key={cuisine.id} colour={ingredient.colour}>
                  {cuisine.name}
                </Chip>
              ))}
            </span>
          </p>
        )}
        <div className="about">
          {ingredient.essay.split(/\n\s*\n/).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="tip">
            <b>Tip</b>
            <span>{ingredient.tip}</span>
          </p>
          {ingredient.culturalContext && <p className="context">{ingredient.culturalContext}</p>}
        </div>
      </section>

      {components.length > 0 && (
        <>
          <h2>Typically includes</h2>
          <ul className="chips components">
            {components.map(({ name, ingredient: component }) => (
              <li key={name}>
                {component ? (
                  <Chip colour={component.colour} leading={<IngredientMark ingredient={component} size="sm" />}>
                    <CombinationLink href={`/ingredients/${component.id}`}>{name}</CombinationLink>
                  </Chip>
                ) : (
                  <Chip>{name}</Chip>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>Pairs well with</h2>
      {kitchen.pairingsByReason(id).map(({ category, heading, pairings }) => {
        const headingId = `pairings-${category.replaceAll(" ", "-")}`;
        return (
          <section key={category} className="pairing-group" aria-labelledby={headingId}>
            <h3 id={headingId}>{heading}</h3>
            <ul className="stack">
              {pairings.map(({ ingredient: paired, reasons, cuisines }) => (
                <li key={paired.id}>
                  <ListRow
                    mark={<IngredientMark ingredient={paired} />}
                    title={<CombinationLink href={`/ingredients/${paired.id}`}>{paired.name}</CombinationLink>}
                    action={<AddToCombination ingredientId={paired.id} />}
                  >
                    {reasons.map((reason) => (
                      <div key={reason.note}>
                        <p>{reason.note}</p>
                        {(reason.detail || cuisines.length > 0) && (
                          <Disclosure
                            summary="More"
                            hiddenSummary={`about ${inSentence(ingredient)} and ${inSentence(paired)}, ${category}`}
                          >
                            {reason.detail && <p>{reason.detail}</p>}
                            {cuisines.length > 0 && <p className="muted">{commonIn(cuisines)}</p>}
                          </Disclosure>
                        )}
                      </div>
                    ))}
                  </ListRow>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
