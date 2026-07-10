import { Add, MenuOutlined, SearchOutlined, ExpandMore, NotificationsNoneOutlined } from "../../icons/generated";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Foundations/Icon" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spike: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Add sx={{ fontSize: 24 }} />
        <MenuOutlined sx={{ fontSize: 24 }} />
        <SearchOutlined sx={{ fontSize: 24 }} />
        <ExpandMore sx={{ fontSize: 24 }} />
        <NotificationsNoneOutlined sx={{ fontSize: 24 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <SearchOutlined sx={{ fontSize: 16 }} />
        <SearchOutlined sx={{ fontSize: 20 }} />
        <SearchOutlined sx={{ fontSize: 32 }} />
        <SearchOutlined sx={{ fontSize: 20, color: "var(--hb-color-accent)" }} />
        <NotificationsNoneOutlined sx={{ fontSize: 20, color: "var(--hb-color-danger)" }} />
        <Add fontSize="small" />
      </div>
    </div>
  ),
};
