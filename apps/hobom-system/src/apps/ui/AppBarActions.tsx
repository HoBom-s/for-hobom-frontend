import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { NotificationBell } from "@/features/notification";
import { ColorSchemeToggle } from "./ColorSchemeToggle";
import { UserProfileMenu } from "./UserProfileMenu";

export const AppBarActions = () => (
  <>
    <ColorSchemeToggle />
    <NotificationBell />
    <Suspense fallback={<CircularProgress size={20} />}>
      <UserProfileMenu />
    </Suspense>
  </>
);
