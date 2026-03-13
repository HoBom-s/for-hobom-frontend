import { describe, it, expect } from "vitest";
import type { BoardColumn } from "@/entities/board";
import {
  reorderColumns,
  removeColumn,
  addColumn,
  isDuplicateStatusId,
} from "./board-columns.lib";

const col = (statusId: string, order: number): BoardColumn => ({
  statusId,
  name: statusId.toUpperCase(),
  wipLimit: null,
  order,
});

describe("reorderColumns", () => {
  it("컬럼 순서를 변경하고 order를 재인덱싱한다", () => {
    const columns = [col("todo", 0), col("in_progress", 1), col("done", 2)];
    const result = reorderColumns(columns, "done", "todo");

    expect(result.map((c) => c.statusId)).toEqual([
      "done",
      "todo",
      "in_progress",
    ]);
    expect(result.map((c) => c.order)).toEqual([0, 1, 2]);
  });

  it("존재하지 않는 ID면 원본을 반환한다", () => {
    const columns = [col("todo", 0)];

    expect(reorderColumns(columns, "nonexistent", "todo")).toEqual(columns);
  });
});

describe("removeColumn", () => {
  it("컬럼을 제거하고 order를 재인덱싱한다", () => {
    const columns = [col("todo", 0), col("in_progress", 1), col("done", 2)];
    const result = removeColumn(columns, "in_progress");

    expect(result).toHaveLength(2);
    expect(result.map((c) => c.statusId)).toEqual(["todo", "done"]);
    expect(result.map((c) => c.order)).toEqual([0, 1]);
  });
});

describe("addColumn", () => {
  it("새 컬럼을 추가하고 올바른 order를 설정한다", () => {
    const columns = [col("todo", 0)];
    const result = addColumn(columns, "done", "Done");

    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({
      statusId: "done",
      name: "Done",
      wipLimit: null,
      order: 1,
    });
  });
});

describe("isDuplicateStatusId", () => {
  it("중복된 statusId가 있으면 true", () => {
    const columns = [col("todo", 0)];

    expect(isDuplicateStatusId(columns, "todo")).toBe(true);
  });

  it("중복이 없으면 false", () => {
    const columns = [col("todo", 0)];

    expect(isDuplicateStatusId(columns, "done")).toBe(false);
  });
});
