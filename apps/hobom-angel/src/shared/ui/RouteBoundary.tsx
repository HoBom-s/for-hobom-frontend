import { Suspense, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { LoadingState } from "./LoadingState";

interface RouteBoundaryProps {
  children: ReactNode;
  /** Suspense fallback while a lazy chunk loads. Defaults to LoadingState; pass a
   *  route-aware skeleton for a smoother list-screen load. */
  fallback?: ReactNode;
}

/**
 * Per-route boundary: isolates each screen so a render error or a slow lazy
 * chunk shows a localized fallback within the surrounding chrome instead of
 * tearing down the whole app. Keyed by pathname so navigating away clears a
 * crashed screen.
 */
export const RouteBoundary = ({ children, fallback }: RouteBoundaryProps) => {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary key={pathname}>
      <Suspense fallback={fallback ?? <LoadingState />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
