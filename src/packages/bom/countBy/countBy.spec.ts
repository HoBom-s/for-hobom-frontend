import { describe, test, expect } from "vitest";
import { countBy } from "./countBy";

describe("countBy()", () => {
  test("Array of strings", () => {
    const data = ["a", "b", "c", "B", "B", "C"];
    const result = countBy(data, (x) => x.toLowerCase());

    expect(result).toStrictEqual({ a: 1, b: 3, c: 2 });
  });

  test("Indexed", () => {
    const arr = [1, 2, 3, 4, 5, 1, 2, 3];
    const res = countBy(arr, (x) => x);

    expect(res).toStrictEqual({ 1: 2, 2: 2, 3: 2, 4: 1, 5: 1 });
  });
});
