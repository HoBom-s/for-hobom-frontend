import { curry } from "../curry/curry";

/**
 * Tests whether all elements in the array pass the predicate. Equivalent to
 * `Array.prototype.every`.
 *
 * @param data - The array.
 * @param predicate - A function to test each element.
 * @returns True if every element passes the predicate.
 *
 * @dataLast
 *
 * @category Array
 */
export function every<T, S extends T>(
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => v is S,
): data is readonly S[];
export function every<T>(
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): boolean;
export function every<T, S extends T>(
  predicate: (v: T, index: number, arr: readonly T[]) => v is S,
): (data: readonly T[]) => data is readonly S[];
export function every<T>(
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): (data: readonly T[]) => boolean;
export function every(...args: readonly unknown[]): unknown {
  return curry(everyImpl, args);
}

function everyImpl<T>(
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): boolean {
  return data.every(predicate);
}
