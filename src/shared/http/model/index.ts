import { HttpClient } from "./http-client";
import { HttpStatusModel } from "@/shared/http/model/http-status.model";
import type { Middleware } from "../model/middleware.type";

const authMiddleware: Middleware = {
  onResponse: async (ctx) => {
    const { response } = ctx;

    if (response != null) {
      if (response.status === HttpStatusModel.UNAUTHORIZED) {
        window.location.href = "/auth/login";
        throw new Error("Unauthorized – redirecting to /auth/login");
      }
    }
  },
};

const httpClient = HttpClient.of(
  import.meta.env.VITE_APP_HOBOM_API_GATEWAY_URL,
);
httpClient.use(authMiddleware);

export { httpClient };
