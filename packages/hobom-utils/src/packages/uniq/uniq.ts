/**
 * Returns a new array with duplicate values removed. Equality is determined by `===`.
 *
 * @param data - The array.
 * @returns A new array with unique values.
 *
 * @category Array
 */
export function uniq<T>(data: ReadonlyArray<T>): Array<T> {
  return [...new Set(data)];
}
