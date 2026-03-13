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
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): number;
export function findIndex<T>(
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): (data: ReadonlyArray<T>) => number;
export function findIndex(...args: ReadonlyArray<unknown>): unknown {
  return curry(findIndexImpl, args);
}

function findIndexImpl<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): number {
  return data.findIndex(predicate);
}
