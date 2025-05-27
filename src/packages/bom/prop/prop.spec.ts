import { describe, test, expect } from "vitest";
import { prop } from "./prop";

describe("prop()", () => {
  test("data-first", () => {
    const obj = {
      a: "A",
    };

    expect(prop(obj, "a")).toBe("A");
  });

  test("data-last", () => {
    const fn = prop("a");

    expect(fn({ a: "A" })).toBe("A");
  });
});
