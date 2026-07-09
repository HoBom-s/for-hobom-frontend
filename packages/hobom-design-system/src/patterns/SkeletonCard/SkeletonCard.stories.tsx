import { SkeletonCard } from "./SkeletonCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Patterns/SkeletonCard", component: SkeletonCard } satisfies Meta<
  typeof SkeletonCard
>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: () => <div style={{ width: 280 }}><SkeletonCard /></div> };
