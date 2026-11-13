"use client";

// PROTOTYPE: throwaway. Shows one of a page's variants, chosen by `?variant=`, and cycles them with ← and →,
// or the arrows on the bar. Chosen in the browser, since every page is rendered statically.

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import styles from "./prototype-switcher.module.css";

type Variant = { key: string; name: string };

export function VariantSwitch({ variants, views }: { variants: Variant[]; views: Record<string, ReactNode> }) {
  const params = useSearchParams();
  const key = variants.some(({ key }) => key === params.get("variant")) ? params.get("variant")! : variants[0].key;
  return (
    <>
      {views[key]}
      {process.env.NODE_ENV !== "production" && <PrototypeSwitcher variants={variants} />}
    </>
  );
}

function PrototypeSwitcher({ variants }: { variants: Variant[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const index = Math.max(
    0,
    variants.findIndex(({ key }) => key === params.get("variant")),
  );
  const go = (step: number) => {
    const next = variants[(index + step + variants.length) % variants.length];
    const query = new URLSearchParams(params);
    query.set("variant", next.key);
    router.replace(`${pathname}?${query}`, { scroll: false });
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) return;
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const { key, name } = variants[index];
  return (
    <div className={styles.bar} role="toolbar" aria-label="Prototype variants">
      <button type="button" onClick={() => go(-1)} aria-label="Previous variant">
        ←
      </button>
      <span className={styles.label}>
        {key} · {name} <span className={styles.count}>({index + 1}/{variants.length})</span>
      </span>
      <button type="button" onClick={() => go(1)} aria-label="Next variant">
        →
      </button>
    </div>
  );
}
