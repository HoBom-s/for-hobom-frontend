import { curry } from "../curry/curry";

/**
 * Splits an array into two groups: elements that satisfy the predicate and those that don't.
 * Returns a `[truthy, falsy]` tuple. Single-pass O(n).
 *
 * @param data - The array.
 * @param predicate - A function to test each element.
 * @returns A tuple of `[matching, nonMatching]` arrays.
 *
 * @dataLast
 *
 * @category Array
 */
export function partition<T, S extends T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => v is S,
): [Array<S>, Array<Exclude<T, S>>];
export function partition<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): [Array<T>, Array<T>];
export function partition<T, S extends T>(
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => v is S,
): (data: ReadonlyArray<T>) => [Array<S>, Array<Exclude<T, S>>];
export function partition<T>(
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): (data: ReadonlyArray<T>) => [Array<T>, Array<T>];
export function partition(...args: ReadonlyArray<unknown>): unknown {
  return curry(partitionImpl, args);
}

function partitionImpl<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): [Array<T>, Array<T>] {
  const truthy: Array<T> = [];
  const falsy: Array<T> = [];
  for (const [index, item] of data.entries()) {
    if (predicate(item, index, data)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
}
