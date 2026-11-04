import type { Metadata } from "next";
import { CombinationLink } from "../combination";
import { getKitchen } from "../kitchen";

export const metadata: Metadata = { title: "Cuisines" };

/** Every Cuisine, named regionally: a second way into the same Ingredients and Pairings. */
export default async function CuisinesPage() {
  const kitchen = await getKitchen();
  return (
    <>
      <h1>Cuisines</h1>
      <p className="lede">What&rsquo;s common in a cooking tradition, and what pairs in it.</p>
      <ul className="stack cuisine-list">
        {kitchen.cuisines().map(({ id, name, description }) => (
          <li key={id}>
            <h2>
              <CombinationLink href={`/cuisines/${id}`}>{name}</CombinationLink>
            </h2>
            <p className="muted">{description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
