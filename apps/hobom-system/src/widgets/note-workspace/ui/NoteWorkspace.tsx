import { Suspense, useState } from "react";
import { Box } from "@mui/material";
import type { NoteStatus } from "@/entities/note";
import { Note } from "@/features/note";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export const NoteWorkspace = () => {
  const [status, setStatus] = useState<NoteStatus | undefined>(undefined);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Note.StatusTabs value={status} onChange={setStatus} />

      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <Note.Content status={status} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};
