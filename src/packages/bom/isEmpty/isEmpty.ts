import type { Iterable } from "../../core/types/iterable.type";

/**
 * Check the passed parameter is empty.
 *
 * @param data - The passed parameter.
 *
 * @category Guard
 */
export function isEmpty<T extends string | undefined | null>(
  data: T,
): data is
  | ("" extends T ? "" : never)
  | (undefined extends T ? undefined : never)
  | (null extends T ? null : never);
export function isEmpty(data: Iterable): data is [];
export function isEmpty<T extends object>(
  data: T,
): data is Record<keyof T, never>;
export function isEmpty(data: object | string | undefined): boolean {
  if (typeof data === "string") {
    return data.length === 0;
  }
  if (data === undefined || data === null) {
    return true;
  }
  if (Array.isArray(data)) {
    return data.length === 0;
  }

  return Object.keys(data).length === 0;
}
