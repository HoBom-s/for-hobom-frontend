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
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): boolean;
export function some<T>(
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): (data: readonly T[]) => boolean;
export function some(...args: readonly unknown[]): unknown {
  return curry(someImpl, args);
}

function someImpl<T>(
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): boolean {
  return data.some(predicate);
}
