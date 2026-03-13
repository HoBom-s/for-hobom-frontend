import { describe, expect, test } from "vitest";
import { drop } from "./drop";
import { pipe } from "../pipe/pipe";
import { map } from "../map/map";

describe("drop()", () => {
  test("data-first", () => {
    expect(drop([1, 2, 3, 4, 5], 2)).toStrictEqual([3, 4, 5]);
  });

  test("data-last", () => {
    expect(drop(2)([1, 2, 3, 4, 5])).toStrictEqual([3, 4, 5]);
  });

  test("lazy — combined with map in pipe", () => {
    const result = pipe(
      [1, 2, 3, 4, 5],
      drop(2),
      map((x) => x * 10),
    );

    expect(result).toStrictEqual([30, 40, 50]);
  });
});
