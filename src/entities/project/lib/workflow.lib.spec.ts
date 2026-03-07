import { describe, it, expect } from "vitest";
import {
  buildStatusesFromColumns,
  buildTransitionsFromColumns,
  getStatusName,
  getStatusColor,
  getAvailableTransitions,
  getDoneStatusIds,
} from "./workflow.lib";
import type { WorkflowStatus, WorkflowTransition } from "../api/workflow.type";

const STATUSES: WorkflowStatus[] = [
  { id: "todo", name: "할 일", isDone: false, order: 0 },
  { id: "in-progress", name: "진행 중", isDone: false, order: 1 },
  { id: "done", name: "완료", isDone: true, order: 2 },
];

const TRANSITIONS: WorkflowTransition[] = [
  { from: "todo", to: "in-progress", name: "시작" },
  { from: "in-progress", to: "done", name: "완료" },
  { from: "in-progress", to: "todo", name: "되돌리기" },
];

describe("buildStatusesFromColumns", () => {
  it("컬럼을 WorkflowStatus[]로 변환한다", () => {
    const columns = [
      { statusId: "s1", name: "대기", order: 0 },
      { statusId: "s2", name: "작업", order: 1 },
      { statusId: "s3", name: "끝", order: 2 },
    ];

    const result = buildStatusesFromColumns(columns);

    expect(result).toEqual([
      { id: "s1", name: "대기", isDone: false, order: 0 },
      { id: "s2", name: "작업", isDone: false, order: 1 },
      { id: "s3", name: "끝", isDone: true, order: 2 },
    ]);
  });

  it("마지막 컬럼만 isDone이 true다", () => {
    const columns = [
      { statusId: "a", name: "A", order: 0 },
      { statusId: "b", name: "B", order: 1 },
    ];

    const result = buildStatusesFromColumns(columns);

    expect(result[0].isDone).toBe(false);
    expect(result[1].isDone).toBe(true);
  });

  it("단일 컬럼이면 isDone이 true다", () => {
    const result = buildStatusesFromColumns([
      { statusId: "only", name: "Only", order: 0 },
    ]);
    expect(result[0].isDone).toBe(true);
  });

  it("빈 배열이면 빈 배열을 반환한다", () => {
    expect(buildStatusesFromColumns([])).toEqual([]);
  });
});

describe("buildTransitionsFromColumns", () => {
  it("모든 상태 간 양방향 전환을 생성한다", () => {
    const columns = [
      { statusId: "a", name: "A" },
      { statusId: "b", name: "B" },
      { statusId: "c", name: "C" },
    ];

    const result = buildTransitionsFromColumns(columns);

    // 3 columns → 3 * 2 = 6 transitions
    expect(result).toHaveLength(6);
    expect(result).toContainEqual({ from: "a", to: "b", name: "B" });
    expect(result).toContainEqual({ from: "b", to: "a", name: "A" });
    expect(result).toContainEqual({ from: "a", to: "c", name: "C" });
  });

  it("자기 자신으로의 전환은 생성하지 않는다", () => {
    const columns = [
      { statusId: "x", name: "X" },
      { statusId: "y", name: "Y" },
    ];

    const result = buildTransitionsFromColumns(columns);

    expect(result.every((t) => t.from !== t.to)).toBe(true);
  });

  it("빈 배열이면 빈 배열을 반환한다", () => {
    expect(buildTransitionsFromColumns([])).toEqual([]);
  });
});

describe("getStatusName", () => {
  it("매칭되는 상태의 이름을 반환한다", () => {
    expect(getStatusName(STATUSES, "todo")).toBe("할 일");
    expect(getStatusName(STATUSES, "done")).toBe("완료");
  });

  it("없는 statusId면 id를 그대로 반환한다", () => {
    expect(getStatusName(STATUSES, "unknown-id")).toBe("unknown-id");
  });
});

describe("getStatusColor", () => {
  it("isDone 상태는 초록색을 반환한다", () => {
    expect(getStatusColor(STATUSES, "done")).toBe("#2ca87f");
  });

  it("order 0 상태는 회색을 반환한다", () => {
    expect(getStatusColor(STATUSES, "todo")).toBe("#5b6a98");
  });

  it("그 외 상태는 파란색을 반환한다", () => {
    expect(getStatusColor(STATUSES, "in-progress")).toBe("#4680ff");
  });

  it("없는 statusId면 기본 회색을 반환한다", () => {
    expect(getStatusColor(STATUSES, "unknown")).toBe("#6b7280");
  });
});

describe("getAvailableTransitions", () => {
  it("현재 상태에서 가능한 전환만 반환한다", () => {
    const result = getAvailableTransitions(TRANSITIONS, "in-progress");

    expect(result).toHaveLength(2);
    expect(result.map((t) => t.to)).toEqual(
      expect.arrayContaining(["done", "todo"]),
    );
  });

  it("전환이 없으면 빈 배열을 반환한다", () => {
    expect(getAvailableTransitions(TRANSITIONS, "done")).toEqual([]);
  });
});

describe("getDoneStatusIds", () => {
  it("isDone인 상태 ID들을 Set으로 반환한다", () => {
    const result = getDoneStatusIds(STATUSES);

    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(1);
    expect(result.has("done")).toBe(true);
  });

  it("isDone 상태가 없으면 빈 Set을 반환한다", () => {
    const noDone = STATUSES.map((s) => ({ ...s, isDone: false }));
    expect(getDoneStatusIds(noDone).size).toBe(0);
  });

  it("여러 isDone 상태를 모두 포함한다", () => {
    const multiDone: WorkflowStatus[] = [
      { id: "a", name: "A", isDone: true, order: 0 },
      { id: "b", name: "B", isDone: true, order: 1 },
      { id: "c", name: "C", isDone: false, order: 2 },
    ];
    const result = getDoneStatusIds(multiDone);
    expect(result.size).toBe(2);
    expect(result.has("a")).toBe(true);
    expect(result.has("b")).toBe(true);
  });
});
