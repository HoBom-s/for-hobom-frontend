import { useState } from "react";
import {
  getAvailableTransitions,
  type WorkflowTransition,
} from "@/entities/project";
import { useTransitionIssue } from "@/entities/issue";

interface MenuAnchorState {
  el: HTMLElement;
  issueId: string;
  transitions: WorkflowTransition[];
}

export const useStatusTransitionMenu = (
  projectId: string,
  transitions: WorkflowTransition[],
) => {
  const [menuAnchor, setMenuAnchor] = useState<MenuAnchorState | null>(null);
  const { mutate: transitionIssue } = useTransitionIssue(projectId);

  const handleStatusClick = (
    e: React.MouseEvent<HTMLElement>,
    issueId: string,
    currentStatus: string,
  ) => {
    e.stopPropagation();
    const available = getAvailableTransitions(transitions, currentStatus);
    if (available.length === 0) return;
    setMenuAnchor({ el: e.currentTarget, issueId, transitions: available });
  };

  const handleTransition = (transition: WorkflowTransition) => {
    if (menuAnchor) {
      transitionIssue({
        projectId,
        issueId: menuAnchor.issueId,
        statusId: transition.to,
      });
    }
    setMenuAnchor(null);
  };

  const closeMenu = () => setMenuAnchor(null);

  return { menuAnchor, handleStatusClick, handleTransition, closeMenu };
};
