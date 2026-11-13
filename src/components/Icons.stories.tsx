import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { BasketIcon } from "./BasketIcon";
import { NewTabIcon } from "./NewTabIcon";
import { PlusIcon } from "./PlusIcon";
import { MoonIcon, SunIcon } from "./ThemeIcons";
import { TrashIcon } from "./TrashIcon";

/** Every icon, at the size buttons give them. All decorative: words always go with them. */
const meta = {
  title: "Components/Icons",
  render: () => (
    <ul style={{ display: "flex", gap: "var(--space-4)", listStyle: "none", padding: 0 }}>
      {[
        ["Basket", <BasketIcon key="basket" className="button-icon" />],
        ["Plus", <PlusIcon key="plus" className="button-icon" />],
        ["Trash", <TrashIcon key="trash" className="button-icon" />],
        ["New tab", <NewTabIcon key="new-tab" />],
        ["Sun", <SunIcon key="sun" />],
        ["Moon", <MoonIcon key="moon" />],
      ].map(([name, icon]) => (
        <li key={name as string} style={{ display: "grid", justifyItems: "center", gap: "var(--space-2)", width: "4rem" }}>
          <span style={{ width: "1.5rem", height: "1.5rem", display: "grid" }}>{icon}</span>
          <span className="muted">{name}</span>
        </li>
      ))}
    </ul>
  ),
} satisfies Meta;

export default meta;

export const All: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const icons = canvasElement.querySelectorAll("svg");
    await expect(icons).toHaveLength(6);
    for (const icon of icons) await expect(icon).toHaveAttribute("aria-hidden", "true");
  },
};
