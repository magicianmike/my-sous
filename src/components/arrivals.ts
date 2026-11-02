import { useEffect, useRef } from "react";
import styles from "./arrivals.module.css";

/**
 * The class that makes an Ingredient grow in when it arrives after first paint, for each of `ids`;
 * those already there at first paint don't. One that leaves and comes back arrives again.
 */
export function useArrivalClass(ids: string[]): (id: string) => string | undefined {
  const present = useRef<Set<string>>(null);
  present.current ??= new Set(ids);
  useEffect(() => {
    for (const id of present.current!) if (!ids.includes(id)) present.current!.delete(id);
  });
  return (id) => (present.current!.has(id) ? undefined : styles.arriving);
}
