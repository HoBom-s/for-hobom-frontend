import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { ROUTES } from "@/shared/config";
import { onIdle } from "@/shared/lib";
import { useRouteMeta } from "@/shared/model";
import { ErrorBoundary, LoadingState, NotFoundState } from "@/shared/ui";
import { ComingSoonPage } from "@/pages/coming-soon";
import { ConsoleRoute } from "./ConsoleRoute";
import { ConsoleShellLayout } from "./ConsoleShellLayout";
import { ConsumerShellLayout } from "./ConsumerShellLayout";
import { GuestOnlyRoute } from "./GuestOnlyRoute";
import { OperatorRoute } from "./OperatorRoute";
import { ProtectedRoute } from "./ProtectedRoute";

// Route-level code splitting — each page ships as its own chunk, loaded on demand.
const LandingPage = lazy(() =>
  import("@/pages/landing").then((module) => ({ default: module.LandingPage })),
);
const FosterPage = lazy(() =>
  import("@/pages/foster").then((module) => ({ default: module.FosterPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/login").then((module) => ({ default: module.LoginPage })),
);
const SignupPage = lazy(() =>
  import("@/pages/signup").then((module) => ({ default: module.SignupPage })),
);
const AnimalsPage = lazy(() =>
  import("@/pages/animals").then((module) => ({ default: module.AnimalsPage })),
);
const AnimalDetailPage = lazy(() =>
  import("@/pages/animal-detail").then((module) => ({ default: module.AnimalDetailPage })),
);
const ApplyAdoptionPage = lazy(() =>
  import("@/pages/apply-adoption").then((module) => ({ default: module.ApplyAdoptionPage })),
);
const ApplyFosterPage = lazy(() =>
  import("@/pages/apply-foster").then((module) => ({ default: module.ApplyFosterPage })),
);
const ShelterDetailPage = lazy(() =>
  import("@/pages/shelter-detail").then((module) => ({ default: module.ShelterDetailPage })),
);
const ShelterListPage = lazy(() =>
  import("@/pages/shelters").then((module) => ({ default: module.ShelterListPage })),
);
const VolunteerPage = lazy(() =>
  import("@/pages/volunteer").then((module) => ({ default: module.VolunteerPage })),
);
const FavoritesPage = lazy(() =>
  import("@/pages/favorites").then((module) => ({ default: module.FavoritesPage })),
);
const WriteReviewPage = lazy(() =>
  import("@/pages/volunteer-write").then((module) => ({ default: module.WriteReviewPage })),
);
const MyPage = lazy(() => import("@/pages/my").then((module) => ({ default: module.MyPage })));
const ApplicationsPage = lazy(() =>
  import("@/pages/applications").then((module) => ({ default: module.ApplicationsPage })),
);
const ConsoleAnimalsPage = lazy(() =>
  import("@/pages/console-animals").then((module) => ({ default: module.ConsoleAnimalsPage })),
);
const ConsoleVolunteerPage = lazy(() =>
  import("@/pages/console-volunteer").then((module) => ({ default: module.ConsoleVolunteerPage })),
);
const ConsoleApplicationsPage = lazy(() =>
  import("@/pages/console-applications").then((module) => ({
    default: module.ConsoleApplicationsPage,
  })),
);
const ConsoleContentPage = lazy(() =>
  import("@/pages/console-content").then((module) => ({ default: module.ConsoleContentPage })),
);
const ConsoleSurveyPage = lazy(() =>
  import("@/pages/console-survey").then((module) => ({ default: module.ConsoleSurveyPage })),
);
const ConsoleStaffPage = lazy(() =>
  import("@/pages/console-staff").then((module) => ({ default: module.ConsoleStaffPage })),
);
const ConsoleStatsPage = lazy(() =>
  import("@/pages/console-stats").then((module) => ({ default: module.ConsoleStatsPage })),
);
const OperatorApprovalsPage = lazy(() =>
  import("@/pages/operator-approvals").then((module) => ({
    default: module.OperatorApprovalsPage,
  })),
);

// Warm the common route chunks during idle time so navigating to them shows the
// screen's own skeleton (data Suspense) rather than the chunk-load spinner.
const prefetchRoutes = () => {
  void import("@/pages/login");
  void import("@/pages/signup");
  void import("@/pages/animals");
  void import("@/pages/shelters");
};

export const AppRouter = () => {
  useRouteMeta();

  useEffect(() => onIdle(prefetchRoutes), []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingState fullScreen />}>
        <Routes>
          {/* Consumer screens render inside the global nav chrome. */}
          <Route element={<ConsumerShellLayout />}>
            <Route path={ROUTES.HOME} element={<LandingPage />} />
            {/* Public 임시보호 explainer — foster is applied per-animal, so this
                informs and hands off to the (gated) animal list. */}
            <Route path={ROUTES.FOSTER} element={<FosterPage />} />
            {/* Public info surfaces (footer links). */}
            <Route path={ROUTES.TERMS} element={<ComingSoonPage />} />
            <Route path={ROUTES.PRIVACY} element={<ComingSoonPage />} />
            <Route path={ROUTES.BUSINESS_INFO} element={<ComingSoonPage />} />
            <Route path={ROUTES.ANIMAL_LAW} element={<ComingSoonPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.ANIMALS} element={<AnimalsPage />} />
            <Route path={ROUTES.ANIMAL_DETAIL} element={<AnimalDetailPage />} />
            <Route path={ROUTES.APPLY} element={<ApplyAdoptionPage />} />
            <Route path={ROUTES.FOSTER_APPLY} element={<ApplyFosterPage />} />
            <Route path={ROUTES.SHELTERS} element={<ShelterListPage />} />
            <Route path={ROUTES.SHELTER_DETAIL} element={<ShelterDetailPage />} />
            <Route path={ROUTES.VOLUNTEER} element={<VolunteerPage />} />
            <Route path={ROUTES.VOLUNTEER_WRITE} element={<WriteReviewPage />} />
            <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
            <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
            <Route path={ROUTES.MY} element={<MyPage />} />
            </Route>
          </Route>

          {/* Shelter staff console — its own chrome, gated on a shelter role. */}
          <Route element={<ConsoleRoute />}>
            <Route element={<ConsoleShellLayout />}>
              <Route path={ROUTES.CONSOLE} element={<Navigate to={ROUTES.CONSOLE_ANIMALS} replace />} />
              <Route path={ROUTES.CONSOLE_ANIMALS} element={<ConsoleAnimalsPage />} />
              <Route path={ROUTES.CONSOLE_APPLICATIONS} element={<ConsoleApplicationsPage />} />
              <Route path={ROUTES.CONSOLE_VOLUNTEER} element={<ConsoleVolunteerPage />} />
              <Route path={ROUTES.CONSOLE_CONTENT} element={<ConsoleContentPage />} />
              <Route path={ROUTES.CONSOLE_SURVEY} element={<ConsoleSurveyPage />} />
              <Route path={ROUTES.CONSOLE_STAFF} element={<ConsoleStaffPage />} />
              <Route path={ROUTES.CONSOLE_STATS} element={<ConsoleStatsPage />} />
            </Route>
          </Route>

          {/* Operator (§09) — gated on the SYSTEM_ADMIN role, its own surface. */}
          <Route element={<OperatorRoute />}>
            <Route path={ROUTES.OPERATOR_APPROVALS} element={<OperatorApprovalsPage />} />
          </Route>

          {/* Auth screens have no nav chrome and are guest-only. */}
          <Route element={<GuestOnlyRoute />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          </Route>

          <Route path="*" element={<NotFoundState />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
