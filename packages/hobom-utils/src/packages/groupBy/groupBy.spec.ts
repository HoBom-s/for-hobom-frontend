import { describe, expect, test } from "vitest";
import { groupBy } from "./groupBy";

describe("groupBy()", () => {
  test("data-first", () => {
    expect(
      groupBy([1, 2, 3, 4], (x) => (x % 2 === 0 ? "even" : "odd")),
    ).toStrictEqual({
      odd: [1, 3],
      even: [2, 4],
    });
  });

  test("data-last", () => {
    const result = groupBy((x: number) => String(x % 3))([0, 1, 2, 3, 4, 5]);

    expect(result).toStrictEqual({ "0": [0, 3], "1": [1, 4], "2": [2, 5] });
  });
});
