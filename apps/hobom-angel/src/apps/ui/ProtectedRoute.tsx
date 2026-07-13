import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { LoadingState } from "@/shared/ui";
import { useCurrentUser } from "@/entities/user";

/** Auth-gated routes: a guest is sent to login once the session probe resolves. */
export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) return <LoadingState fullScreen />;

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};
