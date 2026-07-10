import { describe, it, expect } from "vitest";
import { DEFAULT_BOARD_COLUMNS, getStatusConfig } from "./board.model";

describe("getStatusConfig", () => {
  it("todo 상태는 올바른 color/bg를 반환한다", () => {
    expect(getStatusConfig("todo")).toEqual({
      color: "#5b6a98",
      bg: "#eef0f4",
    });
  });

  it("in-progress 상태는 올바른 color/bg를 반환한다", () => {
    expect(getStatusConfig("in-progress")).toEqual({
      color: "#4680ff",
      bg: "#e3f2fd",
    });
  });

  it("done 상태는 올바른 color/bg를 반환한다", () => {
    expect(getStatusConfig("done")).toEqual({
      color: "#2ca87f",
      bg: "#e8f5e9",
    });
  });

  it("알 수 없는 statusId는 기본 config를 반환한다", () => {
    expect(getStatusConfig("unknown")).toEqual({
      color: "#6b7280",
      bg: "#f3f4f6",
    });
  });
});

describe("DEFAULT_BOARD_COLUMNS", () => {
  it("3개의 기본 컬럼이 올바른 순서로 존재한다", () => {
    expect(DEFAULT_BOARD_COLUMNS).toHaveLength(3);
    expect(DEFAULT_BOARD_COLUMNS[0]?.statusId).toBe("todo");
    expect(DEFAULT_BOARD_COLUMNS[1]?.statusId).toBe("in-progress");
    expect(DEFAULT_BOARD_COLUMNS[2]?.statusId).toBe("done");
  });

  it("order 값이 0, 1, 2 순서이다", () => {
    expect(DEFAULT_BOARD_COLUMNS.map((c) => c.order)).toEqual([0, 1, 2]);
  });
});
