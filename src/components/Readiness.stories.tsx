import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Readiness } from "./Readiness";

const meta = {
  component: Readiness,
} satisfies Meta<typeof Readiness>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Words carry the meaning, not colour alone. */
export const Ready: Story = {
  args: { missing: 0 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Ready")).toBeVisible();
  },
};

export const Needs: Story = {
  args: { missing: 2 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Needs 2 more")).toBeVisible();
  },
};
