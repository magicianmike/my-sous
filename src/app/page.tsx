import { BasketIcon } from "@/components/BasketIcon";
import { IngredientMark } from "@/components/IngredientMark";
import { CombinationLink } from "./combination";
import { IngredientSearch } from "./ingredient-search";
import { getKitchen } from "./kitchen";

/** How many drawings the Ingredients door shows, as a glimpse rather than a list. */
const GLIMPSE = 5;

export default async function Home() {
  const kitchen = await getKitchen();
  const ingredients = kitchen.ingredients();
  const cuisines = kitchen.cuisines();
  return (
    <>
      <h1>Find what goes with what, and why.</h1>
      {/* The one concept to learn, said once, up front. */}
      <p className="home-intro">
        <BasketIcon />
        <span>
          Add up to four ingredients you want to cook around to your basket, from your fridge or not, and
          MySous suggests what to make.
        </span>
      </p>
      <h2>Start from an ingredient</h2>
      <IngredientSearch />
      <h2>Or browse</h2>
      <ul className="browse-doors">
        <li>
          <CombinationLink href="/ingredients" className="door">
            <span className="door-title">Browse ingredients</span>
            <span className="door-marks" aria-hidden="true">
              {ingredients.slice(0, GLIMPSE).map((ingredient) => (
                <IngredientMark key={ingredient.id} ingredient={ingredient} size="sm" />
              ))}
            </span>
            <span className="door-detail">{ingredients.length} ingredients, by kind</span>
          </CombinationLink>
        </li>
        <li>
          <CombinationLink href="/cuisines" className="door">
            <span className="door-title">Browse cuisines</span>
            <span className="door-detail">{cuisines.map(({ name }) => name).join(" · ")}</span>
          </CombinationLink>
        </li>
      </ul>
    </>
  );
}
