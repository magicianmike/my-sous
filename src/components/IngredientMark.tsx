import styles from "./IngredientMark.module.css";

export type IngredientColour = { wash: string; washDark: string; stroke: string; strokeDark: string };

/** What a component needs to show an Ingredient: its name, colours and drawing. */
export type IngredientLook = { id: string; name: string; colour: IngredientColour; drawing: string };

type Props = {
  ingredient: Pick<IngredientLook, "colour" | "drawing">;
  size?: "sm" | "md" | "lg";
  /** Draws the lines in on first paint, as the Ingredient page's hero does. */
  drawIn?: boolean;
};

/** An Ingredient's line drawing on its own wash. Decorative: its name is always nearby. */
export function IngredientMark({ ingredient: { colour, drawing }, size = "md", drawIn = false }: Props) {
  return (
    <span
      className={["hue", "ingredient-mark", styles.mark, styles[size], drawIn && styles.drawIn].filter(Boolean).join(" ")}
      style={hueStyle(colour)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Drawings are content, checked at build time to hold only simple shapes.
        dangerouslySetInnerHTML={{ __html: drawIn ? withUnitLengths(drawing) : drawing }}
      />
    </span>
  );
}

/** Gives each shape a length of 1, so a dash of 1 can draw it in whatever its real length. */
function withUnitLengths(drawing: string): string {
  return drawing.replaceAll("/>", ' pathLength="1"/>');
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
