/**
 * Checks if a value is an array.
 *
 * @param value - The value to check.
 * @returns True if value is an array.
 *
 * @category Guard
 */
export function isArray<T>(
  value: T | readonly unknown[],
): value is readonly unknown[] {
  return Array.isArray(value);
}
