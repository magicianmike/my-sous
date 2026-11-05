import { Fragment } from "react";
import { inSentence, isCooksChoice, isCooksOwn, type Suggestion } from "@/kitchen/kitchen";
import { IngredientLink } from "./ingredient-link";

const and = new Intl.ListFormat("en", { type: "conjunction" });

/** Whether a Suggestion is ready, or what it still needs and what would fill it, in one sentence. */
export function ReadinessSentence({ suggestion: { makeable, needs } }: { suggestion: Suggestion }) {
  if (makeable) return "Ready with your basket.";
  const parts = needs.map(({ slot, fills }) => {
    // What the part still needs: everything in it that isn't from the basket.
    const missing = fills.filter(({ source }) => !isCooksOwn(source));
    if (missing.length === 0) return <>{slot.role} (nothing pairs yet)</>;
    const names = joined(
      missing.map(({ ingredient }) => (
        <IngredientLink key={ingredient.id} ingredient={ingredient}>
          {inSentence(ingredient)}
        </IngredientLink>
      )),
    );
    // A need is never the Cook's own, so a choice here was made on the dish.
    return missing.some(({ source }) => isCooksChoice(source)) ? (
      <>
        {slot.role} (you chose {names})
      </>
    ) : (
      <>
        {slot.role} ({names} {missing.length === 1 ? "pairs" : "pair"} best)
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
