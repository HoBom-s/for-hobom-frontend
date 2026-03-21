import { describe, it, expect } from "vitest";
import type { PageTreeNode } from "@/entities/wiki-page";
import { flattenPageTree } from "./flatten-page-tree.lib";

const makeNode = (id: string, title: string, children: PageTreeNode[] = []): PageTreeNode => ({
  id,
  title,
  position: 0,
  children,
});

describe("flattenPageTree", () => {
  it("빈 배열이면 빈 배열을 반환한다", () => {
    expect(flattenPageTree([])).toEqual([]);
  });

  it("단일 노드를 depth 0으로 반환한다", () => {
    const nodes = [makeNode("1", "루트 페이지")];

    const result = flattenPageTree(nodes);

    expect(result).toEqual([{ id: "1", title: "루트 페이지", depth: 0 }]);
  });

  it("같은 레벨의 여러 노드를 순서대로 반환한다", () => {
    const nodes = [makeNode("1", "첫 번째"), makeNode("2", "두 번째"), makeNode("3", "세 번째")];

    const result = flattenPageTree(nodes);

    expect(result).toHaveLength(3);
    expect(result.map((n) => n.id)).toEqual(["1", "2", "3"]);
    expect(result.every((n) => n.depth === 0)).toBe(true);
  });

  it("중첩된 노드를 DFS 순서로 평탄화하고 depth를 올바르게 할당한다", () => {
    const nodes = [
      makeNode("root", "루트", [
        makeNode("child-1", "자식 1", [makeNode("grandchild", "손자")]),
        makeNode("child-2", "자식 2"),
      ]),
    ];

    const result = flattenPageTree(nodes);

    expect(result).toEqual([
      { id: "root", title: "루트", depth: 0 },
      { id: "child-1", title: "자식 1", depth: 1 },
      { id: "grandchild", title: "손자", depth: 2 },
      { id: "child-2", title: "자식 2", depth: 1 },
    ]);
  });

  it("excludeId에 해당하는 노드와 그 하위 노드를 제외한다", () => {
    const nodes = [
      makeNode("root", "루트", [
        makeNode("keep", "유지"),
        makeNode("exclude", "제외", [makeNode("excluded-child", "제외된 자식")]),
      ]),
    ];

    const result = flattenPageTree(nodes, "exclude");

    expect(result).toEqual([
      { id: "root", title: "루트", depth: 0 },
      { id: "keep", title: "유지", depth: 1 },
    ]);
  });

  it("루트 노드가 excludeId이면 해당 트리 전체를 제외한다", () => {
    const nodes = [
      makeNode("excluded-root", "제외 루트", [makeNode("child", "자식")]),
      makeNode("other", "다른 루트"),
    ];

    const result = flattenPageTree(nodes, "excluded-root");

    expect(result).toEqual([{ id: "other", title: "다른 루트", depth: 0 }]);
  });

  it("excludeId가 존재하지 않으면 모든 노드를 반환한다", () => {
    const nodes = [makeNode("1", "첫 번째", [makeNode("2", "두 번째")])];

    const result = flattenPageTree(nodes, "nonexistent");

    expect(result).toHaveLength(2);
  });

  it("깊은 트리(4단계)도 올바르게 평탄화한다", () => {
    const nodes = [
      makeNode("l0", "L0", [makeNode("l1", "L1", [makeNode("l2", "L2", [makeNode("l3", "L3")])])]),
    ];

    const result = flattenPageTree(nodes);

    expect(result.map((n) => n.depth)).toEqual([0, 1, 2, 3]);
  });
});
