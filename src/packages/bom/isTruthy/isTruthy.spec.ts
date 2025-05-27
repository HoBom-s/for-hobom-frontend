import { describe, test, expect } from "vitest";
import { isTruthy } from "./isTruthy";

describe("isTruthy()", () => {
  test("Returns true", () => {
    expect(isTruthy({ a: "abc" })).toBe(true);
  });
});
