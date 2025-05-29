import type { Middleware, MiddlewareContext } from "./middleware.type";
import type { HttpMethod, RequestOptions } from "./http-options.type.ts";

export class HttpClient {
  private middlewares: Middleware[] = [];
  private readonly baseUrl: string = "";

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  public static of(baseUrl: string): HttpClient {
    return new HttpClient(baseUrl);
  }

  public use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  public async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const res = await this.request("GET", url, options);
    return res.json();
  }

  public async post<T>(
    url: string,
    body: unknown,
    options?: Omit<RequestOptions, "json">,
  ): Promise<T> {
    return this.request("POST", url, { ...options, json: body }).then((r) =>
      r.json(),
    );
  }

  public async put<T>(
    url: string,
    body: unknown,
    options?: Omit<RequestOptions, "json">,
  ): Promise<T> {
    return this.request("PUT", url, { ...options, json: body }).then((r) =>
      r.json(),
    );
  }

  public async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    const res = await this.request("DELETE", url, options);
    return res.json();
  }

  private async runMiddlewareHook(
    hookName: keyof Middleware,
    ctx: MiddlewareContext,
  ) {
    for (const m of this.middlewares) {
      const fn = m[hookName];
      if (fn) await fn(ctx);
    }
  }

  private async request(
    method: HttpMethod,
    url: string,
    options: RequestOptions = {},
  ) {
    const fullUrl = this.baseUrl + url;

    const init: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
      credentials: "include",
    };

    if (options.json !== undefined) {
      init.body = JSON.stringify(options.json);
    }

    const ctx: MiddlewareContext = { input: fullUrl, init };

    await this.runMiddlewareHook("onRequest", ctx);

    let attempt = 0;
    const maxRetry = options.retry ?? 0;

    while (true) {
      try {
        ctx.response = await fetch(ctx.input, ctx.init);
        await this.runMiddlewareHook("onResponse", ctx);

        if (!ctx.response.ok) {
          const error = new Error(`HTTP error! status: ${ctx.response.status}`);
          ctx.error = error;
          throw error;
        }

        return ctx.response;
      } catch (error) {
        ctx.error = error;
        await this.runMiddlewareHook("onError", ctx);

        if (attempt < maxRetry) {
          attempt++;
          continue;
        }
        throw error;
      }
    }
  }
}
