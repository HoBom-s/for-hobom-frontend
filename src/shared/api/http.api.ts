import { createHttpClient } from "./http-client.api";
import { csrfMiddleware } from "./csrf.middleware";
import {
  authMiddleware,
  UNAUTHORIZED_EVENT,
  resetUnauthorizedState,
} from "./auth.middleware";

const httpClient = createHttpClient();
httpClient.use(csrfMiddleware);
httpClient.use(authMiddleware);

export { httpClient, UNAUTHORIZED_EVENT, resetUnauthorizedState };
