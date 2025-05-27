import { describe, test, expect } from "vitest";
import { when } from "./when";
import { constant } from "../constant/constant";
import { map } from "../map/map";

describe("when()", () => {
  test("data-first", () => {
    expect(
      when("hello", (v: string) => v === "hello", constant("was true")),
    ).toBe("was true");
    expect(
      when("hello", (v: string) => v === "hallo", constant("was true")),
    ).toBe("hello");
    expect(
      when(1, (v: number) => v === 1, {
        onFalse: constant("False"),
        onTrue: constant("True"),
      }),
    ).toBe("True");
  });

  test("data-last", () => {
    const fn = map(
      when(
        (x: number) => x % 2 === 0,
        (x: number, idx: number) => x + idx,
      ),
    );

    expect(fn([1, 2, 3, 4])).toStrictEqual([1, 3, 3, 7]);
  });
});
