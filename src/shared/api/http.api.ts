import { env } from "@/shared/config";
import { HttpClient } from "./http-client.api";
import { HttpStatusModel } from "./http-status.api";
import { getHoBomAccessToken } from "@/shared/model";
import type { Middleware } from "./middleware.type";

export const UNAUTHORIZED_EVENT = "hobom:unauthorized";

let unauthorizedDispatched = false;

export const resetUnauthorizedState = () => {
  unauthorizedDispatched = false;
};

const authMiddleware: Middleware = {
  onRequest: async (ctx) => {
    const url = new URL(
      String(ctx.input),
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost",
    );
    const path = url.pathname.toLowerCase();
    if (path.includes("/auth/login")) return;
    const token = getHoBomAccessToken();
    if (token == null) return;

    const headers = new Headers(ctx.init.headers || {});
    if (!headers.has("Authorization"))
      headers.set("Authorization", `Bearer ${token}`);
    ctx.init.headers = headers;
  },
  onResponse: async (ctx) => {
    if (
      ctx.response?.status === HttpStatusModel.UNAUTHORIZED &&
      !unauthorizedDispatched
    ) {
      unauthorizedDispatched = true;
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }
  },
};

const httpClient = HttpClient.of(env.VITE_APP_HOBOM_API_GATEWAY_URL);
httpClient.use(authMiddleware);

export { httpClient };
