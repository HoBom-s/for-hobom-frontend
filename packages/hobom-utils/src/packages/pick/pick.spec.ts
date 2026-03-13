import { describe, expect, test } from "vitest";
import { pick } from "./pick";

describe("pick()", () => {
  test("data-first", () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toStrictEqual({
      a: 1,
      c: 3,
    });
  });

  test("data-last", () => {
    // Explicit type params needed: TypeScript can't distinguish array-as-keys from array-as-data
    const result = pick<{ a: number; b: number; c: number }, "a" | "b">([
      "a",
      "b",
    ])({
      a: 1,
      b: 2,
      c: 3,
    });

    expect(result).toStrictEqual({ a: 1, b: 2 });
  });
});
