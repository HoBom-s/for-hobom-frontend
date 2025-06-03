import { toast } from "react-toastify";
import { HttpClient } from "./model/http-client.ts";
import { HttpStatusModel } from "@/shared/http/model/http-status.model.ts";
import type { Middleware } from "./model/middleware.type.ts";
import type { HttpResponseType } from "./api/http-response.type";

const authMiddleware: Middleware = {
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
export type { HttpResponseType };
