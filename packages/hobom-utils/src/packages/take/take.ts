import { curry } from "../curry/curry";
import type { Evaluator } from "../../core/types/evaluator.type";

/**
 * Returns the first `count` elements of an array.
 * Supports early termination when used in a pipe (lazy).
 *
 * @param data - The array.
 * @param count - Number of elements to take.
 * @returns A new array with at most `count` elements.
 *
 * @dataLast
 * @lazy
 *
 * @category Array
 */
export function take<T>(data: ReadonlyArray<T>, count: number): Array<T>;
export function take<T>(count: number): (data: ReadonlyArray<T>) => Array<T>;
export function take(...args: ReadonlyArray<unknown>): unknown {
  return curry(takeImpl, args, lazyImpl);
}

function takeImpl<T>(data: ReadonlyArray<T>, count: number): Array<T> {
  return data.slice(0, count);
}

function lazyImpl<T>(count: number): Evaluator<T, T> {
  let taken = 0;
  return (item) => {
    taken += 1;
    return { done: taken >= count, hasNext: true, next: item };
  };
}
