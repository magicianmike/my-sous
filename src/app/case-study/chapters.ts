/** The Case Study's chapters, in reading order: the navigation lists them and each section takes its id. */
export const CHAPTERS = [
  { id: "summary", title: "In 60 seconds" },
  { id: "one-basket", title: "One basket" },
  { id: "defaults", title: "Defaults that explain themselves" },
  { id: "honest-about-culture", title: "Honest about culture" },
  { id: "look-and-feel", title: "Look and feel" },
  { id: "stack", title: "The tech stack" },
  { id: "kitchen", title: "The Kitchen" },
  { id: "testing", title: "Testing" },
  { id: "building-with-claude", title: "Building with Claude" },
  { id: "rejected", title: "What I rejected, and what’s next" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];
