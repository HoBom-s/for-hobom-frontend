import { httpClient } from "@/shared/api";
import type { AuthSession, RawSignUpResponse, SignUpRequest } from "./auth.type";

/** Anti-corruption: keep only what the UI needs; drop cookie-managed tokens. */
const toSession = (raw: RawSignUpResponse): AuthSession => ({
  userId: raw.userId,
  nickname: raw.nickname,
});

/** Register a member (본인확인 receipt + profile) and open a session. */
export const postSignup = async (request: SignUpRequest): Promise<AuthSession> => {
  const raw = await httpClient.post<RawSignUpResponse>("/auth/signup", request);

  return toSession(raw);
};
