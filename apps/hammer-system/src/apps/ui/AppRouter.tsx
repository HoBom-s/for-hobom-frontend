import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDataLot } from "hobom-data";
import { RoutesConfig } from "@/shared/config";
import { AppShell, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { UNAUTHORIZED_EVENT, getAccessToken, tryRefresh } from "@/shared/api";
import { useToast } from "@/shared/model";
import { NAV_ITEMS } from "./NavItems";

const pageImports = {
  authLogin: () => import("@/pages/auth-login"),
  notFound: () => import("@/pages/not-found"),
  overview: () => import("@/pages/overview"),
  logExplorer: () => import("@/pages/log-explorer"),
  notificationTemplates: () => import("@/pages/notification-templates"),
  legalDocuments: () => import("@/pages/legal-documents"),
};

const AuthLoginPage = lazy(pageImports.authLogin);
const NotFoundPage = lazy(pageImports.notFound);
const OverviewPage = lazy(pageImports.overview);
const LogExplorerPage = lazy(pageImports.logExplorer);
const NotificationTemplatesPage = lazy(pageImports.notificationTemplates);
const LegalDocumentsPage = lazy(pageImports.legalDocuments);

const GuestOnly = ({ children }: { children: React.ReactNode }) => {
  if (getAccessToken()) {
    return <Navigate to={RoutesConfig.DASHBOARD.OVERVIEW} replace />;
  }

  return children;
};

const Shell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <AppShell navItems={NAV_ITEMS}>
      <ErrorBoundary resetKey={pathname} inline>
        {children}
      </ErrorBoundary>
    </AppShell>
  );
};

const useInitAuth = () => {
  const [ready, setReady] = useState(!!getAccessToken());

  useEffect(() => {
    if (ready) return;

    tryRefresh().finally(() => setReady(true));
  }, [ready]);

  return ready;
};

export const AppRouter = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { openWarnToast } = useToast();
  const authReady = useInitAuth();

  useEffect(() => {
    const handler = () => {
      dataLot.clear();
      openWarnToast({
        message: "인증이 필요해요. 로그인 페이지로 이동해요.",
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

  if (!authReady) {
    return <AppRouter.Loader />;
  }

  return (
    <Suspense fallback={<AppRouter.Loader />}>
      <Routes>
        <Route
          path={RoutesConfig.AUTH.LOGIN}
          element={
            <GuestOnly>
              <AuthLoginPage />
            </GuestOnly>
          }
        />
        <Route path={RoutesConfig.NOT_FOUND.ALL} element={<NotFoundPage />} />

        <Route
          path={RoutesConfig.DASHBOARD.OVERVIEW}
          element={
            <Shell>
              <OverviewPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.DASHBOARD.LOG_EXPLORER}
          element={
            <Shell>
              <LogExplorerPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.NOTIFICATION_TEMPLATE.LIST}
          element={
            <Shell>
              <NotificationTemplatesPage />
            </Shell>
          }
        />
        <Route
          path={RoutesConfig.LEGAL_DOCUMENT.LIST}
          element={
            <Shell>
              <LegalDocumentsPage />
            </Shell>
          }
        />
      </Routes>
    </Suspense>
  );
};

AppRouter.Loader = () => <SuspenseLoader fullScreen />;
