import { curry } from "../curry/curry";

/**
 * Creates a deep copy of the value.
 *
 * @param data - The object to clone.
 *
 * @category Object
 */
export function clone<T>(data: T): T;
export function clone(): <T>(data: T) => T;
export function clone(...args: ReadonlyArray<unknown>): unknown {
  return curry(cloneImpl, args);
}

function cloneImpl<T>(v: T, from: Array<T> = [], to: Array<T> = []): T {
  if (typeof v === "function") {
    return v;
  }
  if (
    v instanceof Date ||
    v instanceof RegExp ||
    typeof v !== "object" ||
    v === null
  ) {
    return structuredClone(v);
  }

  const foundIndex = from.indexOf(v);
  if (foundIndex !== -1) {
    return to[foundIndex] as T;
  }

  if (Array.isArray(v)) {
    return cloneDeepArray(v, from, to);
  }

  return cloneDeepObject(v, from, to);
}

function cloneDeepArray<T extends ReadonlyArray<unknown>>(
  v: T,
  from: Array<unknown>,
  to: Array<unknown>,
): T {
  const copied: Array<unknown> = [];

  to.push(copied);

  for (const [index, item] of v.entries()) {
    copied[index] = cloneImpl(item, from, to);
  }

  return copied as unknown as T;
}

function cloneDeepObject<T extends object>(
  v: T,
  from: Array<unknown>,
  to: Array<unknown>,
): T {
  const copied: Record<PropertyKey, unknown> = {};

  from.push(copied);

  for (const [key, value] of Object.entries(v)) {
    copied[key] = cloneImpl(value, from, to);
  }

  return copied as T;
}
