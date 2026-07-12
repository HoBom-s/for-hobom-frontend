import { HttpError } from "../api/http-error.api";

/**
 * Error reporter. Console-only for now — once the Angel backend exposes an
 * error-collection endpoint, add fire-and-forget remote capture (mirroring the
 * back-office captureError pattern). Server-response and client-logic errors
 * are distinguished up front.
 */
export const reportError = (error: Error, errorInfo?: Record<string, unknown>) => {
  const errorType = error instanceof HttpError ? "SERVER_RESPONSE" : "CLIENT_LOGIC";

  console.error(`[${errorType}]`, error, errorInfo);
};
