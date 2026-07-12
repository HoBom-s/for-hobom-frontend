export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  json?: unknown;
  retry?: number;
  /** Request timeout (ms). Defaults to 30000. */
  timeout?: number;
}
