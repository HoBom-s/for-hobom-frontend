import { env } from "@/shared/config";
import { createHttpClient } from "./http-client.api";
import { csrfMiddleware } from "./csrf.middleware";
import { HttpStatusModel } from "./http-status.api";
import type { Middleware } from "./middleware.type";

export const UNAUTHORIZED_EVENT = "hobom:unauthorized";

let unauthorizedDispatched = false;

export const resetUnauthorizedState = () => {
  unauthorizedDispatched = false;
};

// 동시 401 발생 시 refresh 1회만 호출하기 위한 큐
let refreshPromise: Promise<boolean> | null = null;

const tryRefresh = async (baseUrl: string): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "X-Hobom-Api-Key": env.VITE_APP_HOBOM_API_KEY },
    });
    return res.ok;
  } catch {
    return false;
  }
};

const authMiddleware: Middleware = {
  onResponse: async (ctx) => {
    if (ctx.response?.status !== HttpStatusModel.UNAUTHORIZED) return;
    if (unauthorizedDispatched) return;

    // refresh 진행 중이면 기존 Promise 대기, 아니면 새로 시작
    if (!refreshPromise) {
      refreshPromise = tryRefresh(env.VITE_APP_HOBOM_API_GATEWAY_URL).finally(
        () => {
          refreshPromise = null;
        },
      );
    }

    const refreshed = await refreshPromise;

    if (refreshed) {
      // 새 쿠키로 원래 요청 재시도
      const retryResponse = await fetch(ctx.input, ctx.init);
      ctx.response = retryResponse;
    } else {
      // refresh도 실패 → 로그인으로
      unauthorizedDispatched = true;
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }
  },
};

const httpClient = createHttpClient(env.VITE_APP_HOBOM_API_GATEWAY_URL);
httpClient.use(csrfMiddleware);
httpClient.use(authMiddleware);

export { httpClient };
