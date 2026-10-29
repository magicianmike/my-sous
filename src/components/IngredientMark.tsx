import styles from "./IngredientMark.module.css";

export type IngredientColour = { wash: string; washDark: string; stroke: string; strokeDark: string };

/** What a component needs to show an Ingredient: its name, colours and drawing. */
export type IngredientLook = { id: string; name: string; colour: IngredientColour; drawing: string };

type Props = {
  ingredient: Pick<IngredientLook, "colour" | "drawing">;
  size?: "sm" | "md" | "lg";
};

/** An Ingredient's line drawing on its own wash. Decorative: its name is always nearby. */
export function IngredientMark({ ingredient: { colour, drawing }, size = "md" }: Props) {
  return (
    <span className={`hue ${styles.mark} ${styles[size]}`} style={hueStyle(colour)} aria-hidden="true">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Drawings are content, checked at build time to hold only simple shapes.
        dangerouslySetInnerHTML={{ __html: drawing }}
      />
    </span>
  );
}

/**
 * Custom properties that let anything inside take on an Ingredient's colours in either theme.
 * Use with the `hue` class, which picks the pair for the current theme.
 */
export function hueStyle(colour: IngredientColour): React.CSSProperties {
  return {
    "--wash-light": colour.wash,
    "--wash-dark": colour.washDark,
    "--stroke-light": colour.stroke,
    "--stroke-dark": colour.strokeDark,
  } as React.CSSProperties;
}
