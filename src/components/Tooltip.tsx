"use client";

import {
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { cloneElement, useId, useState } from "react";
import styles from "./Tooltip.module.css";

type Props = {
  /** What the tooltip says; none hides it, keeping the control where it is, so focus stays on it. */
  label: string | null;
  /**
   * How assistive technology hears it. By default it's visual only, for a control whose own name has
   * the same words, such as an Ingredient's drawing. With `describes`, it's the control's description,
   * such as a source's title on a link that just says "Source".
   */
  describes?: boolean;
  /** One element, the control; with `describes`, it's given `aria-describedby`. */
  children: React.ReactElement<{ "aria-describedby"?: string }>;
};

/**
 * A short label beside a control, above it where there's room. It shows on mouse hover and on keyboard
 * focus, stays while the pointer is over it, and Escape dismisses it (WCAG 1.4.13). Touch has no hover,
 * so the control must make sense without it.
 */
export function Tooltip({ label, describes = false, children }: Props) {
  const [shown, setShown] = useState(false);
  const id = useId();
  const { refs, floatingStyles, context } = useFloating({
    open: shown,
    onOpenChange: setShown,
    placement: "top",
    // Fixed, so a card or panel that clips its overflow doesn't clip the tooltip; it stays in place in the page.
    strategy: "fixed",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { mouseOnly: true, handleClose: safePolygon() }),
    useFocus(context),
    useDismiss(context),
  ]);

  return (
    <>
      <span ref={refs.setReference} className={styles.anchor} {...getReferenceProps()}>
        {describes ? cloneElement(children, { "aria-describedby": id }) : children}
      </span>
      {/* A description has to be in the page to be read, so it's hidden rather than left out. */}
      {label !== null && (shown || describes) && (
        <span
          ref={refs.setFloating}
          id={id}
          role={describes ? "tooltip" : undefined}
          aria-hidden={describes ? undefined : true}
          hidden={!shown}
          className={styles.tooltip}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {label}
        </span>
      )}
    </>
  );
}
