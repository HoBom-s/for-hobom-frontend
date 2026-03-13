import { describe, expect, test } from "vitest";
import { tap } from "./tap";
import { pipe } from "../pipe/pipe";
import { map } from "../map/map";

describe("tap()", () => {
  test("data-first — executes side effect and returns original value", () => {
    const log: number[] = [];
    const result = tap(42, (x) => log.push(x));
    expect(result).toBe(42);
    expect(log).toStrictEqual([42]);
  });

  test("data-last", () => {
    const log: number[] = [];
    const result = tap((x: number) => log.push(x))(42);
    expect(result).toBe(42);
    expect(log).toStrictEqual([42]);
  });

  test("lazy — called per element in pipe", () => {
    let callCount = 0;
    const result = pipe(
      [1, 2, 3],
      map((x) => x * 2),
      tap(() => {
        callCount += 1;
      }),
    );
    expect(result).toStrictEqual([2, 4, 6]);
    expect(callCount).toBe(3);
  });
});
