import styles from "./Toast.module.css";

/**
 * A short message that shows, then fades after `--toast-hold`. It's for the eye only: the container
 * announces the same message from a live region, which stays put so it's reliably heard. Give it a
 * new `key` for each message, so a repeated one shows afresh.
 */
export function Toast({ message }: { message: string }) {
  return (
    <p className={styles.toast} aria-hidden="true">
      {message}
    </p>
  );
}
