import { httpClient, parseResponse } from "@/shared/api";
import { toSession } from "../lib/to-session.lib";
import { signUpResponseSchema } from "./auth.schema";
import type { AuthSession, LoginRequest, SignUpRequest } from "./auth.type";

const parseSignUp = parseResponse(signUpResponseSchema, "POST /auth/signup");

/** Register a member (email + password + profile) and open a session. */
export const postSignup = (request: SignUpRequest): Promise<AuthSession> =>
  httpClient.post("/auth/signup", request).then(parseSignUp).then(toSession);

/** Authenticate by email + password. The session lives in the cookies the
 *  backend sets, so the token-pair body is intentionally discarded. */
export const postLogin = (request: LoginRequest): Promise<void> =>
  httpClient.post("/auth/login", request).then(() => undefined);
