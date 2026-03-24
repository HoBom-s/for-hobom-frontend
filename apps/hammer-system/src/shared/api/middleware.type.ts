export interface MiddlewareContext {
  /** 요청 URL. `onRequest`에서 수정 가능. */
  input: RequestInfo;
  /** fetch init 옵션. `onRequest`에서 수정 가능. */
  init: RequestInit;
  /** fetch 완료 후에만 존재. `onResponse`/`onError`에서 접근 가능. */
  response?: Response;
  /** 에러 발생 후에만 존재. `onError`에서 접근 가능. */
  error?: unknown;
}

/** HTTP 클라이언트 미들웨어. 훅은 등록 순서대로 순차 실행된다. */
export interface Middleware {
  onRequest?: (ctx: MiddlewareContext) => Promise<void> | void;
  onResponse?: (ctx: MiddlewareContext) => Promise<void> | void;
  onError?: (ctx: MiddlewareContext) => Promise<void> | void;
}
