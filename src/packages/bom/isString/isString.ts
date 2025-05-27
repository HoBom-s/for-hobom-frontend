import type { NarrowedType } from "../../core/types/narrowType.type";

/**
 * Check if the passed value is string then returns `true`.
 *
 * @param v - The passed parameter.
 *
 * @category Guard
 */
export function isString<T>(v: T | string): v is NarrowedType<T, string> {
  return typeof v === "string";
}
