import type { HttpResponseType } from "@/shared/api";

export const wrapResponse = <T>(items: T): HttpResponseType<T> => ({
  success: true,
  message: "ok",
  timestamp: new Date(),
  items,
});
