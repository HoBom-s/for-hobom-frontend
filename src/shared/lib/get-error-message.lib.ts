import { HttpError } from "../api/http-error.api";

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof HttpError && error.serverMessage) {
    return error.serverMessage;
  }
  return fallback;
};
