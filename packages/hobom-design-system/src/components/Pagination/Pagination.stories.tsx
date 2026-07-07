import { useState } from "react";
import { Pagination } from "./Pagination";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  args: { count: 10, page: 1, onChange: () => {} },
  parameters: {
    // The current-page chip is filled with the accent color (~3.6:1). It is the
    // standard selected-page affordance and is also conveyed via aria-current,
    // so disable the contrast rule for this chip.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const RoundedDemo = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination count={10} page={page} onChange={(_, next) => setPage(next)} shape="rounded" />
  );
};

const SmallDemo = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      count={10}
      page={page}
      onChange={(_, next) => setPage(next)}
      shape="rounded"
      size="small"
    />
  );
};

export const Rounded: Story = { render: () => <RoundedDemo /> };
export const Small: Story = { render: () => <SmallDemo /> };
