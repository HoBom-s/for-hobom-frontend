import { describe, it, expect } from "vitest";
import type { IssueType } from "../api/issue.type";
import {
  buildIssueTree,
  flattenIssueTree,
  getDescendantProgress,
  isDescendantOf,
  getRootEpic,
} from "./issue-tree.lib";

const makeIssue = (
  overrides: Partial<IssueType> & Pick<IssueType, "id">,
): IssueType => ({
  project: "proj-1",
  issueNumber: 1,
  issueKey: "P-1",
  type: "TASK",
  title: "test",
  status: "todo",
  priority: "MEDIUM",
  reporter: "user",
  labels: [],
  ...overrides,
});

describe("buildIssueTree", () => {
  it("parent가 없는 이슈를 root로 분류한다", () => {
    const issues = [makeIssue({ id: "1" }), makeIssue({ id: "2" })];
    const { roots, childrenMap, parentMap } = buildIssueTree(issues);

    expect(roots).toHaveLength(2);
    expect(childrenMap.size).toBe(0);
    expect(parentMap.size).toBe(0);
  });

  it("parent가 있는 이슈를 children으로 분류한다", () => {
    const issues = [
      makeIssue({ id: "epic-1", type: "EPIC" }),
      makeIssue({ id: "task-1", parent: "epic-1" }),
      makeIssue({ id: "task-2", parent: "epic-1" }),
    ];
    const { roots, childrenMap, parentMap } = buildIssueTree(issues);

    expect(roots).toHaveLength(1);
    expect(roots[0].id).toBe("epic-1");
    expect(childrenMap.get("epic-1")).toHaveLength(2);
    expect(parentMap.get("task-1")?.id).toBe("epic-1");
    expect(parentMap.get("task-2")?.id).toBe("epic-1");
  });

  it("존재하지 않는 parent를 가진 이슈는 root로 처리한다", () => {
    const issues = [makeIssue({ id: "1", parent: "deleted-parent" })];
    const { roots } = buildIssueTree(issues);

    expect(roots).toHaveLength(1);
    expect(roots[0].id).toBe("1");
  });

  it("빈 배열이면 빈 트리를 반환한다", () => {
    const { roots, childrenMap, parentMap } = buildIssueTree([]);

    expect(roots).toEqual([]);
    expect(childrenMap.size).toBe(0);
    expect(parentMap.size).toBe(0);
  });
});

describe("flattenIssueTree", () => {
  it("트리를 depth 순서대로 평탄화한다", () => {
    const issues = [
      makeIssue({ id: "epic", type: "EPIC" }),
      makeIssue({ id: "story", type: "STORY", parent: "epic" }),
      makeIssue({ id: "task", parent: "story" }),
    ];

    const flat = flattenIssueTree(issues);

    expect(flat).toHaveLength(3);
    expect(flat[0]).toMatchObject({
      issue: expect.objectContaining({ id: "epic" }),
      depth: 0,
      childCount: 1,
    });
    expect(flat[1]).toMatchObject({
      issue: expect.objectContaining({ id: "story" }),
      depth: 1,
      childCount: 1,
    });
    expect(flat[2]).toMatchObject({
      issue: expect.objectContaining({ id: "task" }),
      depth: 2,
      childCount: 0,
    });
  });

  it("collapsedIds에 포함된 노드의 자식은 생략한다", () => {
    const issues = [
      makeIssue({ id: "epic", type: "EPIC" }),
      makeIssue({ id: "task-1", parent: "epic" }),
      makeIssue({ id: "task-2", parent: "epic" }),
    ];

    const flat = flattenIssueTree(issues, new Set(["epic"]));

    expect(flat).toHaveLength(1);
    expect(flat[0].issue.id).toBe("epic");
    expect(flat[0].childCount).toBe(2);
  });

  it("빈 배열이면 빈 배열을 반환한다", () => {
    expect(flattenIssueTree([])).toEqual([]);
  });
});

