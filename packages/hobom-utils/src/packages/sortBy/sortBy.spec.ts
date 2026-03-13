import { describe, expect, test } from "vitest";
import { sortBy } from "./sortBy";

describe("sortBy()", () => {
  test("data-first — sort by number key", () => {
    expect(sortBy([3, 1, 2], (x) => x)).toStrictEqual([1, 2, 3]);
  });

  test("data-first — sort by string key", () => {
    const users = [{ name: "Charlie" }, { name: "Alice" }, { name: "Bob" }];
    expect(sortBy(users, (u) => u.name)).toStrictEqual([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
    ]);
  });

  test("data-last", () => {
    expect(sortBy((x: number) => x)([3, 1, 2])).toStrictEqual([1, 2, 3]);
  });

  test("does not mutate original", () => {
    const arr = [3, 1, 2];
    sortBy(arr, (x) => x);
    expect(arr).toStrictEqual([3, 1, 2]);
  });
});
