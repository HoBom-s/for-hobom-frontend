import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ListAlt, Mail, MenuBook, RiceBowlTwoTone } from "@mui/icons-material";
import { RoutesConfig } from "@/shared/config";
import { AppShell, type AppShellNavItem } from "@/shared/ui";

const DailyTodoPage = lazy(() => import("@/pages/daily-todo"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const AuthLoginPage = lazy(() => import("@/pages/auth-login"));
const MenuRecommendationPage = lazy(
  () => import("@/pages/menu-recommendation"),
);
const MenuPickPage = lazy(() => import("@/pages/menu-pick"));
const FutureMessagePage = lazy(() => import("@/pages/message"));
const FutureMessageSendPage = lazy(() => import("@/pages/message-send"));

const NAV_ITEMS: AppShellNavItem[] = [
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
    value: "MORE",
    label: "더보기",
    path: RoutesConfig.MAIN.DAILY_TODO,
    icon: <MenuBook fontSize="small" />,
  },
];

const Shell = ({ children }: { children: React.ReactNode }) => (
  <AppShell navItems={NAV_ITEMS}>{children}</AppShell>
);

export const AppRouter = () => {
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
