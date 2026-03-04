import { env } from "@/shared/config";
import { createHttpClient } from "./http-client.api";
import { csrfMiddleware } from "./csrf.middleware";
import {
  authMiddleware,
  UNAUTHORIZED_EVENT,
  resetUnauthorizedState,
} from "./auth.middleware";

const createConfiguredClient = (baseUrl: string) => {
  const client = createHttpClient(baseUrl);
  client.use(csrfMiddleware);
  client.use(authMiddleware);
  return client;
};

const httpClient = createConfiguredClient(env.VITE_APP_HOBOM_API_GATEWAY_URL);
const spaceHttpClient = createConfiguredClient(env.VITE_APP_HOBOM_SPACE_URL);

export {
  httpClient,
  spaceHttpClient,
  UNAUTHORIZED_EVENT,
  resetUnauthorizedState,
};
