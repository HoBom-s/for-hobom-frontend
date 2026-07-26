import type { CurrentUser } from "../api/user.type";

/** A platform operator (SYSTEM_ADMIN) — gates the §09 운영자 승인 큐. */
export const isOperator = (user: CurrentUser | undefined): boolean =>
  user?.roles.includes("SYSTEM_ADMIN") ?? false;
