import { Bom } from "hobom-utils";
import type { IssueType } from "../api/issue.type";
import type { IssueKind } from "../model/issue.model";

export const PARENT_ISSUE_KINDS = new Set<IssueKind>(["EPIC", "STORY"]);

export interface IssueTreeResult {
  roots: IssueType[];
  childrenMap: Map<string, IssueType[]>;
  parentMap: Map<string, IssueType>;
}

/**
 * 이슈 목록을 트리 구조로 변환한다.
 *
 * @returns `roots` — 부모가 없는 최상위 이슈 목록
 * @returns `childrenMap` — 부모 ID → 자식 이슈 배열
 * @returns `parentMap` — 자식 ID → 부모 이슈 객체
 */
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

/**
 * 이슈 트리를 DFS로 순회하여 flat 배열로 변환한다.
 *
 * 오버로드: `IssueType[]` 또는 `IssueTreeResult`를 입력으로 받는다.
 * `collapsedIds`에 포함된 이슈의 자식은 결과에서 제외된다 (UI 접힘 상태).
 */
export function flattenIssueTree(issues: IssueType[], collapsedIds?: Set<string>): FlatTreeIssue[];
export function flattenIssueTree(
  tree: IssueTreeResult,
  collapsedIds?: Set<string>,
): FlatTreeIssue[];
export function flattenIssueTree(
  input: IssueType[] | IssueTreeResult,
  collapsedIds?: Set<string>,
): FlatTreeIssue[] {
  const { roots, childrenMap } = Array.isArray(input) ? buildIssueTree(input) : input;
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
}

export interface DescendantProgress {
  completed: number;
  total: number;
}

/**
 * 특정 이슈의 모든 하위 이슈를 재귀 순회하여 완료/전체 개수를 집계한다.
 * `doneStatusIds`에 포함된 status를 가진 이슈를 완료로 간주.
 */
export const getDescendantProgress = (
  issueId: string,
  childrenMap: Map<string, IssueType[]>,
  doneStatusIds: Set<string>,
): DescendantProgress => {
  const walk = (id: string): DescendantProgress => {
    const children = childrenMap.get(id);

    if (!children) return { completed: 0, total: 0 };

    return children.reduce(
      (acc, child) => {
        const sub = walk(child.id);

        return {
          completed: acc.completed + (doneStatusIds.has(child.status) ? 1 : 0) + sub.completed,
          total: acc.total + 1 + sub.total,
        };
      },
      { completed: 0, total: 0 },
    );
  };

  return walk(issueId);
};

/**
 * `issueId`가 `ancestorId`의 후손인지 판별한다.
 * visited Set으로 순환 참조를 방어한다.
 */
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

/**
 * 부모 체인을 거슬러 올라가 최상위 EPIC을 찾는다.
 * 최상위가 EPIC이 아니거나 부모가 없으면 `null` 반환.
 * visited Set으로 순환 참조를 방어한다.
 */
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
