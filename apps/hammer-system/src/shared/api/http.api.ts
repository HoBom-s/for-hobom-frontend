import { env } from "@/shared/config";
import { createHttpClient } from "./http-client.api";
import { csrfMiddleware } from "./csrf.middleware";
import {
  authMiddleware,
  setAccessToken,
  getAccessToken,
  UNAUTHORIZED_EVENT,
  resetUnauthorizedState,
} from "./auth.middleware";

const createConfiguredClient = (baseUrl: string) => {
  const client = createHttpClient(baseUrl);

  client.use(csrfMiddleware);
  client.use(authMiddleware);

  return client;
};

const httpClient = createConfiguredClient(env.VITE_APP_HAMMER_API_GATEWAY_URL);
const userHttpClient = createConfiguredClient(env.VITE_APP_HAMMER_USER_URL);
const supportHttpClient = createConfiguredClient(env.VITE_APP_HAMMER_SUPPORT_URL);

export {
  httpClient,
  userHttpClient,
  supportHttpClient,
  setAccessToken,
  getAccessToken,
  UNAUTHORIZED_EVENT,
  resetUnauthorizedState,
};
