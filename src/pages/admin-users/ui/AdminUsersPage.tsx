import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { PendingUsersTable } from "@/features/manage-pending-users";

export default function AdminUsersPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        }
      >
        <PendingUsersTable />
      </Suspense>
    </Box>
  );
}
