import { EmptyMark } from "./EmptyMark";
import { IngredientMark, type IngredientLook } from "./IngredientMark";
import styles from "./MarkGroup.module.css";

type Props = {
  /** What the group is, in a word or two, such as "Yours" or "Suggested". */
  label: string;
  ingredients: IngredientLook[];
  /** Slots with nothing in them, shown as empty circles after the drawings, and how they read to
   * assistive technology, such as "1 Slot nothing pairs with yet". */
  empty?: { count: number; label: string };
};

/** A labelled row of small drawings; assistive technology hears the label and the names. */
export function MarkGroup({ label, ingredients, empty }: Props) {
  const names = ingredients.map(({ name }) => name.toLowerCase());
  if (empty?.count) names.push(empty.label);
  return (
    <div className={styles.group}>
      <span className={styles.label}>
        {label}
        <span className="visually-hidden">: {names.join(", ")}.</span>
      </span>
      <span className={styles.marks} aria-hidden="true">
        {ingredients.map((ingredient) => (
          <IngredientMark key={ingredient.id} ingredient={ingredient} size="sm" />
        ))}
        {Array.from({ length: empty?.count ?? 0 }, (_, i) => (
          <EmptyMark key={i} />
        ))}
      </span>
    </div>
  );
}
