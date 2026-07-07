import { Alert } from "./Alert";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Alert",
  component: Alert,
  args: { children: "This is an alert message." },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Severities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
      <Alert severity="error">Something went wrong.</Alert>
      <Alert severity="warning">Careful with this.</Alert>
      <Alert severity="info">Just so you know.</Alert>
      <Alert severity="success">All done.</Alert>
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Alert severity="info" variant="outlined">
        An outlined info alert.
      </Alert>
    </div>
  ),
};
