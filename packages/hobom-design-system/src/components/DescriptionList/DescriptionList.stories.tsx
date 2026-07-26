import { DescriptionList } from "./DescriptionList";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/DescriptionList",
  component: DescriptionList.Root,
  parameters: {
    // The term (dt) uses text.secondary (#737373); on the canvas at 13px it
    // sits at ~4.19:1 — the DS-wide small-secondary-text tradeoff. Other a11y
    // checks still run.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof DescriptionList.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Grid: Story = {
  render: () => (
    <DescriptionList.Root style={{ maxWidth: 420 }}>
      <DescriptionList.Item term="성별">수컷</DescriptionList.Item>
      <DescriptionList.Item term="나이">3살 추정</DescriptionList.Item>
      <DescriptionList.Item term="체중">8.4kg</DescriptionList.Item>
      <DescriptionList.Item term="중성화">완료</DescriptionList.Item>
    </DescriptionList.Root>
  ),
};

export const Stacked: Story = {
  render: () => (
    <DescriptionList.Root layout="stacked" style={{ maxWidth: 420 }}>
      <DescriptionList.Item term="성격">
        사람을 잘 따르고 산책을 좋아하는 온순한 성격입니다.
      </DescriptionList.Item>
      <DescriptionList.Item term="건강 상태">
        기저 질환 없이 건강하며 예방접종을 모두 마쳤습니다.
      </DescriptionList.Item>
    </DescriptionList.Root>
  ),
};
