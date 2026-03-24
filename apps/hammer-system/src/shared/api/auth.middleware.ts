import { env } from "@/shared/config";
import { HttpStatusModel } from "./http-status.api";
import { applyCsrfHeader } from "./csrf.middleware";
import type { Middleware } from "./middleware.type";

const REFRESH_URL = `${env.VITE_APP_HAMMER_USER_URL}/auth/refresh`;
const DEFAULT_TIMEOUT_MS = 30_000;

export const UNAUTHORIZED_EVENT = "hammer:unauthorized";

let unauthorizedDispatched = false;
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const resetUnauthorizedState = () => {
  unauthorizedDispatched = false;
};

let refreshPromise: Promise<boolean> | null = null;

export const tryRefresh = async (): Promise<boolean> => {
  try {
    const res = await fetch(REFRESH_URL, {
      method: "POST",
      credentials: "include",
      headers: applyCsrfHeader({}),
    });

    if (!res.ok) return false;

    try {
      const body = await res.json();

      if (body.accessToken) {
        accessToken = body.accessToken;
      }
    } catch {
      /* empty body — token unchanged */
    }

    return true;
  } catch {
    return false;
  }
};

export const authMiddleware: Middleware = {
  onRequest: (ctx) => {
    if (accessToken) {
      ctx.init.headers = {
        ...(ctx.init.headers as Record<string, string>),
        Authorization: `Bearer ${accessToken}`,
      };
    }
  },
  onResponse: async (ctx) => {
    if (ctx.response?.status !== HttpStatusModel.UNAUTHORIZED) return;
    if (unauthorizedDispatched) return;

    if (!refreshPromise) {
      refreshPromise = tryRefresh();
    }

    const refreshed = await refreshPromise;

    refreshPromise = null;

    if (refreshed) {
      const headers = new Headers(ctx.init.headers);
      const headerRecord: Record<string, string> = {};

      headers.forEach((value, key) => {
        headerRecord[key] = value;
      });

      if (accessToken) {
        headerRecord["Authorization"] = `Bearer ${accessToken}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

      try {
        const retryInit: RequestInit = {
          ...ctx.init,
          headers: applyCsrfHeader(headerRecord),
          signal: controller.signal,
        };

        ctx.response = await fetch(ctx.input, retryInit);
      } finally {
        clearTimeout(timeoutId);
      }
    } else {
      accessToken = null;
      unauthorizedDispatched = true;
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }
  },
};
