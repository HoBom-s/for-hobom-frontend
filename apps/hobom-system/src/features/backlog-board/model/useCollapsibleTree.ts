import { useCallback, useMemo, useState } from "react";
import {
  buildIssueTree,
  flattenIssueTree,
  type IssueType,
} from "@/entities/issue";

export const useCollapsibleTree = (issues: IssueType[]) => {
  const issueTree = useMemo(() => buildIssueTree(issues), [issues]);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  const flatTree = useMemo(
    () => flattenIssueTree(issueTree, collapsedIds),
    [issueTree, collapsedIds],
  );

  const toggleCollapse = useCallback((issueId: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);

      if (next.has(issueId)) next.delete(issueId);
      else next.add(issueId);

      return next;
    });
  }, []);

  return { issueTree, flatTree, collapsedIds, toggleCollapse };
};
