import { Outlet } from "react-router-dom";
import { GlobalNav } from "@/widgets/global-nav";
import { RouteBoundary } from "@/shared/ui";

/** Wraps the consumer screens in the global navigation chrome (§0.5). */
export const ConsumerShellLayout = () => (
  <GlobalNav>
    <RouteBoundary>
      <Outlet />
    </RouteBoundary>
  </GlobalNav>
);
