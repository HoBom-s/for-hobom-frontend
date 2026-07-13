import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { useRouteMeta } from "@/shared/model";
import { LoadingState, NotFoundState } from "@/shared/ui";
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

// Warm the auth route chunks during idle time so navigating to them is instant.
const prefetchRoutes = () => {
  void import("@/pages/login");
  void import("@/pages/signup");
};

// Consumer sections share the ComingSoon placeholder until their screens land.
const SECTION_ROUTES = [
  ROUTES.ANIMALS,
  ROUTES.FOSTER,
  ROUTES.VOLUNTEER,
  ROUTES.SHELTERS,
  ROUTES.FAVORITES,
  ROUTES.APPLICATIONS,
  ROUTES.MY,
];

export const AppRouter = () => {
  useRouteMeta();

  useEffect(() => {
    const id = requestIdleCallback(prefetchRoutes);

    return () => cancelIdleCallback(id);
  }, []);

  return (
    <Suspense fallback={<LoadingState fullScreen />}>
      <Routes>
        {/* Consumer screens render inside the global nav chrome. */}
        <Route element={<ConsumerShellLayout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route element={<ProtectedRoute />}>
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
  );
};
