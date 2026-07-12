import { httpClient } from "@/shared/api";
import { toSession } from "../lib/to-session.lib";
import type { AuthSession, RawSignUpResponse, SignUpRequest } from "./auth.type";

/** Register a member (본인확인 receipt + profile) and open a session. */
export const postSignup = async (request: SignUpRequest): Promise<AuthSession> => {
  const raw = await httpClient.post<RawSignUpResponse>("/auth/signup", request);

  return toSession(raw);
};
