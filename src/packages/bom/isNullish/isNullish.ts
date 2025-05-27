import type { NarrowedType } from "../../core/types/narrowType.type";

/**
 * Check if the passed value is nullish then returns `true`.
 *
 * @param v - The passed parameter.
 *
 * @category Guard
 */
export function isNullish<T>(
  v: T | null | undefined,
): v is NarrowedType<T, null | undefined> {
  return v === null || v === undefined;
}
