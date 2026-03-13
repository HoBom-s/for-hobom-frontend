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
  data: ReadonlyArray<T>,
  fn: (item: T) => number | string,
): Array<T>;
export function sortBy<T>(
  fn: (item: T) => number | string,
): (data: ReadonlyArray<T>) => Array<T>;
export function sortBy(...args: ReadonlyArray<unknown>): unknown {
  return curry(sortByImpl, args);
}

function sortByImpl<T>(
  data: ReadonlyArray<T>,
  fn: (item: T) => number | string,
): Array<T> {
  return [...data].sort((a, b) => {
    const ka = fn(a);
    const kb = fn(b);
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });
}
