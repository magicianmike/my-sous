"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/SegmentedControl";
import type { PairingReasonCategory } from "@/kitchen/categories";

export type PairingGroupView = { category: PairingReasonCategory; heading: string; content: React.ReactNode };

/** An Ingredient's Pairings, grouped by Pairing Reason, with a filter when there's more than one. */
export function PairingFilter({ groups }: { groups: PairingGroupView[] }) {
  const [shown, setShown] = useState<PairingReasonCategory | "all">("all");
  const options = groups.map(({ category, heading }) => ({ value: category, label: heading }));
  return (
    <>
      {groups.length > 1 && (
        <SegmentedControl
          label="Show Pairings by reason"
          options={[{ value: "all", label: "All" }, ...options]}
          value={shown}
          onChange={setShown}
        />
      )}
      {groups.map(({ category, content }) => (
        <div key={category} hidden={shown !== "all" && shown !== category}>
          {content}
        </div>
      ))}
    </>
  );
}
