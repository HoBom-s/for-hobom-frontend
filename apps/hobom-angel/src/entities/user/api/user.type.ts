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

/** The signed-in account the app renders. */
export interface CurrentUser {
  id: string;
  nickname: string;
  email: string;
}
