/**
 * TypeScript assertion function. Throws on a falsy value and, on success,
 * narrows the type to `NonNullable<T>`.
 *
 * Using it instead of `if (!value) throw` removes later null/undefined checks.
 */
export function assertCondition<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (!value) {
    throw new Error(`Assertion failed: ${message != null ? message : ""}`);
  }
}
