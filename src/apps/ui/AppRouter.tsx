import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { RoutesConfig } from "@/shared/config";
import { AppShell } from "@/shared/ui";
import { UNAUTHORIZED_EVENT } from "@/shared/api";
import { useToast } from "@/shared/model";
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from "./nav-items";
import { AppBarActions } from "./AppBarActions";

const AuthLoginPage = lazy(() => import("@/pages/auth-login"));
const AuthSignUpPage = lazy(() => import("@/pages/auth-signup"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const DailyTodoPage = lazy(() => import("@/pages/daily-todo"));
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
const AdminUsersPage = lazy(() => import("@/pages/admin-users"));

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
        <Route path={RoutesConfig.AUTH.SIGN_UP} element={<AuthSignUpPage />} />
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
          path={RoutesConfig.ADMIN.USERS}
          element={
            <Shell>
              <AdminUsersPage />
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

AppRouter.Loader = () => (
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
