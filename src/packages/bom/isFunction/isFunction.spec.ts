import { describe, test, expect } from "vitest";
import { isFunction } from "./isFunction";

describe("isFunction()", () => {
  test("Return false", () => {
    expect(isFunction(1)).toBe(false);
    expect(isFunction("1")).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([1, 2, 3])).toBe(false);
  });

  test("Return true", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function a() {})).toBe(true);
  });
});
