"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useLayoutEffect, useState } from "react";
import { SegmentedControl } from "@/components/SegmentedControl";
import type { PairingReasonCategory } from "@/kitchen/categories";
import type { Cuisine } from "@/kitchen/kitchen";

/** One Pairing's row, and the Cuisines it's common in, so it can be filtered to one. */
export type PairingRow = { key: string; cuisineIds: string[]; node: React.ReactNode };

export type PairingGroupView = { category: PairingReasonCategory; heading: string; rows: PairingRow[] };

type Props = {
  groups: PairingGroupView[];
  /** The Cuisines the Ingredient's Pairings are common in, to filter by. */
  cuisines: Cuisine[];
};

/** The Cuisine filter lives in the URL beside the basket: a filtered view can be linked; Back clears it. */
const CUISINE = "cuisine";

/**
 * An Ingredient's Pairings, grouped by Pairing Reason, with filters by reason and by Cuisine. The list
 * stays the same elements from the page as first sent to the page once it's live, so its rows settle in
 * once; only reading the Cuisine from the URL waits for the browser.
 */
export function PairingFilter(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  // The Cuisine in the URL, or null for none; undefined until the browser takes over, when every
  // Pairing shows, unfiltered, with no Cuisine control.
  const [requested, setRequested] = useState<string | null>();
  const cuisine = props.cuisines.find(({ id }) => id === requested);
  return (
    <>
      <Suspense>
        <CuisineParam onRead={setRequested} />
      </Suspense>
      <PairingList
        {...props}
        cuisine={cuisine}
        onCuisine={
          requested !== undefined
            ? (id) => {
                const next = new URLSearchParams(window.location.search);
                if (id) next.set(CUISINE, id);
                else next.delete(CUISINE);
                const query = next.toString();
                router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
              }
            : undefined
        }
      />
    </>
  );
}

/**
 * Reads the Cuisine from the URL, once the browser has it and whenever it changes; shows nothing. Before
 * paint, so Back and Forward never show a frame of the old filter.
 */
function CuisineParam({ onRead }: { onRead: (id: string | null) => void }) {
  const requested = useSearchParams().get(CUISINE);
  useLayoutEffect(() => onRead(requested), [onRead, requested]);
  return null;
}

/**
 * The Pairings, filtered by reason here and by Cuisine as given. Without `onCuisine` (before the page is
 * live), the Cuisine control is hidden.
 */
function PairingList({
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
    rows: cuisine ? group.rows.filter((row) => row.cuisineIds.includes(cuisine.id)) : group.rows,
  }));
  // A Pairing with two reasons is in two groups, so count each once.
  const pairingCount = new Set(visible.flatMap(({ rows }) => rows.map(({ key }) => key))).size;
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
      {/* A polite live region rather than a second status, so the page keeps one status for the basket. */}
      <p aria-live="polite" className="muted filter-status">
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
