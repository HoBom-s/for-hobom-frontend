import { curry } from "../curry/curry";

/**
 * Returns a new array with duplicate values removed, using `fn` to derive the
 * comparison key for each element. The first occurrence is kept.
 *
 * @param data - The array.
 * @param fn - A function that returns the key used for equality comparison.
 * @returns A new array with unique elements.
 *
 * @dataLast
 *
 * @category Array
 */
export function uniqBy<T, K>(data: readonly T[], fn: (item: T) => K): T[];
export function uniqBy<T, K>(fn: (item: T) => K): (data: readonly T[]) => T[];
export function uniqBy(...args: readonly unknown[]): unknown {
  return curry(uniqByImpl, args);
}

function uniqByImpl<T, K>(data: readonly T[], fn: (item: T) => K): T[] {
  const seen = new Set<K>();
  const result: T[] = [];

  for (const item of data) {
    const key = fn(item);

    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}
