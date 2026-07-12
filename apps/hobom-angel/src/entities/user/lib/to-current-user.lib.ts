import type { CurrentUser, RawMyProfile } from "../api/user.type";

/** Anti-corruption: expose only what the UI renders; drop roles/status/PII channel. */
export const toCurrentUser = (raw: RawMyProfile): CurrentUser => ({
  id: raw.id,
  nickname: raw.nickname,
  email: raw.email,
});
