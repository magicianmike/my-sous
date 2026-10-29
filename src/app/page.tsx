import { CombinationLink } from "./combination";
import { getKitchen } from "./kitchen";

export default async function Home() {
  const kitchen = await getKitchen();
  return (
    <>
      <h1>Find what goes with what, and why.</h1>
      <h2>Start from an ingredient</h2>
      <ul className="ingredients">
        {kitchen.ingredients().map((ingredient) => (
          <li key={ingredient.id}>
            <CombinationLink href={`/ingredients/${ingredient.id}`}>{ingredient.name}</CombinationLink>
          </li>
        ))}
      </ul>
    </>
  );
}
