import { describe, expect, test } from "vitest";
import { entries } from "./entries";

describe("entries", () => {
  test("should return pairs", () => {
    expect(entries({ a: 1, b: 2, c: 3 })).toStrictEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });
});
