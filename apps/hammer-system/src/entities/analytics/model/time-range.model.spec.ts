import { describe, it, expect } from "vitest";
import { TIME_RANGE_LABEL, DEFAULT_TIME_RANGE } from "./time-range.model";
import type { TimeRange } from "../api/analytics.type";

const ALL_RANGES: TimeRange[] = ["LAST_1H", "LAST_6H", "LAST_24H", "LAST_7D"];

describe("TIME_RANGE_LABEL", () => {
  it("모든 TimeRange 값에 대해 라벨이 존재한다", () => {
    for (const key of ALL_RANGES) {
      expect(TIME_RANGE_LABEL).toHaveProperty(key);
      expect(typeof TIME_RANGE_LABEL[key]).toBe("string");
    }
  });

  it("라벨은 빈 문자열이 아니다", () => {
    for (const label of Object.values(TIME_RANGE_LABEL)) {
      expect(label.length).toBeGreaterThan(0);
    }
  });
});

describe("DEFAULT_TIME_RANGE", () => {
  it("유효한 TimeRange 값이다", () => {
    expect(ALL_RANGES).toContain(DEFAULT_TIME_RANGE);
  });

  it("LAST_24H이 기본값이다", () => {
    expect(DEFAULT_TIME_RANGE).toBe("LAST_24H");
  });
});
