/**
 * TypeScript assertion function. falsy 값이면 throw하고,
 * 통과 시 `NonNullable<T>`로 타입을 내로잉한다.
 *
 * `if (!value) throw` 대신 사용하면 이후 코드에서 null/undefined 체크가 불필요해진다.
 */
export function assertCondition<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (!value) {
    throw new Error(`Assertion failed: ${message != null ? message : ""}`);
  }
}
