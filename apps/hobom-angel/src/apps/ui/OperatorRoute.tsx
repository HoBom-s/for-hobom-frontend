import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { isOperator, useCurrentUser } from "@/entities/user";
import { RouteFallback } from "./RouteFallback";

/** Gates the §09 운영자 승인 큐: only a platform operator (SYSTEM_ADMIN) enters;
 *  a guest goes to login, anyone else goes home. */
export const OperatorRoute = () => {
  const { user, isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) return <RouteFallback />;

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return isOperator(user) ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};
