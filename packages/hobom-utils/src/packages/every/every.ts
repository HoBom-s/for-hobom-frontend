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
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => v is S,
): data is ReadonlyArray<S>;
export function every<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): boolean;
export function every<T, S extends T>(
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => v is S,
): (data: ReadonlyArray<T>) => data is ReadonlyArray<S>;
export function every<T>(
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): (data: ReadonlyArray<T>) => boolean;
export function every(...args: ReadonlyArray<unknown>): unknown {
  return curry(everyImpl, args);
}

function everyImpl<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): boolean {
  return data.every(predicate);
}
