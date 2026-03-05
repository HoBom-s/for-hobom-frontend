import { env } from "@/shared/config";
import { HttpError } from "./http-error";
import type { Middleware, MiddlewareContext } from "./middleware.type";
import type { HttpMethod, RequestOptions } from "./http-options.type";

const DEFAULT_TIMEOUT_MS = 30_000;

interface HttpClient {
  use: (middleware: Middleware) => void;
  get: <T>(url: string, options?: RequestOptions) => Promise<T>;
  post: <T>(
    url: string,
    body: unknown,
    options?: Omit<RequestOptions, "json">,
  ) => Promise<T>;
  put: <T>(
    url: string,
    body: unknown,
    options?: Omit<RequestOptions, "json">,
  ) => Promise<T>;
  patch: <T>(
    url: string,
    body: unknown,
    options?: Omit<RequestOptions, "json">,
  ) => Promise<T>;
  delete: <T>(url: string, options?: RequestOptions) => Promise<T>;
}

export const createHttpClient = (baseUrl: string = ""): HttpClient => {
  const middlewares: Middleware[] = [];

  const runMiddlewareHook = async (
    hookName: keyof Middleware,
    ctx: MiddlewareContext,
  ) => {
    for (const m of middlewares) {
      const fn = m[hookName];
      if (fn) await fn(ctx);
    }
  };

  const request = async (
    method: HttpMethod,
    url: string,
    options: RequestOptions = {},
  ) => {
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
    const timeoutId = setTimeout(
      () => controller.abort(),
      timeout ?? DEFAULT_TIMEOUT_MS,
    );

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
              serverMessage =
                typeof body?.message === "string" ? body.message : undefined;
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

  return {
    use: (middleware) => {
      middlewares.push(middleware);
    },
    get: async <T>(url: string, options?: RequestOptions): Promise<T> => {
      const res = await request("GET", url, options);
      return res.json();
    },
    post: async <T>(
      url: string,
      body: unknown,
      options?: Omit<RequestOptions, "json">,
    ): Promise<T> => {
      const res = await request("POST", url, { ...options, json: body });
      return res.json();
    },
    put: async <T>(
      url: string,
      body: unknown,
      options?: Omit<RequestOptions, "json">,
    ): Promise<T> => {
      const res = await request("PUT", url, { ...options, json: body });
      return res.json();
    },
    patch: async <T>(
      url: string,
      body: unknown,
      options?: Omit<RequestOptions, "json">,
    ): Promise<T> => {
      const res = await request("PATCH", url, { ...options, json: body });
      return res.json();
    },
    delete: async <T>(url: string, options?: RequestOptions): Promise<T> => {
      const res = await request("DELETE", url, options);
      return res.json();
    },
  };
};
