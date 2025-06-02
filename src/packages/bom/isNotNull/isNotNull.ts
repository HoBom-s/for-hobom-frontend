/**
 * Check not null.
 *
 * @param v - The passed parameter.
 *
 * @category Guard
 */
export function isNotNull<T>(v: T): v is T {
  return v != null;
}
