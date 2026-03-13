import { describe, expect, test } from "vitest";
import { take } from "./take";
import { pipe } from "../pipe/pipe";
import { map } from "../map/map";

describe("take()", () => {
  test("data-first", () => {
    expect(take([1, 2, 3, 4, 5], 3)).toStrictEqual([1, 2, 3]);
  });

  test("data-last", () => {
    expect(take(3)([1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3]);
  });

  test("lazy — early termination in pipe", () => {
    const result = pipe(
      [1, 2, 3, 4, 5],
      map((x) => x * 2),
      take(3),
    );
    expect(result).toStrictEqual([2, 4, 6]);
  });
});
