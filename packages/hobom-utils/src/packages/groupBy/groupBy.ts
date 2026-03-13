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
  data: ReadonlyArray<T>,
  fn: (item: T, index: number, arr: ReadonlyArray<T>) => string,
): Record<string, Array<T>>;
export function groupBy<T>(
  fn: (item: T, index: number, arr: ReadonlyArray<T>) => string,
): (data: ReadonlyArray<T>) => Record<string, Array<T>>;
export function groupBy(...args: ReadonlyArray<unknown>): unknown {
  return curry(groupByImpl, args);
}

function groupByImpl<T>(
  data: ReadonlyArray<T>,
  fn: (item: T, index: number, arr: ReadonlyArray<T>) => string,
): Record<string, Array<T>> {
  const result: Record<string, Array<T>> = {};
  for (const [index, item] of data.entries()) {
    const key = fn(item, index, data);
    if (result[key] === undefined) {
      result[key] = [];
    }
    result[key]!.push(item);
  }
  return result;
}
