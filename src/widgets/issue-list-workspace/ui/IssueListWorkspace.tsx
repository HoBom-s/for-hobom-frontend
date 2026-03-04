import { Suspense } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { IssueListTable } from "@/features/issue-list-table";

export const IssueListWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { onOpenIssueDetail } = useOutletContext<{
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
      <IssueListTable projectId={projectId} onIssueClick={onOpenIssueDetail} />
    </Suspense>
  );
};
