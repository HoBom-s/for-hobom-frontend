import { Grid } from "./Grid";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Grid",
  component: Grid,
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: 16,
      backgroundColor: "var(--hb-color-border)",
      borderRadius: 8,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

export const EqualColumns: Story = {
  render: () => (
    <Grid container spacing={2}>
      {[1, 2, 3, 4].map((n) => (
        <Grid key={n} size={3}>
          <Cell>size 3</Cell>
        </Grid>
      ))}
    </Grid>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Grid container spacing={2.5}>
      {[1, 2, 3, 4].map((n) => (
        <Grid key={n} size={{ xs: 12, sm: 6, md: 3 }}>
          <Cell>xs 12 / sm 6 / md 3</Cell>
        </Grid>
      ))}
    </Grid>
  ),
};

export const Mixed: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Cell>xs 12 / md 8</Cell>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Cell>xs 12 / md 4</Cell>
      </Grid>
    </Grid>
  ),
};
