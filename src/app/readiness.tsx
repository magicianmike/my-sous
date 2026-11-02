import { Fragment } from "react";
import { inSentence, type Suggestion } from "@/kitchen/kitchen";
import { IngredientLink } from "./ingredient-link";

const and = new Intl.ListFormat("en", { type: "conjunction" });

/** Whether a Suggestion is ready, or what it still needs and what would fill it, in one sentence. */
export function ReadinessSentence({ suggestion: { makeable, needs, slots } }: { suggestion: Suggestion }) {
  if (makeable) {
    return slots.some(({ source }) => source === "pantry")
      ? "Ready with your basket and Pantry."
      : "Ready with your basket.";
  }
  const parts = needs.map(({ slot, ingredient, source }) => {
    if (!ingredient) return <>{slot.role} (nothing pairs yet)</>;
    const name = <IngredientLink ingredient={ingredient}>{inSentence(ingredient)}</IngredientLink>;
    return source === "swap" ? (
      <>
        {slot.role} (you chose {name})
      </>
    ) : (
      <>
        {slot.role} ({name} pairs best)
      </>
    );
  });
  return <>Also needs {joined(parts)}.</>;
}

/** Joins phrases into a list in a sentence ("a, b and c"), as Intl.ListFormat joins strings. */
function joined(phrases: React.ReactNode[]): React.ReactNode {
  return and
    .formatToParts(phrases.map((_, i) => String(i)))
    .map((part, i) => (
      <Fragment key={i}>{part.type === "element" ? phrases[Number(part.value)] : part.value}</Fragment>
    ));
}
