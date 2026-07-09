import { Accordion } from "./Accordion";
import { ExpandMore } from "../../icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Accordion",
  component: Accordion.Root,
} satisfies Meta<typeof Accordion.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 8 }}>
      {["Section one", "Section two"].map((title, index) => (
        <Accordion.Root key={title} defaultExpanded={index === 0}>
          <Accordion.Summary expandIcon={<ExpandMore />}>{title}</Accordion.Summary>
          <Accordion.Details>
            Collapsible content for {title.toLowerCase()} — it expands with a smooth height
            transition.
          </Accordion.Details>
        </Accordion.Root>
      ))}
    </div>
  ),
};
