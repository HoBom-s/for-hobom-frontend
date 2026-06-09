import { Bom } from "hobom-utils";
import {
  isComponentNode,
  type ComponentNode,
  type DocumentNode,
  type NodeId,
  type NodeStyle,
  type PropValue,
  type StudioDocument,
} from "../model/document.model";

/** 트리를 깊이 우선으로 평탄화한다(모든 노드를 한 줄로). */
const flatten = (nodes: DocumentNode[]): DocumentNode[] =>
  Bom.flatMap(nodes, (node) =>
    isComponentNode(node) ? [node, ...flatten(node.children)] : [node],
  );

/** 문서 트리에서 id로 노드를 찾는다. 없으면 undefined. */
export const findNode = (doc: StudioDocument, id: NodeId): DocumentNode | undefined =>
  Bom.pipe(
    flatten(doc.children),
    Bom.find((node) => node.id === id),
  );

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

/**
 * 노드의 사이징(style) 한 키를 바꾼 새 문서를 반환한다(불변).
 * `value`가 undefined면 해당 키를 제거한다(미설정).
 */
export const updateNodeStyle = (
  doc: StudioDocument,
  id: NodeId,
  key: keyof NodeStyle,
  value: number | undefined,
): StudioDocument => {
  const mapNode = (node: DocumentNode): DocumentNode => {
    if (!isComponentNode(node)) {
      return node;
    }

    const next: ComponentNode = { ...node, children: node.children.map(mapNode) };

    if (node.id !== id) {
      return next;
    }

    const style: NodeStyle = { ...node.style };

    if (value === undefined) {
      delete style[key];
    } else {
      style[key] = value;
    }

    return { ...next, style };
  };

  return { ...doc, children: doc.children.map(mapNode) };
};

/** 노드의 부모 id를 찾는다. 최상위면 null, 없으면 undefined. */
export const findParentId = (doc: StudioDocument, id: NodeId): NodeId | null | undefined => {
  if (Bom.some(doc.children, (node) => node.id === id)) {
    return null;
  }

  return Bom.pipe(
    flatten(doc.children),
    Bom.find((node) => isComponentNode(node) && Bom.some(node.children, (child) => child.id === id)),
  )?.id;
};

/** parentId(null=루트)의 직계 자식 목록을 반환한다. */
export const getSiblings = (doc: StudioDocument, parentId: NodeId | null): DocumentNode[] => {
  if (parentId === null) {
    return doc.children;
  }

  const parent = findNode(doc, parentId);

  return parent && isComponentNode(parent) ? parent.children : [];
};

/** parentId(null=루트)의 자식 순서를 from→to로 바꾼 새 문서를 반환한다(불변). */
export const reorderChildren = (
  doc: StudioDocument,
  parentId: NodeId | null,
  from: number,
  to: number,
): StudioDocument => {
  const reorder = (nodes: DocumentNode[]): DocumentNode[] => {
    const next = nodes.slice();
    const [moved] = next.splice(from, 1);

    next.splice(to, 0, moved);

    return next;
  };

  if (parentId === null) {
    return { ...doc, children: reorder(doc.children) };
  }

  const mapNode = (node: DocumentNode): DocumentNode => {
    if (!isComponentNode(node)) {
      return node;
    }

    if (node.id === parentId) {
      return { ...node, children: reorder(node.children) };
    }

    return { ...node, children: node.children.map(mapNode) };
  };

  return { ...doc, children: doc.children.map(mapNode) };
};

/** parentId(null=루트)의 index 위치에 노드를 끼워 넣은 새 문서를 반환한다(불변). */
const insertNodeAt = (
  doc: StudioDocument,
  parentId: NodeId | null,
  index: number,
  node: DocumentNode,
): StudioDocument => {
  const insertInto = (children: DocumentNode[]): DocumentNode[] => {
    const next = children.slice();

    next.splice(index, 0, node);

    return next;
  };

  if (parentId === null) {
    return { ...doc, children: insertInto(doc.children) };
  }

  const mapNode = (node_: DocumentNode): DocumentNode => {
    if (!isComponentNode(node_)) {
      return node_;
    }

    if (node_.id === parentId) {
      return { ...node_, children: insertInto(node_.children) };
    }

    return { ...node_, children: node_.children.map(mapNode) };
  };

  return { ...doc, children: doc.children.map(mapNode) };
};

/**
 * 노드를 over 위치로 옮긴 새 문서를 반환한다(불변).
 * 같은 부모면 순서변경, 다른 부모면 그 부모로 이동(re-parenting).
 * 자기 자신의 하위로는 이동하지 않는다(순환 방지).
 */
export const moveNode = (doc: StudioDocument, activeId: NodeId, overId: NodeId): StudioDocument => {
  if (activeId === overId) {
    return doc;
  }

  const node = findNode(doc, activeId);
  const activeParent = findParentId(doc, activeId);
  const overParent = findParentId(doc, overId);

  if (!node || activeParent === undefined || overParent === undefined) {
    return doc;
  }

  if (isComponentNode(node) && Bom.some(flatten(node.children), (child) => child.id === overId)) {
    return doc;
  }

  if (activeParent === overParent) {
    const siblings = getSiblings(doc, activeParent);
    const from = Bom.findIndex(siblings, (sibling) => sibling.id === activeId);
    const to = Bom.findIndex(siblings, (sibling) => sibling.id === overId);

    return from < 0 || to < 0 ? doc : reorderChildren(doc, activeParent, from, to);
  }

  const removed = removeNode(doc, activeId);
  const siblings = getSiblings(removed, overParent);
  const overIndex = Bom.findIndex(siblings, (sibling) => sibling.id === overId);

  return insertNodeAt(removed, overParent, overIndex < 0 ? siblings.length : overIndex, node);
};
