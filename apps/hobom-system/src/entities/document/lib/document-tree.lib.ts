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

/**
 * 노드를 부모의 자식 끝에 삽입한 새 문서를 반환한다(불변).
 * `parentId`가 null이면 문서 루트에 삽입한다.
 */
export const insertNode = (
  doc: StudioDocument,
  parentId: NodeId | null,
  node: DocumentNode,
): StudioDocument => {
  if (parentId === null) {
    return { ...doc, children: [...doc.children, node] };
  }

  const mapNode = (current: DocumentNode): DocumentNode => {
    if (!isComponentNode(current)) {
      return current;
    }

    const children = current.children.map(mapNode);

    return current.id === parentId
      ? { ...current, children: [...children, node] }
      : { ...current, children };
  };

  return { ...doc, children: doc.children.map(mapNode) };
};

/** id에 해당하는 노드를 제거한 새 문서를 반환한다(불변, 깊이 우선). */
export const removeNode = (doc: StudioDocument, id: NodeId): StudioDocument => {
  const filterNodes = (nodes: DocumentNode[]): DocumentNode[] =>
    nodes
      .filter((node) => node.id !== id)
      .map((node) => (isComponentNode(node) ? { ...node, children: filterNodes(node.children) } : node));

  return { ...doc, children: filterNodes(doc.children) };
};
