import { EmptyState } from "./EmptyState";
import { SearchOutlined } from "../../icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Patterns/EmptyState",
  component: EmptyState,
  parameters: {
    // The message uses the intentionally-muted disabled tone (< 4.5:1).
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { message: "표시할 데이터가 없어요" } };
export const WithIcon: Story = {
  args: {
    icon: <SearchOutlined sx={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />,
    message: "검색 결과가 없어요",
  },
};
