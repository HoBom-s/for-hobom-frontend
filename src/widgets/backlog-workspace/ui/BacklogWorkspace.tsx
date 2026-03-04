import { Suspense } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { BacklogBoard } from "@/features/backlog-board";

export const BacklogWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { onCreateChildIssue, onOpenIssueDetail } = useOutletContext<{
    onCreateChildIssue: (parentId: string) => void;
    onOpenIssueDetail: (issueId: string) => void;
  }>();

  if (!projectId) return null;

  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <BacklogBoard
        projectId={projectId}
        onCreateChildIssue={onCreateChildIssue}
        onIssueClick={onOpenIssueDetail}
      />
    </Suspense>
  );
};
