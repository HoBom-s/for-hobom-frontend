import { env } from "@/shared/config";
import { HttpError } from "./http-error.api";
import type { Middleware, MiddlewareContext } from "./middleware.type";
import type { HttpMethod, RequestOptions } from "./http-options.type";

const DEFAULT_TIMEOUT_MS = 30_000;

interface HttpClient {
  use: (middleware: Middleware) => void;
  get: <T>(url: string, options?: RequestOptions) => Promise<T>;
  post: <T>(url: string, body: unknown, options?: Omit<RequestOptions, "json">) => Promise<T>;
  put: <T>(url: string, body: unknown, options?: Omit<RequestOptions, "json">) => Promise<T>;
  patch: <T>(url: string, body: unknown, options?: Omit<RequestOptions, "json">) => Promise<T>;
  delete: <T>(url: string, options?: RequestOptions) => Promise<T>;
}

/**
 * 미들웨어 기반 HTTP 클라이언트 팩토리.
 *
 * - 모든 요청에 `Content-Type: application/json`, `X-Hobom-Api-Key`, `credentials: "include"` 자동 부여
 * - `timeout` 기본값 30초. 초과 시 `AbortError` 발생
 * - `retry` 옵션으로 실패 시 재시도 횟수 지정 가능
 * - 204 응답은 body 파싱 없이 `undefined` 반환
 * - 미들웨어 훅 실행 순서: `onRequest` → fetch → `onResponse` (또는 `onError`), 등록 순으로 순차 실행
 */
export const createHttpClient = (baseUrl = ""): HttpClient => {
  const middlewares: Middleware[] = [];

  const runMiddlewareHook = async (hookName: keyof Middleware, ctx: MiddlewareContext) => {
    for (const m of middlewares) {
      const fn = m[hookName];

      if (fn) await fn(ctx);
    }
  };

  const request = async (method: HttpMethod, url: string, options: RequestOptions = {}) => {
    const { json, retry: maxRetry = 0, timeout, ...fetchOptions } = options;
    const fullUrl = baseUrl + url;

    const init: RequestInit = {
      ...fetchOptions,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(fetchOptions.headers || {}),
        "X-Hobom-Api-Key": env.VITE_APP_HOBOM_API_KEY,
      },
      credentials: "include",
    };

    if (json !== undefined) {
      init.body = JSON.stringify(json);
    }

    const controller = new AbortController();

    init.signal = init.signal ?? controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), timeout ?? DEFAULT_TIMEOUT_MS);

    const ctx: MiddlewareContext = { input: fullUrl, init };

    await runMiddlewareHook("onRequest", ctx);

    let attempt = 0;

    try {
      while (true) {
        try {
          ctx.response = await fetch(ctx.input, ctx.init);
          await runMiddlewareHook("onResponse", ctx);

          if (!ctx.response.ok) {
            let serverMessage: string | undefined;

            try {
              const body = await ctx.response.clone().json();

              serverMessage = typeof body?.message === "string" ? body.message : undefined;
            } catch {
              /* non-JSON or no message field */
            }
            const error = new HttpError(ctx.response.status, serverMessage);

            ctx.error = error;
            throw error;
          }

          return ctx.response;
        } catch (error) {
          ctx.error = error;
          await runMiddlewareHook("onError", ctx);

          if (attempt < maxRetry) {
            attempt++;
            continue;
          }
          throw error;
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const parseJson = async <T>(res: Response): Promise<T> => {
    if (res.status === 204) return undefined as T;

    return res.json();
  };

  return {
    use: (middleware) => {
      middlewares.push(middleware);
    },
    get: async <T>(url: string, options?: RequestOptions): Promise<T> => {
      const res = await request("GET", url, options);

      return parseJson<T>(res);
    },
    post: async <T>(
      url: string,
      body: unknown,
      options?: Omit<RequestOptions, "json">,
    ): Promise<T> => {
      const res = await request("POST", url, { ...options, json: body });

      return parseJson<T>(res);
    },
    put: async <T>(
      url: string,
      body: unknown,
      options?: Omit<RequestOptions, "json">,
    ): Promise<T> => {
      const res = await request("PUT", url, { ...options, json: body });

      return parseJson<T>(res);
    },
    patch: async <T>(
      url: string,
      body: unknown,
      options?: Omit<RequestOptions, "json">,
    ): Promise<T> => {
      const res = await request("PATCH", url, { ...options, json: body });

      return parseJson<T>(res);
    },
    delete: async <T>(url: string, options?: RequestOptions): Promise<T> => {
      const res = await request("DELETE", url, options);

      return parseJson<T>(res);
    },
  };
};
