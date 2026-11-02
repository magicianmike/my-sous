import { hueStyle, IngredientMark } from "@/components/IngredientMark";
import { Tooltip } from "@/components/Tooltip";
import type { Ingredient } from "@/kitchen/kitchen";
import { CombinationLink } from "./combination";

type LinkProps = { ingredient: Ingredient; className?: string; children?: React.ReactNode };

/** A link to an Ingredient's page, by its name unless given other content; it takes the Ingredient's colour under the pointer. */
export function IngredientLink({ ingredient, className = "", children = ingredient.name }: LinkProps) {
  return (
    <CombinationLink
      href={`/ingredients/${ingredient.id}`}
      className={`hue ${className}`}
      style={hueStyle(ingredient.colour)}
    >
      {children}
    </CombinationLink>
  );
}

type MarkLinkProps = {
  ingredient: Ingredient;
  size?: "sm" | "md";
  /**
   * Named, for where no link with the Ingredient's name is nearby. Otherwise the drawing is a second way in
   * for the pointer only: hidden from assistive technology and skipped by Tab, so nothing is read twice.
   */
  named?: boolean;
  /** Shows the name above the drawing on hover or focus, for where the drawing stands without its name. */
  tooltip?: boolean;
};

/** An Ingredient's drawing, as a link to its page. */
export function IngredientMarkLink({ ingredient, size = "sm", named = false, tooltip = false }: MarkLinkProps) {
  const link = (
    <CombinationLink
      href={`/ingredients/${ingredient.id}`}
      className="mark-link"
      {...(named ? { "aria-label": ingredient.name } : { "aria-hidden": true, tabIndex: -1 })}
    >
      <IngredientMark ingredient={ingredient} size={size} />
    </CombinationLink>
  );
  return tooltip ? <Tooltip label={ingredient.name}>{link}</Tooltip> : link;
}
