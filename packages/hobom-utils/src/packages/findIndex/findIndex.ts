import { curry } from "../curry/curry";

/**
 * Returns the index of the first element satisfying the predicate, or -1 if not found.
 * Equivalent to `Array.prototype.findIndex`.
 *
 * @param data - The array.
 * @param predicate - A function to test each element.
 * @returns The index of the first matching element, or -1.
 *
 * @dataLast
 *
 * @category Array
 */
export function findIndex<T>(
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): number;
export function findIndex<T>(
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): (data: readonly T[]) => number;
export function findIndex(...args: readonly unknown[]): unknown {
  return curry(findIndexImpl, args);
}

function findIndexImpl<T>(
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): number {
  return data.findIndex(predicate);
}
