import { isPlainObject } from "./is-plain-object";

/**
 * Deeply compares `prev` and `next`, reusing references from `prev`
 * wherever the values are structurally equal.
 *
 * Prevents unnecessary React re-renders by preserving reference identity
 * for unchanged subtrees (Structural Sharing).
 */
export function replaceEqualDeep<T>(prev: T, next: T): T {
  if (prev === next) return prev;

  const prevArray = Array.isArray(prev);
  const nextArray = Array.isArray(next);

  if (prevArray !== nextArray) return next;
  if (prevArray && nextArray) {
    if (prev.length !== next.length) return next;

    let allEqual = true;
    const result = next.map((item: unknown, i: number) => {
      const replaced = replaceEqualDeep((prev as unknown[])[i], item);

      if (replaced !== (prev as unknown[])[i]) allEqual = false;

      return replaced;
    });

    return allEqual ? prev : (result as T);
  }

  if (isPlainObject(prev) && isPlainObject(next)) {
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);

    if (prevKeys.length !== nextKeys.length) return next;

    let allEqual = true;
    const result: Record<string, unknown> = {};

    for (const key of nextKeys) {
      result[key] = replaceEqualDeep(prev[key], next[key]);
      if (result[key] !== prev[key]) allEqual = false;
    }

    return allEqual ? prev : (result as T);
  }

  return next;
}
