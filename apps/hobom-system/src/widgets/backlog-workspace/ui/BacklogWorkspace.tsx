import { Suspense } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { BacklogBoard } from "@/features/backlog-board";

export const BacklogWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { onCreateChildIssue, onOpenIssueDetail } = useOutletContext<{
    onCreateChildIssue: (parentId: string) => void;
    onOpenIssueDetail: (issueId: string) => void;
  }>();

  if (!projectId) return null;

  return (
    <ErrorBoundary inline>
      <Suspense fallback={<SuspenseLoader />}>
        <BacklogBoard
          projectId={projectId}
          onCreateChildIssue={onCreateChildIssue}
          onIssueClick={onOpenIssueDetail}
        />
      </Suspense>
    </ErrorBoundary>
  );
};
