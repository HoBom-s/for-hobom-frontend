import { useState } from "react";
import { InputBase } from "./InputBase";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/InputBase",
  component: InputBase,
} satisfies Meta<typeof InputBase>;

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledDemo = () => {
  const [value, setValue] = useState("");

  return (
    <InputBase
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="입력하세요..."
      style={{
        fontSize: 14,
        paddingInline: 8,
        paddingBlock: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--hb-color-border)",
        borderRadius: 8,
      }}
    />
  );
};

export const Basic: Story = { render: () => <ControlledDemo /> };
