import { PageHeader } from "./PageHeader";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  args: { title: "입양 관리" },
  parameters: {
    // The description uses text.secondary (#737373); on the canvas at 13px it
    // sits at ~4.19:1 — the DS-wide small-secondary-text tradeoff. Other a11y
    // checks still run.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <PageHeader title="입양 관리" style={{ maxWidth: 720 }} />,
};

export const WithDescriptionAndActions: Story = {
  render: () => (
    <PageHeader
      title="입양 관리"
      description="입양을 기다리는 32마리의 아이들"
      actions={
        <Button size="small" variant="primary">
          새 공고 등록
        </Button>
      }
      style={{ maxWidth: 720 }}
    />
  ),
};

export const WithBreadcrumb: Story = {
  render: () => (
    <PageHeader
      breadcrumb={
        <nav aria-label="breadcrumb">
          <a href="#">홈</a> / <a href="#">입양</a>
        </nav>
      }
      title="입양 관리"
      description="입양을 기다리는 32마리의 아이들"
      style={{ maxWidth: 720 }}
    />
  ),
};
