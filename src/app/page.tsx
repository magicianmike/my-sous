import { BasketIcon } from "@/components/BasketIcon";
import { IngredientMark } from "@/components/IngredientMark";
import { CombinationLink } from "./combination";
import { IngredientLink } from "./ingredient-link";
import { IngredientSearch } from "./ingredient-search";
import { getKitchen } from "./kitchen";

export default async function Home() {
  const kitchen = await getKitchen();
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
      <ul id="all-ingredients" className="ingredient-links" aria-label="Every ingredient">
        {kitchen.ingredients().map((ingredient) => (
          <li key={ingredient.id}>
            <IngredientLink ingredient={ingredient}>
              <IngredientMark ingredient={ingredient} size="sm" />
              {ingredient.name}
            </IngredientLink>
          </li>
        ))}
      </ul>
      <p className="explore-cuisines">
        Or <CombinationLink href="/cuisines">explore by cuisine</CombinationLink>:{" "}
        {kitchen.cuisines().map(({ id, name }, i, all) => (
          <span key={id}>
            {i > 0 && (i === all.length - 1 ? " and " : ", ")}
            <CombinationLink href={`/cuisines/${id}`}>{name}</CombinationLink>
          </span>
        ))}
        .
      </p>
    </>
  );
}
