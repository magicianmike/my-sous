import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { EmptyMark } from "./EmptyMark";

const meta = {
  component: EmptyMark,
} satisfies Meta<typeof EmptyMark>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A Slot with nothing in it yet. Decorative: whatever holds it says what's missing. */
export const Small: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("span")).toHaveAttribute("aria-hidden", "true");
  },
};

export const Medium: Story = { args: { size: "md" } };
