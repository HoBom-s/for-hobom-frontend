import type { Middleware } from "./middleware.type";

const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF-TOKEN";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
};

export const csrfMiddleware: Middleware = {
  onRequest: (ctx) => {
    const method = (ctx.init.method ?? "GET").toUpperCase();
    if (SAFE_METHODS.has(method)) return;

    const token = getCookie(CSRF_COOKIE);
    if (token) {
      ctx.init.headers = {
        ...(ctx.init.headers as Record<string, string>),
        [CSRF_HEADER]: token,
      };
    }
  },
};
