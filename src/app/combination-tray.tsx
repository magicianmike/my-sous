"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, buttonClass } from "@/components/Button";
import { Toast } from "@/components/Toast";
import { TrayBar } from "@/components/TrayBar";
import { TrayView } from "@/components/TrayView";
import { COMBINATION_LIMIT, type Ingredient } from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "./combination";
import { useIsCaseStudy } from "./site-chrome";
import { IngredientLink, IngredientMarkLink } from "./ingredient-link";

/**
 * The tray, fed from the Combination in the URL: a bar docked at the foot of the screen, at every
 * width, that opens the tray as a modal sheet. What to make shows the Combination itself, so it
 * has no tray. Every change is announced from a live region outside the tray, and shown as a toast.
 */
export const CombinationTray = withSearchParams(function CombinationTray() {
  const { status, statusKey } = useKitchen();
  const pathname = usePathname();
  // The Case Study is a document about MySous, not a place to cook, so it has no tray either.
  const showDock = pathname !== "/suggestions" && !useIsCaseStudy();
  return (
    <>
      {showDock && <TrayDock />}
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
 * The bar and its sheet. The open sheet has its own live region, since a modal makes the page
 * behind it, and its live region, inert.
 */
function TrayDock() {
  const { status, statusKey } = useKitchen();
  // The page's toast would sit behind the modal sheet, so the sheet shows its own, just above it,
  // for changes made since it opened.
  const [openedAt, setOpenedAt] = useState(Infinity);
  const { combination, remove } = useCombination();
  const pathname = usePathname();
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
  // Toasts sit just above the docked bar, or the open sheet.
  useEffect(() => {
    const root = document.documentElement;
    const observer = new ResizeObserver((entries) => {
      for (const { target, borderBoxSize } of entries) {
        const property = target === sheet.current ? "--tray-sheet-height" : "--tray-dock-height";
        root.style.setProperty(property, `${Math.ceil(borderBoxSize[0].blockSize)}px`);
      }
    });
    observer.observe(dock.current!);
    observer.observe(sheet.current!);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--tray-dock-height");
      root.style.removeProperty("--tray-sheet-height");
    };
  }, []);
  return (
    <div ref={dock} className="tray-dock">
      <div className="tray-bar">
        <TrayBar
          ingredients={combination.ingredients}
          limit={COMBINATION_LIMIT}
          openerRef={opener}
          onOpen={() => {
            setOpenedAt(statusKey);
            sheet.current?.showModal();
            sheetHeading.current?.focus();
          }}
          action={seeWhatToMake}
          renderMark={(ingredient) => <IngredientMarkLink ingredient={ingredient} alone />}
        />
      </div>
      <dialog
        ref={sheet}
        className="tray-sheet"
        aria-labelledby={SHEET_HEADING}
        onClose={() => {
          // Back to the bar, unless closing moved focus on already, as following a link does.
          if (focusWasInSheet()) {
            opener.current?.focus();
          }
        }}
        // A tap on the backdrop lands on the dialog itself, outside its content.
        onClick={(event) => event.target === sheet.current && close()}
        onKeyDown={containTab}
      >
        <TrayView
          status={status}
          ingredients={combination.ingredients}
          titleId={SHEET_HEADING}
          limit={COMBINATION_LIMIT}
          unknown={combination.unknown}
          overLimit={combination.overLimit}
          titleRef={sheetHeading}
          onRemove={(ingredient: Ingredient) => {
            remove(ingredient);
            sheetHeading.current?.focus();
          }}
          renderName={(ingredient) => <IngredientLink ingredient={ingredient} />}
          renderMark={(ingredient) => <IngredientMarkLink ingredient={ingredient} />}
        />
        <div className="tray-sheet-actions">
          <Button onClick={close}>Close</Button>
          {combination.ingredients.length > 0 && seeWhatToMake}
        </div>
        {status && statusKey > openedAt && (
          <div className="toast-spot toast-spot-sheet">
            <Toast key={statusKey} message={status} />
          </div>
        )}
      </dialog>
    </div>
  );
}

/** The sheet's heading, which names it. */
const SHEET_HEADING = "tray-sheet-heading";

/** What Tab can reach. */
const FOCUSABLE = [
  "a[href]:not([tabindex='-1'])",
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
  <CombinationLink href="/suggestions" className={buttonClass()}>
    <PanIcon />
    See what to make
  </CombinationLink>
);

/** A pan with a wisp of steam: something to cook. The words beside it carry the meaning. */
function PanIcon() {
  return (
    <svg
      className="button-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12h14v1.5a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5zM16.5 13h5M7.5 4.5c-1 1 1 2 0 3.5M11.5 4.5c-1 1 1 2 0 3.5" />
    </svg>
  );
}
