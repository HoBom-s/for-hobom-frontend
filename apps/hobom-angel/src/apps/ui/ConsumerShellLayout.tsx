import { Outlet } from "react-router-dom";
import { GlobalNav } from "@/widgets/global-nav";

/** Wraps the consumer screens in the global navigation chrome (§0.5). */
export const ConsumerShellLayout = () => (
  <GlobalNav>
    <Outlet />
  </GlobalNav>
);
