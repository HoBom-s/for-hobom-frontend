import { Suspense, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { LoadingState } from "./LoadingState";

interface RouteBoundaryProps {
  children: ReactNode;
}

/**
 * Per-route boundary: isolates each screen so a render error or a slow lazy
 * chunk shows a localized fallback within the surrounding chrome instead of
 * tearing down the whole app. Keyed by pathname so navigating away clears a
 * crashed screen.
 */
export const RouteBoundary = ({ children }: RouteBoundaryProps) => {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary key={pathname}>
      <Suspense fallback={<LoadingState />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
