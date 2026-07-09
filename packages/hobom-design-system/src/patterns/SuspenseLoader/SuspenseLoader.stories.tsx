import { SuspenseLoader } from "./SuspenseLoader";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Patterns/SuspenseLoader", component: SuspenseLoader } satisfies Meta<
  typeof SuspenseLoader
>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: () => (
    <div style={{ position: "relative", width: 360, height: 200 }}>
      <SuspenseLoader />
    </div>
  ),
};
