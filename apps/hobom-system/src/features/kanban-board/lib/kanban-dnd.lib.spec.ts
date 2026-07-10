import { describe, it, expect } from "vitest";
import type { IssueType } from "@/entities/issue";
import {
  findColumnOfIssue,
  resolveDropTarget,
  columnDroppableId,
  type ColumnMap,
} from "./kanban-dnd.lib";

const makeIssue = (id: string): IssueType =>
  ({
    id,
    project: "proj",
    issueNumber: 1,
    issueKey: "P-1",
    type: "TASK",
    title: "test",
    status: "todo",
    priority: "MEDIUM",
    reporter: "user",
    labels: [],
  });

const COLUMNS: ColumnMap = {
  todo: [makeIssue("i1"), makeIssue("i2")],
  "in-progress": [makeIssue("i3")],
  done: [],
};

describe("findColumnOfIssue", () => {
  it("이슈가 속한 컬럼의 statusId를 반환한다", () => {
    expect(findColumnOfIssue(COLUMNS, "i1")).toBe("todo");
    expect(findColumnOfIssue(COLUMNS, "i3")).toBe("in-progress");
  });

  it("없는 이슈면 null을 반환한다", () => {
    expect(findColumnOfIssue(COLUMNS, "nonexistent")).toBeNull();
  });

  it("빈 컬럼맵이면 null을 반환한다", () => {
    expect(findColumnOfIssue({}, "i1")).toBeNull();
  });
});

describe("resolveDropTarget", () => {
  it("column- 접두사가 있으면 statusId를 추출한다", () => {
    expect(resolveDropTarget(COLUMNS, "column-todo")).toBe("todo");
    expect(resolveDropTarget(COLUMNS, "column-done")).toBe("done");
  });

  it("접두사가 없으면 이슈를 찾아 해당 컬럼을 반환한다", () => {
    expect(resolveDropTarget(COLUMNS, "i1")).toBe("todo");
    expect(resolveDropTarget(COLUMNS, "i3")).toBe("in-progress");
  });

  it("접두사도 없고 이슈도 없으면 null을 반환한다", () => {
    expect(resolveDropTarget(COLUMNS, "unknown")).toBeNull();
  });
});

describe("columnDroppableId", () => {
  it("statusId에 column- 접두사를 붙인다", () => {
    expect(columnDroppableId("todo")).toBe("column-todo");
    expect(columnDroppableId("in-progress")).toBe("column-in-progress");
  });
});
