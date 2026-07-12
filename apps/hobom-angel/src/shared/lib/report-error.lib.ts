import { HttpError } from "../api/http-error.api";

/**
 * 에러 리포터. 현재는 콘솔 로깅만 — Angel 백엔드에 에러 수집 엔드포인트가 생기면
 * fire-and-forget 원격 캡처를 붙인다(hobom-system의 captureError 패턴). 서버 응답
 * 에러와 클라이언트 로직 에러를 구분해 둔다.
 */
export const reportError = (error: Error, errorInfo?: Record<string, unknown>) => {
  const errorType = error instanceof HttpError ? "SERVER_RESPONSE" : "CLIENT_LOGIC";

  console.error(`[${errorType}]`, error, errorInfo);
};
