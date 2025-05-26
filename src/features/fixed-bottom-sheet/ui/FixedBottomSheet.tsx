import { type ReactNode, useState } from "react";
import { Code, CreditCard, ListAlt, MenuBook } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  colors,
  Paper,
} from "@mui/material";

interface MenuItem {
  value: string;
  label: string;
  icon: ReactNode;
}

const BOTTOM_SHEET_MENUS: MenuItem[] = [
  {
    value: "DAILY_TODO",
    label: "Daily Todo",
    icon: <ListAlt />,
  },
  {
    value: "HOBOM_TECH",
    label: "HoBom Tech",
    icon: <Code />,
  },
  {
    value: "HOBOM_FUNDS",
    label: "HoBom Funds",
    icon: <CreditCard />,
  },
  {
    value: "MORE",
    label: "More",
    icon: <MenuBook />,
  },
] as const;

export const FixedBottomSheet = () => {
  const [values, setValues] = useState<MenuItem>({ ...BOTTOM_SHEET_MENUS[0] });

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={values}
        onChange={(_event, newValue: string) => {
          const foundMenu = BOTTOM_SHEET_MENUS.find(
            (item) => item.value === newValue,
          );
          if (foundMenu != null) {
            setValues({ ...foundMenu });
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
                item.value === values.value
                  ? colors.blue.A700
                  : colors.grey.A700,
              fontWeight: item.value === values.value ? "bold" : "default",
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
