import styles from "./EmptyMark.module.css";

/** A Slot with nothing in it yet: a recessed, dashed circle the size of an IngredientMark. */
export function EmptyMark({ size = "sm" }: { size?: "sm" | "md" }) {
  return <span className={`${styles.empty} ${styles[size]}`} aria-hidden="true" />;
}
