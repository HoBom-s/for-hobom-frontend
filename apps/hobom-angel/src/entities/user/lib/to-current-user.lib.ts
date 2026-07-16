import type { CurrentUser, RawMyProfile } from "../api/user.type";
import type { VerifiedChannel } from "../model/user.model";

/** Anti-corruption: expose only what the UI renders (drop roles/status). */
export const toCurrentUser = (raw: RawMyProfile): CurrentUser => ({
  id: raw.id,
  nickname: raw.nickname,
  email: raw.email,
  verifiedChannel: raw.verifiedChannel as VerifiedChannel,
});
