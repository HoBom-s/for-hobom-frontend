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
 * Middleware-based HTTP client factory.
 *
 * - Every request gets `Content-Type: application/json`, `X-Hobom-Api-Key`, and
 *   `credentials: "include"` automatically.
 * - `timeout` defaults to 30s; an `AbortError` is thrown when exceeded.
 * - `retry` sets how many times to retry on failure.
 * - A 204 response returns `undefined` without parsing a body.
 * - Middleware hook order: `onRequest` → fetch → `onResponse` (or `onError`),
 *   run sequentially in registration order.
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

    // Compose the caller's signal (e.g. a query's cancel signal) with the
    // timeout into one controller, so a fetch aborts when either fires. Using
    // the external signal directly would silently disable the timeout.
    const externalSignal = init.signal ?? undefined;
    const controller = new AbortController();

    const onExternalAbort = () => controller.abort(externalSignal?.reason);

    if (externalSignal?.aborted) {
      controller.abort(externalSignal.reason);
    } else {
      externalSignal?.addEventListener("abort", onExternalAbort, { once: true });
    }

    init.signal = controller.signal;
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
      externalSignal?.removeEventListener("abort", onExternalAbort);
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
