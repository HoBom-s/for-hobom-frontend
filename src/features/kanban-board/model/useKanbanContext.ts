import { createSafeContext } from "@/shared/lib";
import type { IssueTreeResult } from "@/entities/issue";
import type { SwimlaneGroup } from "../lib/kanban-filter.lib";

interface KanbanContextValue {
  projectId: string;
  issueTree: IssueTreeResult;
  doneStatusIds: Set<string>;
  swimlaneGroups: SwimlaneGroup[] | null;
  onAddIssue: (title: string) => void;
  onIssueClick?: (issueId: string) => void;
}

export const [KanbanContext, useKanbanContext] =
  createSafeContext<KanbanContextValue>("KanbanContext");
