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
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => v is S,
): [S[], Exclude<T, S>[]];
export function partition<T>(
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): [T[], T[]];
export function partition<T, S extends T>(
  predicate: (v: T, index: number, arr: readonly T[]) => v is S,
): (data: readonly T[]) => [S[], Exclude<T, S>[]];
export function partition<T>(
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): (data: readonly T[]) => [T[], T[]];
export function partition(...args: readonly unknown[]): unknown {
  return curry(partitionImpl, args);
}

function partitionImpl<T>(
  data: readonly T[],
  predicate: (v: T, index: number, arr: readonly T[]) => boolean,
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  for (const [index, item] of data.entries()) {
    if (predicate(item, index, data)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }

  return [truthy, falsy];
}
