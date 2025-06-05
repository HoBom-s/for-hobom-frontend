import { describe, test, expect } from "vitest";
import { map } from "./map";
import { add } from "../add/add";

describe("map()", () => {
  test("Invoke callback function - data first", () => {
    const arr = [1, 2, 3];
    const res = map(arr, (item) => item * 2);

    expect(res).toStrictEqual([2, 4, 6]);

    const addedResult = map(arr, add(1));
    expect(addedResult).toStrictEqual([2, 3, 4]);
  });

  test("Invoke callback function - data last", () => {
    const arr = [1, 2, 3];
    const res = map((_, idx) => idx)(arr);

    expect(res).toStrictEqual([0, 1, 2]);
  });
});
