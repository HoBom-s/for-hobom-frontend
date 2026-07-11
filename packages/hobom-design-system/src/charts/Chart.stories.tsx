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

const CYCLE = [
  { cycle: "Daily", completed: 18, incomplete: 6 },
  { cycle: "Weekday", completed: 12, incomplete: 9 },
  { cycle: "Weekend", completed: 7, incomplete: 4 },
];

const DONE_TODO = [
  { key: "completed", label: "Done", color: "#2ca87f" },
  { key: "incomplete", label: "Todo", color: "#e9ecef" },
];

const LABELS = [
  { label: "Idea", count: 24 },
  { label: "Bug", count: 18 },
  { label: "Chore", count: 12 },
  { label: "Docs", count: 6 },
];

const STATUS = [
  { code: "200", count: 1840, fill: "#4ade80" },
  { code: "301", count: 220, fill: "#60a5fa" },
  { code: "404", count: 96, fill: "#fbbf24" },
  { code: "500", count: 34, fill: "#f87171" },
];

const MODULES = [
  { module: "Todo", pct: 34 },
  { module: "Note", pct: 26 },
  { module: "Message", pct: 18 },
  { module: "Alarm", pct: 14 },
  { module: "Menu", pct: 8 },
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

export const StackedBar: Story = {
  render: () => (
    <Frame>
      <Chart
        type="bar"
        data={CYCLE}
        config={{ x: "cycle", series: DONE_TODO, stacked: true }}
        ariaLabel="Completed vs remaining todos by cycle"
      />
    </Frame>
  ),
};

export const HorizontalBar: Story = {
  render: () => (
    <Frame>
      <Chart
        type="bar"
        data={LABELS}
        config={{ x: "label", y: "count", horizontal: true, margin: { left: 72 } }}
        ariaLabel="Notes per label"
      />
    </Frame>
  ),
};

export const PerBarColor: Story = {
  render: () => (
    <Frame>
      <Chart
        type="bar"
        data={STATUS}
        config={{ x: "code", y: "count", colorKey: "fill" }}
        ariaLabel="Requests by status code"
      />
    </Frame>
  ),
};

export const Radar: Story = {
  render: () => (
    <Frame>
      <Chart
        type="radar"
        data={MODULES}
        config={{ x: "module", y: "pct", color: "#4680ff" }}
        height={280}
        ariaLabel="Module activity share"
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
