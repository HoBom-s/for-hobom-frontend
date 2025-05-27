import { describe, test, expect } from "vitest";
import { clamp } from "./clamp";

describe("clamp()", () => {
  test("Max value", () => {
    expect(clamp(10, { max: 5 })).toBe(5);
    expect(clamp(10, { max: 10 })).toBe(10);
    expect(clamp(11, { max: 10 })).toBe(10);
  });

  test("Min value", () => {
    expect(clamp({ min: 1 })(0)).toBe(1);
    expect(clamp({ min: 1 })(1)).toBe(1);
    expect(clamp({ min: 1 })(3)).toBe(3);
  });

  test("Between", () => {
    const between = clamp({ min: 1, max: 20 });

    expect(between(10)).toBe(10);
    expect(between(1)).toBe(1);
    expect(between(0)).toBe(1);
    expect(between(20)).toBe(20);
    expect(between(21)).toBe(20);
  });
});
