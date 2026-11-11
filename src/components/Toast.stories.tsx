import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Toast } from "./Toast";

const meta = {
  component: Toast,
  args: { message: "Garlic added to your basket, 2 of 4." },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    // For the eye only: its container's live region is what's heard.
    const toast = canvasElement.querySelector("p")!;
    await expect(toast).toHaveTextContent(args.message);
    await expect(toast).toHaveAttribute("aria-hidden", "true");
  },
};
