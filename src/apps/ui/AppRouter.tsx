import { lazy, Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { RoutesConfig } from "@/shared/config";
import { AppShell, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { UNAUTHORIZED_EVENT } from "@/shared/api";
import { useToast } from "@/shared/model";
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from "./NavItems";
import { AppBarActions } from "./AppBarActions";

const pageImports = {
  authLogin: () => import("@/pages/auth-login"),
  authSignUp: () => import("@/pages/auth-signup"),
  notFound: () => import("@/pages/not-found"),
  dailyTodo: () => import("@/pages/daily-todo"),
  menuRecommendation: () => import("@/pages/menu-recommendation"),
  menuPick: () => import("@/pages/menu-pick"),
  futureMessage: () => import("@/pages/message"),
  futureMessageSend: () => import("@/pages/message-send"),
  note: () => import("@/pages/note"),
  notification: () => import("@/pages/notification"),
  dashboard: () => import("@/pages/dashboard"),
  dashboardSystem: () => import("@/pages/dashboard-system"),
  projectList: () => import("@/pages/project-list"),
  projectLayout: () => import("@/pages/project-layout"),
  projectBoard: () => import("@/pages/project-board"),
  projectBacklog: () => import("@/pages/project-backlog"),
  projectIssues: () => import("@/pages/project-issues"),
  projectSettings: () => import("@/pages/project-settings"),
  adminUsers: () => import("@/pages/admin-users"),
  wikiSpaces: () => import("@/pages/wiki-spaces"),
  wikiSpaceLayout: () => import("@/pages/wiki-space-layout"),
  wikiSpaceHome: () => import("@/pages/wiki-space-home"),
  wikiPageView: () => import("@/pages/wiki-page-view"),
  dashboardLog: () => import("@/pages/dashboard-log"),
};

const AuthLoginPage = lazy(pageImports.authLogin);
const AuthSignUpPage = lazy(pageImports.authSignUp);
const NotFoundPage = lazy(pageImports.notFound);
const DailyTodoPage = lazy(pageImports.dailyTodo);
const MenuRecommendationPage = lazy(pageImports.menuRecommendation);
const MenuPickPage = lazy(pageImports.menuPick);
const FutureMessagePage = lazy(pageImports.futureMessage);
const FutureMessageSendPage = lazy(pageImports.futureMessageSend);
const NotePage = lazy(pageImports.note);
const NotificationPage = lazy(pageImports.notification);
const DashboardPage = lazy(pageImports.dashboard);
const DashboardSystemPage = lazy(pageImports.dashboardSystem);
const ProjectListPage = lazy(pageImports.projectList);
const ProjectLayoutPage = lazy(pageImports.projectLayout);
const ProjectBoardPage = lazy(pageImports.projectBoard);
const ProjectBacklogPage = lazy(pageImports.projectBacklog);
const ProjectIssuesPage = lazy(pageImports.projectIssues);
const ProjectSettingsPage = lazy(pageImports.projectSettings);
const AdminUsersPage = lazy(pageImports.adminUsers);
const WikiSpacesPage = lazy(pageImports.wikiSpaces);
const WikiSpaceLayoutPage = lazy(pageImports.wikiSpaceLayout);
const WikiSpaceHomePage = lazy(pageImports.wikiSpaceHome);
const WikiPageViewPage = lazy(pageImports.wikiPageView);
const DashboardLogPage = lazy(pageImports.dashboardLog);

const PREFETCH_MAP: Record<string, (() => Promise<unknown>)[]> = {
  [RoutesConfig.MAIN.DAILY_TODO]: [pageImports.dailyTodo],
  [RoutesConfig.MENU.RECOMMENDATION]: [
    pageImports.menuRecommendation,
    pageImports.menuPick,
  ],
  [RoutesConfig.MESSAGE.RESERVATION]: [pageImports.futureMessage],
  [RoutesConfig.NOTES.LIST]: [pageImports.note],
  [RoutesConfig.PROJECTS.LIST]: [
    pageImports.projectList,
    pageImports.projectLayout,
    pageImports.projectBoard,
  ],
  [RoutesConfig.NOTIFICATION.LIST]: [pageImports.notification],
  [RoutesConfig.ADMIN.USERS]: [pageImports.adminUsers],
  [RoutesConfig.DASHBOARD.HOME]: [pageImports.dashboard],
  [RoutesConfig.DASHBOARD.SYSTEM]: [pageImports.dashboardSystem],
  [RoutesConfig.DASHBOARD.LOGS]: [pageImports.dashboardLog],
  [RoutesConfig.WIKI.SPACES]: [
    pageImports.wikiSpaces,
    pageImports.wikiSpaceLayout,
    pageImports.wikiSpaceHome,
  ],
};

const prefetchRoute = (path: string) => {
  PREFETCH_MAP[path]?.forEach((fn) => fn());
};

const Shell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <AppShell
      navItems={NAV_ITEMS}
      bottomNavItems={BOTTOM_NAV_ITEMS}
      appBarAction={<AppBarActions />}
      onPrefetch={prefetchRoute}
    >
      <ErrorBoundary resetKey={pathname} inline>
        {children}
      </ErrorBoundary>
    </AppShell>
  );
};

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

  // 유휴 시간에 모든 페이지 청크 백그라운드 프리페치
  useEffect(() => {
    const id = requestIdleCallback(() => {
      Object.values(pageImports).forEach((fn) => fn());
    });
    return () => cancelIdleCallback(id);
  }, []);

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
          path={RoutesConfig.DASHBOARD.LOGS}
          element={
            <Shell>
              <DashboardLogPage />
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
          path={RoutesConfig.WIKI.SPACES}
          element={
            <Shell>
              <WikiSpacesPage />
            </Shell>
          }
        />
        <Route
          path="/wiki/:spaceKey"
          element={
            <Shell>
              <WikiSpaceLayoutPage />
            </Shell>
          }
        >
          <Route index element={<WikiSpaceHomePage />} />
          <Route path="pages/:pageId" element={<WikiPageViewPage />} />
        </Route>
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
          <Route path="backlog" element={<ProjectBacklogPage />} />
          <Route path="issues" element={<ProjectIssuesPage />} />
          <Route path="settings" element={<ProjectSettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

AppRouter.Loader = () => <SuspenseLoader fullScreen />;
