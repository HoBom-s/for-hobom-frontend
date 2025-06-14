export function assertCondition<T>(
  value: T,
  message?: string,
): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error(`Assertion failed: ${message != null ? message : ""}`);
  }
}
