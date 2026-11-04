/** The Case Study's chapters, in reading order: the navigation lists them and each section takes its id. */
export const CHAPTERS = [
  { id: "summary", title: "In 60 seconds" },
  { id: "one-room", title: "One room: cutting the Pantry" },
  { id: "state-you-can-link-to", title: "State you can link to" },
  { id: "defaults-not-forms", title: "Defaults, not forms" },
  { id: "accessible-by-construction", title: "Accessible by construction" },
  { id: "whats-next", title: "What’s next" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];
