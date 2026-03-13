import { Suspense } from "react";
import { Box } from "@mui/material";
import { PendingUsersTable } from "@/features/manage-pending-users";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export default function AdminUsersPage() {
  return (
    <Box sx={{ p: 3 }}>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <PendingUsersTable />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
}
