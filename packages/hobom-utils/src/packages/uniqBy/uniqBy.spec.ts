import { describe, expect, test } from "vitest";
import { uniqBy } from "./uniqBy";

describe("uniqBy()", () => {
  test("data-first", () => {
    expect(uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], (x) => x.id)).toStrictEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  test("data-last", () => {
    expect(uniqBy((x: number) => x % 3)([1, 2, 3, 4, 5, 6])).toStrictEqual([1, 2, 3]);
  });
});
