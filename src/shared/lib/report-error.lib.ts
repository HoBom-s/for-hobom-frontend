export const reportError = (
  error: Error,
  errorInfo?: Record<string, unknown>,
) => {
  console.error(error, errorInfo);
  // TODO: Sentry.captureException(error, { extra: errorInfo }) 등으로 교체
};
