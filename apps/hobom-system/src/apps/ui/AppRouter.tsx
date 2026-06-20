import { lazy, Suspense, useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDataLot } from "hobom-data";
import { RoutesConfig } from "@/shared/config";
import { AppShell, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { UNAUTHORIZED_EVENT } from "@/shared/api";
import { useToast } from "@/shared/model";
import { todoQueries } from "@/entities/daily-todo";
import { menuQueries } from "@/entities/menu-recommendation";
import { noteQueries } from "@/entities/note";
import { projectQueries } from "@/entities/project";
import { wikiSpaceQueries } from "@/entities/wiki-space";
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
  projectDashboard: () => import("@/pages/project-dashboard"),
  projectSettings: () => import("@/pages/project-settings"),
  adminUsers: () => import("@/pages/admin-users"),
  studioLayout: () => import("@/pages/studio-layout"),
  studioWorkspace: () => import("@/pages/studio-workspace"),
  studio: () => import("@/pages/studio"),
  wikiSpaces: () => import("@/pages/wiki-spaces"),
  wikiSpaceLayout: () => import("@/pages/wiki-space-layout"),
  wikiSpaceHome: () => import("@/pages/wiki-space-home"),
  wikiPageView: () => import("@/pages/wiki-page-view"),
  dashboardLog: () => import("@/pages/dashboard-log"),
  errorMonitoring: () => import("@/pages/error-monitoring"),
  dlq: () => import("@/pages/dlq"),
  privacyLawLayout: () => import("@/pages/privacy-law-layout"),
  privacyLawVersions: () => import("@/pages/privacy-law-versions"),
  privacyLawVersionDetail: () => import("@/pages/privacy-law-version-detail"),
  privacyLawDiffs: () => import("@/pages/privacy-law-diffs"),
  privacyLawDiffDetail: () => import("@/pages/privacy-law-diff-detail"),
  privacyLawStudy: () => import("@/pages/privacy-law-study"),
  privacyLawStudyDetail: () => import("@/pages/privacy-law-study-detail"),
  privacyLawChat: () => import("@/pages/privacy-law-chat"),
  privacyLawExams: () => import("@/pages/privacy-law-exams"),
  privacyLawExamDetail: () => import("@/pages/privacy-law-exam-detail"),
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
const ProjectDashboardPage = lazy(pageImports.projectDashboard);
const ProjectSettingsPage = lazy(pageImports.projectSettings);
const AdminUsersPage = lazy(pageImports.adminUsers);
const StudioLayoutPage = lazy(pageImports.studioLayout);
const WorkspacePage = lazy(pageImports.studioWorkspace);
const StudioPage = lazy(pageImports.studio);
const WikiSpacesPage = lazy(pageImports.wikiSpaces);
const WikiSpaceLayoutPage = lazy(pageImports.wikiSpaceLayout);
const WikiSpaceHomePage = lazy(pageImports.wikiSpaceHome);
const WikiPageViewPage = lazy(pageImports.wikiPageView);
const DashboardLogPage = lazy(pageImports.dashboardLog);
const ErrorMonitoringPage = lazy(pageImports.errorMonitoring);
const DlqPage = lazy(pageImports.dlq);
const PrivacyLawLayoutPage = lazy(pageImports.privacyLawLayout);
const PrivacyLawVersionsPage = lazy(pageImports.privacyLawVersions);
const PrivacyLawVersionDetailPage = lazy(pageImports.privacyLawVersionDetail);
const PrivacyLawDiffsPage = lazy(pageImports.privacyLawDiffs);
const PrivacyLawDiffDetailPage = lazy(pageImports.privacyLawDiffDetail);
const PrivacyLawStudyPage = lazy(pageImports.privacyLawStudy);
const PrivacyLawStudyDetailPage = lazy(pageImports.privacyLawStudyDetail);
const PrivacyLawChatPage = lazy(pageImports.privacyLawChat);
const PrivacyLawExamsPage = lazy(pageImports.privacyLawExams);
const PrivacyLawExamDetailPage = lazy(pageImports.privacyLawExamDetail);

const PREFETCH_MAP: Record<string, (() => Promise<unknown>)[]> = {
  [RoutesConfig.MAIN.DAILY_TODO]: [pageImports.dailyTodo],
  [RoutesConfig.MENU.RECOMMENDATION]: [pageImports.menuRecommendation, pageImports.menuPick],
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
  [RoutesConfig.DASHBOARD.ERRORS]: [pageImports.errorMonitoring],
  [RoutesConfig.DASHBOARD.DLQ]: [pageImports.dlq],
  [RoutesConfig.WIKI.SPACES]: [
    pageImports.wikiSpaces,
    pageImports.wikiSpaceLayout,
    pageImports.wikiSpaceHome,
  ],
  [RoutesConfig.PRIVACY_LAW.HOME]: [pageImports.privacyLawLayout, pageImports.privacyLawVersions],
};

const prefetchRoute = (path: string) => {
  PREFETCH_MAP[path]?.forEach((fn) => fn());
};

const Shell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const dataLot = useDataLot();

  const handlePrefetch = useCallback(
    (path: string) => {
      prefetchRoute(path);
      const queryPrefetchMap: Record<string, () => void> = {
        [RoutesConfig.MAIN.DAILY_TODO]: () => dataLot.prefetchQuery(todoQueries.categories()),
        [RoutesConfig.MENU.RECOMMENDATION]: () =>
          dataLot.prefetchQuery(menuQueries.recommendationList()),
        [RoutesConfig.NOTES.LIST]: () => dataLot.prefetchQuery(noteQueries.list()),
        [RoutesConfig.PROJECTS.LIST]: () => dataLot.prefetchQuery(projectQueries.list()),
        [RoutesConfig.WIKI.SPACES]: () => dataLot.prefetchQuery(wikiSpaceQueries.list()),
      };

      queryPrefetchMap[path]?.();
    },
    [dataLot],
  );

  return (
    <AppShell
      navItems={NAV_ITEMS}
      bottomNavItems={BOTTOM_NAV_ITEMS}
      appBarAction={<AppBarActions />}
      onPrefetch={handlePrefetch}
    >
      <ErrorBoundary resetKey={pathname} inline>
        {children}
      </ErrorBoundary>
    </AppShell>
  );
};

