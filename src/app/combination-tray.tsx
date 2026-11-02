"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button, buttonClass } from "@/components/Button";
import { Toast } from "@/components/Toast";
import { TrayBar } from "@/components/TrayBar";
import { TrayView } from "@/components/TrayView";
import { COMBINATION_LIMIT, type Ingredient } from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "./combination";

/** Where the tray is a side panel rather than a bar and sheet; matches `.tray-dock` in globals.css. */
const SIDE_PANEL = "(min-width: 56rem)";

/**
 * The tray, fed from the Combination in the URL: a side panel on wide screens, and on a phone a
 * bar that opens the same tray as a modal sheet. What to make shows the Combination itself, so it
 * has no tray. Every change is announced from a live region outside the tray, and shown as a toast.
 */
export const CombinationTray = withSearchParams(function CombinationTray() {
  const { status, statusKey } = useKitchen();
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/suggestions" && <TrayDock />}
      <p role="status" className="visually-hidden">
        {status}
      </p>
      {status && (
        <div className="toast-spot">
          <Toast key={statusKey} message={status} />
        </div>
      )}
    </>
  );
});

/**
 * The side panel, or the bar and its sheet; CSS shows one for the screen size, so assistive
 * technology meets one tray. The open sheet has its own live region, since a modal makes the page
 * behind it, and its live region, inert.
 */
function TrayDock() {
  const { status } = useKitchen();
  const { combination, remove } = useCombination();
  const pathname = usePathname();
  const panelHeading = useRef<HTMLHeadingElement>(null);
  const sheetHeading = useRef<HTMLHeadingElement>(null);
  const sheet = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const dock = useRef<HTMLDivElement>(null);

  const close = () => sheet.current?.close();
  // Focus is in the sheet, or was until the sheet hid and the browser dropped it to the page.
  const focusWasInSheet = () =>
    sheet.current!.contains(document.activeElement) || document.activeElement === document.body;

  // A link followed from the sheet leads to a new screen.
  useEffect(close, [pathname]);
  // The page keeps the docked bar's height clear when it scrolls a focused control into view.
  useEffect(() => {
    const root = document.documentElement;
    const observer = new ResizeObserver(([entry]) => {
      const height = matchMedia(SIDE_PANEL).matches ? 0 : Math.ceil(entry.borderBoxSize[0].blockSize);
      root.style.setProperty("--tray-dock-height", `${height}px`);
    });
    observer.observe(dock.current!);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--tray-dock-height");
    };
  }, []);
  // Widening into the side panel closes the sheet; focus that was in it moves to the panel, since
  // the bar it would return to is gone.
  useEffect(() => {
    const wide = matchMedia(SIDE_PANEL);
    const widen = () => {
      if (!wide.matches || !sheet.current?.open) return;
      const hadFocus = focusWasInSheet();
      close();
      if (hadFocus) panelHeading.current?.focus();
    };
    wide.addEventListener("change", widen);
    return () => wide.removeEventListener("change", widen);
  }, []);

  /** One tray; `announces` gives it its own live region, which only the modal sheet needs. */
  const tray = ({ titleId, heading, announces }: TrayPlacement) => (
    <TrayView
      status={announces ? status : undefined}
      ingredients={combination.ingredients}
      titleId={titleId}
      limit={COMBINATION_LIMIT}
      unknown={combination.unknown}
      overLimit={combination.overLimit}
      titleRef={heading}
      onRemove={(ingredient: Ingredient) => {
        remove(ingredient);
        heading.current?.focus();
      }}
      renderName={({ id, name }) => <CombinationLink href={`/ingredients/${id}`}>{name}</CombinationLink>}
      action={seeWhatToMake}
    />
  );

  return (
    <div ref={dock} className="tray-dock">
      <div className="tray-panel">
        {tray({ titleId: "tray-heading", heading: panelHeading, announces: false })}
      </div>
      <div className="tray-bar">
        <TrayBar
          ingredients={combination.ingredients}
          limit={COMBINATION_LIMIT}
          openerRef={opener}
          onOpen={() => {
            sheet.current?.showModal();
            sheetHeading.current?.focus();
          }}
          action={seeWhatToMake}
        />
      </div>
      <dialog
        ref={sheet}
        className="tray-sheet"
        aria-labelledby="tray-sheet-heading"
        onClose={() => {
          // Back to the bar, unless closing moved focus on already (as widening does).
          if (focusWasInSheet()) {
            opener.current?.focus();
          }
        }}
        // A tap on the backdrop lands on the dialog itself, outside its content.
        onClick={(event) => event.target === sheet.current && close()}
        onKeyDown={containTab}
      >
        {tray({ titleId: "tray-sheet-heading", heading: sheetHeading, announces: true })}
        <Button className="tray-close" onClick={close}>
          Close
        </Button>
      </dialog>
    </div>
  );
}

type TrayPlacement = {
  titleId: string;
  heading: React.RefObject<HTMLHeadingElement | null>;
  announces: boolean;
};

/** What Tab can reach. */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "summary",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

/** Keeps Tab and Shift+Tab cycling within a modal, rather than leaving for the browser's controls. */
function containTab(event: React.KeyboardEvent<HTMLElement>) {
  if (event.key !== "Tab") return;
  const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)];
  const [first, last] = [focusable[0], focusable.at(-1)];
  const active = document.activeElement;
  if (event.shiftKey && (active === first || !focusable.includes(active as HTMLElement))) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first?.focus();
  }
}

const seeWhatToMake = (
  <CombinationLink href="/suggestions" className={buttonClass("primary")}>
    See what to make
  </CombinationLink>
);
