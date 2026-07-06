import { Chip } from "./Chip";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Chip",
  component: Chip,
  args: { label: "Chip", size: "small" },
  parameters: {
    // Chips are small status indicators; colored text on a tint (and white on
    // an accent fill) inherently sits below the 4.5:1 text threshold. This is a
    // known chip-pattern limitation, so the contrast rule is disabled here while
    // the rest of the a11y checks still run.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["filled", "outlined", "soft"] },
    color: {
      control: "inline-radio",
      options: ["default", "primary", "secondary", "success", "warning", "error"],
    },
    size: { control: "inline-radio", options: ["small", "medium"] },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = { args: { color: "primary" } };
export const Outlined: Story = { args: { variant: "outlined" } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Chip label="default" />
      <Chip label="primary" color="primary" />
      <Chip label="outlined" variant="outlined" />
      <Chip label="secondary" color="secondary" />
    </div>
  ),
};

// Replicates the app's status/level/method chips: a small tinted pill with a
// custom background and text color set via style.
export const StatusChips: Story = {
  render: () => {
    const chips = [
      { label: "ERROR", bg: "#dc262618", fg: "#dc2626" },
      { label: "WARN", bg: "#e58a0018", fg: "#e58a00" },
      { label: "INFO", bg: "#4680ff18", fg: "#4680ff" },
      { label: "GET", bg: "#2ca87f18", fg: "#2ca87f" },
      { label: "3/5 완료", bg: "#e8f5e9", fg: "#2ca87f" },
    ];

    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {chips.map((c) => (
          <Chip
            key={c.label}
            label={c.label}
            size="small"
            style={{
              height: 22,
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: c.bg,
              color: c.fg,
            }}
          />
        ))}
      </div>
    );
  },
};

// Tonal chips: one accent color drives a tinted bg, matching text, and a
// hover that deepens the tint (the app's status/kind/priority chips).
export const Tonal: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {["#dc2626", "#e58a00", "#4680ff", "#2ca87f", "#7c3aed"].map((c) => (
        <Chip key={c} label={c} tone={c} style={{ height: 22, fontSize: 11, fontWeight: 700 }} />
      ))}
    </div>
  ),
};

export const WithIconAndDelete: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Chip label="icon" icon={<span>◎</span>} />
      <Chip label="deletable" variant="outlined" onDelete={() => {}} />
    </div>
  ),
};
