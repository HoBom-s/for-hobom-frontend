import type { Middleware } from "./middleware.type";

const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF-TOKEN";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const getCsrfToken = (): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CSRF_COOKIE}=([^;]*)`));

  return match ? decodeURIComponent(match[1]) : null;
};

export const applyCsrfHeader = (headers: Record<string, string>): Record<string, string> => {
  const token = getCsrfToken();

  return token ? { ...headers, [CSRF_HEADER]: token } : headers;
};

export const csrfMiddleware: Middleware = {
  onRequest: (ctx) => {
    const method = (ctx.init.method ?? "GET").toUpperCase();

    if (SAFE_METHODS.has(method)) return;

    const token = getCsrfToken();

    if (token) {
      ctx.init.headers = {
        ...(ctx.init.headers as Record<string, string>),
        [CSRF_HEADER]: token,
      };
    }
  },
};
