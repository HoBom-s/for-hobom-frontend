import { assertCondition } from "./assert";

describe("assertCondition", () => {
  it("throws for undefined", () => {
    expect(() => assertCondition(undefined, "msg")).toThrow(
      "Assertion failed: msg",
    );
  });

  it("throws for null", () => {
    expect(() => assertCondition(null, "msg")).toThrow("Assertion failed: msg");
  });

  it("throws for false", () => {
    expect(() => assertCondition(false, "msg")).toThrow(
      "Assertion failed: msg",
    );
  });

  it("throws for 0", () => {
    expect(() => assertCondition(0, "msg")).toThrow("Assertion failed: msg");
  });

  it("throws for empty string", () => {
    expect(() => assertCondition("", "msg")).toThrow("Assertion failed: msg");
  });

  it("includes empty message when none provided", () => {
    expect(() => assertCondition(null)).toThrow("Assertion failed: ");
  });

  it("does not throw for a non-empty string", () => {
    expect(() => assertCondition("hello")).not.toThrow();
  });

  it("does not throw for a positive number", () => {
    expect(() => assertCondition(1)).not.toThrow();
  });

  it("does not throw for true", () => {
    expect(() => assertCondition(true)).not.toThrow();
  });

  it("does not throw for an object", () => {
    expect(() => assertCondition({ id: 1 })).not.toThrow();
  });

  it("does not throw for an array", () => {
    expect(() => assertCondition(["a"])).not.toThrow();
  });
});
