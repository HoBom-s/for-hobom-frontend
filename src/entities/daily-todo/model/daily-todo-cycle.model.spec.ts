import { describe, it, expect } from "vitest";
import { DailyTodoCycleModel, CYCLE_LABELS } from "./daily-todo-cycle.model";

describe("DailyTodoCycleModel", () => {
  it("모든 DailyTodoCycleModel 키에 대해 CYCLE_LABELS 항목이 존재한다", () => {
    for (const key of Object.keys(DailyTodoCycleModel)) {
      expect(CYCLE_LABELS).toHaveProperty(key);
    }
  });

  it("모든 CYCLE_LABELS 값은 비어있지 않은 문자열이다", () => {
    for (const label of Object.values(CYCLE_LABELS)) {
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    }
  });
});
