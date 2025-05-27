import { describe, test, expect } from "vitest";
import { sum } from "./sum";

describe("sum()", () => {
  test("data-first", () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  test("data-last", () => {
    const fn = sum;

    expect(fn([1, 2, 3])).toBe(6);
  });
});
