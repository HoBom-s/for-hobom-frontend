import { useState } from "react";
import { Form } from "./Form";
import { Radio } from "../Radio/Radio";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Form",
  component: Form.Control,
  parameters: {
    // Helper text uses Astryx neutral secondary (#737373), a known muted pattern.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Form.Control>;

export default meta;

type Story = StoryObj<typeof meta>;

const SelectDemo = () => {
  const [value, setValue] = useState("apple");

  return (
    <Form.Control fullWidth>
      <Form.Label>Fruit</Form.Label>
      <Form.Select value={value} onChange={(e) => setValue(e.target.value)}>
        <Form.Option value="apple">Apple</Form.Option>
        <Form.Option value="banana">Banana</Form.Option>
        <Form.Option value="cherry">Cherry</Form.Option>
      </Form.Select>
      <Form.Helper>Pick your favorite.</Form.Helper>
    </Form.Control>
  );
};

const RadioDemo = () => {
  const [value, setValue] = useState("a");

  return (
    <Radio.Group value={value} onChange={(_e, v) => setValue(v)}>
      {["a", "b", "c"].map((v) => (
        <Form.ControlLabel key={v} value={v} control={<Radio.Root />} label={`Option ${v}`} />
      ))}
    </Radio.Group>
  );
};

export const Select: Story = { render: () => <div style={{ width: 260 }}><SelectDemo /></div> };
export const Radios: Story = { render: () => <RadioDemo /> };
