import { describe, expect, test } from "vitest";
import { mapValues } from "./mapValues";

describe("mapValues()", () => {
  test("data-first", () => {
    expect(mapValues({ a: 1, b: 2, c: 3 }, (v) => v * 10)).toStrictEqual({
      a: 10,
      b: 20,
      c: 30,
    });
  });

  test("data-last", () => {
    expect(mapValues((v: number) => v + 1)({ x: 0, y: 5 })).toStrictEqual({
      x: 1,
      y: 6,
    });
  });

  test("receives key as second argument", () => {
    expect(mapValues({ a: 1 }, (v, k) => `${k}:${v}`)).toStrictEqual({
      a: "a:1",
    });
  });
});
