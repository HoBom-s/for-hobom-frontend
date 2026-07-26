import { Breadcrumb } from "./Breadcrumb";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb.Root,
} satisfies Meta<typeof Breadcrumb.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.Item>
        <a href="#">홈</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="#">보호소</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item current>우리 아이들</Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb.Root separator="›">
      <Breadcrumb.Item>
        <a href="#">홈</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="#">입양</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item current>신청 내역</Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};
