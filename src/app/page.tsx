import { BasketIcon } from "@/components/BasketIcon";
import { ContentImage } from "@/components/ContentImage";
import { EmptyMark } from "@/components/EmptyMark";
import { IngredientMark } from "@/components/IngredientMark";
import { COMBINATION_LIMIT } from "@/kitchen/kitchen";
import { CombinationLink } from "./combination";
import { IngredientSearch } from "./ingredient-search";
import { getKitchen } from "./kitchen";

/** The basket step 2 shows filling: a Combination a Cook might start from. */
const EXAMPLE_BASKET = ["chicken-thigh", "garlic", "lemon"];

/** How many drawings the Ingredients card shows, as a glimpse rather than a list. */
const GLIMPSE = 6;

/**
 * Home teaches the one idea in three steps, with the search inside the first; then, set apart on a rule,
 * three cards to browse by instead. Each dish shown is one with a real picture.
 */
export default async function Home() {
  const kitchen = await getKitchen();
  const ingredients = kitchen.ingredients();
  const cuisines = kitchen.cuisines();
  const formulas = kitchen.formulas();
  const pictured = formulas.flatMap((formula) => {
    const image = kitchen.dishImage(kitchen.suggestion(formula.id, [])!)?.image;
    return image?.made === "ai-generated" ? [{ formula, image }] : [];
  });
  const [stepDish, browseDish] = pictured;
  const basket = ingredients.filter(({ id }) => EXAMPLE_BASKET.includes(id));
  return (
    <div className="home">
      <h1>Find what goes with what, and why.</h1>
      <ol className="home-steps">
        <li>
          <span className="step-number">1</span>
          <h2>Find an ingredient</h2>
          <p className="muted">From your fridge or not. Open it to see what pairs with it, and why.</p>
          <IngredientSearch />
        </li>
        <li>
          <span className="step-number">2</span>
          <h2>Fill your basket</h2>
          <p className="muted">Up to six ingredients you want to cook around.</p>
          <span className="step-basket" aria-hidden="true">
            <BasketIcon />
            {basket.map((ingredient) => (
              <IngredientMark key={ingredient.id} ingredient={ingredient} size="sm" />
            ))}
            {Array.from({ length: COMBINATION_LIMIT - basket.length }, (_, i) => (
              <EmptyMark key={i} />
            ))}
          </span>
        </li>
        <li>
          <span className="step-number">3</span>
          <h2>See what to make</h2>
          <p className="muted">Dishes your basket fits, each with a recipe.</p>
          {stepDish && (
            <CombinationLink href={`/formulas/${stepDish.formula.id}`} className="step-dish">
              <ContentImage image={stepDish.image} sizes="20rem" decorative noteOnImage />
              <span className="step-dish-name">{stepDish.formula.name}</span>
            </CombinationLink>
          )}
        </li>
      </ol>
      <section aria-labelledby="browse-by" className="browse-by">
        <h2 id="browse-by">Or browse by</h2>
        <ul className="browse-cards">
          <li>
            <CombinationLink href="/ingredients" className="browse-card">
              <span className="browse-art browse-marks" aria-hidden="true">
                {ingredients.slice(0, GLIMPSE).map((ingredient) => (
                  <IngredientMark key={ingredient.id} ingredient={ingredient} size="md" />
                ))}
              </span>
              <span className="browse-body">
                <span className="browse-title">Ingredients</span>
                <span className="muted">All {ingredients.length}, by kind, each with what pairs with it and why.</span>
                <span className="browse-cue">Browse ingredients →</span>
              </span>
            </CombinationLink>
          </li>
          <li>
            <CombinationLink href="/cuisines" className="browse-card">
              <span className="browse-art browse-names" aria-hidden="true">
                {cuisines.map(({ id, name }) => (
                  <span key={id}>{name}</span>
                ))}
              </span>
              <span className="browse-body">
                <span className="browse-title">Cuisines</span>
                <span className="muted">
                  {cuisines.length} cooking traditions, and what&rsquo;s common and pairs in each.
                </span>
                <span className="browse-cue">Browse cuisines →</span>
              </span>
            </CombinationLink>
          </li>
          <li>
            <CombinationLink href="/dishes" className="browse-card">
              <span className="browse-body">
                <span className="browse-title">Dishes</span>
                <span className="muted">{formulas.length} dishes, each with parts your ingredients fill.</span>
                <span className="browse-cue">Browse dishes →</span>
              </span>
              {browseDish && (
                // After the words, so they name the link, though it shows above them. Each picture says what it
                // is on it, so the band holds one, large enough to carry the note.
                <ContentImage
                  image={browseDish.image}
                  sizes="22rem"
                  decorative
                  noteOnImage
                  className="browse-art browse-dish"
                />
              )}
            </CombinationLink>
          </li>
        </ul>
      </section>
    </div>
  );
}
