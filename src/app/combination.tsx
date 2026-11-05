"use client";

import Link from "next/link";
import { BasketIcon } from "@/components/BasketIcon";
import { Button } from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, Suspense, useContext, useEffect, useMemo, useState } from "react";
import {
  COMBINATION_LIMIT,
  createKitchen,
  type Combination,
  type Ingredient,
  type Kitchen,
  type KitchenContent,
} from "@/kitchen/kitchen";

/** The Combination lives in the URL, as `?with=lemon,garlic`: the source of truth for it. */
const PARAM = "with";

export function hrefWith(path: string, ids: string[]): string {
  return ids.length > 0 ? `${path}?${PARAM}=${ids.join(",")}` : path;
}

/**
 * The Kitchen, plus the latest status message about the Combination. `statusKey` changes with
 * every message, even one that repeats the last, so it can be shown afresh.
 */
type KitchenState = { kitchen: Kitchen; status: string; statusKey: number; announce(message: string): void };

const KitchenContext = createContext<KitchenState | null>(null);

/** Rebuilds the Kitchen in the browser from content validated at build time. */
export function KitchenProvider({
  content,
  children,
}: {
  content: KitchenContent;
  children: React.ReactNode;
}) {
  const kitchen = useMemo(() => createKitchen(content), [content]);
  const [{ status, statusKey }, setStatus] = useState({ status: "", statusKey: 0 });
  const announce = (message: string) => setStatus(({ statusKey }) => ({ status: message, statusKey: statusKey + 1 }));
  const pathname = usePathname();
  useEffect(() => setStatus(({ statusKey }) => ({ status: "", statusKey })), [pathname]);
  return (
    <KitchenContext.Provider value={{ kitchen, status, statusKey, announce }}>
      {children}
    </KitchenContext.Provider>
  );
}

export function useKitchen(): KitchenState {
  const state = useContext(KitchenContext);
  if (!state) throw new Error("useKitchen needs a KitchenProvider");
  return state;
}

/**
 * A Combination fixed by the page rather than read from the URL, so the Case Study can show a live
 * component in a given state. Links inside carry it, so opening them lands in that state.
 */
const FixedCombinationContext = createContext<string[] | null>(null);

export function FixedCombination({ ids, children }: { ids: string[]; children: React.ReactNode }) {
  return <FixedCombinationContext.Provider value={ids}>{children}</FixedCombinationContext.Provider>;
}

/** The current Combination, read from the URL, and the ways to change it. */
export function useCombination() {
  const { kitchen, announce } = useKitchen();
  const router = useRouter();
  const pathname = usePathname();
  const fixed = useContext(FixedCombinationContext);
  const fromUrl = useSearchParams().get(PARAM);
  const combination: Combination = kitchen.combination(fixed ?? (fromUrl ? fromUrl.split(",") : []));
  const ids = combination.ingredients.map(({ id }) => id);

  function navigateTo(next: Ingredient[]) {
    router.push(hrefWith(pathname, next.map(({ id }) => id)), { scroll: false });
  }

  return {
    combination,
    href: (path: string) => hrefWith(path, ids),
    add(ingredient: Ingredient) {
      const next = kitchen.combination([...ids, ingredient.id]);
      if (next.overLimit.length > 0) {
        announce(
          `Your basket already holds ${COMBINATION_LIMIT} Ingredients, the most it can, so Suggestions stay focused. Remove one to add ${ingredient.name}.`,
        );
        return;
      }
      navigateTo(next.ingredients);
      announce(changed(ingredient, "added to", next.ingredients.length));
    },
    remove(ingredient: Ingredient) {
      const next = combination.ingredients.filter((i) => i !== ingredient);
      navigateTo(next);
      announce(changed(ingredient, "removed from", next.length));
    },
  };
}

function changed(ingredient: Ingredient, change: string, size: number): string {
  return `${ingredient.name} ${change} your basket, ${size} of ${COMBINATION_LIMIT}.`;
}

/** Wraps components that read the URL, which static pages can only do in the browser. */
export function withSearchParams<P extends object>(
  Component: React.ComponentType<P>,
  Fallback: React.ComponentType<P> = () => null,
) {
  return function WithSearchParams(props: P) {
    return (
      <Suspense fallback={<Fallback {...props} />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/** A link to another app screen that keeps the current Combination. */
export const CombinationLink = withSearchParams(
  function CombinationLink({ href, ...props }: LinkProps) {
    return <Link href={useCombination().href(href)} {...props} />;
  },
  ({ href, ...props }: LinkProps) => <Link href={href} {...props} />,
);

export const AddToCombination = withSearchParams(function AddToCombination({
  ingredientId,
}: {
  ingredientId: string;
}) {
  const { kitchen } = useKitchen();
  const { combination, add, remove } = useCombination();
  const ingredient = kitchen.ingredient(ingredientId)!;
  const added = combination.ingredients.includes(ingredient);
  // One button that changes its label, so keyboard focus stays on it after a press.
  return (
    <Button
      variant={added ? "secondary" : "primary"}
      onClick={() => (added ? remove(ingredient) : add(ingredient))}
    >
      {!added && <BasketIcon className="button-icon" />}
      {added ? "Remove" : "Add"}
      <span className="visually-hidden">
        {" "}
        {ingredient.name} {added ? "from" : "to"} your basket
      </span>
    </Button>
  );
});
