import { Suspense } from "react";
import { NotificationBell } from "@/features/notification";
import { Hb } from "@/shared/ui";
import { ColorSchemeToggle } from "./ColorSchemeToggle";
import { UserProfileMenu } from "./UserProfileMenu";

export const AppBarActions = () => (
  <>
    <ColorSchemeToggle />
    <NotificationBell />
    <Suspense fallback={<Hb.Progress.Circular size={20} />}>
      <UserProfileMenu />
    </Suspense>
  </>
);
