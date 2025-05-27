import { describe, test, expect } from "vitest";
import { reduce } from "./reduce";

describe("reduce()", () => {
  test("data-first", () => {
    expect(reduce([1, 2, 3], (acc, x: number) => acc + x, 0)).toBe(6);
  });

  test("data-last", () => {
    expect(reduce((acc, x: number) => acc + x, 0)([1, 2, 3])).toBe(6);
  });
});
