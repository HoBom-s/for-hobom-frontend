import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DashboardOutlined,
  FolderOutlined,
  ListAlt,
  Logout,
  Mail,
  MonitorHeartOutlined,
  NotificationsNoneOutlined,
  RiceBowlTwoTone,
  StickyNote2Outlined,
} from "@mui/icons-material";
import { RoutesConfig } from "@/shared/config";
import { AppShell, type AppShellNavItem } from "@/shared/ui";
import { UNAUTHORIZED_EVENT } from "@/shared/api";
import { useToast } from "@/shared/model";
import { postAuthLogout } from "@/entities/auth";
import { NotificationBell } from "@/features/notification";

const DailyTodoPage = lazy(() => import("@/pages/daily-todo"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const AuthLoginPage = lazy(() => import("@/pages/auth-login"));
const MenuRecommendationPage = lazy(
  () => import("@/pages/menu-recommendation"),
);
const MenuPickPage = lazy(() => import("@/pages/menu-pick"));
const FutureMessagePage = lazy(() => import("@/pages/message"));
const FutureMessageSendPage = lazy(() => import("@/pages/message-send"));
const NotePage = lazy(() => import("@/pages/note"));
const NotificationPage = lazy(() => import("@/pages/notification"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const DashboardSystemPage = lazy(() => import("@/pages/dashboard-system"));
const ProjectListPage = lazy(() => import("@/pages/project-list"));
const ProjectLayoutPage = lazy(() => import("@/pages/project-layout"));
const ProjectBoardPage = lazy(() => import("@/pages/project-board"));

const NAV_ITEMS: AppShellNavItem[] = [
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

const BOTTOM_NAV_ITEMS: AppShellNavItem[] = [
  {
    value: "HOBOM_NOTIFICATION",
    label: "알림",
    path: RoutesConfig.NOTIFICATION.LIST,
    icon: <NotificationsNoneOutlined fontSize="small" />,
  },
  {
    value: "SYSTEM",
    label: "시스템",
    path: RoutesConfig.DASHBOARD.SYSTEM,
    icon: <MonitorHeartOutlined fontSize="small" />,
  },
];

const AppBarActions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await postAuthLogout();
    } finally {
      queryClient.clear();
      navigate(RoutesConfig.AUTH.LOGIN, { replace: true });
    }
  };

  return (
    <>
      <NotificationBell />
      <Tooltip title="로그아웃">
        <IconButton
          size="small"
          onClick={() => setLogoutOpen(true)}
          sx={{ ml: 0.5 }}
        >
          <Logout fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        maxWidth="xs"
      >
        <DialogTitle>로그아웃</DialogTitle>
        <DialogContent>
          <DialogContentText>정말 로그아웃 하시겠어요?</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setLogoutOpen(false)}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="error"
            loading={isLoggingOut}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <AppShell
    navItems={NAV_ITEMS}
    bottomNavItems={BOTTOM_NAV_ITEMS}
    appBarAction={<AppBarActions />}
  >
    {children}
  </AppShell>
);

export const AppRouter = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openWarnToast } = useToast();

  useEffect(() => {
    const handler = () => {
      queryClient.clear();
      openWarnToast({
        message: "인증이 필요해요. 로그인 페이지로 이동합니다.",
      });
      navigate(RoutesConfig.AUTH.LOGIN, { replace: true });
    };
    window.addEventListener(UNAUTHORIZED_EVENT, handler);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handler);
  }, [navigate, queryClient, openWarnToast]);

  return (
    <Suspense fallback={<AppRouter.Loader />}>
      <Routes>
        {/* 사이드바 없이 단독 렌더 */}
        <Route path={RoutesConfig.AUTH.LOGIN} element={<AuthLoginPage />} />
        <Route path={RoutesConfig.NOT_FOUND.ALL} element={<NotFoundPage />} />

        {/* AppShell 사이드바 레이아웃 */}
        <Route
          path={RoutesConfig.MAIN.DAILY_TODO}
          element={
            <Shell>
              <DailyTodoPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.MENU.RECOMMENDATION}
          element={
            <Shell>
              <MenuRecommendationPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.MENU.PICK}
          element={
            <Shell>
              <MenuPickPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.MESSAGE.RESERVATION}
          element={
            <Shell>
              <FutureMessagePage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.MESSAGE.SEND_FUNNEL}
          element={
            <Shell>
              <FutureMessageSendPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.NOTES.LIST}
          element={
            <Shell>
              <NotePage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.NOTIFICATION.LIST}
          element={
            <Shell>
              <NotificationPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.DASHBOARD.HOME}
          element={
            <Shell>
              <DashboardPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.DASHBOARD.SYSTEM}
          element={
            <Shell>
              <DashboardSystemPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.PROJECTS.LIST}
          element={
            <Shell>
              <ProjectListPage />
            </Shell>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <Shell>
              <ProjectLayoutPage />
            </Shell>
          }
        >
          <Route index element={<Navigate to="board" replace />} />
          <Route path="board" element={<ProjectBoardPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

AppRouter.Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};
