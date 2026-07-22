import { isShelterAdmin, STAFF_ROLE_LABEL } from "@/entities/shelter";
import type { ShelterStaffMember } from "@/entities/shelter";

/** Roster order: the representative(s) first, then staff, each alphabetical. */
export const sortRoster = (members: readonly ShelterStaffMember[]): ShelterStaffMember[] =>
  [...members].sort((a, b) => {
    const aAdmin = isShelterAdmin(a.roles);
    const bAdmin = isShelterAdmin(b.roles);

    if (aAdmin !== bAdmin) return aAdmin ? -1 : 1;

    return a.nickname.localeCompare(b.nickname, "ko");
  });

/** The badge label for a member's standing at this shelter. */
export const primaryRoleLabel = (member: ShelterStaffMember): string =>
  isShelterAdmin(member.roles) ? STAFF_ROLE_LABEL.SHELTER_ADMIN : STAFF_ROLE_LABEL.SHELTER_STAFF;
