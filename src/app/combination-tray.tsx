"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button, buttonClass } from "@/components/Button";
import { TrayBar } from "@/components/TrayBar";
import { TrayView } from "@/components/TrayView";
import { COMBINATION_LIMIT, type Ingredient } from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "./combination";

/** Where the tray is a side panel rather than a bar and sheet; matches `.tray-dock` in globals.css. */
const SIDE_PANEL = "(min-width: 56rem)";

/**
 * The tray, fed from the Combination in the URL: a side panel on wide screens, and on a phone a
 * bar that opens the same tray as a modal sheet. Only one shows at a time, so assistive technology
 * meets one tray. The live region sits outside both, so changes are announced either way.
 */
export const CombinationTray = withSearchParams(function CombinationTray() {
  const { status } = useKitchen();
  const { combination, remove } = useCombination();
  const pathname = usePathname();
  const panelHeading = useRef<HTMLHeadingElement>(null);
  const sheetHeading = useRef<HTMLHeadingElement>(null);
  const sheet = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

  const close = () => sheet.current?.close();

  // A link followed from the sheet leads to a new screen; so does widening into the side panel.
  useEffect(close, [pathname]);
  useEffect(() => {
    const wide = matchMedia(SIDE_PANEL);
    wide.addEventListener("change", close);
    return () => wide.removeEventListener("change", close);
  }, []);

  const tray = (titleId: string, heading: React.RefObject<HTMLHeadingElement | null>) => (
    <TrayView
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
    <div className="tray-dock">
      <div className="tray-panel">{tray("tray-heading", panelHeading)}</div>
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
        onClose={() => opener.current?.focus()}
        // A tap on the backdrop lands on the dialog itself, outside its content.
        onClick={(event) => event.target === sheet.current && close()}
        onKeyDown={containTab}
      >
        {tray("tray-sheet-heading", sheetHeading)}
        <Button className="tray-close" onClick={close}>
          Close
        </Button>
      </dialog>
      <p role="status" className="tray-status">
        {status}
      </p>
    </div>
  );
});

/** Keeps Tab and Shift+Tab cycling within a modal, rather than leaving for the browser's controls. */
function containTab(event: React.KeyboardEvent<HTMLElement>) {
  if (event.key !== "Tab") return;
  const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
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
