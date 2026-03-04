import type { IssueType } from "../api/issue.type";
import type { IssueKind } from "../model/issue.model";

export const PARENT_ISSUE_KINDS = new Set<IssueKind>(["EPIC", "STORY"]);

export interface IssueTreeResult {
  roots: IssueType[];
  childrenMap: Map<string, IssueType[]>;
  parentMap: Map<string, IssueType>;
}

export const buildIssueTree = (issues: IssueType[]): IssueTreeResult => {
  const issueById = new Map(issues.map((i) => [i.id, i]));
  const childrenMap = new Map<string, IssueType[]>();
  const parentMap = new Map<string, IssueType>();
  const roots: IssueType[] = [];

  for (const issue of issues) {
    if (issue.parent && issueById.has(issue.parent)) {
      const parent = issueById.get(issue.parent)!;
      parentMap.set(issue.id, parent);

      const siblings = childrenMap.get(issue.parent);
      if (siblings) {
        siblings.push(issue);
      } else {
        childrenMap.set(issue.parent, [issue]);
      }
    } else {
      roots.push(issue);
    }
  }

  return { roots, childrenMap, parentMap };
};

interface FlatTreeIssue {
  issue: IssueType;
  depth: number;
  childCount: number;
}

export const flattenIssueTree = (
  issues: IssueType[],
  collapsedIds?: Set<string>,
): FlatTreeIssue[] => {
  const { roots, childrenMap } = buildIssueTree(issues);
  const result: FlatTreeIssue[] = [];

  const walk = (items: IssueType[], depth: number) => {
    for (const item of items) {
      const children = childrenMap.get(item.id) ?? [];
      result.push({ issue: item, depth, childCount: children.length });
      if (children.length > 0 && !collapsedIds?.has(item.id)) {
        walk(children, depth + 1);
      }
    }
  };

  walk(roots, 0);
  return result;
};

export interface DescendantProgress {
  completed: number;
  total: number;
}

export const getDescendantProgress = (
  issueId: string,
  childrenMap: Map<string, IssueType[]>,
): DescendantProgress => {
  let completed = 0;
  let total = 0;

  const walk = (id: string) => {
    const children = childrenMap.get(id);
    if (!children) return;
    for (const child of children) {
      total++;
      if (child.statusCategory === "DONE") completed++;
      walk(child.id);
    }
  };

  walk(issueId);
  return { completed, total };
};

export const isDescendantOf = (
  issueId: string,
  ancestorId: string,
  parentMap: Map<string, IssueType>,
): boolean => {
  let current = issueId;
  while (true) {
    const parent = parentMap.get(current);
    if (!parent) return false;
    if (parent.id === ancestorId) return true;
    current = parent.id;
  }
};

export const getRootEpic = (
  issueId: string,
  parentMap: Map<string, IssueType>,
): IssueType | null => {
  let current = parentMap.get(issueId);
  if (!current) return null;
  while (true) {
    const next = parentMap.get(current.id);
    if (!next) return current.type === "EPIC" ? current : null;
    current = next;
  }
};
