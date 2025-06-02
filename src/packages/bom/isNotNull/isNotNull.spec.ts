import { describe, expect, test } from "vitest";
import { isNotNull } from "./isNotNull.ts";

describe("isNotNull()", () => {
  test("if the passed parameter is null than returns false", () => {
    expect(isNotNull(123)).toBe(true);
    expect(isNotNull({})).toBe(true);
    expect(isNotNull([])).toBe(true);
    expect(isNotNull(null)).toBe(false);
    expect(isNotNull(undefined)).toBe(false);
  });
});
