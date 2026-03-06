import { Suspense } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { IssueListTable } from "@/features/issue-list-table";
import { SuspenseLoader } from "@/shared/ui";

export const IssueListWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { onOpenIssueDetail } = useOutletContext<{
    onOpenIssueDetail: (issueId: string) => void;
  }>();

  if (!projectId) return null;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <IssueListTable projectId={projectId} onIssueClick={onOpenIssueDetail} />
    </Suspense>
  );
};
