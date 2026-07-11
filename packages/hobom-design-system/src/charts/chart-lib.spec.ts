import { describe, expect, it } from "vitest";
import {
  formatCategory,
  formatNumber,
  legendItems,
  nearestIndex,
  num,
  resolveMargin,
  resolveSeries,
  roundedTopRect,
  str,
} from "./chart-lib";

describe("num", () => {
  it("coerces a numeric field", () => {
    expect(num({ v: 42 }, "v")).toBe(42);
    expect(num({ v: "3.5" }, "v")).toBe(3.5);
  });

  it("returns 0 for a missing key, undefined key, or non-numeric value", () => {
    expect(num({ v: 1 }, "other")).toBe(0);
    expect(num({ v: 1 }, undefined)).toBe(0);
    expect(num({ v: "abc" }, "v")).toBe(0);
    expect(num({ v: null }, "v")).toBe(0);
  });
});

describe("str", () => {
  it("coerces a field to a string, empty when absent", () => {
    expect(str({ label: "A" }, "label")).toBe("A");
    expect(str({ label: 7 }, "label")).toBe("7");
    expect(str({ label: "A" }, "missing")).toBe("");
    expect(str({ label: "A" }, undefined)).toBe("");
    expect(str({ label: null }, "label")).toBe("");
  });
});

describe("resolveMargin", () => {
  it("uses defaults and applies overrides", () => {
    expect(resolveMargin({})).toEqual({ top: 12, right: 16, bottom: 28, left: 44 });
    expect(resolveMargin({ margin: { left: 60 } })).toMatchObject({ left: 60, top: 12 });
  });
});

describe("formatNumber / formatCategory", () => {
  it("passes through by default and uses the config formatters", () => {
    expect(formatNumber({}, 1200)).toBe("1200");
    expect(formatNumber({ formatValue: (v) => `${v / 1000}k` }, 1200)).toBe("1.2k");
    expect(formatCategory({}, "Jan")).toBe("Jan");
    expect(formatCategory({ formatX: (v) => v.toUpperCase() }, "jan")).toBe("JAN");
  });
});

describe("roundedTopRect", () => {
  it("starts at the bottom-left and only rounds the top corners", () => {
    const path = roundedTopRect(0, 0, 10, 20, 2);

    expect(path.startsWith("M0,20")).toBe(true); // bottom-left
    expect(path.endsWith("Z")).toBe(true);
    expect((path.match(/Q/g) ?? []).length).toBe(2); // two rounded (top) corners
  });
});

describe("resolveSeries", () => {
  it("wraps a single `y` field as one series", () => {
    expect(resolveSeries({ y: "value", color: "#111" })).toEqual([
      { key: "value", label: "value", color: "#111" },
    ]);
  });

  it("maps an explicit series list, filling label and color from the palette", () => {
    const resolved = resolveSeries({ series: [{ key: "a" }, { key: "b", label: "Bee" }] });

    expect(resolved).toHaveLength(2);
    expect(resolved[0]).toMatchObject({ key: "a", label: "a" });
    expect(resolved[1]).toMatchObject({ key: "b", label: "Bee" });
    expect(resolved[0]?.color).not.toBe(resolved[1]?.color); // distinct palette entries
  });
});

describe("legendItems", () => {
  it("returns a slice per datum for a donut", () => {
    const items = legendItems([{ k: "A" }, { k: "B" }], { label: "k", value: "v" });

    expect(items.map((i) => i.label)).toEqual(["A", "B"]);
  });

  it("returns a row per series for multi-series", () => {
    const items = legendItems([], { series: [{ key: "a", label: "A" }, { key: "b", label: "B" }] });

    expect(items.map((i) => i.label)).toEqual(["A", "B"]);
  });

  it("is empty for a single series", () => {
    expect(legendItems([], { y: "value" })).toEqual([]);
  });
});

describe("nearestIndex", () => {
  it("finds the closest position", () => {
    const positions = [0, 50, 100, 150];

    expect(nearestIndex(positions, 0)).toBe(0);
    expect(nearestIndex(positions, 60)).toBe(1);
    expect(nearestIndex(positions, 999)).toBe(3);
  });

  it("returns 0 for an empty list", () => {
    expect(nearestIndex([], 42)).toBe(0);
  });
});
