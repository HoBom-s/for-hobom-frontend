/**
 * Checks if a value is empty. Supports arrays, strings, plain objects, Map, and Set.
 *
 * @param value - The value to check.
 * @returns True if value is empty.
 *
 * @category Guard
 */
export function isEmpty(value: string): value is "";
export function isEmpty<T>(value: readonly T[]): value is [];
export function isEmpty(value: Map<unknown, unknown> | Set<unknown>): boolean;
export function isEmpty(value: Readonly<Record<string, unknown>>): boolean;
export function isEmpty(
  value:
    | string
    | readonly unknown[]
    | Map<unknown, unknown>
    | Set<unknown>
    | Readonly<Record<string, unknown>>,
): boolean {
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  return Object.keys(value).length === 0;
}
