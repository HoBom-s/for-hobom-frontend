import { HttpError } from "../api/http-error.api";
import { HttpStatusModel } from "../api/http-status.api";

/**
 * 에러에서 사용자에게 보여줄 메시지를 추출한다.
 *
 * 우선순위:
 * 1. 네트워크 에러 (TypeError) → 고정 메시지
 * 2. 타임아웃 (AbortError) → 고정 메시지
 * 3. HTTP 403 → 고정 메시지
 * 4. HTTP 5xx → 고정 메시지
 * 5. HttpError + serverMessage → 서버 메시지
 * 6. 그 외 → fallback
 */
export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof TypeError) {
    return "네트워크 연결을 확인해주세요.";
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return "요청 시간이 초과했어요.";
  }

  if (error instanceof HttpError) {
    if (error.status === HttpStatusModel.FORBIDDEN) {
      return "권한이 없어요.";
    }
    if (error.status >= 500) {
      return "서버 오류가 발생했어요.";
    }
    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return fallback;
};
