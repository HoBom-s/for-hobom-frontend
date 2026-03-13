import { curry } from "../curry/curry";

/**
 * Get the value of the passed parameter.
 *
 * @param data - The original data.
 * @param key - The key.
 * @returns T[K]
 *
 * @dataFirst
 * @dataLast
 *
 * @category Object
 */
export function prop<T, K extends keyof T>(data: T, key: K): T[K];
export function prop<T, K extends keyof T>(key: K): (data: T) => T[K];
export function prop<K extends PropertyKey>(
  key: K,
): <T extends Partial<Record<K, unknown>>>(data: T) => T[K];
export function prop(...args: ReadonlyArray<unknown>): unknown {
  return curry(propImpl, args);
}

function propImpl<T, K extends keyof T>(data: T, key: K): T[K] {
  return data[key];
}
