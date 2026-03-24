import { describe, it, expect } from "vitest";
import { assertCondition } from "./assert.lib";

describe("assertCondition", () => {
  it("truthy 값이면 throw하지 않는다", () => {
    expect(() => assertCondition(true)).not.toThrow();
    expect(() => assertCondition("hello")).not.toThrow();
    expect(() => assertCondition(1)).not.toThrow();
    expect(() => assertCondition({})).not.toThrow();
  });

  it("falsy 값이면 Error를 throw한다", () => {
    expect(() => assertCondition(null)).toThrow("Assertion failed");
    expect(() => assertCondition(undefined)).toThrow("Assertion failed");
    expect(() => assertCondition(false)).toThrow("Assertion failed");
    expect(() => assertCondition(0)).toThrow("Assertion failed");
    expect(() => assertCondition("")).toThrow("Assertion failed");
  });

  it("message가 제공되면 에러 메시지에 포함된다", () => {
    expect(() => assertCondition(null, "값이 필요합니다")).toThrow(
      "Assertion failed: 값이 필요합니다",
    );
  });

  it("message가 없으면 빈 문자열로 끝난다", () => {
    expect(() => assertCondition(null)).toThrow("Assertion failed: ");
  });
});
