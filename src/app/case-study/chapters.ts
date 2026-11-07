/** The Case Study's chapters, in reading order: the navigation lists them and each section takes its id. */
export const CHAPTERS = [
  { id: "summary", title: "In 60 seconds" },
  { id: "one-room", title: "One room: cutting the Pantry" },
  { id: "state-you-can-link-to", title: "State you can link to" },
  { id: "defaults-not-forms", title: "Defaults, not forms" },
  { id: "honest-about-culture", title: "Honest about culture" },
  { id: "visual-direction", title: "Visual direction" },
  { id: "interaction-design", title: "Interaction design" },
  { id: "accessible-by-construction", title: "Accessible by construction" },
  { id: "architecture", title: "Architecture" },
  { id: "rejected", title: "What I rejected" },
  { id: "whats-next", title: "What’s next" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];
