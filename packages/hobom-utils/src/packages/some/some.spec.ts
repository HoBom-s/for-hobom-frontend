import { describe, expect, test } from "vitest";
import { some } from "./some";

describe("some()", () => {
  test("data-first — true when any matches", () => {
    expect(some([1, 2, 3], (x) => x > 2)).toBe(true);
  });

  test("data-first — false when none match", () => {
    expect(some([1, 2, 3], (x) => x > 10)).toBe(false);
  });

  test("data-last", () => {
    expect(some((x: number) => x < 0)([1, 2, 3])).toBe(false);
  });
});
