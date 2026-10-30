import { useEffect, useRef } from "react";

/**
 * Which of `ids` arrived after first paint, so only they animate in. One that leaves and comes
 * back arrives again.
 */
export function useArrivals(ids: string[]): Set<string> {
  const present = useRef<Set<string>>(null);
  present.current ??= new Set(ids);
  useEffect(() => {
    for (const id of present.current!) if (!ids.includes(id)) present.current!.delete(id);
  });
  return new Set(ids.filter((id) => !present.current!.has(id)));
}
