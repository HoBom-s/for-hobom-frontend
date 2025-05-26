export interface MiddlewareContext {
  input: RequestInfo;
  init: RequestInit;
  response?: Response;
  error?: any;
}

export type Middleware = {
  onRequest?: (ctx: MiddlewareContext) => Promise<void> | void;
  onResponse?: (ctx: MiddlewareContext) => Promise<void> | void;
  onError?: (ctx: MiddlewareContext) => Promise<void> | void;
};
