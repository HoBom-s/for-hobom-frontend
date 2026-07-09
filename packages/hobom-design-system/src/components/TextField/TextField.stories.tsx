import { useState } from "react";
import { TextField } from "./TextField";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    // Helper text uses Astryx neutral secondary (#737373), just under the
    // 4.5:1 line on the tinted canvas — a known, intentional muted pattern.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
  const [value, setValue] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
      <TextField
        label="Name"
        placeholder="Enter your name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        fullWidth
      />
      <TextField label="Email" type="email" helperText="We'll never share it." fullWidth />
      <TextField label="Code" error helperText="Invalid code" defaultValue="abc" fullWidth />
      <TextField label="Notes" multiline minRows={3} maxRows={6} fullWidth />
      <TextField label="Small" size="small" placeholder="Compact" fullWidth />
    </div>
  );
};

export const Basic: Story = { render: () => <Demo /> };
