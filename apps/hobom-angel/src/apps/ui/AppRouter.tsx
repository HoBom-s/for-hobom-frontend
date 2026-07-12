import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingState, NotFoundState } from "@/shared/ui";

// Route-level code splitting — each page ships as its own chunk, loaded on
// demand. Add new routes here as later phases land.
const LandingPage = lazy(() =>
  import("@/pages/landing").then((module) => ({ default: module.LandingPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/login").then((module) => ({ default: module.LoginPage })),
);

/**
 * Public routing. Only the landing page is open to guests; the rest of the
 * product will live behind auth as later phases land.
 */
export const AppRouter = () => (
  <Suspense fallback={<LoadingState fullScreen />}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundState />} />
    </Routes>
  </Suspense>
);
