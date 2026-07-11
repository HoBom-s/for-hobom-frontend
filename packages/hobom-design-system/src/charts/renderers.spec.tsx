import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Chart } from "./index";

class MockResizeObserver {
  readonly #callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.#callback = callback;
  }

  observe() {
    this.#callback([{ contentRect: { width: 400 } } as ResizeObserverEntry], this as unknown as ResizeObserver);
  }

  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", MockResizeObserver);

afterEach(cleanup);

const CYCLE = [
  { cycle: "Daily", completed: 18, incomplete: 6 },
  { cycle: "Weekend", completed: 7, incomplete: 4 },
];
const STATUS = [
  { code: "200", count: 1840, fill: "#4ade80" },
  { code: "500", count: 34, fill: "#f87171" },
];
const MODULES = [
  { module: "Todo", pct: 34 },
  { module: "Note", pct: 26 },
  { module: "Alarm", pct: 14 },
];

describe("bar renderer options", () => {
  it("stacks series and emits one bar path per datum/series", () => {
    const { container } = render(
      <Chart
        type="bar"
        data={CYCLE}
        config={{ x: "cycle", series: [{ key: "completed" }, { key: "incomplete" }], stacked: true }}
        ariaLabel="stacked"
      />,
    );

    expect(container.querySelectorAll("path").length).toBe(4); // 2 categories × 2 series
  });

  it("draws horizontal bars with category labels on the left", () => {
    const { container } = render(
      <Chart
        type="bar"
        data={STATUS}
        config={{ x: "code", y: "count", horizontal: true }}
        ariaLabel="horizontal"
      />,
    );

    expect(container.querySelectorAll("path").length).toBe(2);
    expect(container.textContent).toContain("200");
  });

  it("applies a per-datum color via colorKey (one gradient per unique color)", () => {
    const { container } = render(
      <Chart type="bar" data={STATUS} config={{ x: "code", y: "count", colorKey: "fill" }} ariaLabel="colored" />,
    );

    expect(container.querySelectorAll("linearGradient").length).toBe(2); // two distinct colors
  });

  it("omits gradients when gradient is disabled", () => {
    const { container } = render(
      <Chart type="bar" data={STATUS} config={{ x: "code", y: "count", gradient: false }} ariaLabel="flat" />,
    );

    expect(container.querySelectorAll("linearGradient").length).toBe(0);
  });
});

describe("dense axis labels", () => {
  it("thins x labels so a per-minute series does not render one label per point", () => {
    const dense = Array.from({ length: 200 }, (_, i) => ({ t: String(i), v: i % 7 }));
    const { container } = render(
      <Chart type="area" data={dense} config={{ x: "t", y: "v" }} ariaLabel="dense" />,
    );

    // 200 points would smear; thinning keeps this to a readable handful.
    expect(container.querySelectorAll("text").length).toBeLessThan(20);
  });
});

describe("radar renderer", () => {
  it("renders a value polygon with a vertex per category", () => {
    const { container } = render(
      <Chart type="radar" data={MODULES} config={{ x: "module", y: "pct" }} ariaLabel="radar" />,
    );

    expect(container.querySelectorAll("polygon").length).toBeGreaterThan(0);
    expect(container.querySelectorAll("circle").length).toBe(3); // one marker per category
  });
});

describe("legend toggle", () => {
  it("suppresses the built-in legend when legend is false", () => {
    const data = [{ label: "A", count: 1 }, { label: "B", count: 2 }];
    const { container, rerender } = render(
      <Chart type="donut" data={data} config={{ label: "label", value: "count" }} ariaLabel="with" />,
    );
    const withLegend = container.textContent ?? "";

    rerender(
      <Chart type="donut" data={data} config={{ label: "label", value: "count", legend: false }} ariaLabel="without" />,
    );

    expect(withLegend).toContain("A");
    expect(container.textContent).not.toContain("A");
  });
});
