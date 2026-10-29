import { hueStyle, type IngredientColour } from "./IngredientMark";
import styles from "./Chip.module.css";

type Props = {
  children: React.ReactNode;
  /** An Ingredient's colours, to sit the chip on its wash. */
  colour?: IngredientColour;
  /** Something before the label, such as an IngredientMark. */
  leading?: React.ReactNode;
  /** An action after the label, such as a remove button. */
  trailing?: React.ReactNode;
};

/** A small rounded label; on an Ingredient's wash when given its colour. */
export function Chip({ children, colour, leading, trailing }: Props) {
  return (
    <span className={`${styles.chip} ${colour ? styles.hued : ""}`} style={colour && hueStyle(colour)}>
      {leading}
      <span className={styles.label}>{children}</span>
      {trailing}
    </span>
  );
}
