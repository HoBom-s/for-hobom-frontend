import { SkeletonList } from "./SkeletonList";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Patterns/SkeletonList", component: SkeletonList } satisfies Meta<
  typeof SkeletonList
>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 8 }}>
      <SkeletonList />
      <SkeletonList />
      <SkeletonList />
    </div>
  ),
};
