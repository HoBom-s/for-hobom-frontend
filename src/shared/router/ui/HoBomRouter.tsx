import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { RoutesConfig } from "@/shared/router/config/routes.config.ts";

const DailyTodoPage = lazy(() => import("@/pages/daily-todo"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const AuthLoginPage = lazy(() => import("@/pages/auth-login"));

export const HoBomRouter = () => {
  return (
    <Suspense fallback={<HoBomRouter.Loader />}>
      <Routes>
        <Route
          path={RoutesConfig.MAIN.DAILY_TODO}
          element={<DailyTodoPage />}
        />
        <Route path={RoutesConfig.NOT_FOUND.ALL} element={<NotFoundPage />} />
        <Route path={RoutesConfig.AUTH.LOGIN} element={<AuthLoginPage />} />
      </Routes>
    </Suspense>
  );
};

HoBomRouter.Loader = () => {
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
