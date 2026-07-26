import {
  AdminPanelSettingsOutlined,
  ArticleOutlined,
  BugReportOutlined,
  Replay,
  BrushOutlined,
  DashboardOutlined,
  FolderOutlined,
  ListAlt,
  Mail,
  MonitorHeartOutlined,
  NotificationsNoneOutlined,
  QueryStatsOutlined,
  RiceBowlTwoTone,
  StickyNote2Outlined,
  TextSnippetOutlined,
} from "hobom-design-system/icons";
import { RoutesConfig } from "@/shared/config";
import type { AppShellNavItem, NavEntry } from "@/shared/ui";

export const NAV_ITEMS: NavEntry[] = [
  {
    value: "DASHBOARD",
    label: "대시보드",
    path: RoutesConfig.DASHBOARD.HOME,
    icon: <DashboardOutlined fontSize="small" />,
  },
  {
    value: "STUDIO",
    label: "스튜디오",
    path: RoutesConfig.STUDIO.HOME,
    icon: <BrushOutlined fontSize="small" />,
  },
  {
    section: "DAILY",
    label: "일상",
    items: [
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
    ],
  },
  {
    section: "COMMUNICATION",
    label: "커뮤니케이션",
    items: [
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
    ],
  },
  {
    section: "COLLABORATION",
    label: "협업",
    items: [
      {
        value: "PROJECTS",
        label: "프로젝트",
        path: RoutesConfig.PROJECTS.LIST,
        icon: <FolderOutlined fontSize="small" />,
      },
      {
        value: "WIKI",
        label: "위키",
        path: RoutesConfig.WIKI.SPACES,
        icon: <ArticleOutlined fontSize="small" />,
      },
    ],
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
    value: "MONITORING",
    label: "모니터링",
    path: RoutesConfig.DASHBOARD.SYSTEM,
    icon: <QueryStatsOutlined fontSize="small" />,
    children: [
      {
        value: "SYSTEM",
        label: "시스템",
        path: RoutesConfig.DASHBOARD.SYSTEM,
        icon: <MonitorHeartOutlined sx={{ fontSize: 16 }} />,
      },
      {
        value: "LOGS",
        label: "로그",
        path: RoutesConfig.DASHBOARD.LOGS,
        icon: <TextSnippetOutlined sx={{ fontSize: 16 }} />,
      },
      {
        value: "ERRORS",
        label: "에러",
        path: RoutesConfig.DASHBOARD.ERRORS,
        icon: <BugReportOutlined sx={{ fontSize: 16 }} />,
      },
      {
        value: "DLQ",
        label: "DLQ",
        path: RoutesConfig.DASHBOARD.DLQ,
        icon: <Replay sx={{ fontSize: 16 }} />,
      },
    ],
  },
];
