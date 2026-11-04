"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SegmentedControl } from "@/components/SegmentedControl";
import type { PairingReasonCategory } from "@/kitchen/categories";
import type { Cuisine } from "@/kitchen/kitchen";
import { withSearchParams } from "../../combination";

/** One Pairing's row, and the Cuisines it's common in, so it can be filtered to one. */
export type PairingRow = { key: string; cuisines: string[]; node: React.ReactNode };

export type PairingGroupView = { category: PairingReasonCategory; heading: string; rows: PairingRow[] };

type Props = {
  groups: PairingGroupView[];
  /** The Cuisines the Ingredient's Pairings are common in, to filter by. */
  cuisines: Cuisine[];
};

/** The Cuisine filter lives in the URL beside the basket, so a filtered view can be linked and Back clears it. */
const CUISINE = "cuisine";

/** An Ingredient's Pairings, grouped by Pairing Reason, with filters by reason and by Cuisine. */
export const PairingFilter = withSearchParams(
  function PairingFilter(props: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const requested = params.get(CUISINE);
    const cuisine = props.cuisines.find(({ id }) => id === requested);
    return (
      <Filtered
        {...props}
        cuisine={cuisine}
        onCuisine={(id) => {
          const next = new URLSearchParams(params);
          if (id) next.set(CUISINE, id);
          else next.delete(CUISINE);
          const query = next.toString();
          router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
        }}
      />
    );
  },
  // Before the browser takes over, every Pairing shows, unfiltered.
  (props: Props) => <Filtered {...props} />,
);

function Filtered({
  groups,
  cuisines,
  cuisine,
  onCuisine,
}: Props & { cuisine?: Cuisine; onCuisine?: (id: string | undefined) => void }) {
  const [shown, setShown] = useState<PairingReasonCategory | "all">("all");
  // Rows settle in on first paint only; filtering shows them as they are.
  const [settled, setSettled] = useState(false);
  const visible = groups.map((group) => ({
    ...group,
    rows: cuisine ? group.rows.filter((row) => row.cuisines.includes(cuisine.id)) : group.rows,
  }));
  const reasons = visible.filter(({ rows }) => rows.length > 0);
  const pairingCount = new Set(reasons.flatMap(({ rows }) => rows.map(({ key }) => key))).size;
  // Each row's place on the page, so the rows settle in one after another.
  let row = 0;

  return (
    <>
      <div className="pairing-filters">
        {groups.length > 1 && (
          <SegmentedControl
            label="Show Pairings by reason"
            options={[
              { value: "all", label: "All" },
              ...groups.map(({ category, heading }) => ({ value: category, label: heading })),
            ]}
            value={shown}
            onChange={(value) => {
              setSettled(true);
              setShown(value);
            }}
          />
        )}
        {cuisines.length > 0 && onCuisine && (
          <SegmentedControl
            label="Show Pairings common in"
            options={[
              { value: "", label: "Any cuisine" },
              ...cuisines.map(({ id, name }) => ({ value: id, label: name })),
            ]}
            value={cuisine?.id ?? ""}
            onChange={(value) => {
              setSettled(true);
              onCuisine(value || undefined);
            }}
          />
        )}
      </div>
      <p role="status" className="muted filter-status">
        {cuisine &&
          `${pairingCount} ${pairingCount === 1 ? "Pairing" : "Pairings"} common in ${cuisine.name} cooking.`}
      </p>
      <div className={settled ? undefined : "settling"}>
        {visible.map(({ category, heading, rows }) => {
          const headingId = `pairings-${category.replaceAll(" ", "-")}`;
          return (
            <section
              key={category}
              className="pairing-group"
              aria-labelledby={headingId}
              hidden={rows.length === 0 || (shown !== "all" && shown !== category)}
            >
              <h3 id={headingId}>{heading}</h3>
              <ul className="stack">
                {rows.map(({ key, node }) => (
                  <li key={key} style={{ "--row": row++ } as React.CSSProperties}>
                    {node}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
