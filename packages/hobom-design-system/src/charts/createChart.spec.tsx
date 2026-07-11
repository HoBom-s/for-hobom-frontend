import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { createChart } from "./createChart";
import type { ChartRenderer } from "./types";

class MockResizeObserver {
  readonly #callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.#callback = callback;
  }

  observe() {
    this.#callback(
      [{ contentRect: { width: 400 } } as ResizeObserverEntry],
      this as unknown as ResizeObserver,
    );
  }

  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", MockResizeObserver);

afterEach(cleanup);

describe("createChart", () => {
  it("renders an svg and calls the selected renderer with the plot box", () => {
    const renderer: ChartRenderer = vi.fn(() => <circle data-testid="mark" />);
    const Chart = createChart({ mock: renderer });

    const { container, getByTestId } = render(
      <Chart type="mock" data={[{ v: 1 }]} config={{ y: "v" }} ariaLabel="demo" />,
    );

    const svg = container.querySelector("svg");

    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("aria-label")).toBe("demo");
    expect(getByTestId("mark")).toBeTruthy();
    expect(renderer).toHaveBeenCalledWith(
      expect.objectContaining({ width: 400, height: 240, hover: null }),
    );
  });

  it("renders an empty svg for an unregistered type", () => {
    const Chart = createChart({ line: () => <circle data-testid="line-mark" /> });

    const { container } = render(
      // @ts-expect-error - intentionally passing a type absent from the registry
      <Chart type="missing" data={[]} />,
    );

    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector('[data-testid="line-mark"]')).toBeNull();
  });
});
