import { HttpError } from "../api/http-error.api";

/**
 * 에러에서 사용자에게 보여줄 메시지를 추출한다.
 * `HttpError`의 `serverMessage`가 있으면 우선 사용하고, 없으면 `fallback`을 반환한다.
 */
export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof HttpError && error.serverMessage) {
    return error.serverMessage;
  }
  return fallback;
};