export const AppRouter = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { openWarnToast } = useToast();

  useEffect(() => {
    const handler = () => {
      dataLot.clear();
      openWarnToast({
        message: "인증이 필요해요. 로그인 페이지로 이동합니다.",
      });
      navigate(RoutesConfig.AUTH.LOGIN, { replace: true });
    };

    window.addEventListener(UNAUTHORIZED_EVENT, handler);

    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handler);
  }, [navigate, dataLot, openWarnToast]);

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
        <Route path={RoutesConfig.AUTH.LOGIN} element={<AuthLoginPage />} />
        <Route path={RoutesConfig.AUTH.SIGN_UP} element={<AuthSignUpPage />} />
        <Route path={RoutesConfig.NOT_FOUND.ALL} element={<NotFoundPage />} />

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
          path={RoutesConfig.DASHBOARD.ERRORS}
          element={
            <Shell>
              <ErrorMonitoringPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.DASHBOARD.DLQ}
          element={
            <Shell>
              <DlqPage />
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
          path={RoutesConfig.STUDIO.HOME}
          element={
            <Shell>
              <StudioLayoutPage />
            </Shell>
          }
        >
          <Route index element={<WorkspacePage />} />
          <Route path=":itemId" element={<StudioPage />} />
        </Route>
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
          path={RoutesConfig.PRIVACY_LAW.HOME}
          element={
            <Shell>
              <PrivacyLawLayoutPage />
            </Shell>
          }
        >
          <Route index element={<Navigate to="versions" replace />} />
          <Route path="versions" element={<PrivacyLawVersionsPage />} />
          <Route path="versions/:versionId" element={<PrivacyLawVersionDetailPage />} />
          <Route path="diffs" element={<PrivacyLawDiffsPage />} />
          <Route path="diffs/:diffId" element={<PrivacyLawDiffDetailPage />} />
          <Route path="study" element={<PrivacyLawStudyPage />} />
          <Route path="study/:materialId" element={<PrivacyLawStudyDetailPage />} />
          <Route path="chat" element={<PrivacyLawChatPage />} />
          <Route path="exams" element={<PrivacyLawExamsPage />} />
          <Route path="exams/:examId" element={<PrivacyLawExamDetailPage />} />
        </Route>
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
          <Route path="dashboard" element={<ProjectDashboardPage />} />
          <Route path="settings" element={<ProjectSettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

AppRouter.Loader = () => <SuspenseLoader fullScreen />;
