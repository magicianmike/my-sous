import { Fragment } from "react";
import { inSentence, type Suggestion } from "@/kitchen/kitchen";
import { IngredientLink } from "./ingredient-link";

const and = new Intl.ListFormat("en", { type: "conjunction" });

/** Whether a Suggestion is ready, or what it still needs and what would fill it, in one sentence. */
export function ReadinessSentence({
  suggestion: { makeable, needs, fromPantry },
}: {
  suggestion: Suggestion;
}) {
  // With an empty Pantry, what's on hand is the basket.
  if (makeable) return fromPantry ? "Ready with what’s in your Pantry." : "Ready with your basket.";
  const parts = needs.map(({ slot, ingredient, source }) => {
    if (!ingredient) return <>{slot.role} (nothing pairs yet)</>;
    const name = <IngredientLink ingredient={ingredient}>{inSentence(ingredient)}</IngredientLink>;
    switch (source) {
      case "swap":
        return <>{slot.role} (you chose {name})</>;
      case "pairing":
        return <>{slot.role} ({name} pairs best)</>;
      default:
        // From the basket, but not in the Pantry.
        return <>{slot.role} ({name}, not in your Pantry)</>;
    }
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
