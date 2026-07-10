import { useCallback, useState } from "react";
import {
  useTransitionIssue,
  useUpdateIssue,
  useAssignIssue,
  type IssueType,
  type IssuePriority,
} from "@/entities/issue";
import {
  getAvailableTransitions,
  useProjectContext,
  type WorkflowTransition,
} from "@/entities/project";

interface StatusMenuState {
  el: HTMLElement;
  transitions: WorkflowTransition[];
}

export const useIssueDetailActions = (projectId: string, issue: IssueType | undefined) => {
  const { transitions } = useProjectContext();
  const { mutate: transitionIssue } = useTransitionIssue(projectId);
  const { mutate: updateIssue } = useUpdateIssue();
  const { mutate: assignIssue } = useAssignIssue(projectId);

  // ── Status Menu ──
  const [statusAnchor, setStatusAnchor] = useState<StatusMenuState | null>(null);

  const statusMenu = {
    anchor: statusAnchor,
    open: useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (!issue) return;
        const available = getAvailableTransitions(transitions, issue.status);

        if (available.length === 0) return;
        setStatusAnchor({ el: e.currentTarget, transitions: available });
      },
      [issue, transitions],
    ),
    close: useCallback(() => setStatusAnchor(null), []),
    handleTransition: useCallback(
      (transition: WorkflowTransition) => {
        if (!issue) return;
        transitionIssue({
          projectId,
          issueId: issue.id,
          statusId: transition.to,
        });
        setStatusAnchor(null);
      },
      [issue, projectId, transitionIssue],
    ),
  };

  // ── Priority Menu ──
  const [priorityAnchor, setPriorityAnchor] = useState<HTMLElement | null>(null);

  const priorityMenu = {
    anchor: priorityAnchor,
    open: useCallback((e: React.MouseEvent<HTMLElement>) => {
      setPriorityAnchor(e.currentTarget);
    }, []),
    close: useCallback(() => setPriorityAnchor(null), []),
    handleChange: useCallback(
      (priority: IssuePriority) => {
        if (!issue) return;
        updateIssue({ projectId, issueId: issue.id, priority });
        setPriorityAnchor(null);
      },
      [issue, projectId, updateIssue],
    ),
  };

  // ── Assignee Menu ──
  const [assigneeAnchor, setAssigneeAnchor] = useState<HTMLElement | null>(null);

  const assigneeMenu = {
    anchor: assigneeAnchor,
    open: useCallback((e: React.MouseEvent<HTMLElement>) => {
      setAssigneeAnchor(e.currentTarget);
    }, []),
    close: useCallback(() => setAssigneeAnchor(null), []),
    handleAssign: useCallback(
      (userId: string | undefined) => {
        if (!issue) return;
        assignIssue({ projectId, issueId: issue.id, assignee: userId });
        setAssigneeAnchor(null);
      },
      [issue, projectId, assignIssue],
    ),
  };

  // ── Field Updates ──
  const updateField = useCallback(
    (fields: {
      parent?: string | null;
      sprint?: string;
      labels?: string[];
      storyPoints?: number;
    }) => {
      if (!issue) return;
      updateIssue({ projectId, issueId: issue.id, ...fields });
    },
    [issue, projectId, updateIssue],
  );

  return { updateField, statusMenu, priorityMenu, assigneeMenu };
};
