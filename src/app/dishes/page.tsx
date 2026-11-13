import type { Metadata } from "next";
import { ContentImage } from "@/components/ContentImage";
import { ListRow } from "@/components/ListRow";
import { MarkGroup } from "@/components/MarkGroup";
import { joinWithAnd, type Formula } from "@/kitchen/kitchen";
import { CombinationLink } from "../combination";
import { IngredientMarkLink } from "../ingredient-link";
import { getKitchen } from "../kitchen";

export const metadata: Metadata = { title: "Dishes" };

/** A dish's parts in a sentence: the ones it needs, then the ones it can do without. */
function partsSentence({ slots }: Formula): string {
  const required = slots.filter(({ required }) => required).map(({ role }) => role);
  const optional = slots.filter(({ required }) => !required).map(({ role }) => role);
  return optional.length === 0
    ? `Parts: ${joinWithAnd(required)}.`
    : `Parts: ${required.join(", ")}, and optionally ${joinWithAnd(optional)}.`;
}

/**
 * Every dish, the third way in: what it is, the parts the Cook's Ingredients fill, and what it's made
 * with as written. Each opens the dish, filled from the basket.
 */
export default async function DishesPage() {
  const kitchen = await getKitchen();
  return (
    <>
      <h1>Dishes</h1>
      <p className="lede">Each dish has parts, such as an acid or a soft herb, and your ingredients fill them.</p>
      <ul className="stack" aria-label="Dishes">
        {kitchen.formulas().map((formula) => {
          // The dish as written: filled from its Recipe alone, with no basket.
          const asWritten = kitchen.suggestion(formula.id, [])!;
          const image = kitchen.dishImage(asWritten)?.image;
          const ingredients = kitchen.recipe(asWritten)?.asWritten ?? [];
          return (
            <li key={formula.id}>
              <ListRow
                media={
                  image && (
                    // The heading names the dish, so its image is decorative.
                    <ContentImage image={image} sizes="(min-width: 50rem) 40rem, 100vw" decorative noteOnImage className="card-image" />
                  )
                }
                title={
                  <h2>
                    <CombinationLink href={`/formulas/${formula.id}`}>{formula.name}</CombinationLink>
                  </h2>
                }
              >
                <p>{formula.description}</p>
                <p className="muted">{partsSentence(formula)}</p>
                {ingredients.length > 0 && (
                  <div className="mark-groups">
                    <MarkGroup
                      label="As written"
                      ingredients={ingredients}
                      renderMark={(ingredient) => <IngredientMarkLink ingredient={ingredient} named alone />}
                    />
                  </div>
                )}
              </ListRow>
            </li>
          );
        })}
      </ul>
    </>
  );
}
