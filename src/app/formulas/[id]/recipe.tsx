import { BANNER_SIZES, ContentImage } from "@/components/ContentImage";
import { IngredientMark } from "@/components/IngredientMark";
import { Tooltip } from "@/components/Tooltip";
import { inSentence, joinWithAnd, type Citation, type Recipe, type Suggestion } from "@/kitchen/kitchen";
import { useKitchen } from "../../combination";
import { IngredientLink } from "../../ingredient-link";

/** A source, linked when it's online. */
function Source({ citation: { title, url }, label }: { citation: Citation; label: string }) {
  // Just the word, so the guidance reads first; the title is its tooltip, and its description.
  return (
    <Tooltip label={title} describes>
      {url ? <a href={url}>{label}</a> : <cite tabIndex={0}>{label}</cite>}
    </Tooltip>
  );
}

/**
 * The dish's image: its Recipe's, captioned as the dish as written, since what fills it now may differ;
 * or its Formula's, a typical one. Without either, a dish with a Recipe keeps its frame, with the
 * drawings of what's in it now, and one without has none.
 */
export function DishImage({ suggestion, recipe }: { suggestion: Suggestion; recipe?: Recipe }) {
  const { kitchen } = useKitchen();
  const dish = kitchen.dishImage(suggestion);
  if (dish) {
    const caption = dish.asWritten
      ? `As written: ${joinWithAnd(dish.asWritten.map(inSentence))}.`
      : `A typical ${suggestion.formula.name.toLowerCase()}.`;
    return <ContentImage image={dish.image} sizes={BANNER_SIZES} priority caption={caption} className="dish-image" />;
  }
  if (!recipe) return null;
  return (
    <div className="recipe-image" aria-hidden="true">
      {suggestion.slots.flatMap(({ fills }) =>
        fills.map(({ ingredient }) => <IngredientMark key={ingredient.id} ingredient={ingredient} />),
      )}
    </div>
  );
}

/** How long a Recipe takes and how many it serves. */
export function RecipeHeader({ recipe }: { recipe: Recipe }) {
  const { serves, time } = recipe;
  return (
    <dl className="recipe-facts">
      <div>
        <dt>Serves</dt>
        <dd>{serves}</dd>
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
  );
}

/** How much of each Ingredient, then the full method, written for what fills the dish now. */
export function RecipeBody({ recipe }: { recipe: Recipe }) {
  return (
    <>
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
        {recipe.steps.map(({ text, safety }, i) => (
          // Steps never change order.
          <li key={i}>
            {text}
            {safety.map(({ ingredient, guidance }) => (
              <p key={ingredient?.id ?? "step"} className="safety-note">
                {/* Validation gives all safety guidance at least one citation. */}
                <span className="tag">Food safety</span> {guidance.note}{" "}
                {guidance.citations.map((citation, j, { length }) => (
                  <span key={j}>
                    {j > 0 && ", "}
                    <Source citation={citation} label={length > 1 ? `Source ${j + 1}` : "Source"} />
                  </span>
                ))}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </>
  );
}
