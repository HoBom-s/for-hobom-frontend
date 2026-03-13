import { describe, expect, test } from "vitest";
import { partition } from "./partition";

describe("partition()", () => {
  test("data-first", () => {
    expect(partition([1, 2, 3, 4, 5], (x) => x % 2 === 0)).toStrictEqual([
      [2, 4],
      [1, 3, 5],
    ]);
  });

  test("data-last", () => {
    expect(partition((x: number) => x > 3)([1, 2, 3, 4, 5])).toStrictEqual([
      [4, 5],
      [1, 2, 3],
    ]);
  });
});
