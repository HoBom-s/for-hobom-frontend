import { env } from "@/shared/config";
import { createHttpClient } from "./http-client.api";
import { csrfMiddleware } from "./csrf.middleware";
import { authMiddleware, UNAUTHORIZED_EVENT, resetUnauthorizedState } from "./auth.middleware";

const createConfiguredClient = (baseUrl: string) => {
  const client = createHttpClient(baseUrl);

  client.use(csrfMiddleware);
  client.use(authMiddleware);

  return client;
};

// Angel talks to a single backend behind the gateway (hobom-angel).
const httpClient = createConfiguredClient(env.API_BASE_URL);

export { httpClient, UNAUTHORIZED_EVENT, resetUnauthorizedState };
