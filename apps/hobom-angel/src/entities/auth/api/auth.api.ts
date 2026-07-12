import { httpClient } from "@/shared/api";
import type { LoginRequest, SignUpRequest } from "./auth.type";

// Signup and login establish the session via httpOnly cookies; the response body
// carries no tokens, so both resolve to void. The session is read separately via
// GET /users/me.
export const postSignup = (request: SignUpRequest): Promise<void> =>
  httpClient.post("/auth/signup", request).then(() => undefined);

export const postLogin = (request: LoginRequest): Promise<void> =>
  httpClient.post("/auth/login", request).then(() => undefined);
