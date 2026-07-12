export interface MiddlewareContext {
  /** Request URL. Mutable in `onRequest`. */
  input: RequestInfo;
  /** fetch init options. Mutable in `onRequest`. */
  init: RequestInit;
  /** Present only after fetch completes; accessible in `onResponse`/`onError`. */
  response?: Response;
  /** Present only after an error; accessible in `onError`. */
  error?: unknown;
}

/** HTTP client middleware. Hooks run sequentially in registration order. */
export interface Middleware {
  onRequest?: (ctx: MiddlewareContext) => Promise<void> | void;
  onResponse?: (ctx: MiddlewareContext) => Promise<void> | void;
  onError?: (ctx: MiddlewareContext) => Promise<void> | void;
}
