import type { Metadata } from "next";
import { IngredientMark } from "@/components/IngredientMark";
import { joinWithAnd } from "@/kitchen/kitchen";
import { CombinationLink } from "../combination";
import { getKitchen } from "../kitchen";

export const metadata: Metadata = { title: "Cuisines" };

/** How many of a Cuisine's Ingredients its row draws: enough to tell it apart, few enough to glance at. */
const GLIMPSE = 5;

/**
 * Every Cuisine, named regionally: a second way into the same Ingredients and Pairings, as an index to
 * compare at a glance. Each is told apart by the Ingredients it leans on, drawn, rather than by a flag,
 * since a regional Cuisine isn't a country's. On a phone, the index keeps each name and its counts.
 */
export default async function CuisinesPage() {
  const kitchen = await getKitchen();
  return (
    <>
      <h1 id="cuisines">Cuisines</h1>
      <p className="lede">What&rsquo;s common in a cooking tradition, and what pairs in it.</p>
      <table className="cuisine-table" aria-labelledby="cuisines">
        <thead>
          <tr>
            <th scope="col">Cuisine</th>
            <th scope="col" className="wide-only">
              Where
            </th>
            <th scope="col" className="count">
              Ingredients
            </th>
            <th scope="col" className="count">
              Pairings
            </th>
            <th scope="col" className="wide-only">
              Leans on
            </th>
          </tr>
        </thead>
        <tbody>
          {kitchen.cuisines().map(({ id, name, description }) => {
            const { ingredients, mostPaired, pairings } = kitchen.cuisine(id)!;
            const glimpse = mostPaired.slice(0, GLIMPSE);
            return (
              <tr key={id}>
                <th scope="row">
                  <CombinationLink href={`/cuisines/${id}`}>{name}</CombinationLink>
                </th>
                <td className="wide-only muted">{description}</td>
                <td className="count">{ingredients.length}</td>
                <td className="count">{pairings.length}</td>
                <td className="wide-only">
                  {/* No name sits beside these drawings, so the cluster is one image named by its Ingredients. */}
                  <span className="cuisine-marks" role="img" aria-label={joinWithAnd(glimpse.map(({ name }) => name))}>
                    {glimpse.map((ingredient) => (
                      <IngredientMark key={ingredient.id} ingredient={ingredient} size="sm" />
                    ))}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
