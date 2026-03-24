import { httpClient } from "./http.api";

interface CaptureErrorPayload {
  message: string;
  stackTrace?: string;
  screen: string;
  errorType: "SERVER_RESPONSE" | "CLIENT_LOGIC";
  userAgent?: string;
}

export const captureError = (payload: CaptureErrorPayload) =>
  httpClient.post<void>("/api/v1/errors", payload);
