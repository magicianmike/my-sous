import styles from "./EmptyMark.module.css";

/** A Slot with nothing in it yet: a recessed, dashed circle the size of a small IngredientMark. */
export function EmptyMark() {
  return <span className={styles.empty} aria-hidden="true" />;
}
