import { expect, screen, userEvent, waitFor } from "storybook/test";
import { Tooltip } from "./Tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  args: {
    title: "Tooltip text",
    children: <button type="button">Hover me</button>,
  },
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    arrow: { control: "boolean" },
    enterDelay: { control: "number" },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithArrow: Story = {
  args: { title: "With an arrow", arrow: true },
};

export const Placements: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 48, padding: 64 }}>
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} {...args} placement={placement} title={`placement: ${placement}`}>
          <button type="button">{placement}</button>
        </Tooltip>
      ))}
    </div>
  ),
};

// Interaction test: hover opens the tooltip; Escape closes it. The content is
// portaled to the body, so it is queried via `screen`, not the canvas.
export const OpensOnHover: Story = {
  play: async ({ canvas, step }) => {
    const trigger = canvas.getByRole("button", { name: "Hover me" });

    await step("hover shows the tooltip", async () => {
      await userEvent.hover(trigger);
      await waitFor(() => expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip text"));
      await expect(trigger).toHaveAttribute("aria-describedby");
    });

    await step("Escape closes it", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
    });
  },
};
