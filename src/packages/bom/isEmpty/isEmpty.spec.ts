import { describe, expect, test } from "vitest";
import { isEmpty } from "./isEmpty";

describe("isEmpty", () => {
  test("returns true for an empty array", () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
  });

  test("returns true for an empty string", () => {
    expect(isEmpty("")).toBe(true);
    expect(isEmpty("test")).toBe(false);
  });

  test("returns true for an empty object", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  test("returns true for undefined or null", () => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
  });
});
