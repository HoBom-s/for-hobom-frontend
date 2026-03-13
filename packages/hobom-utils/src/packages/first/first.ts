/**
 * Returns the first element of an array, or undefined if empty.
 *
 * @param data - The array.
 * @returns The first element.
 *
 * @category Array
 */
export function first(data: readonly []): undefined;
export function first<T>(data: readonly [T, ...ReadonlyArray<unknown>]): T;
export function first<T>(data: ReadonlyArray<T>): T | undefined;
export function first<T>(data: ReadonlyArray<T>): T | undefined {
  return data[0];
}
