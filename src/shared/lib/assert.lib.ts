export function assertCondition<T>(
  value: T,
  message?: string,
): asserts value is NonNullable<T> {
  if (!value) {
    throw new Error(`Assertion failed: ${message != null ? message : ""}`);
  }
}
