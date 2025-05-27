import type { ExactRecordType } from "../../core/types/exactRecord.type";
import { curry } from "../curry/curry";

/**
 * Categorize and count elements in array using callback function.
 *
 * @param data - The array.
 * @param fn - Categorized function.
 *
 * @category Array
 */
export function countBy<T, K extends PropertyKey>(
  data: ReadonlyArray<T>,
  fn: (value: T, index: number, data: ReadonlyArray<T>) => K | undefined,
): ExactRecordType<K, number>;
export function countBy<T, K extends PropertyKey>(
  fn: (value: T, index: number, data: ReadonlyArray<T>) => K | undefined,
): (data: ReadonlyArray<T>) => ExactRecordType<K, number>;
export function countBy(...args: ReadonlyArray<unknown>): unknown {
  return curry(countByImpl, args);
}

function countByImpl<T>(
  data: ReadonlyArray<T>,
  fn: (
    value: T,
    index: number,
    data: ReadonlyArray<T>,
  ) => PropertyKey | undefined,
): ExactRecordType<PropertyKey, number> {
  const result = new Map<PropertyKey, number>();

  for (const [index, item] of data.entries()) {
    const category = fn(item, index, data);

    if (category != null) {
      const count = result.get(category);

      if (count == null) {
        result.set(category, 1);
      } else {
        result.set(category, count + 1);
      }
    }
  }

  return Object.fromEntries(result);
}
