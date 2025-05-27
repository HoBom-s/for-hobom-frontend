import { describe, test, expect } from "vitest";
import { isNumber } from "./isNumber";

describe("isNumber()", () => {
  test("Returns true or false", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(123)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber("0.1213121")).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(() => 1)).toBe(false);
  });
});
