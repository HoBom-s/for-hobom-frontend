import { Suspense } from "react";
import { Box } from "@mui/material";
import { PendingUsersTable } from "@/features/manage-pending-users";
import { SuspenseLoader } from "@/shared/ui";

export default function AdminUsersPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Suspense fallback={<SuspenseLoader />}>
        <PendingUsersTable />
      </Suspense>
    </Box>
  );
}
