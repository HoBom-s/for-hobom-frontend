import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/shared/config";
import { managedShelter, useCurrentUser } from "@/entities/user";
import { RouteFallback } from "./RouteFallback";

/** Gates the shelter console: a guest goes to login, a member without any
 *  shelter role goes home; only shelter staff reach the console. */
export const ConsoleRoute = () => {
  const { user, isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) return <RouteFallback />;

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return managedShelter(user) ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};