describe("getDescendantProgress", () => {
  it("하위 이슈의 완료 진행률을 계산한다", () => {
    const childrenMap = new Map<string, IssueType[]>([
      [
        "epic",
        [
          makeIssue({ id: "t1", status: "done" }),
          makeIssue({ id: "t2", status: "todo" }),
          makeIssue({ id: "t3", status: "done" }),
        ],
      ],
    ]);
    const doneIds = new Set(["done"]);

    const result = getDescendantProgress("epic", childrenMap, doneIds);

    expect(result).toEqual({ completed: 2, total: 3 });
  });

  it("중첩된 하위 이슈도 재귀적으로 계산한다", () => {
    const childrenMap = new Map<string, IssueType[]>([
      ["epic", [makeIssue({ id: "story", status: "todo" })]],
      ["story", [makeIssue({ id: "task", status: "done" })]],
    ]);
    const doneIds = new Set(["done"]);

    const result = getDescendantProgress("epic", childrenMap, doneIds);

    expect(result).toEqual({ completed: 1, total: 2 });
  });

  it("하위 이슈가 없으면 0/0을 반환한다", () => {
    const result = getDescendantProgress("x", new Map(), new Set());
    expect(result).toEqual({ completed: 0, total: 0 });
  });
});

describe("isDescendantOf", () => {
  const parentMap = new Map<string, IssueType>([
    ["task", makeIssue({ id: "story", type: "STORY" })],
    ["story", makeIssue({ id: "epic", type: "EPIC" })],
  ]);

  it("직접 자식이면 true를 반환한다", () => {
    expect(isDescendantOf("task", "story", parentMap)).toBe(true);
  });

  it("간접 자손이면 true를 반환한다", () => {
    expect(isDescendantOf("task", "epic", parentMap)).toBe(true);
  });

  it("관계가 없으면 false를 반환한다", () => {
    expect(isDescendantOf("epic", "task", parentMap)).toBe(false);
  });

  it("같은 ID면 false를 반환한다", () => {
    expect(isDescendantOf("task", "task", parentMap)).toBe(false);
  });

  it("순환 참조가 있어도 무한 루프 없이 false를 반환한다", () => {
    const circular = new Map<string, IssueType>([
      ["a", makeIssue({ id: "b" })],
      ["b", makeIssue({ id: "a" })],
    ]);

    expect(isDescendantOf("a", "nonexistent", circular)).toBe(false);
  });
});

describe("getRootEpic", () => {
  it("부모 체인의 최상위 EPIC을 반환한다", () => {
    const parentMap = new Map<string, IssueType>([
      ["task", makeIssue({ id: "story", type: "STORY" })],
      ["story", makeIssue({ id: "epic", type: "EPIC" })],
    ]);

    const result = getRootEpic("task", parentMap);

    expect(result?.id).toBe("epic");
    expect(result?.type).toBe("EPIC");
  });

  it("직접 부모가 EPIC이면 그것을 반환한다", () => {
    const parentMap = new Map<string, IssueType>([
      ["task", makeIssue({ id: "epic", type: "EPIC" })],
    ]);

    expect(getRootEpic("task", parentMap)?.id).toBe("epic");
  });

  it("최상위가 EPIC이 아니면 null을 반환한다", () => {
    const parentMap = new Map<string, IssueType>([
      ["task", makeIssue({ id: "story", type: "STORY" })],
    ]);

    expect(getRootEpic("task", parentMap)).toBeNull();
  });

  it("부모가 없으면 null을 반환한다", () => {
    expect(getRootEpic("orphan", new Map())).toBeNull();
  });

  it("순환 참조가 있어도 무한 루프 없이 null을 반환한다", () => {
    const circular = new Map<string, IssueType>([
      ["a", makeIssue({ id: "b", type: "STORY" })],
      ["b", makeIssue({ id: "a", type: "STORY" })],
    ]);

    expect(getRootEpic("a", circular)).toBeNull();
  });
});
