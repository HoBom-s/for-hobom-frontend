/**
 * 에러 보고 중앙 진입점. 현재는 `console.error`로 로깅하며,
 * 추후 Sentry 등 외부 모니터링 서비스로 교체 예정.
 */
export const reportError = (
  error: Error,
  errorInfo?: Record<string, unknown>,
) => {
  console.error(error, errorInfo);
  // TODO: Sentry.captureException(error, { extra: errorInfo }) 등으로 교체
};
