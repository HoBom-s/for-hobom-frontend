import { captureError } from "../api/error-capture.api";
import { HttpError } from "../api/http-error.api";

export const reportError = (error: Error, errorInfo?: Record<string, unknown>) => {
  console.error(error, errorInfo);

  const errorType = error instanceof HttpError ? "SERVER_RESPONSE" : "CLIENT_LOGIC";

  captureError({
    message: error.message,
    stackTrace: error.stack,
    screen: window.location.pathname,
    errorType,
    userAgent: navigator.userAgent,
  }).catch(() => {}); // fire-and-forget
};
