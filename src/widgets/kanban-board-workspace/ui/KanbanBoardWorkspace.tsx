import { Suspense } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { KanbanBoard } from "@/features/kanban-board";
import { SuspenseLoader } from "@/shared/ui";

export const KanbanBoardWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { onOpenIssueDetail } = useOutletContext<{
    onOpenIssueDetail: (issueId: string) => void;
  }>();

  if (!projectId) return null;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <KanbanBoard projectId={projectId} onIssueClick={onOpenIssueDetail} />
    </Suspense>
  );
};
