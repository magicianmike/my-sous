import { useId } from "react";
import { EmptyMark } from "./EmptyMark";
import { IngredientMark, type IngredientLook } from "./IngredientMark";
import styles from "./MarkGroup.module.css";

type Props<T extends IngredientLook> = {
  /** What the group is, in a word or two, such as "Yours" or "Suggested". */
  label: string;
  ingredients: T[];
  /** Parts with nothing in them, shown as empty circles after the drawings, and how they read to
   * assistive technology, such as "1 part nothing pairs with yet". */
  empty?: { count: number; label: string };
  /** Each Ingredient's drawing, as a link to its page the container provides; it must carry the name. */
  renderMark?: (ingredient: T) => React.ReactNode;
};

/** A labelled row of small drawings; assistive technology hears the label, then each name. */
export function MarkGroup<T extends IngredientLook>({
  label,
  ingredients,
  empty,
  renderMark = (ingredient) => (
    <>
      <IngredientMark ingredient={ingredient} size="sm" />
      <span className="visually-hidden">{ingredient.name}</span>
    </>
  ),
}: Props<T>) {
  const labelId = useId();
  return (
    <div className={styles.group} role="group" aria-labelledby={labelId}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <span className={styles.marks}>
        {ingredients.map((ingredient) => (
          <span key={ingredient.id} className={styles.mark}>
            {renderMark(ingredient)}
          </span>
        ))}
        {empty && empty.count > 0 && (
          <span className={styles.mark}>
            <span className="visually-hidden">{empty.label}</span>
            {Array.from({ length: empty.count }, (_, i) => (
              <EmptyMark key={i} />
            ))}
          </span>
        )}
      </span>
    </div>
  );
}
