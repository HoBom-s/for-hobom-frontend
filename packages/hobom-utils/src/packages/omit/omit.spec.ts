import { describe, expect, test } from "vitest";
import { omit } from "./omit";

describe("omit()", () => {
  test("data-first", () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toStrictEqual({ a: 1, c: 3 });
  });

  test("data-last", () => {
    // Explicit type params needed: TypeScript can't distinguish array-as-keys from array-as-data
    const result = omit<{ a: number; b: number; c: number }, "a">(["a"])({
      a: 1,
      b: 2,
      c: 3,
    });

    expect(result).toStrictEqual({ b: 2, c: 3 });
  });
});
