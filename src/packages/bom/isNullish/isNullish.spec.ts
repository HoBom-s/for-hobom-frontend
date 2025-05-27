import { describe, test, expect } from "vitest";
import { isNullish } from "./isNullish";

describe("isNullish()", () => {
  test("Returns true or false", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish("")).toBe(false);
    expect(isNullish("Hi I am FoxMon")).toBe(false);
    expect(isNullish("Hi I am Robin")).toBe(false);
    expect(isNullish(1)).toBe(false);
    expect(isNullish(1.1213)).toBe(false);
    expect(isNullish(0)).toBe(false);
    expect(isNullish([1, 2, 3])).toBe(false);
    expect(isNullish([null])).toBe(false);
    expect(isNullish({})).toBe(false);
    expect(
      isNullish({
        Korea: "Seoul",
      }),
    ).toBe(false);
    expect(isNullish(() => true)).toBe(false);
  });
});
