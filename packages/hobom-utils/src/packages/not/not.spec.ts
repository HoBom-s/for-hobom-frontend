import { describe, expect, test } from "vitest";
import { not, isNot } from "./not";
import { pipe } from "../pipe/pipe";
import { filter } from "../filter/filter";
import { isNullish } from "../isNullish/isNullish";

describe("not()", () => {
  test("negates a predicate", () => {
    expect(not((x: number) => x > 0)(-1)).toBe(true);
    expect(not((x: number) => x > 0)(1)).toBe(false);
  });

  test("used with filter in pipe", () => {
    const result = pipe([1, null, 2, undefined, 3], filter(not(isNullish)));

    expect(result).toStrictEqual([1, 2, 3]);
  });
});

describe("isNot()", () => {
  test("is an alias of not", () => {
    expect(isNot).toBe(not);
  });

  test("used with filter", () => {
    const result = pipe([1, null, 2, undefined, 3], filter(isNot(isNullish)));

    expect(result).toStrictEqual([1, 2, 3]);
  });
});
