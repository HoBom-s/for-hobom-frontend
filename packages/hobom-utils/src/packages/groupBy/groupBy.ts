import { curry } from "../curry/curry";

/**
 * Groups array elements by the key returned from `fn`. Elements with the same key
 * are collected into an array under that key.
 *
 * @param data - The array.
 * @param fn - A function that returns the group key for each element.
 * @returns A record mapping each key to an array of matching elements.
 *
 * @dataLast
 *
 * @category Array
 */
export function groupBy<T>(
  data: readonly T[],
  fn: (item: T, index: number, arr: readonly T[]) => string,
): Record<string, T[]>;
export function groupBy<T>(
  fn: (item: T, index: number, arr: readonly T[]) => string,
): (data: readonly T[]) => Record<string, T[]>;
export function groupBy(...args: readonly unknown[]): unknown {
  return curry(groupByImpl, args);
}

function groupByImpl<T>(
  data: readonly T[],
  fn: (item: T, index: number, arr: readonly T[]) => string,
): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  for (const [index, item] of data.entries()) {
    const key = fn(item, index, data);

    (result[key] ??= []).push(item);
  }

  return result;
}
