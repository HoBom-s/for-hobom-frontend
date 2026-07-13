import { ROUTES } from "@/shared/config";

export interface NavItem {
  label: string;
  to: string;
  /** Simple emoji glyph for now; swapped for design-system icons later. */
  icon: string;
}

/** Desktop top-nav primary sections (§0.5). */
export const PRIMARY_NAV: NavItem[] = [
  { label: "입양", to: ROUTES.ANIMALS, icon: "🐾" },
  { label: "임시보호", to: ROUTES.FOSTER, icon: "🏠" },
  { label: "봉사활동", to: ROUTES.VOLUNTEER, icon: "🤝" },
  { label: "보호소", to: ROUTES.SHELTERS, icon: "🏥" },
];

/** Mobile bottom tab bar — five destinations (§0.5). */
export const BOTTOM_TABS: NavItem[] = [
  { label: "홈", to: ROUTES.HOME, icon: "🏠" },
  { label: "탐색", to: ROUTES.ANIMALS, icon: "🔍" },
  { label: "관심", to: ROUTES.FAVORITES, icon: "🤍" },
  { label: "신청", to: ROUTES.APPLICATIONS, icon: "📋" },
  { label: "내정보", to: ROUTES.MY, icon: "👤" },
];

/** Profile dropdown items for a signed-in user (§0.5). */
export const PROFILE_MENU: NavItem[] = [
  { label: "마이페이지", to: ROUTES.MY, icon: "👤" },
  { label: "신청 내역", to: ROUTES.APPLICATIONS, icon: "📋" },
  { label: "관심", to: ROUTES.FAVORITES, icon: "🤍" },
];
