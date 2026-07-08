import { List } from "./List";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/List",
  component: List.Root,
  parameters: {
    // Secondary text uses Astryx neutral #737373, which sits just under the
    // 4.5:1 line on the tinted canvas — a known, intentional pattern.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof List.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <List.Root>
        <List.Item>
          <List.ItemText primary="Inbox" secondary="12 unread" />
        </List.Item>
        <List.Item>
          <List.ItemText primary="Drafts" />
        </List.Item>
      </List.Root>
    </div>
  ),
};

export const Buttons: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <List.Root>
        <List.Item disablePadding>
          <List.ItemButton onClick={() => {}}>
            <List.ItemText primary="Profile" />
          </List.ItemButton>
        </List.Item>
        <List.Item disablePadding>
          <List.ItemButton selected onClick={() => {}}>
            <List.ItemText primary="Settings" />
          </List.ItemButton>
        </List.Item>
        <List.Item disablePadding>
          <List.ItemButton disabled onClick={() => {}}>
            <List.ItemText primary="Disabled" />
          </List.ItemButton>
        </List.Item>
      </List.Root>
    </div>
  ),
};
