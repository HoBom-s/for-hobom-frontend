import {
  DashboardOutlined,
  SearchOutlined,
  NotificationsNoneOutlined,
  GavelOutlined,
} from "hobom-design-system/icons";
import { RoutesConfig } from "@/shared/config";
import type { NavEntry } from "@/shared/ui";

export const NAV_ITEMS: NavEntry[] = [
  {
    value: "OVERVIEW",
    label: "Overview",
    path: RoutesConfig.DASHBOARD.OVERVIEW,
    icon: <DashboardOutlined fontSize="small" />,
  },
  {
    value: "LOG_EXPLORER",
    label: "Log Explorer",
    path: RoutesConfig.DASHBOARD.LOG_EXPLORER,
    icon: <SearchOutlined fontSize="small" />,
  },
  {
    value: "NOTIFICATION_TEMPLATES",
    label: "Notification Templates",
    path: RoutesConfig.NOTIFICATION_TEMPLATE.LIST,
    icon: <NotificationsNoneOutlined fontSize="small" />,
  },
  {
    value: "LEGAL_DOCUMENTS",
    label: "Legal Documents",
    path: RoutesConfig.LEGAL_DOCUMENT.LIST,
    icon: <GavelOutlined fontSize="small" />,
  },
];
