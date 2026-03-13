import { curry } from "../curry/curry";
import type { Evaluator } from "../../core/types/evaluator.type";

/**
 * Returns a new array with the first `count` elements removed.
 * Supports lazy evaluation when used in a pipe.
 *
 * @param data - The array.
 * @param count - Number of elements to skip.
 * @returns A new array without the first `count` elements.
 *
 * @dataLast
 * @lazy
 *
 * @category Array
 */
export function drop<T>(data: readonly T[], count: number): T[];
export function drop<T>(count: number): (data: readonly T[]) => T[];
export function drop(...args: readonly unknown[]): unknown {
  return curry(dropImpl, args, lazyImpl);
}

function dropImpl<T>(data: readonly T[], count: number): T[] {
  return data.slice(count);
}

function lazyImpl<T>(count: number): Evaluator<T, T> {
  let skipped = 0;

  return (item) => {
    if (skipped < count) {
      skipped += 1;

      return { done: false, hasNext: false };
    }

    return { done: false, hasNext: true, next: item };
  };
}
