import { env } from "@/shared/config";
import { HttpClient } from "./http-client.api";
import { HttpStatusModel } from "./http-status.api";
import type { Middleware } from "./middleware.type";

export const UNAUTHORIZED_EVENT = "hobom:unauthorized";

let unauthorizedDispatched = false;

export const resetUnauthorizedState = () => {
  unauthorizedDispatched = false;
};

const authMiddleware: Middleware = {
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
