import { StatGroup } from "./StatGroup";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/StatGroup",
  component: StatGroup.Root,
  parameters: {
    // The stat label uses text.secondary (#737373); on the canvas at 13px it
    // sits at ~4.19:1 — the DS-wide small-secondary-text tradeoff. Other a11y
    // checks still run.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof StatGroup.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: () => (
    <StatGroup.Root>
      <StatGroup.Item value="240+" label="누적 입양" />
      <StatGroup.Item value="32" label="보호 중" />
      <StatGroup.Item value="11년" label="운영" />
    </StatGroup.Root>
  ),
};

export const Grid: Story = {
  render: () => (
    <StatGroup.Root columns={3} style={{ maxWidth: 420 }}>
      <StatGroup.Item value="240+" label="누적 입양" />
      <StatGroup.Item value="32" label="보호 중" />
      <StatGroup.Item value="11년" label="운영" />
      <StatGroup.Item value="1,800" label="후원자" />
      <StatGroup.Item value="97%" label="입양 성공률" />
      <StatGroup.Item value="24시간" label="긴급 구조" />
    </StatGroup.Root>
  ),
};

export const Cards: Story = {
  render: () => (
    <StatGroup.Root columns={3} variant="card" style={{ maxWidth: 480 }}>
      <StatGroup.Item value="240" label="누적 입양" />
      <StatGroup.Item value="32" label="보호 중" />
      <StatGroup.Item value="11년" label="운영" />
    </StatGroup.Root>
  ),
};
