import { env } from "@/shared/config";
import type { Middleware, MiddlewareContext } from "./middleware.type";
import type { HttpMethod, RequestOptions } from "./http-options.type";

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
    const fullUrl = baseUrl + url;

    const init: RequestInit = {
      ...options,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        "X-Hobom-Api-Key": env.VITE_APP_HOBOM_API_KEY,
      },
      credentials: "include",
    };

    if (options.json !== undefined) {
      init.body = JSON.stringify(options.json);
    }

    const ctx: MiddlewareContext = { input: fullUrl, init };
    await runMiddlewareHook("onRequest", ctx);

    let attempt = 0;
    const maxRetry = options.retry ?? 0;

    while (true) {
      try {
        ctx.response = await fetch(ctx.input, ctx.init);
        await runMiddlewareHook("onResponse", ctx);

        if (!ctx.response.ok) {
          const error = new Error(`HTTP error! status: ${ctx.response.status}`);
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
