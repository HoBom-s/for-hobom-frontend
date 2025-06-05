import { describe, test, expect } from "vitest";
import { filter } from "./filter";

describe("filter()", () => {
  test("Invoke callback function - data first", () => {
    const arr = [6, 1, 2, 3, 2, 1, 7, 9];
    const res = filter(arr, (item) => item % 2 === 0);

    expect(res).toStrictEqual([6, 2, 2]);
  });

  test("Invoke callback function - data last", () => {
    const arr = [6, 1, 2, 3, 2, 1, 7, 9, 10];
    const res = filter((item: number) => item % 2 === 0)(arr);

    expect(res).toStrictEqual([6, 2, 2, 10]);
  });
});
