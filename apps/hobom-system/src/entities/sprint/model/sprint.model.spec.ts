import { describe, it, expect } from "vitest";
import { SprintStatusModel, SPRINT_STATUS_LABEL, type SprintStatus } from "./sprint.model";

describe("SprintStatusModel", () => {
  it("유효한 스프린트 상태를 파싱한다", () => {
    expect(SprintStatusModel.parse("PLANNING")).toBe("PLANNING");
    expect(SprintStatusModel.parse("ACTIVE")).toBe("ACTIVE");
    expect(SprintStatusModel.parse("COMPLETED")).toBe("COMPLETED");
  });

  it("유효하지 않은 값을 거부한다", () => {
    expect(() => SprintStatusModel.parse("INVALID")).toThrow();
    expect(() => SprintStatusModel.parse("")).toThrow();
    expect(() => SprintStatusModel.parse(123)).toThrow();
  });
});

describe("SPRINT_STATUS_LABEL", () => {
  it("모든 상태에 대해 한국어 라벨이 존재한다", () => {
    const statuses: SprintStatus[] = ["PLANNING", "ACTIVE", "COMPLETED"];

    for (const status of statuses) {
      expect(SPRINT_STATUS_LABEL[status]).toBeDefined();
      expect(typeof SPRINT_STATUS_LABEL[status]).toBe("string");
      expect(SPRINT_STATUS_LABEL[status].length).toBeGreaterThan(0);
    }
  });

  it("SprintStatusModel의 모든 값에 대해 라벨이 매핑된다", () => {
    const allStatuses = SprintStatusModel.options;
    const labelKeys = Object.keys(SPRINT_STATUS_LABEL);

    expect(labelKeys).toHaveLength(allStatuses.length);
    for (const status of allStatuses) {
      expect(labelKeys).toContain(status);
    }
  });
});
