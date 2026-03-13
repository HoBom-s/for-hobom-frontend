/**
 * Checks if a value is not null.
 *
 * @param value - The value to check.
 * @returns True if value is not null.
 *
 * @category Guard
 */
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}
