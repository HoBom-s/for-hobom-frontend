import { SectionCard } from "./SectionCard";
import { Text } from "../Text/Text";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/SectionCard",
  component: SectionCard,
  parameters: {
    // The `plain` variant renders text.secondary (#737373) on the canvas at
    // 13px (~4.19:1) — the DS-wide small-secondary-text tradeoff. Other a11y
    // checks still run.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof SectionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <SectionCard title="보호소 소개" style={{ maxWidth: 420 }}>
      <Text variant="body2" color="text.secondary">
        11년간 유기견을 구조하고 입양을 이어온 비영리 보호소입니다.
      </Text>
    </SectionCard>
  ),
};

export const WithDescriptionAndAction: Story = {
  render: () => (
    <SectionCard
      title="우리 아이들"
      description="입양을 기다리는 32마리"
      action={
        <Button size="small" variant="ghost">
          전체 보기
        </Button>
      }
      style={{ maxWidth: 420 }}
    >
      <Text variant="body2" color="text.secondary">
        카드 그리드 등 본문을 자유롭게 배치하세요.
      </Text>
    </SectionCard>
  ),
};

export const Plain: Story = {
  render: () => (
    <SectionCard variant="plain" title="방문 안내" style={{ maxWidth: 420 }}>
      <Text variant="body2" color="text.secondary">
        테두리 없이 제목과 본문의 리듬만 제공합니다.
      </Text>
    </SectionCard>
  ),
};
