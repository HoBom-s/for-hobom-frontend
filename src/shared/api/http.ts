import { toast } from "react-toastify";
import { HttpClient } from "./http-client";
import { HttpStatusModel } from "./http-status";
import { getHoBomAccessToken } from "@/shared/model";
import type { Middleware } from "./middleware.type";

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
    const { response } = ctx;

    if (response != null) {
      if (response.status === HttpStatusModel.UNAUTHORIZED) {
        const toastId = `Unauthorized-id-${HttpStatusModel.UNAUTHORIZED}`;
        if (!toast.isActive(toastId)) {
          toast.info("Unauthorized: redirecting to login page.", {
            toastId,
            autoClose: 300,
            onClose: () => {
              window.location.href = "/auth/login";
            },
          });
        }
      }
    }
  },
};

const httpClient = HttpClient.of(
  import.meta.env.VITE_APP_HOBOM_API_GATEWAY_URL,
);
httpClient.use(authMiddleware);

export { httpClient };
