import { env } from "@/shared/config";
import { HttpStatusModel } from "./http-status.api";
import { applyCsrfHeader } from "./csrf.middleware";
import type { Middleware } from "./middleware.type";

const REFRESH_URL = `${env.API_BASE_URL}/auth/refresh`;
const DEFAULT_TIMEOUT_MS = 30_000;

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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

      try {
        const retryInit: RequestInit = {
          ...ctx.init,
          headers: applyCsrfHeader(headerRecord),
          signal: controller.signal,
        };

        ctx.response = await fetch(ctx.input, retryInit);

        // Refresh ran but the retry is still 401 — the session is truly gone.
        // Give up here so later 401s don't kick off another refresh+retry (which
        // otherwise loops forever, since this flag is the only gate).
        if (ctx.response.status === HttpStatusModel.UNAUTHORIZED) {
          unauthorizedDispatched = true;
          window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } else {
      unauthorizedDispatched = true;
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }
  },
};
