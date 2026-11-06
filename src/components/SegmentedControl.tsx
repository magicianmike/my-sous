import { useId } from "react";
import styles from "./SegmentedControl.module.css";

type Props<V extends string> = {
  /** Names the group for assistive technology. */
  label: string;
  /** Each choice, with an optional decorative icon before its label. */
  options: { value: V; label: string; icon?: React.ReactNode }[];
  /** Before the page is live, while the value isn't known, nothing is chosen. */
  value: V | undefined;
  onChange: (value: V) => void;
  /** Icons alone on screen, for a control whose icons say it (the theme's sun and moon); labels still name each. */
  iconsOnly?: boolean;
};

/** One choice from a few, as a row of segments. Native radios, so arrow keys move the choice. */
export function SegmentedControl<V extends string>({ label, options, value, onChange, iconsOnly = false }: Props<V>) {
  const name = useId();
  return (
    <div role="radiogroup" aria-label={label} className={styles.group}>
      {options.map((option) => (
        <label key={option.value} className={`${styles.segment} ${iconsOnly ? styles.iconOnly : ""}`}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className={styles.input}
          />
          {option.icon}
          {iconsOnly ? <span className="visually-hidden">{option.label}</span> : option.label}
        </label>
      ))}
    </div>
  );
}
