import {
  AdminPanelSettingsOutlined,
  DashboardOutlined,
  FolderOutlined,
  ListAlt,
  Mail,
  MonitorHeartOutlined,
  NotificationsNoneOutlined,
  RiceBowlTwoTone,
  StickyNote2Outlined,
} from "@mui/icons-material";
import { RoutesConfig } from "@/shared/config";
import type { AppShellNavItem } from "@/shared/ui";

export const NAV_ITEMS: AppShellNavItem[] = [
  {
    value: "DASHBOARD",
    label: "대시보드",
    path: RoutesConfig.DASHBOARD.HOME,
    icon: <DashboardOutlined fontSize="small" />,
  },
  {
    value: "DAILY_TODO",
    label: "할 일",
    path: RoutesConfig.MAIN.DAILY_TODO,
    icon: <ListAlt fontSize="small" />,
  },
  {
    value: "HOBOM_MENU",
    label: "오늘의 메뉴",
    path: RoutesConfig.MENU.RECOMMENDATION,
    icon: <RiceBowlTwoTone fontSize="small" />,
  },
  {
    value: "HOBOM_MESSAGE",
    label: "미래 메시지",
    path: RoutesConfig.MESSAGE.RESERVATION,
    icon: <Mail fontSize="small" />,
  },
  {
    value: "HOBOM_NOTES",
    label: "노트",
    path: RoutesConfig.NOTES.LIST,
    icon: <StickyNote2Outlined fontSize="small" />,
  },
  {
    value: "PROJECTS",
    label: "프로젝트",
    path: RoutesConfig.PROJECTS.LIST,
    icon: <FolderOutlined fontSize="small" />,
  },
];

export const BOTTOM_NAV_ITEMS: AppShellNavItem[] = [
  {
    value: "HOBOM_NOTIFICATION",
    label: "알림",
    path: RoutesConfig.NOTIFICATION.LIST,
    icon: <NotificationsNoneOutlined fontSize="small" />,
  },
  {
    value: "ADMIN",
    label: "관리자",
    path: RoutesConfig.ADMIN.USERS,
    icon: <AdminPanelSettingsOutlined fontSize="small" />,
  },
  {
    value: "SYSTEM",
    label: "시스템",
    path: RoutesConfig.DASHBOARD.SYSTEM,
    icon: <MonitorHeartOutlined fontSize="small" />,
  },
];
