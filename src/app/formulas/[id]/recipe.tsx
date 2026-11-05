import { IngredientMark } from "@/components/IngredientMark";
import { Tooltip } from "@/components/Tooltip";
import type { Citation, Recipe, Suggestion } from "@/kitchen/kitchen";
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

/** The finished dish's frame, and how long it takes and how many it serves. */
export function RecipeHeader({ recipe, suggestion }: { recipe: Recipe; suggestion: Suggestion }) {
  const { serves, time } = recipe;
  return (
    <>
      {/* Where the image of the finished dish goes (#32); until then, the drawings of what's in it. */}
      <div className="recipe-image" aria-hidden="true">
        {suggestion.slots.flatMap(({ fills }) =>
          fills.map(({ ingredient }) => <IngredientMark key={ingredient.id} ingredient={ingredient} />),
        )}
      </div>
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
    </>
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
              <p key={ingredient.id} className="safety-note">
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
