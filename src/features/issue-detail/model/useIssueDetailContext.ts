import type { MouseEvent } from "react";
import { createSafeContext } from "@/shared/lib";
import type {
  IssueType,
  IssuePriority,
  DescendantProgress,
} from "@/entities/issue";
import type { SprintType } from "@/entities/sprint";
import type { WorkflowTransition } from "@/entities/project";

interface StatusMenuState {
  anchor: { el: HTMLElement; transitions: WorkflowTransition[] } | null;
  open: (e: MouseEvent<HTMLElement>) => void;
  close: () => void;
  handleTransition: (transition: WorkflowTransition) => void;
}

interface PriorityMenuState {
  anchor: HTMLElement | null;
  open: (e: MouseEvent<HTMLElement>) => void;
  close: () => void;
  handleChange: (priority: IssuePriority) => void;
}

interface IssueDetailContextValue {
  issue: IssueType;
  projectId: string;
  parentIssue?: IssueType;
  childIssues: IssueType[];
  availableParents: IssueType[];
  progress: DescendantProgress | null;
  activeSprints: SprintType[];
  currentUserId: string;
  updateField: (fields: {
    parent?: string | null;
    sprint?: string;
    labels?: string[];
  }) => void;
  statusMenu: StatusMenuState;
  priorityMenu: PriorityMenuState;
  onNavigateToIssue?: (issueId: string) => void;
}

export const [IssueDetailContext, useIssueDetailContext] =
  createSafeContext<IssueDetailContextValue>("IssueDetailContext");
