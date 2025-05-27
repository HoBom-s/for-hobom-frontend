import { describe, test, expect } from "vitest";
import { curry } from "./curry";

describe("curry()", () => {
  function sub(a: number, b: number): number {
    return a - b;
  }

  function fn(...args: ReadonlyArray<unknown>): unknown {
    return curry(sub, args);
  }

  test("All arguments", () => {
    expect(fn(10, 5)).toBe(5);
  });

  test("1 arguments", () => {
    const curried = fn(5) as (...args: ReadonlyArray<unknown>) => unknown;

    expect(curried(10)).toBe(5);
  });

  test('Throw error "wrong number of args"', () => {
    expect(() => fn(5, 10, 40)).toThrow("Wrong number of args");
  });
});
