import type { Schema } from "hobom-schema";

/**
 * 스키마로 입력값을 검증하는 커링 함수.
 *
 * 실패 시 throw하지 않고 `Error` 객체를 반환한다.
 * 이를 통해 호출자가 에러 처리 방식을 선택할 수 있다 (Result 패턴).
 *
 * @returns 성공 시 파싱된 `T`, 실패 시 `Error`
 */
export const validateWithSchema =
  <T>(schema: Schema<T>) =>
  (input: unknown): T | Error => {
    const parsed = schema.safeParse(input);

    return parsed.success
      ? parsed.data
      : new Error(parsed.error.issues.map((i) => i.message).join(", "));
  };

/** @deprecated `validateWithSchema`를 사용하세요. */
export const validateWithZod = validateWithSchema;

/**
 * `validateWithSchema` 반환값(T | Error)을 Result 패턴으로 분기하는 핸들러.
 * `result`가 `Error`이면 `onError`, 아니면 `onSuccess`를 호출한다.
 */
export const handleValidationResult = <T>(
  result: T | Error,
  onError: (err: Error) => void,
  onSuccess: (value: T) => void,
): void => {
  if (result instanceof Error) {
    onError(result);

    return;
  }
  onSuccess(result);
};
