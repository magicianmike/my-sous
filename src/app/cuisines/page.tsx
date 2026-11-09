import type { Metadata } from "next";
import { IngredientMark } from "@/components/IngredientMark";
import { joinWithAnd } from "@/kitchen/kitchen";
import { CombinationLink } from "../combination";
import { getKitchen } from "../kitchen";

export const metadata: Metadata = { title: "Cuisines" };

/** How many of a Cuisine's Ingredients its row draws: enough to tell it apart, few enough to glance at. */
const GLIMPSE = 5;

/**
 * Every Cuisine, named regionally: a second way into the same Ingredients and Pairings. Each is told apart
 * by the Ingredients it leans on, drawn, rather than by a flag, since a regional Cuisine isn't a country's.
 */
export default async function CuisinesPage() {
  const kitchen = await getKitchen();
  return (
    <>
      <h1>Cuisines</h1>
      <p className="lede">What&rsquo;s common in a cooking tradition, and what pairs in it.</p>
      <ul className="cuisine-list">
        {kitchen.cuisines().map(({ id, name, description }) => {
          const { ingredients, mostPaired } = kitchen.cuisine(id)!;
          const glimpse = mostPaired.slice(0, GLIMPSE);
          return (
            <li key={id}>
              <span className="cuisine-marks" role="img" aria-label={joinWithAnd(glimpse.map(({ name }) => name))}>
                {glimpse.map((ingredient) => (
                  <IngredientMark key={ingredient.id} ingredient={ingredient} size="sm" />
                ))}
              </span>
              <div>
                <h2>
                  <CombinationLink href={`/cuisines/${id}`}>{name}</CombinationLink>
                </h2>
                <p className="muted">{description}</p>
                <p className="cuisine-count">
                  {ingredients.length} {ingredients.length === 1 ? "ingredient" : "ingredients"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
