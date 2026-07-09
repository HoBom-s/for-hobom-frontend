import { Skeleton } from "./Skeleton";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width="100%" height={56} />
      </div>
    </div>
  ),
};
