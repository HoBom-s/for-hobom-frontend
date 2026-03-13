import { describe, expect, test } from "vitest";
import { flatMap } from "./flatMap";
import { pipe } from "../pipe/pipe";
import { filter } from "../filter/filter";

describe("flatMap()", () => {
  test("data-first", () => {
    expect(flatMap([1, 2, 3], (x) => [x, x * 10])).toStrictEqual([
      1, 10, 2, 20, 3, 30,
    ]);
  });

  test("data-last", () => {
    expect(flatMap((x: number) => [x, x * 10])([1, 2, 3])).toStrictEqual([
      1, 10, 2, 20, 3, 30,
    ]);
  });

  test("lazy — no intermediate array when piped with filter", () => {
    const result = pipe(
      [1, 2, 3],
      flatMap((x) => [x, x * 10]),
      filter((x) => x > 5),
    );
    expect(result).toStrictEqual([10, 20, 30]);
  });
});
