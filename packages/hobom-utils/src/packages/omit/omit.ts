import { curry } from "../curry/curry";

/**
 * Creates an object with the specified keys removed from `data`.
 *
 * @param data - The source object.
 * @param keys - The keys to omit.
 * @returns A new object without the specified keys.
 *
 * @dataLast
 *
 * @category Object
 */
export function omit<T extends object, K extends keyof T>(
  data: T,
  keys: ReadonlyArray<K>,
): Omit<T, K>;
export function omit<T extends object, K extends keyof T>(
  keys: ReadonlyArray<K>,
): (data: T) => Omit<T, K>;
export function omit(...args: ReadonlyArray<unknown>): unknown {
  return curry(omitImpl, args);
}

function omitImpl<T extends object, K extends keyof T>(
  data: T,
  keys: ReadonlyArray<K>,
): Omit<T, K> {
  const keysToOmit = new Set<PropertyKey>(keys);
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keysToOmit.has(key)),
  ) as Omit<T, K>;
}
