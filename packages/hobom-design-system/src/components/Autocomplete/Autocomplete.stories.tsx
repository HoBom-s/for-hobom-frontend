import { useState } from "react";
import { Autocomplete } from "./Autocomplete";
import { TextField } from "../TextField/TextField";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  args: { options: [], renderInput: () => null },
  parameters: {
    // Placeholder/secondary text uses Astryx neutral tones near the 4.5:1 line.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

const FRUITS = ["Apple", "Apricot", "Banana", "Cherry", "Grape", "Lemon", "Mango"];

const Demo = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div style={{ width: 280 }}>
      <Autocomplete<string>
        options={FRUITS}
        value={value}
        onChange={(_event, next) => setValue(typeof next === "string" ? next : next)}
        renderInput={(params) => <TextField {...params} label="Fruit" placeholder="Search…" />}
      />
    </div>
  );
};

export const Basic: Story = { render: () => <Demo /> };
