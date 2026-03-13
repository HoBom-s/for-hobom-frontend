/**
 * Checks if a value is not undefined.
 *
 * @param value - The value to check.
 * @returns True if value is not undefined.
 *
 * @category Guard
 */
export function isDefined<T>(value: T): value is Exclude<T, undefined> {
  return value !== undefined;
}
