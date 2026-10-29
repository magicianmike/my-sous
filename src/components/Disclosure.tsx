import styles from "./Disclosure.module.css";

type Props = {
  /** What the toggle says, such as "More". */
  summary: React.ReactNode;
  /** Extra words for screen readers, so similar toggles can be told apart. */
  hiddenSummary?: string;
  children: React.ReactNode;
};

/** Content shown on request: a native disclosure, keyboard-operable and announced. */
export function Disclosure({ summary, hiddenSummary, children }: Props) {
  return (
    <details className={styles.disclosure}>
      <summary>
        {summary}
        {hiddenSummary && <span className="visually-hidden"> {hiddenSummary}</span>}
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
