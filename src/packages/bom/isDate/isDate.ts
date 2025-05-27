/**
 * A function that checks if the passed parameter is a Date.
 *
 * @param v -The variable of check.
 * @returns True if the passed parameter is Date, false otherwise.
 *
 * @category Guard
 */
export function isDate(v: unknown): v is Date {
  return v instanceof Date;
}
