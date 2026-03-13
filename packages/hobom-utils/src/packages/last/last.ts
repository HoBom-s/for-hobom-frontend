/**
 * Returns the last element of an array, or undefined if empty.
 *
 * @param data - The array.
 * @returns The last element.
 *
 * @category Array
 */
export function last(data: readonly []): undefined;
export function last<T>(data: readonly [...ReadonlyArray<unknown>, T]): T;
export function last<T>(data: ReadonlyArray<T>): T | undefined;
export function last<T>(data: ReadonlyArray<T>): T | undefined {
  return data[data.length - 1];
}
