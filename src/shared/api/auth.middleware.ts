import { env } from "@/shared/config";
import { HttpStatusModel } from "./http-status.api";
import { applyCsrfHeader } from "./csrf.middleware";
import type { Middleware } from "./middleware.type";

const REFRESH_URL = `${env.VITE_APP_HOBOM_API_GATEWAY_URL}/auth/refresh`;

export const UNAUTHORIZED_EVENT = "hobom:unauthorized";

let unauthorizedDispatched = false;

export const resetUnauthorizedState = () => {
  unauthorizedDispatched = false;
};

let refreshPromise: Promise<boolean> | null = null;

const tryRefresh = async (): Promise<boolean> => {
  try {
    const res = await fetch(REFRESH_URL, {
      method: "POST",
      credentials: "include",
      headers: applyCsrfHeader({
        "X-Hobom-Api-Key": env.VITE_APP_HOBOM_API_KEY,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const authMiddleware: Middleware = {
  onResponse: async (ctx) => {
    if (ctx.response?.status !== HttpStatusModel.UNAUTHORIZED) return;
    if (unauthorizedDispatched) return;

    if (!refreshPromise) {
      refreshPromise = tryRefresh().finally(() => {
        refreshPromise = null;
      });
    }

    const refreshed = await refreshPromise;

    if (refreshed) {
      // refresh 후 CSRF 토큰이 갱신될 수 있으므로 재적용
      const retryInit: RequestInit = {
        ...ctx.init,
        headers: applyCsrfHeader(ctx.init.headers as Record<string, string>),
      };
      const retryResponse = await fetch(ctx.input, retryInit);
      ctx.response = retryResponse;
    } else {
      unauthorizedDispatched = true;
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }
  },
};
