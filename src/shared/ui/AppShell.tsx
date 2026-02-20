import { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Divider,
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

  const getSegment = (path: string) => "/" + path.split("/")[1];

  const activeItem = Bom.pipe(
    location.pathname,
    (currentPath) => {
      const currentSegment = getSegment(currentPath);
      return navItems.find((item) => getSegment(item.path) === currentSegment);
    },
    Bom.when(Bom.isNullish, () => navItems[0]),
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: APPBAR_HEIGHT,
            height: APPBAR_HEIGHT,
            px: 3,
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            HoBom Assistant
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ my: 1.5 }} />
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {activeItem.label}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent">
        {/* 로고 영역 */}
        <Box
          sx={{
            height: APPBAR_HEIGHT,
            display: "flex",
            alignItems: "center",
            px: 2.5,
            flexShrink: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: "1.15rem",
              color: "#ffffff",
              letterSpacing: "0.02em",
            }}
          >
            HoBom
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <Box sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
          <Typography
            variant="caption"
            sx={{
              px: 1,
              mb: 1,
              display: "block",
              color: "rgba(244,220,200,0.4)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            메뉴
          </Typography>
          <List disablePadding>
            {navItems.map((item) => {
              const isActive = item.value === activeItem.value;
              return (
                <ListItemButton
                  key={item.value}
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.875rem",
                          fontWeight: isActive ? 600 : 400,
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
          bgcolor: "background.default",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
