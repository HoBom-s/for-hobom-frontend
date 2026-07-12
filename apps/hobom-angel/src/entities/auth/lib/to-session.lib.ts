import type { AuthSession, RawSignUpResponse } from "../api/auth.type";

/**
 * Anti-corruption: map the raw signup response to the session model the UI
 * renders. Session tokens are carried in HTTP-only cookies, so they are
 * intentionally dropped here.
 */
export const toSession = (raw: RawSignUpResponse): AuthSession => ({
  userId: raw.userId,
  nickname: raw.nickname,
});
