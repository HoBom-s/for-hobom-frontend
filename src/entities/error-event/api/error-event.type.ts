export type ErrorType = "SERVER_RESPONSE" | "CLIENT_LOGIC";

export interface ErrorEventDto {
  id: number;
  message: string;
  stackTrace: string | null;
  screen: string;
  errorType: ErrorType;
  userAgent: string | null;
  nickname: string | null;
  createdAt: string;
}

export interface ErrorEventSearchParams {
  errorType?: ErrorType;
  screen?: string;
  page?: number;
  size?: number;
}
