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

/**
 * A disclosure's toggle on its own, for when what it shows sits elsewhere in the layout: the caller
 * keeps it open or shut and puts `controls` on the content it shows.
 */
export function DisclosureToggle({
  summary,
  hiddenSummary,
  open,
  controls,
  onToggle,
}: Omit<Props, "children"> & { open: boolean; controls: string; onToggle: () => void }) {
  return (
    <button type="button" className={styles.toggle} aria-expanded={open} aria-controls={controls} onClick={onToggle}>
      {summary}
      {hiddenSummary && <span className="visually-hidden"> {hiddenSummary}</span>}
    </button>
  );
}
