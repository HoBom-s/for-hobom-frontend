import { Outlet } from "react-router";
import { GlobalNav } from "@/widgets/global-nav";
import { RouteBoundary } from "@/shared/ui";
import { RouteFallback } from "./RouteFallback";

/** Wraps the consumer screens in the global navigation chrome (§0.5). */
export const ConsumerShellLayout = () => (
  <GlobalNav>
    <RouteBoundary fallback={<RouteFallback />}>
      <Outlet />
    </RouteBoundary>
  </GlobalNav>
);
