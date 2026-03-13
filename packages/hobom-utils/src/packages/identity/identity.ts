/**
 * Returns the given value unchanged. Useful as a default callback or in pipelines.
 *
 * @param value - The value.
 * @returns The same value.
 *
 * @category Function
 */
export function identity<T>(value: T): T {
  return value;
}
