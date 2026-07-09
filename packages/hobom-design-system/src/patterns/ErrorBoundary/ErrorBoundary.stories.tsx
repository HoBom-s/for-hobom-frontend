import { DataLot, DataLotProvider } from "hobom-data";
import { ErrorBoundary } from "./ErrorBoundary";
import type { Meta, StoryObj } from "@storybook/react-vite";

const dataLot = new DataLot({ defaultOptions: { queries: { retry: false } } });

const Boom = () => {
  throw new Error("문제가 발생한 컴포넌트입니다.");
};

const meta = {
  title: "Patterns/ErrorBoundary",
  component: ErrorBoundary,
  args: { children: null },
  decorators: [
    (Story) => (
      <DataLotProvider client={dataLot}>
        <Story />
      </DataLotProvider>
    ),
  ],
  parameters: {
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <ErrorBoundary inline>
        <Boom />
      </ErrorBoundary>
    </div>
  ),
};
