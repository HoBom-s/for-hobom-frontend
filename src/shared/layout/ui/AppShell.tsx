import { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Bom } from "@/packages/bom";

const DRAWER_WIDTH = 240;
const APPBAR_HEIGHT = 56;

export interface AppShellNavItem {
  value: string;
  label: string;
  path: string;
  icon: ReactNode;
}

interface Props {
  children: ReactNode;
  navItems: AppShellNavItem[];
}

export const AppShell = ({ children, navItems }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeItem = Bom.pipe(
    location.pathname,
    (path) => navItems.find((item) => item.path === path),
    Bom.when(Bom.isNullish, () => navItems[0]),
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          variant="dense"
          sx={{ minHeight: APPBAR_HEIGHT, height: APPBAR_HEIGHT }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            HoBom
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent">
        <Toolbar
          variant="dense"
          sx={{ minHeight: APPBAR_HEIGHT, height: APPBAR_HEIGHT }}
        />
        <Box sx={{ px: 1, py: 1, flexGrow: 1 }}>
          <List disablePadding>
            {navItems.map((item) => {
              const isActive = item.value === activeItem.value;
              return (
                <ListItemButton
                  key={item.value}
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "primary.main" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.875rem",
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "primary.main" : "text.primary",
                        },
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${DRAWER_WIDTH}px`,
          mt: `${APPBAR_HEIGHT}px`,
          height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
