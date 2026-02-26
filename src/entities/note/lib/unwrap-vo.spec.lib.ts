import { describe, it, expect } from "vitest";
import { unwrapVO } from "./unwrap-vo.lib.ts";

describe("unwrapVO", () => {
  it("returns empty string for null", () => {
    expect(unwrapVO(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(unwrapVO(undefined)).toBe("");
  });

  it("returns the string itself when given a plain string", () => {
    expect(unwrapVO("hello")).toBe("hello");
  });

  it("returns value property when given a value object", () => {
    expect(unwrapVO({ value: "test" })).toBe("test");
  });

  it("returns empty string for empty value object", () => {
    expect(unwrapVO({ value: "" })).toBe("");
  });
});
