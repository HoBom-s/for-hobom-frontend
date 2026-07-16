import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { onIdle } from "@/shared/lib";
import { useRouteMeta } from "@/shared/model";
import { ErrorBoundary, LoadingState, NotFoundState } from "@/shared/ui";
import { ComingSoonPage } from "@/pages/coming-soon";
import { ConsumerShellLayout } from "./ConsumerShellLayout";
import { GuestOnlyRoute } from "./GuestOnlyRoute";
import { ProtectedRoute } from "./ProtectedRoute";

// Route-level code splitting — each page ships as its own chunk, loaded on demand.
const LandingPage = lazy(() =>
  import("@/pages/landing").then((module) => ({ default: module.LandingPage })),
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
const ShelterDetailPage = lazy(() =>
  import("@/pages/shelter-detail").then((module) => ({ default: module.ShelterDetailPage })),
);
const ShelterListPage = lazy(() =>
  import("@/pages/shelters").then((module) => ({ default: module.ShelterListPage })),
);
const VolunteerPage = lazy(() =>
  import("@/pages/volunteer").then((module) => ({ default: module.VolunteerPage })),
);

// Warm the common route chunks during idle time so navigating to them shows the
// screen's own skeleton (data Suspense) rather than the chunk-load spinner.
const prefetchRoutes = () => {
  void import("@/pages/login");
  void import("@/pages/signup");
  void import("@/pages/animals");
  void import("@/pages/shelters");
};

// Sections still on the ComingSoon placeholder until their screens land.
const SECTION_ROUTES = [ROUTES.FOSTER, ROUTES.FAVORITES, ROUTES.APPLICATIONS, ROUTES.MY];

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
            {/* Public info surfaces (footer links). */}
            <Route path={ROUTES.TERMS} element={<ComingSoonPage />} />
            <Route path={ROUTES.PRIVACY} element={<ComingSoonPage />} />
            <Route path={ROUTES.BUSINESS_INFO} element={<ComingSoonPage />} />
            <Route path={ROUTES.ANIMAL_LAW} element={<ComingSoonPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.ANIMALS} element={<AnimalsPage />} />
            <Route path={ROUTES.ANIMAL_DETAIL} element={<AnimalDetailPage />} />
            <Route path={ROUTES.APPLY} element={<ApplyAdoptionPage />} />
            <Route path={ROUTES.SHELTERS} element={<ShelterListPage />} />
            <Route path={ROUTES.SHELTER_DETAIL} element={<ShelterDetailPage />} />
            <Route path={ROUTES.VOLUNTEER} element={<VolunteerPage />} />
              {SECTION_ROUTES.map((path) => (
                <Route key={path} path={path} element={<ComingSoonPage />} />
              ))}
            </Route>
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
