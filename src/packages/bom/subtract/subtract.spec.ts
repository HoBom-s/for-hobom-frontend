import { describe, test, expect } from "vitest";
import { subtract } from "./subtract";

describe("subtract()", () => {
  test("data-first", () => {
    expect(subtract(1, 2)).toBe(-1);
  });

  test("data-last", () => {
    const fn = subtract(1);

    expect(fn(2)).toBe(1);
  });
});
