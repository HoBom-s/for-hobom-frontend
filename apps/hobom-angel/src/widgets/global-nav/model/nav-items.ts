import { ROUTES } from "@/shared/config";

export interface NavItem {
  label: string;
  to: string;
}

/** Desktop top-nav primary sections (§0.5). */
export const PRIMARY_NAV: NavItem[] = [
  { label: "입양", to: ROUTES.ANIMALS },
  { label: "임시보호", to: ROUTES.FOSTER },
  { label: "봉사활동", to: ROUTES.VOLUNTEER },
  { label: "보호소", to: ROUTES.SHELTERS },
];

/** Mobile bottom tab bar — five destinations (§0.5). */
export const BOTTOM_TABS: NavItem[] = [
  { label: "홈", to: ROUTES.HOME },
  { label: "탐색", to: ROUTES.ANIMALS },
  { label: "관심", to: ROUTES.FAVORITES },
  { label: "신청", to: ROUTES.APPLICATIONS },
  { label: "내정보", to: ROUTES.MY },
];

/** Profile dropdown items for a signed-in user (§0.5). */
export const PROFILE_MENU: NavItem[] = [
  { label: "마이페이지", to: ROUTES.MY },
  { label: "신청 내역", to: ROUTES.APPLICATIONS },
  { label: "관심", to: ROUTES.FAVORITES },
];
