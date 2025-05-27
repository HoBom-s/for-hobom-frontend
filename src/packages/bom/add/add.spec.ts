import { describe, test, expect } from "vitest";
import { add } from "./add";

describe("add()", () => {
  test("Add two numbers", () => {
    expect(add(5, 1)).toBe(6);
    expect(add(-1)(1)).toBe(0);
  });
});
