import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { useCurrentUser } from "@/entities/user";
import { RouteFallback } from "./RouteFallback";

/** Auth-gated routes: a guest is sent to login once the session probe resolves.
 *  While it resolves, show the route-aware skeleton (not a spinner). */
export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) return <RouteFallback />;

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};
