/**
 * Check the passed parameter is truthy.
 *
 * @param v - The passed parameter.
 *
 * @category Guard
 */
export function isTruthy<T>(
  v: T,
): v is Extract<T, 0 | null | undefined | false | ""> {
  return Boolean(v);
}
