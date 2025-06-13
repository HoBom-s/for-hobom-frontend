import { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  ListAlt,
  MenuBook,
  RiceBowlTwoTone,
} from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  colors,
  Paper,
} from "@mui/material";
import { RoutesConfig } from "@/shared/router/config/routes.config.ts";
import { Bom } from "@/packages/bom";

interface MenuItem {
  value: string;
  label: string;
  path: string;
  icon: ReactNode;
}

const BOTTOM_SHEET_MENUS: MenuItem[] = [
  {
    value: "DAILY_TODO",
    label: "Daily Todo",
    path: RoutesConfig.MAIN.DAILY_TODO,
    icon: <ListAlt />,
  },
  {
    value: "HOBOM_MENU",
    label: "Today Menu",
    path: RoutesConfig.MENU.RECOMMENDATION,
    icon: <RiceBowlTwoTone />,
  },
  {
    value: "HOBOM_FUNDS",
    label: "HoBom Funds",
    path: RoutesConfig.NOT_FOUND.ALL,
    icon: <CreditCard />,
  },
  {
    value: "MORE",
    label: "More",
    path: RoutesConfig.NOT_FOUND.ALL,
    icon: <MenuBook />,
  },
] as const;

export const FixedBottomSheet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentMenuItem = Bom.pipe(
    location.pathname,
    (path) => BOTTOM_SHEET_MENUS.find((item) => item.path === path),
    Bom.when(Bom.isNullish, () => BOTTOM_SHEET_MENUS[0]),
  );

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 56 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentMenuItem.value}
        onChange={(_event, newValue: string) => {
          const foundMenu = BOTTOM_SHEET_MENUS.find(
            (item) => item.value === newValue,
          );
          if (foundMenu != null) {
            navigate(foundMenu.path);
          }
        }}
      >
        {BOTTOM_SHEET_MENUS.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            icon={item.icon}
            value={item.value}
            sx={{
              color:
                item.value === currentMenuItem.value
                  ? colors.blue.A700
                  : colors.grey.A700,
              fontWeight:
                item.value === currentMenuItem.value ? "bold" : "default",
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
