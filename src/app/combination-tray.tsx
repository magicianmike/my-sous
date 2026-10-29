"use client";

import { useRef } from "react";
import { buttonClass } from "@/components/Button";
import { TrayView } from "@/components/TrayView";
import { COMBINATION_LIMIT } from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "./combination";

/** The tray, fed from the Combination in the URL. */
export const CombinationTray = withSearchParams(function CombinationTray() {
  const { kitchen, status } = useKitchen();
  const { combination, remove } = useCombination();
  const heading = useRef<HTMLHeadingElement>(null);

  return (
    <TrayView
      ingredients={combination.ingredients}
      limit={COMBINATION_LIMIT}
      unknown={combination.unknown}
      overLimit={combination.overLimit}
      status={status}
      titleRef={heading}
      onRemove={({ id }) => {
        remove(kitchen.ingredient(id)!);
        heading.current?.focus();
      }}
      action={
        <CombinationLink href="/suggestions" className={buttonClass("primary")}>
          See what to make
        </CombinationLink>
      }
    />
  );
});
