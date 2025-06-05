import { describe, expect, test } from "vitest";
import { isNot } from "./isNot";
import { isNumber } from "../isNumber/isNumber.ts";

describe("isNot()", () => {
  test("return true", () => {
    expect(isNot(isNumber)("123")).toBe(true);
  });

  test("return false", () => {
    expect(isNot(isNumber)(123)).toBe(false);
  });
});
