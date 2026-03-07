import { createSafeContext } from "@/shared/lib";
import type { SprintType } from "@/entities/sprint";

interface BacklogContextValue {
  sprints: SprintType[];
  projectId: string;
  doneStatusIds: Set<string>;
  onCreateChildIssue?: (parentId: string) => void;
  onIssueClick?: (issueId: string) => void;
}

export const [BacklogContext, useBacklogContext] =
  createSafeContext<BacklogContextValue>("BacklogContext");
