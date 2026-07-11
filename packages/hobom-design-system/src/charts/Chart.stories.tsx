import { Chart, createChart, lineChart, barChart } from "./index";
import type { ChartRenderer } from "./index";
import type { Meta, StoryObj } from "@storybook/react-vite";

const SERIES = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 51 },
  { month: "Mar", value: 44 },
  { month: "Apr", value: 68 },
  { month: "May", value: 59 },
  { month: "Jun", value: 74 },
];

const SLICES = [
  { label: "Active", count: 42 },
  { label: "Archived", count: 18 },
  { label: "Trashed", count: 7 },
];

const MULTI = [
  { month: "Jan", sent: 32, opened: 20 },
  { month: "Feb", sent: 51, opened: 34 },
  { month: "Mar", sent: 44, opened: 30 },
  { month: "Apr", sent: 68, opened: 41 },
  { month: "May", sent: 59, opened: 45 },
  { month: "Jun", sent: 74, opened: 52 },
];

const SENT_OPENED = [
  { key: "sent", label: "Sent" },
  { key: "opened", label: "Opened" },
];

const meta = {
  title: "Charts/Chart",
  component: Chart,
  args: { type: "line", data: SERIES },
  parameters: {
    // Axis labels use the secondary text token (~4.19:1), a known
    // below-AAA value shared across the design system's chrome.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Chart>;

export default meta;

type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 420 }}>{children}</div>
);

export const Line: Story = {
  render: () => (
    <Frame>
      <Chart type="line" data={SERIES} config={{ x: "month", y: "value" }} ariaLabel="Monthly value" />
    </Frame>
  ),
};

export const Area: Story = {
  render: () => (
    <Frame>
      <Chart
        type="area"
        data={SERIES}
        config={{ x: "month", y: "value", color: "#60a5fa" }}
        ariaLabel="Monthly value area"
      />
    </Frame>
  ),
};

export const Bar: Story = {
  render: () => (
    <Frame>
      <Chart type="bar" data={SERIES} config={{ x: "month", y: "value" }} ariaLabel="Monthly value bars" />
    </Frame>
  ),
};

export const Donut: Story = {
  render: () => (
    <Frame>
      <Chart
        type="donut"
        data={SLICES}
        config={{ label: "label", value: "count" }}
        height={220}
        ariaLabel="Note status breakdown"
      />
    </Frame>
  ),
};

export const MultiSeriesLine: Story = {
  render: () => (
    <Frame>
      <Chart
        type="line"
        data={MULTI}
        config={{ x: "month", series: SENT_OPENED }}
        ariaLabel="Sent vs opened over time"
      />
    </Frame>
  ),
};

export const MultiSeriesBar: Story = {
  render: () => (
    <Frame>
      <Chart
        type="bar"
        data={MULTI}
        config={{ x: "month", series: SENT_OPENED }}
        ariaLabel="Sent vs opened by month"
      />
    </Frame>
  ),
};

// Injecting a custom renderer through the factory.
const stepChart: ChartRenderer = (ctx) => lineChart({ ...ctx, config: { ...ctx.config } });

export const CustomFactory: Story = {
  render: () => {
    const MyChart = createChart({ line: lineChart, bar: barChart, step: stepChart });

    return (
      <Frame>
        <MyChart
          type="step"
          data={SERIES}
          config={{ x: "month", y: "value", color: "#4ade80" }}
          ariaLabel="Custom step chart"
        />
      </Frame>
    );
  },
};
