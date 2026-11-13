import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
import { FilterField } from "./FilterField";

const names = ["Garlic", "Ginger", "Lemon", "Lime"];

const meta = {
  component: FilterField,
  args: { label: "Filter ingredients", value: "", status: "", onChange: fn(), onEnter: fn() },
  // Narrows a list below it, as the Ingredients page does, and says what's left.
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const matches = names.filter((name) => name.toLowerCase().includes(value.trim().toLowerCase()));
    return (
      <>
        <FilterField
          {...args}
          value={value}
          onChange={(typed) => {
            args.onChange(typed);
            setValue(typed);
          }}
          status={value.trim() ? `${matches.length} ${matches.length === 1 ? "ingredient matches" : "ingredients match"}.` : ""}
          hint={value.trim() && matches.length === 0 ? "Try a broader word, such as “citrus”." : undefined}
        />
        <ul aria-label="Ingredients">
          {matches.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </>
    );
  },
} satisfies Meta<typeof FilterField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Narrows: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const field = canvas.getByRole("searchbox", { name: "Filter ingredients" });
    await userEvent.type(field, "li");
    await expect(args.onChange).toHaveBeenLastCalledWith("li");
    await expect(canvas.getByText("2 ingredients match.")).toBeVisible();
    await expect(canvas.getAllByRole("listitem").map((item) => item.textContent)).toEqual(["Garlic", "Lime"]);
  },
};

/** Enter, for when what's typed names one thing to open. */
export const Enter: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByRole("searchbox"), "lemon{Enter}");
    await expect(args.onEnter).toHaveBeenCalledOnce();
  },
};

export const NoMatch: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("searchbox"), "yuzu");
    await expect(canvas.getByText("0 ingredients match.")).toBeVisible();
    await expect(canvas.getByText("Try a broader word, such as “citrus”.")).toBeVisible();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("searchbox")).toBeDisabled();
  },
};
