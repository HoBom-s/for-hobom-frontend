import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { useCurrentUser } from "@/entities/user";

/**
 * Guards guest-only routes (login/signup): a signed-in user is redirected home.
 * The login form renders while the session is still resolving so guests aren't
 * blocked; only a confirmed session triggers the redirect (usually instant, from
 * the cached /users/me).
 */
export const GuestOnlyRoute = () => {
  const { isAuthenticated } = useCurrentUser();

  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};
