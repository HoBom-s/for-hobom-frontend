import type { CurrentUser, ShelterRole } from "../api/user.type";

/** The shelter this user manages in the console — their first membership, or
 *  null for a plain member (which gates access to the console entirely). */
export const managedShelter = (user: CurrentUser | undefined): ShelterRole | null =>
  user?.shelterRoles[0] ?? null;
