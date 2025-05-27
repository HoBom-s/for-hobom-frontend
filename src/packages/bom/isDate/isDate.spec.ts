import { describe, test, expect } from "vitest";
import { isDate } from "./isDate";

describe("isDate()", () => {
  test("Check passed parameter is Date instance.", () => {
    expect(isDate(true)).toBe(false);
    expect(isDate(1)).toBe(false);
    expect(isDate("1")).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate(function () {})).toBe(false);
    expect(isDate([1, 2, 3])).toBe(false);
    expect(isDate({ a: 1, b: "2" })).toBe(false);
    expect(isDate(new Date())).toBe(true);
  });
});
