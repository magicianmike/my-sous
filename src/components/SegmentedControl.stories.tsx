import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
import { SegmentedControl } from "./SegmentedControl";
import { MoonIcon, SunIcon } from "./ThemeIcons";

type Reason = "all" | "contrast" | "tradition";

const meta = {
  component: SegmentedControl<Reason>,
  args: {
    label: "Show Pairings by reason",
    options: [
      { value: "all", label: "All" },
      { value: "contrast", label: "Contrast" },
      { value: "tradition", label: "Tradition" },
    ],
    value: "all",
    onChange: fn(),
  },
  // Holds the choice, as its container does.
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <SegmentedControl
        {...args}
        value={value}
        onChange={(chosen) => {
          args.onChange(chosen);
          setValue(chosen);
        }}
      />
    );
  },
} satisfies Meta<typeof SegmentedControl<Reason>>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A click chooses. Being native radios, the browser itself moves the choice on the arrow keys, which
 * simulated keys don't trigger, so that part is left to the browser.
 */
export const Choose: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await expect(canvas.getByRole("radiogroup", { name: "Show Pairings by reason" })).toBeVisible();
    await expect(canvas.getByRole("radio", { name: "All" })).toBeChecked();

    await userEvent.click(canvas.getByText("Contrast"));
    await expect(args.onChange).toHaveBeenCalledWith("contrast");
    await expect(canvas.getByRole("radio", { name: "Contrast" })).toBeChecked();
    await expect(canvas.getByRole("radio", { name: "All" })).not.toBeChecked();
  },
};

/** Before the page is live, while the value isn't known. */
export const NothingChosen: Story = {
  args: { value: undefined },
  play: async ({ canvas }) => {
    for (const radio of canvas.getAllByRole("radio")) await expect(radio).not.toBeChecked();
  },
};

/** The theme switch: icons on screen, labels still naming each. */
export const IconsOnly: StoryObj<typeof SegmentedControl<"light" | "dark">> = {
  args: {
    label: "Theme",
    iconsOnly: true,
    options: [
      { value: "light", label: "Light", icon: <SunIcon /> },
      { value: "dark", label: "Dark", icon: <MoonIcon /> },
    ],
    value: "light",
    onChange: fn(),
  },
  render: (args) => <SegmentedControl {...args} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radio", { name: "Light" })).toBeChecked();
    await expect(canvas.getByRole("radio", { name: "Dark" })).not.toBeChecked();
    // On screen, just the icons.
    await expect(canvas.queryByText("Dark")).toHaveClass("visually-hidden");
  },
};
