import type { VerifiedChannel } from "../model/user.model";

/** `GET /users/me` response (the caller's own account). */
export interface RawMyProfile {
  id: string;
  nickname: string;
  email: string;
  verifiedChannel: string;
  roles: string[];
  shelterRoles: { shelterId: string; role: string }[];
  status: string;
}

/** A shelter the user belongs to, with their role there. */
export interface ShelterRole {
  shelterId: string;
  role: string;
}

/** The signed-in account the app renders. */
export interface CurrentUser {
  id: string;
  nickname: string;
  email: string;
  verifiedChannel: VerifiedChannel;
  /** Platform roles (USER, SHELTER_STAFF, SHELTER_ADMIN, SYSTEM_ADMIN). */
  roles: string[];
  /** Per-shelter memberships — non-empty for shelter staff (drives the console). */
  shelterRoles: ShelterRole[];
}

/** `GET /users/:userId` — another member's public profile. */
export interface PublicProfile {
  id: string;
  nickname: string;
}
