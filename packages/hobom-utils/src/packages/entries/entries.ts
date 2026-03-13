/**
 * Returns an array of the object's own enumerable string-keyed `[key, value]` pairs.
 * Typed counterpart to `Object.entries`.
 *
 * @param data - The object.
 * @returns An array of `[key, value]` tuples.
 *
 * @category Object
 */
export function entries<T extends object>(
  data: T,
): Array<[keyof T & string, T[keyof T]]> {
  return Object.entries(data) as Array<[keyof T & string, T[keyof T]]>;
}
