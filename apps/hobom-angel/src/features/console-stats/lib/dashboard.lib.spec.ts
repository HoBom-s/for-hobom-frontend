import { describe, expect, it } from "vitest";
import { adoptionDelta, formatAdoptionRate, monthLabel, toAdoptionBars } from "./dashboard.lib";

describe("formatAdoptionRate", () => {
  it("renders a 0–1 rate as a rounded whole percent", () => {
    expect(formatAdoptionRate(0.634)).toBe("63%");
    expect(formatAdoptionRate(0)).toBe("0%");
    expect(formatAdoptionRate(1)).toBe("100%");
  });
});

describe("adoptionDelta", () => {
  it("marks an increase with an up arrow and a signed caption", () => {
    expect(adoptionDelta(18, 13)).toEqual({ direction: "up", arrow: "▲", caption: "지난달 +5" });
  });

  it("marks a decrease with a down arrow", () => {
    expect(adoptionDelta(10, 14)).toEqual({ direction: "down", arrow: "▼", caption: "지난달 -4" });
  });

  it("treats no change as flat", () => {
    expect(adoptionDelta(7, 7)).toEqual({
      direction: "flat",
      arrow: "—",
      caption: "지난달과 같음",
    });
  });
});

describe("monthLabel", () => {
  it("shortens YYYY-MM to a Korean month", () => {
    expect(monthLabel("2026-07")).toBe("7월");
    expect(monthLabel("2026-12")).toBe("12월");
  });

  it("falls back to the raw value when it isn't a month", () => {
    expect(monthLabel("nope")).toBe("nope");
  });
});

describe("toAdoptionBars", () => {
  it("highlights only the latest month", () => {
    const bars = toAdoptionBars([
      { month: "2026-05", count: 8 },
      { month: "2026-06", count: 12 },
      { month: "2026-07", count: 18 },
    ]);

    const fills = bars.map((bar) => bar.fill);

    expect(bars.map((bar) => bar.label)).toEqual(["5월", "6월", "7월"]);
    expect(fills[0]).toBe(fills[1]);
    expect(fills[2]).not.toBe(fills[1]);
    expect(bars.at(-1)?.count).toBe(18);
  });

  it("returns an empty list for no data", () => {
    expect(toAdoptionBars([])).toEqual([]);
  });
});
