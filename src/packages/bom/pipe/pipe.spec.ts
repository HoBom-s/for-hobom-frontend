import { describe, test, expect } from "vitest";
import { pipe } from "./pipe";
import { map } from "../map/map";
import { filter } from "../filter/filter";

describe("pipe()", () => {
  test("If passed function is empty then returns the original data.", () => {
    const data = { a: "hello", b: 123 };

    expect(pipe(data)).toBe(data);
  });

  test("lazy map + filter + take", () => {
    expect(
      pipe(
        [1, 2, 3],
        map((x: number) => x * 10),
        filter((x) => (x / 10) % 2 === 1),
      ),
    ).toStrictEqual([10, 30]);
  });
});
