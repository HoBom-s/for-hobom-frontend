import { DashboardOutlined, SearchOutlined } from "hobom-design-system/icons";
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
];
