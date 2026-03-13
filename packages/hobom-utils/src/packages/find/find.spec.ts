import { describe, expect, test } from "vitest";
import { find } from "./find";
import { pipe } from "../pipe/pipe";
import { map } from "../map/map";

describe("find()", () => {
  test("data-first — returns matching element", () => {
    expect(find([1, 2, 3, 4], (x) => x > 2)).toBe(3);
  });

  test("data-first — returns undefined when not found", () => {
    expect(find([1, 2, 3], (x) => x > 10)).toBeUndefined();
  });

  test("data-last", () => {
    expect(find((x: number) => x > 2)([1, 2, 3, 4])).toBe(3);
  });

  test("lazy — early termination in pipe", () => {
    const result = pipe(
      [1, 2, 3, 4, 5],
      map((x) => x * 2),
      find((x) => x > 4),
    );

    expect(result).toBe(6);
  });
});
