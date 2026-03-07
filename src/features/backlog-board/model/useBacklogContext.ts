import { createContext, useContext } from "react";
import type { SprintType } from "@/entities/sprint";

interface BacklogContextValue {
  sprints: SprintType[];
  projectId: string;
  doneStatusIds: Set<string>;
  onCreateChildIssue?: (parentId: string) => void;
  onIssueClick?: (issueId: string) => void;
}

export const BacklogContext = createContext<BacklogContextValue | null>(null);

export const useBacklogContext = (): BacklogContextValue => {
  const ctx = useContext(BacklogContext);
  if (!ctx)
    throw new Error(
      "useBacklogContext must be used within BacklogContext.Provider",
    );
  return ctx;
};
