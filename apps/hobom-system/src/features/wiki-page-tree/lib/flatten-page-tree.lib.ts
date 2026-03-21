import type { PageTreeNode } from "@/entities/wiki-page";

interface FlatPageNode {
  id: string;
  title: string;
  depth: number;
}

/**
 * 페이지 트리를 DFS로 순회하여 flat 배열로 변환한다.
 * `excludeId`가 주어지면 해당 노드와 그 하위 노드를 결과에서 제외한다.
 */
export const flattenPageTree = (
  nodes: PageTreeNode[],
  excludeId?: string,
  depth = 0,
): FlatPageNode[] =>
  nodes.flatMap((node) =>
    node.id === excludeId
      ? []
      : [
          { id: node.id, title: node.title, depth },
          ...flattenPageTree(node.children, excludeId, depth + 1),
        ],
  );
