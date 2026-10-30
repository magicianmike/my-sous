"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, Suspense, useContext, useEffect, useMemo, useState } from "react";
import {
  COMBINATION_LIMIT,
  createKitchen,
  inSentence,
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

/** The Kitchen, plus the latest status message about the Combination. */
type KitchenState = { kitchen: Kitchen; status: string; announce(message: string): void };

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
  const [status, setStatus] = useState("");
  const pathname = usePathname();
  useEffect(() => setStatus(""), [pathname]);
  return (
    <KitchenContext.Provider value={{ kitchen, status, announce: setStatus }}>
      {children}
    </KitchenContext.Provider>
  );
}

export function useKitchen(): KitchenState {
  const state = useContext(KitchenContext);
  if (!state) throw new Error("useKitchen needs a KitchenProvider");
  return state;
}

/** The current Combination, read from the URL, and the ways to change it. */
export function useCombination() {
  const { kitchen, announce } = useKitchen();
  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams().get(PARAM);
  const combination: Combination = kitchen.combination(param ? param.split(",") : []);
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
          `Your Combination already holds ${COMBINATION_LIMIT} Ingredients, the most it can, so Suggestions stay focused. Remove one to add ${ingredient.name}.`,
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
    /** Puts `replacement` where `ingredient` was, keeping the Combination's order. */
    replace(ingredient: Ingredient, replacement: Ingredient) {
      navigateTo(combination.ingredients.map((i) => (i === ingredient ? replacement : i)));
      announce(`${ingredient.name} swapped for ${inSentence(replacement)} in your Combination.`);
    },
  };
}

function changed(ingredient: Ingredient, change: string, size: number): string {
  return `${ingredient.name} ${change} Combination, ${size} of ${COMBINATION_LIMIT}.`;
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

type LinkProps = { href: string; children: React.ReactNode; className?: string };

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
      {added ? "Remove" : "Add"}
      <span className="visually-hidden">
        {" "}
        {ingredient.name} {added ? "from" : "to"} Combination
      </span>
    </Button>
  );
});
