import { Bom } from "@/packages/bom";
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
  const hasParent = (i: IssueType) => !!i.parent && issueById.has(i.parent);

  const [children, roots] = Bom.pipe(issues, Bom.partition(hasParent));

  const childrenMap = new Map(
    Bom.pipe(
      children,
      Bom.groupBy((i) => i.parent!),
      Object.entries,
    ),
  );

  const parentMap = new Map(
    Bom.pipe(
      children,
      Bom.map((i) => [i.id, issueById.get(i.parent!)!] as const),
    ),
  );

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
  doneStatusIds: Set<string>,
): DescendantProgress => {
  let completed = 0;
  let total = 0;

  const walk = (id: string) => {
    const children = childrenMap.get(id);
    if (!children) return;
    for (const child of children) {
      total++;
      if (doneStatusIds.has(child.status)) completed++;
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
  const visited = new Set<string>();
  while (true) {
    if (visited.has(current)) return false;
    visited.add(current);
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
  const visited = new Set<string>();
  while (true) {
    if (visited.has(current.id)) return null;
    visited.add(current.id);
    const next = parentMap.get(current.id);
    if (!next) return current.type === "EPIC" ? current : null;
    current = next;
  }
};
