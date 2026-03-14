import { isPlainObject } from "./is-plain-object";

export const hashKey = (key: readonly unknown[]): string =>
  JSON.stringify(key, (_, val: unknown) =>
    isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce<Record<string, unknown>>((acc, k) => {
            acc[k] = (val as Record<string, unknown>)[k];

            return acc;
          }, {})
      : val,
  );

export const partialMatchKey = (a: readonly unknown[], b: readonly unknown[]): boolean => {
  if (a === b) return true;
  if (a.length > b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!deepEqual(a[i], b[i])) return false;
  }

  return true;
};

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;

  if (isPlainObject(a) && isPlainObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every((key) => deepEqual(a[key], b[key]));
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    return a.every((item, i) => deepEqual(item, b[i]));
  }

  return false;
}
