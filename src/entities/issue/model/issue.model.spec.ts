import { describe, it, expect } from "vitest";
import {
  IssueKindModel,
  IssuePriorityModel,
  IssueStatusCategoryModel,
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  ISSUE_STATUS_CATEGORY_LABEL,
  ISSUE_STATUS_CATEGORY_ORDER,
  STATUS_CATEGORY_TO_ID,
  STATUS_ID_TO_CATEGORY,
  getAvailableTransitions,
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

describe("IssueStatusCategoryModel", () => {
  it("유효한 상태 카테고리를 파싱한다", () => {
    const categories = ["TODO", "IN_PROGRESS", "DONE"] as const;
    for (const c of categories) {
      expect(IssueStatusCategoryModel.parse(c)).toBe(c);
    }
  });

  it("유효하지 않은 값을 거부한다", () => {
    expect(() => IssueStatusCategoryModel.parse("PENDING")).toThrow();
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

  it("모든 IssueStatusCategory에 대해 라벨이 존재한다", () => {
    for (const category of IssueStatusCategoryModel.options) {
      expect(ISSUE_STATUS_CATEGORY_LABEL[category]).toBeDefined();
      expect(ISSUE_STATUS_CATEGORY_LABEL[category].length).toBeGreaterThan(0);
    }
  });
});

describe("ISSUE_STATUS_CATEGORY_ORDER", () => {
  it("모든 상태 카테고리를 포함한다", () => {
    expect(ISSUE_STATUS_CATEGORY_ORDER).toHaveLength(
      IssueStatusCategoryModel.options.length,
    );
    for (const category of IssueStatusCategoryModel.options) {
      expect(ISSUE_STATUS_CATEGORY_ORDER).toContain(category);
    }
  });

  it("TODO → IN_PROGRESS → DONE 순서를 유지한다", () => {
    const todoIdx = ISSUE_STATUS_CATEGORY_ORDER.indexOf("TODO");
    const progressIdx = ISSUE_STATUS_CATEGORY_ORDER.indexOf("IN_PROGRESS");
    const doneIdx = ISSUE_STATUS_CATEGORY_ORDER.indexOf("DONE");

    expect(todoIdx).toBeLessThan(progressIdx);
    expect(progressIdx).toBeLessThan(doneIdx);
  });
});

describe("STATUS_CATEGORY_TO_ID / STATUS_ID_TO_CATEGORY", () => {
  it("모든 statusCategory에 대응하는 status ID가 존재한다", () => {
    for (const category of IssueStatusCategoryModel.options) {
      expect(STATUS_CATEGORY_TO_ID[category]).toBeDefined();
      expect(typeof STATUS_CATEGORY_TO_ID[category]).toBe("string");
    }
  });

  it("양방향 매핑이 일치한다", () => {
    for (const category of IssueStatusCategoryModel.options) {
      const statusId = STATUS_CATEGORY_TO_ID[category];
      expect(STATUS_ID_TO_CATEGORY[statusId]).toBe(category);
    }
  });
});

describe("getAvailableTransitions", () => {
  it("todo에서 in-progress, done으로 전환 가능하다", () => {
    const transitions = getAvailableTransitions("todo");
    expect(transitions).toHaveLength(2);

    const targets = transitions.map((t) => t.to);
    expect(targets).toContain("in-progress");
    expect(targets).toContain("done");
  });

  it("in-progress에서 done, todo로 전환 가능하다", () => {
    const transitions = getAvailableTransitions("in-progress");
    expect(transitions).toHaveLength(2);

    const targets = transitions.map((t) => t.to);
    expect(targets).toContain("done");
    expect(targets).toContain("todo");
  });

  it("done에서 in-progress, todo로 전환 가능하다", () => {
    const transitions = getAvailableTransitions("done");
    expect(transitions).toHaveLength(2);

    const targets = transitions.map((t) => t.to);
    expect(targets).toContain("in-progress");
    expect(targets).toContain("todo");
  });

  it("알 수 없는 상태는 빈 배열을 반환한다", () => {
    expect(getAvailableTransitions("unknown")).toHaveLength(0);
  });
});
