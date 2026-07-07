import * as stylex from "@stylexjs/stylex";
import { ButtonBase } from "./ButtonBase";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/ButtonBase",
  component: ButtonBase,
} satisfies Meta<typeof ButtonBase>;

export default meta;

type Story = StoryObj<typeof meta>;

const styles = stylex.create({
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    paddingBlock: 8,
    paddingInline: 16,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "var(--hb-color-text-secondary)",
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(0,0,0,0.04)",
    },
  },
});

export const Basic: Story = {
  render: () => <ButtonBase onClick={() => {}}>순수 버튼</ButtonBase>,
};

export const Styled: Story = {
  render: () => (
    <ButtonBase {...stylex.props(styles.chip)} onClick={() => {}}>
      스타일이 입혀진 버튼
    </ButtonBase>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ButtonBase {...stylex.props(styles.chip)} disabled onClick={() => {}}>
      비활성화된 버튼
    </ButtonBase>
  ),
};
