import { describe, it, expect } from "vitest";
import { CHART_COLORS } from "./dashboard-chart.model";

describe("CHART_COLORS", () => {
  it("6개의 색상을 가진다", () => {
    expect(CHART_COLORS).toHaveLength(6);
  });

  it("모든 값이 유효한 hex 색상 형식이다", () => {
    const hexPattern = /^#[0-9a-f]{6}$/;

    for (const color of CHART_COLORS) {
      expect(color).toMatch(hexPattern);
    }
  });
});
