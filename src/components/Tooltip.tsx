"use client";

import { useEffect, useState } from "react";
import styles from "./Tooltip.module.css";

type Props = {
  /** What the tooltip says; the control it labels must carry the same words as its name, or be hidden. */
  label: string;
  children: React.ReactNode;
};

/**
 * A short label above something with no words of its own, such as an Ingredient's drawing. It shows on
 * hover and on keyboard focus, stays while the pointer is over it, and Escape dismisses it (WCAG 1.4.13).
 * Visual only: assistive technology hears the control's own name.
 */
export function Tooltip({ label, children }: Props) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!shown) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShown(false);
    };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [shown]);

  return (
    <span
      className={styles.anchor}
      onPointerEnter={(event) => event.pointerType === "mouse" && setShown(true)}
      onPointerLeave={() => setShown(false)}
      onFocus={(event) => event.target.matches(":focus-visible") && setShown(true)}
      onBlur={() => setShown(false)}
    >
      {children}
      {shown && (
        <span className={styles.tooltip} aria-hidden="true">
          {label}
        </span>
      )}
    </span>
  );
}
