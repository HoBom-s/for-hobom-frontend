import type { CurrentUser, RawMyProfile } from "../api/user.type";
import type { VerifiedChannel } from "../model/user.model";

/** Anti-corruption: expose what the UI renders, including the roles that gate
 *  the shelter console (status is dropped). */
export const toCurrentUser = (raw: RawMyProfile): CurrentUser => ({
  id: raw.id,
  nickname: raw.nickname,
  email: raw.email,
  verifiedChannel: raw.verifiedChannel as VerifiedChannel,
  roles: raw.roles,
  shelterRoles: raw.shelterRoles,
});
