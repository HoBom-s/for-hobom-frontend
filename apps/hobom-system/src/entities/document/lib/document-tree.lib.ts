import {
  isComponentNode,
  type ComponentNode,
  type DocumentNode,
  type NodeId,
  type PropValue,
  type StudioDocument,
} from "../model/document.model";

/** 문서 트리에서 id로 노드를 찾는다(깊이 우선). 없으면 undefined. */
export const findNode = (doc: StudioDocument, id: NodeId): DocumentNode | undefined => {
  const visit = (nodes: DocumentNode[]): DocumentNode | undefined => {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }

      if (isComponentNode(node)) {
        const found = visit(node.children);

        if (found) {
          return found;
        }
      }
    }

    return undefined;
  };

  return visit(doc.children);
};

/**
 * 특정 노드의 prop 하나를 바꾼 새 문서를 반환한다(불변 업데이트).
 * 대상이 없으면 원본과 동일한 구조의 새 트리를 반환한다.
 */
export const updateNodeProps = (
  doc: StudioDocument,
  id: NodeId,
  prop: string,
  value: PropValue,
): StudioDocument => {
  const mapNode = (node: DocumentNode): DocumentNode => {
    if (!isComponentNode(node)) {
      return node;
    }

    const next: ComponentNode = { ...node, children: node.children.map(mapNode) };

    return node.id === id ? { ...next, props: { ...node.props, [prop]: value } } : next;
  };

  return { ...doc, children: doc.children.map(mapNode) };
};
