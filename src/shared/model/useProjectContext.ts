import { createContext, useContext } from "react";

interface ProjectContextValue {
  projectId: string;
  statuses: Array<{ id: string; name: string; isDone: boolean; order: number }>;
  transitions: Array<{ from: string; to: string; name: string }>;
  doneStatusIds: Set<string>;
}

export const ProjectContext = createContext<ProjectContextValue | null>(null);

export const useProjectContext = (): ProjectContextValue => {
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error(
      "useProjectContext must be used within ProjectContext.Provider",
    );
  return ctx;
};
