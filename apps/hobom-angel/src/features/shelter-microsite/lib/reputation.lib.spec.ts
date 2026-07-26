import { describe, expect, it } from "vitest";
import type { ShelterReputation } from "@/entities/review";
import { distributionBars, filledStars, formatAverage } from "./reputation.lib";

const reputation = (over: Partial<ShelterReputation> = {}): ShelterReputation => ({
  shelterId: "s1",
  reviewCount: 10,
  average: 4.3,
  distribution: { 1: 0, 2: 1, 3: 1, 4: 3, 5: 5 },
  ...over,
});

describe("distributionBars", () => {
  it("lists 5★ first with each star's percentage of the total", () => {
    const bars = distributionBars(reputation());

    expect(bars.map((bar) => bar.star)).toEqual([5, 4, 3, 2, 1]);
    expect(bars[0]).toEqual({ star: 5, count: 5, pct: 50 });
    expect(bars[1]).toEqual({ star: 4, count: 3, pct: 30 });
  });

  it("reports 0% for every bar when there are no reviews", () => {
    const bars = distributionBars(
      reputation({ reviewCount: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }),
    );

    expect(bars.every((bar) => bar.pct === 0)).toBe(true);
  });
});

describe("formatAverage", () => {
  it("keeps one decimal place", () => {
    expect(formatAverage(4)).toBe("4.0");
    expect(formatAverage(4.27)).toBe("4.3");
  });
});

describe("filledStars", () => {
  it("rounds to whole stars and clamps to 0–5", () => {
    expect(filledStars(4.3)).toBe(4);
    expect(filledStars(4.6)).toBe(5);
    expect(filledStars(-1)).toBe(0);
    expect(filledStars(9)).toBe(5);
  });
});
