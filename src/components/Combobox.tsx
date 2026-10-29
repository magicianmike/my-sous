"use client";

import { useId, useState } from "react";
import styles from "./Combobox.module.css";

type Props<T> = {
  label: string;
  /** The matches for what's typed, best first. */
  search: (query: string) => T[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  onChoose: (item: T) => void;
  /** What to say when nothing matches, given the trimmed query. */
  noMatch: (query: string) => React.ReactNode;
  /** A next step to show under the no-match message. */
  noMatchHint?: React.ReactNode;
  /** Words for the match count, as in "2 ingredients found." */
  countNoun?: [singular: string, plural: string];
};

/** Type-to-find, following the ARIA combobox pattern with a listbox popup. */
export function Combobox<T>({
  label,
  search,
  getKey,
  getLabel,
  onChoose,
  noMatch,
  noMatchHint,
  countNoun = ["match", "matches"],
}: Props<T>) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const results = search(query);
  const expanded = open && results.length > 0;
  const typed = query.trim();
  const optionId = (item: T) => `${id}-option-${getKey(item)}`;

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && results.length > 0) {
      event.preventDefault();
      setOpen(true);
      // From no selection, Down goes to the first match and Up to the last; both wrap.
      const n = results.length;
      setActive((current) =>
        event.key === "ArrowDown" ? (current + 1) % n : current <= 0 ? n - 1 : current - 1,
      );
    } else if (event.key === "Enter" && expanded) {
      event.preventDefault();
      onChoose(results[Math.max(active, 0)]);
    } else if (event.key === "Escape") {
      // First Escape closes the list; a second clears the field.
      if (expanded) setOpen(false);
      else setQuery("");
      setActive(-1);
    }
  }

  return (
    <div className={styles.combobox}>
      <label htmlFor={`${id}-input`} className={styles.label}>
        {label}
      </label>
      <input
        id={`${id}-input`}
        className={styles.input}
        // A plain text field: browsers clear a search field on Escape themselves.
        type="text"
        autoComplete="off"
        role="combobox"
        aria-expanded={expanded}
        aria-controls={`${id}-listbox`}
        aria-autocomplete="list"
        aria-activedescendant={expanded && active >= 0 ? optionId(results[active]) : undefined}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onKeyDown={onKeyDown}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <ul id={`${id}-listbox`} role="listbox" aria-label={label} className={styles.listbox} hidden={!expanded}>
        {results.map((item, i) => (
          <li
            key={getKey(item)}
            id={optionId(item)}
            role="option"
            aria-selected={i === active}
            className={styles.option}
            // Keep focus in the field, so a click doesn't close the list before it lands.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onChoose(item)}
          >
            {getLabel(item)}
          </li>
        ))}
      </ul>
      <p role="status" className={styles.status}>
        {!typed
          ? ""
          : results.length === 0
            ? noMatch(typed)
            : expanded
              ? `${results.length} ${results.length === 1 ? countNoun[0] : countNoun[1]} found.`
              : ""}
      </p>
      {typed && results.length === 0 && noMatchHint && <p className={styles.hint}>{noMatchHint}</p>}
    </div>
  );
}
