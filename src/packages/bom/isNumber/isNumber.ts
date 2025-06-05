import type { NarrowedType } from "../../core/types/narrowType.type";

/**
 * Check if the passed value is number then returns `true`.
 *
 * @param v - The passed parameter.
 *
 * @category Guard
 */
export function isNumber<T>(v: T | number): v is NarrowedType<T, number> {
  return typeof v === "number";
}
