import { Markdown } from "./Markdown";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Markdown",
  component: Markdown,
  parameters: {
    // Inline code/headings render body text on the canvas; the small-secondary
    // color-contrast tradeoff is DS-wide (see SectionCard.stories). Other a11y
    // checks still run.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
  args: {
    children: [
      "# 보호소 소개",
      "",
      "11년간 유기견을 구조하고 입양을 이어온 **비영리 보호소**입니다.",
      "함께 걷는 길에 여러분을 초대합니다.",
      "",
      "## 우리가 하는 일",
      "",
      "- 유기견 구조와 임시 보호",
      "- 입양 상담 및 사후 관리",
      "- 지역 사회 반려 문화 교육",
      "",
      "자세한 내용은 [공식 웹사이트](https://example.com)에서 확인하세요.",
    ].join("\n"),
  },
} satisfies Meta<typeof Markdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rich: Story = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Markdown {...args} />
    </div>
  ),
};

// A `javascript:` URL must be neutralized by the sanitize policy — the link
// text still renders, but the dangerous href is dropped (no executable href).
export const NeutralizedScriptLink: Story = {
  args: {
    children: "이 링크는 [무해화됩니다](javascript:alert(1)) — href가 제거됩니다.",
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Markdown {...args} />
    </div>
  ),
};

export const GfmTableAndTaskList: Story = {
  parameters: {
    // GFM task lists render as disabled, unlabeled checkboxes — the standard
    // GitHub output. The `label` rule flags them; the content is read-only and
    // labeled by the adjacent list text. Other a11y checks still run.
    a11y: { config: { rules: [{ id: "label", enabled: false }] } },
  },
  args: {
    children: [
      "| 이름 | 상태 |",
      "| --- | --- |",
      "| 초코 | 입양 대기 |",
      "| 보리 | 임시 보호 |",
      "",
      "- [x] 건강 검진 완료",
      "- [ ] 입양 상담 예약",
      "",
      "~~취소된 항목~~",
    ].join("\n"),
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Markdown {...args} />
    </div>
  ),
};
