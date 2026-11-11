import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  component: Button,
  args: { children: "Remove", onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole("button", { name: "Remove" });
    // Not a submit button, so it never sends a form it sits in.
    await expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Primary: Story = {
  args: { variant: "primary", children: "Swap basil for cilantro" },
};

export const Quiet: Story = {
  args: { variant: "quiet" },
};

/** Still focusable and announced, so it can say why it does nothing, unlike `disabled`. */
export const AriaDisabled: Story = {
  args: { "aria-disabled": "true", children: "Undo swap" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Undo swap" });
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await expect(button).toBeEnabled();
  },
};
