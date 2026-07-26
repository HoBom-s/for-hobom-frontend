import {
  AssignmentOutlined,
  DashboardOutlined,
  FavoriteBorder,
  PersonOutline,
  SearchOutlined,
} from "hobom-design-system/icons";
import { ROUTES } from "@/shared/config";

export interface NavItem {
  label: string;
  to: string;
}

type IconComponent = typeof SearchOutlined;

export interface BottomTabItem extends NavItem {
  Icon: IconComponent;
}

/** Desktop top-nav primary sections (§0.5). */
export const PRIMARY_NAV: NavItem[] = [
  { label: "입양", to: ROUTES.ANIMALS },
  { label: "임시보호", to: ROUTES.FOSTER },
  { label: "봉사활동", to: ROUTES.VOLUNTEER },
  { label: "보호소", to: ROUTES.SHELTERS },
];

/** Mobile bottom tab bar — five destinations with icons (§0.5). */
export const BOTTOM_TABS: BottomTabItem[] = [
  { label: "홈", to: ROUTES.HOME, Icon: DashboardOutlined },
  { label: "탐색", to: ROUTES.ANIMALS, Icon: SearchOutlined },
  { label: "관심", to: ROUTES.FAVORITES, Icon: FavoriteBorder },
  { label: "신청", to: ROUTES.APPLICATIONS, Icon: AssignmentOutlined },
  { label: "내정보", to: ROUTES.MY, Icon: PersonOutline },
];

/** Profile dropdown items for a signed-in user (§0.5). */
export const PROFILE_MENU: NavItem[] = [
  { label: "마이페이지", to: ROUTES.MY },
  { label: "신청 내역", to: ROUTES.APPLICATIONS },
  { label: "관심", to: ROUTES.FAVORITES },
];
