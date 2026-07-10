import { useState } from "react";
import { ko } from "date-fns/locale";
import { Calendar } from "./Calendar";
import { DatePicker } from "./DatePicker";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "DatePickers/Calendar",
  component: Calendar,
  parameters: {
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const InlineDemo = () => {
  const [value, setValue] = useState<Date | null>(null);

  return <Calendar value={value} locale={ko} onSelect={setValue} />;
};

export const Inline: Story = {
  render: () => <InlineDemo />,
};

export const Input: Story = {
  render: () => (
    <div style={{ width: 260, padding: 40 }}>
      <DatePicker label="보낼 날짜" locale={ko} />
    </div>
  ),
};
