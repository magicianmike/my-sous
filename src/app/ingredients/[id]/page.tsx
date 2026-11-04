import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip } from "@/components/Chip";
import { Disclosure } from "@/components/Disclosure";
import { hueStyle, IngredientMark } from "@/components/IngredientMark";
import { ListRow } from "@/components/ListRow";
import type { PairingReasonCategory } from "@/kitchen/categories";
import { commonIn, inSentence, type Ingredient } from "@/kitchen/kitchen";
import { AddToCombination, CombinationLink } from "../../combination";
import { IngredientLink, IngredientMarkLink } from "../../ingredient-link";
import { getKitchen } from "../../kitchen";
import { PairingFilter } from "./pairing-filter";

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
  // The Cuisines this Ingredient's Pairings are common in, once each, in content order.
  const pairingCuisines = kitchen
    .cuisines()
    .filter(({ id: cuisine }) => kitchen.pairingsFor(id, cuisine).length > 0);

  return (
    <div className="ingredient">
      <section className="hero hue" aria-labelledby="ingredient-name" style={hueStyle(ingredient.colour)}>
        <IngredientMark ingredient={ingredient} size="lg" drawIn />
        <div className="title">
          <h1 id="ingredient-name">{ingredient.name}</h1>
          <AddToCombination ingredientId={ingredient.id} />
        </div>
        {ingredient.cuisines.length > 0 && (
          <div className="common-in">
            <span id="common-in-label" className="muted">
              Common in
            </span>
            <ul className="chips" aria-labelledby="common-in-label">
              {ingredient.cuisines.map((cuisine) => (
                <li key={cuisine.id}>
                  <Chip colour={ingredient.colour}>
                    <CombinationLink href={`/cuisines/${cuisine.id}`}>{cuisine.name}</CombinationLink>
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="about">
          {ingredient.essay.split(/\n\s*\n/).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="tip">
            <h2>Tip</h2>
            <p>{ingredient.tip}</p>
          </div>
          {ingredient.culturalContext && (
            <>
              <h2>Cultural context</h2>
              <p className="context">{ingredient.culturalContext}</p>
            </>
          )}
        </div>
      </section>

      <div className="ingredient-pairings">
        {components.length > 0 && (
          <>
            <h2>Typically includes</h2>
            <ul className="chips components">
              {components.map(({ name, ingredient: component }) => (
                <li key={name}>
                  {component ? (
                    <Chip
                      colour={component.colour}
                      leading={<IngredientMarkLink ingredient={component} />}
                    >
                      <IngredientLink ingredient={component}>{name}</IngredientLink>
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
        <PairingFilter
          cuisines={pairingCuisines}
          groups={kitchen.pairingsByReason(id).map(({ category, heading, pairings }) => ({
            category,
            heading,
            rows: pairings.map(({ ingredient: paired, reasons, cuisines }) => ({
              key: paired.id,
              cuisines: cuisines.map(({ id }) => id),
              node: (
                <ListRow
                  mark={<IngredientMarkLink ingredient={paired} size="md" />}
                  title={<IngredientLink ingredient={paired} />}
                  action={<AddToCombination ingredientId={paired.id} />}
                >
                  {reasons.map((reason) => (
                    <div key={reason.note}>
                      <p>{reason.note}</p>
                      {(reason.detail || cuisines.length > 0) && (
                        <Disclosure summary="More" hiddenSummary={moreAbout(ingredient, paired, category)}>
                          {reason.detail && <p>{reason.detail}</p>}
                          {cuisines.length > 0 && <p className="muted">{commonIn(cuisines)}</p>}
                        </Disclosure>
                      )}
                    </div>
                  ))}
                </ListRow>
              ),
            })),
          }))}
        />
      </div>
    </div>
  );
}

/** Finishes "More" for assistive technology, so each one says which Pairing it opens. */
function moreAbout(ingredient: Ingredient, paired: Ingredient, category: PairingReasonCategory): string {
  return `about ${inSentence(ingredient)} and ${inSentence(paired)}, ${category}`;
}
