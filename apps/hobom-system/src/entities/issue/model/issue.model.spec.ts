import { describe, it, expect } from "vitest";
import {
  IssueKindModel,
  IssuePriorityModel,
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
} from "./issue.model";

describe("IssueKindModel", () => {
  it("유효한 이슈 유형을 파싱한다", () => {
    const kinds = ["EPIC", "STORY", "TASK", "BUG", "SUBTASK"] as const;

    for (const kind of kinds) {
      expect(IssueKindModel.parse(kind)).toBe(kind);
    }
  });

  it("유효하지 않은 값을 거부한다", () => {
    expect(() => IssueKindModel.parse("FEATURE")).toThrow();
    expect(() => IssueKindModel.parse("")).toThrow();
  });
});

describe("IssuePriorityModel", () => {
  it("유효한 우선순위를 파싱한다", () => {
    const priorities = ["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;

    for (const p of priorities) {
      expect(IssuePriorityModel.parse(p)).toBe(p);
    }
  });

  it("유효하지 않은 값을 거부한다", () => {
    expect(() => IssuePriorityModel.parse("HIGHEST")).toThrow();
    expect(() => IssuePriorityModel.parse("LOWEST")).toThrow();
  });
});

describe("라벨 매핑 완전성", () => {
  it("모든 IssueKind에 대해 라벨이 존재한다", () => {
    for (const kind of IssueKindModel.options) {
      expect(ISSUE_KIND_LABEL[kind]).toBeDefined();
      expect(ISSUE_KIND_LABEL[kind].length).toBeGreaterThan(0);
    }
  });

  it("모든 IssuePriority에 대해 라벨이 존재한다", () => {
    for (const priority of IssuePriorityModel.options) {
      expect(ISSUE_PRIORITY_LABEL[priority]).toBeDefined();
      expect(ISSUE_PRIORITY_LABEL[priority].length).toBeGreaterThan(0);
    }
  });
});
