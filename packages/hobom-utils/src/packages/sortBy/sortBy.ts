import { curry } from "../curry/curry";

/**
 * Returns a new sorted array using the result of `fn` as the sort key.
 * The original array is not mutated.
 *
 * @param data - The array.
 * @param fn - A function that returns the sort key for each element.
 * @returns A new sorted array.
 *
 * @dataLast
 *
 * @category Array
 */
export function sortBy<T>(
  data: readonly T[],
  fn: (item: T) => number | string,
): T[];
export function sortBy<T>(
  fn: (item: T) => number | string,
): (data: readonly T[]) => T[];
export function sortBy(...args: readonly unknown[]): unknown {
  return curry(sortByImpl, args);
}

function sortByImpl<T>(
  data: readonly T[],
  fn: (item: T) => number | string,
): T[] {
  return [...data].sort((a, b) => {
    const ka = fn(a);
    const kb = fn(b);

    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });
}
