import { curry } from "../curry/curry";

/**
 * Tests whether at least one element in the array passes the predicate. Equivalent to
 * `Array.prototype.some`.
 *
 * @param data - The array.
 * @param predicate - A function to test each element.
 * @returns True if any element passes the predicate.
 *
 * @dataLast
 *
 * @category Array
 */
export function some<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): boolean;
export function some<T>(
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): (data: ReadonlyArray<T>) => boolean;
export function some(...args: ReadonlyArray<unknown>): unknown {
  return curry(someImpl, args);
}

function someImpl<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): boolean {
  return data.some(predicate);
}
