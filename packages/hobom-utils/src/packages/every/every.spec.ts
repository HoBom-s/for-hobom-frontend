import { describe, expect, test } from "vitest";
import { every } from "./every";

describe("every()", () => {
  test("data-first — true when all match", () => {
    expect(every([2, 4, 6], (x) => x % 2 === 0)).toBe(true);
  });

  test("data-first — false when any does not match", () => {
    expect(every([2, 3, 6], (x) => x % 2 === 0)).toBe(false);
  });

  test("data-last", () => {
    expect(every((x: number) => x > 0)([1, 2, 3])).toBe(true);
  });
});
