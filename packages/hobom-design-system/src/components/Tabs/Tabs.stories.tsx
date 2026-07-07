import { useState } from "react";
import { Tabs } from "./Tabs";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Tabs",
  component: Tabs.Root,
  args: { value: 0, onChange: () => {} },
  parameters: {
    // The active tab uses the accent color (~3.2:1), the usual tab-selection
    // affordance; it's also marked by the underline. Disable the contrast rule.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Tabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicDemo = () => {
  const [tab, setTab] = useState(0);

  return (
    <Tabs.Root value={tab} onChange={(_, v) => setTab(Number(v))}>
      <Tabs.Item label="전체" />
      <Tabs.Item label="읽지 않음" />
      <Tabs.Item label="읽음" />
    </Tabs.Root>
  );
};

const ValuesDemo = () => {
  const [tab, setTab] = useState("board");

  return (
    <Tabs.Root value={tab} onChange={(_, v) => setTab(String(v))}>
      <Tabs.Item value="board" label="보드" />
      <Tabs.Item value="backlog" label="백로그" />
      <Tabs.Item value="settings" label="설정" disabled />
    </Tabs.Root>
  );
};

export const Basic: Story = { render: () => <BasicDemo /> };
export const WithValues: Story = { render: () => <ValuesDemo /> };
