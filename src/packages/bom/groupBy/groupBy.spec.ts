import { describe, expect, test } from "vitest";
import { groupBy } from "./groupBy";
import { prop } from "../prop/prop";
import { pipe } from "../pipe/pipe";

describe("groupBy", () => {
  test("data-first", () => {
    expect(
      groupBy(
        [
          { a: 1, b: 1 },
          { a: 1, b: 100 },
          { a: 2, b: 1101 },
          { a: 1, b: 2 },
        ],
        prop("a"),
      ),
    ).toStrictEqual({
      1: [
        { a: 1, b: 1 },
        { a: 1, b: 100 },
        { a: 1, b: 2 },
      ],
      2: [
        {
          a: 2,
          b: 1101,
        },
      ],
    });
  });

  test("data-last", () => {
    expect(
      pipe(
        [
          { a: 1, b: 1 },
          { a: 1, b: 100 },
          { a: 2, b: 1101 },
          { a: 1, b: 2 },
        ],
        groupBy(prop("a")),
      ),
    ).toStrictEqual({
      1: [
        { a: 1, b: 1 },
        { a: 1, b: 100 },
        { a: 1, b: 2 },
      ],
      2: [
        {
          a: 2,
          b: 1101,
        },
      ],
    });
  });
});
