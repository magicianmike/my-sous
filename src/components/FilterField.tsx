import { useId } from "react";
// The same field as the Combobox's, so both searches look alike.
import styles from "./Combobox.module.css";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Enter, for when what's typed names one thing to open. */
  onEnter?: () => void;
  /** What the filter shows now, announced as it changes: "2 ingredients match." */
  status: string;
  disabled?: boolean;
};

/** A search field that narrows what's on the page below it, rather than offering a list of its own. */
export function FilterField({ label, value, onChange, onEnter, status, disabled = false }: Props) {
  const id = useId();
  return (
    <div className={styles.combobox}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        // A search field: the browser clears it on Escape.
        type="search"
        autoComplete="off"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && onEnter?.()}
      />
      <p role="status" className={styles.status}>
        {status}
      </p>
    </div>
  );
}
