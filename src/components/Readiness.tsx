import styles from "./Readiness.module.css";

/**
 * Whether a Suggestion can be made with what the Cook has: "Ready", or how many required Slots it
 * still needs. Words carry the meaning; the icon only echoes them.
 */
export function Readiness({ needs }: { needs: number }) {
  return (
    <span className={`${styles.readiness} ${needs === 0 ? styles.ready : styles.needs}`}>
      {needs === 0 ? "Ready" : `Needs ${needs} more`}
    </span>
  );
}
