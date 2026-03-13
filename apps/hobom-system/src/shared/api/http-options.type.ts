export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  json?: unknown;
  retry?: number;
  /** 요청 타임아웃 (ms). 기본값 30000 */
  timeout?: number;
}
