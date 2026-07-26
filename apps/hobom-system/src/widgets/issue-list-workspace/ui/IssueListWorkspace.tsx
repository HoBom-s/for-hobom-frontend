import { Suspense } from "react";
import { useOutletContext, useParams } from "react-router";
import { IssueListTable } from "@/features/issue-list-table";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export const IssueListWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { onOpenIssueDetail } = useOutletContext<{
    onOpenIssueDetail: (issueId: string) => void;
  }>();

  if (!projectId) return null;

  return (
    <ErrorBoundary inline>
      <Suspense fallback={<SuspenseLoader />}>
        <IssueListTable projectId={projectId} onIssueClick={onOpenIssueDetail} />
      </Suspense>
    </ErrorBoundary>
  );
};
