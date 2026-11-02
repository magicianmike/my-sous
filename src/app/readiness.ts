import { inSentence, type Suggestion } from "@/kitchen/kitchen";

const and = new Intl.ListFormat("en", { type: "conjunction" });

/** Whether a Suggestion is ready, or what it still needs and what would fill it, in one sentence. */
export function readinessSentence({ makeable, needs, slots }: Suggestion): string {
  if (makeable) return "Ready with your Combination.";
  const parts = needs.map((slot) => {
    const { ingredient, source } = slots.find((filled) => filled.slot === slot)!;
    if (!ingredient) return `${slot.role} (nothing pairs yet)`;
    return source === "swap"
      ? `${slot.role} (you chose ${inSentence(ingredient)})`
      : `${slot.role} (${inSentence(ingredient)} pairs best)`;
  });
  return `Also needs ${and.format(parts)}.`;
}
