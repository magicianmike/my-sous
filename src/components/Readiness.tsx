import styles from "./Readiness.module.css";

/**
 * Whether a Suggestion can be made with what the Cook has: "Ready", or how many required Slots are
 * still missing. Words carry the meaning; the icon only echoes them.
 */
export function Readiness({ missing }: { missing: number }) {
  return (
    <span className={`${styles.readiness} ${missing === 0 ? styles.ready : styles.needs}`}>
      {missing === 0 ? "Ready" : `Needs ${missing} more`}
    </span>
  );
}
