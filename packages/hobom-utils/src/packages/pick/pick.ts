import { curry } from "../curry/curry";

/**
 * Creates an object composed of the picked keys from `data`.
 *
 * @param data - The source object.
 * @param keys - The keys to pick.
 * @returns A new object with only the specified keys.
 *
 * @dataLast
 *
 * @category Object
 */
export function pick<T extends object, K extends keyof T>(
  data: T,
  keys: ReadonlyArray<K>,
): Pick<T, K>;
export function pick<T extends object, K extends keyof T>(
  keys: ReadonlyArray<K>,
): (data: T) => Pick<T, K>;
export function pick(...args: ReadonlyArray<unknown>): unknown {
  return curry(pickImpl, args);
}

function pickImpl<T extends object, K extends keyof T>(
  data: T,
  keys: ReadonlyArray<K>,
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = data[key];
  }
  return result;
}
