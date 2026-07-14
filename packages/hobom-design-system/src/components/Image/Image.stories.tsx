import { Image } from "./Image";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Image",
  component: Image,
  args: {
    src: "https://picsum.photos/seed/hobom/640/480",
    alt: "예시 이미지",
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Image {...args} ratio="4 / 3" />
    </div>
  ),
};

export const Ratios: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ width: 200 }}>
        <Image {...args} ratio="1 / 1" />
      </div>
      <div style={{ width: 200 }}>
        <Image {...args} ratio="4 / 3" />
      </div>
      <div style={{ width: 200 }}>
        <Image {...args} ratio="16 / 9" />
      </div>
    </div>
  ),
};

export const Fallback: Story = {
  name: "Empty / error fallback",
  render: () => (
    <div style={{ width: 240 }}>
      <Image
        src={undefined}
        alt="이미지 없음"
        ratio="4 / 3"
        fallback={<span style={{ fontSize: "2rem", opacity: 0.5 }}>🐾</span>}
      />
    </div>
  ),
};
