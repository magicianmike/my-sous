import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
import { Disclosure, DisclosureToggle } from "./Disclosure";

const meta = {
  component: Disclosure,
  args: {
    summary: "More",
    hiddenSummary: "about lemon and garlic",
    children: <p>Add the lemon off the heat or at the very end.</p>,
  },
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvas, userEvent }) => {
    const body = canvas.getByText("Add the lemon off the heat or at the very end.");
    await expect(body).not.toBeVisible();

    // The hidden words tell this "More" apart from the others on a page.
    await userEvent.click(canvas.getByText("More"));
    await expect(body).toBeVisible();
  },
};

/**
 * Reached from the keyboard. Being a native disclosure, the browser itself opens it on Enter or Space,
 * which simulated keys don't trigger, so that part is left to the browser.
 */
export const FromTheKeyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByText("More").closest("summary")).toHaveFocus();
  },
};

/** The toggle on its own, for content that sits elsewhere in the layout. */
export const ToggleOnItsOwn: StoryObj<typeof DisclosureToggle> = {
  args: { summary: "More", hiddenSummary: "about lemon and garlic", controls: "lemon-garlic-more", onToggle: fn() },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <DisclosureToggle
          {...args}
          open={open}
          onToggle={() => {
            args.onToggle();
            setOpen(!open);
          }}
        />
        <p id={args.controls} hidden={!open}>
          Add the lemon off the heat or at the very end.
        </p>
      </>
    );
  },
  play: async ({ canvas, userEvent, args }) => {
    const toggle = canvas.getByRole("button", { name: "More about lemon and garlic" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAttribute("aria-controls", "lemon-garlic-more");

    await userEvent.click(toggle);
    await expect(args.onToggle).toHaveBeenCalledOnce();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("Add the lemon off the heat or at the very end.")).toBeVisible();
  },
};
