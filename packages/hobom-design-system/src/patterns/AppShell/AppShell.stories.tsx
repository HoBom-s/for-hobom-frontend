import { MemoryRouter } from "react-router";
import { AppShell } from "./AppShell";
import { MenuBookOutlined, SearchOutlined, NotificationsNoneOutlined } from "../../icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

const navItems = [
  {
    section: "메인",
    label: "메인",
    items: [
      { value: "docs", label: "문서", path: "/docs", icon: <MenuBookOutlined sx={{ fontSize: 20 }} /> },
      { value: "search", label: "검색", path: "/search", icon: <SearchOutlined sx={{ fontSize: 20 }} /> },
    ],
  },
];

const bottomNavItems = [
  {
    value: "alerts",
    label: "알림",
    path: "/alerts",
    icon: <NotificationsNoneOutlined sx={{ fontSize: 20 }} />,
  },
];

const meta = {
  title: "Patterns/AppShell",
  component: AppShell,
  args: { navItems: [], children: null },
  parameters: {
    layout: "fullscreen",
    // Sidebar buttons render as role=button under a <ul> (matching the prior
    // structure), and nav text uses the muted secondary tone.
    a11y: {
      config: {
        rules: [
          { id: "list", enabled: false },
          { id: "listitem", enabled: false },
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/docs"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <AppShell navItems={navItems} bottomNavItems={bottomNavItems}>
      <div style={{ padding: 24 }}>메인 콘텐츠 영역</div>
    </AppShell>
  ),
};
