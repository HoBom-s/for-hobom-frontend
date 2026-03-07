import { createContext, useContext } from "react";
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

export const KanbanContext = createContext<KanbanContextValue | null>(null);

export const useKanbanContext = (): KanbanContextValue => {
  const ctx = useContext(KanbanContext);
  if (!ctx)
    throw new Error(
      "useKanbanContext must be used within KanbanContext.Provider",
    );
  return ctx;
};
