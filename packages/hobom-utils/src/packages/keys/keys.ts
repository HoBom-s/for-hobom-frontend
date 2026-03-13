/**
 * Returns the enumerable string keys of an object. Typed counterpart to `Object.keys`.
 *
 * @param data - The object.
 * @returns An array of the object's own enumerable string keys.
 *
 * @category Object
 */
export function keys<T extends object>(data: T): Array<keyof T & string> {
  return Object.keys(data) as Array<keyof T & string>;
}
