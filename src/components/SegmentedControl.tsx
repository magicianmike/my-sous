import { useId } from "react";
import styles from "./SegmentedControl.module.css";

type Props<V extends string> = {
  /** Names the group for assistive technology. */
  label: string;
  options: { value: V; label: string }[];
  value: V;
  onChange: (value: V) => void;
};

/** One choice from a few, as a row of segments. Native radios, so arrow keys move the choice. */
export function SegmentedControl<V extends string>({ label, options, value, onChange }: Props<V>) {
  const name = useId();
  return (
    <div role="radiogroup" aria-label={label} className={styles.group}>
      {options.map((option) => (
        <label key={option.value} className={styles.segment}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className={styles.input}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
