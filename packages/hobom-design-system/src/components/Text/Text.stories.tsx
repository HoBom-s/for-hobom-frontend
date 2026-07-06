import { Text, type TextVariant } from "./Text";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Text",
  component: Text,
  args: { children: "다람쥐 헌 쳇바퀴에 타고파 — The quick brown fox 0123", variant: "body1" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "caption",
        "overline",
        "button",
        "inherit",
      ],
    },
    align: { control: "inline-radio", options: ["left", "center", "right", "justify"] },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const ALL_VARIANTS: TextVariant[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "caption",
  "overline",
  "button",
];

export const Scale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {ALL_VARIANTS.map((v) => (
        <Text key={v} variant={v}>
          {v} — 다람쥐 헌 쳇바퀴 Aa Bb 123
        </Text>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    // This story deliberately shows low-emphasis roles (disabled/secondary),
    // which sit below the 4.5:1 text threshold by design. The other a11y checks
    // still run.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {["text.primary", "text.secondary", "text.disabled", "primary", "error", "warning", "success"].map(
        (c) => (
          <Text key={c} color={c}>
            {c}
          </Text>
        ),
      )}
    </div>
  ),
};

export const Modifiers: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 260 }}>
      <Text noWrap>noWrap: this line is intentionally long enough to be truncated with an ellipsis</Text>
      <Text gutterBottom>gutterBottom adds a bottom margin</Text>
      <Text align="center">centered</Text>
      <Text fontWeight={700}>fontWeight override 700</Text>
      <Text component="span">rendered as span via component</Text>
    </div>
  ),
};
