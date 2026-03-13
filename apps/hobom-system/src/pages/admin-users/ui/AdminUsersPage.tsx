import { Suspense } from "react";
import { PendingUsersTable } from "@/features/manage-pending-users";
import { ErrorBoundary, Hb, SuspenseLoader } from "@/shared/ui";

export default function AdminUsersPage() {
  return (
    <Hb.Box sx={{ p: 3 }}>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <PendingUsersTable />
        </Suspense>
      </ErrorBoundary>
    </Hb.Box>
  );
}
