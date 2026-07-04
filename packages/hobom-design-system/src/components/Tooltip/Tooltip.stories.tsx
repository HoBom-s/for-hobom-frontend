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
