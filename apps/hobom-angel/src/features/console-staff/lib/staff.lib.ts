import { isShelterAdmin, STAFF_ROLE_LABEL } from "@/entities/shelter";
import type { ShelterStaffMember, StaffPromotionRequest } from "@/entities/shelter";

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

/** Whole months between two dates (never negative). */
export const monthsBetween = (from: Date, to: Date): number =>
  Math.max(0, (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()));

/** Membership tenure label, e.g. "가입 8개월" / "가입 2년". */
export const membershipLabel = (joinedAt: string | null, now: Date): string => {
  if (!joinedAt) return "가입 정보 없음";

  const months = monthsBetween(new Date(joinedAt), now);

  if (months < 1) return "가입 1개월 미만";
  if (months < 12) return `가입 ${months}개월`;

  return `가입 ${Math.floor(months / 12)}년`;
};

/** The candidate meta line on a promotion card: "봉사 20회 · 가입 8개월". */
export const candidateMeta = (request: StaffPromotionRequest, now: Date): string =>
  `봉사 ${request.volunteerCount}회 · ${membershipLabel(request.candidateJoinedAt, now)}`;
