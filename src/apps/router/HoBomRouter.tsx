import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { RoutesConfig } from "@/shared/routes/config/routes.config.ts";

const DailyTodoPage = lazy(() => import("@/pages/daily-todo"));

export const HoBomRouter = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path={RoutesConfig.MAIN.DAILY_TODO}
          element={<DailyTodoPage />}
        />
      </Routes>
    </Suspense>
  );
};
