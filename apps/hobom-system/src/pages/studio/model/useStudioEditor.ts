import { useCallback, useMemo, useState } from "react";
import { getManifest, type ComponentKey } from "@/entities/manifest";
import {
  createNodeId,
  createSampleDocument,
  findNode,
  insertNode,
  isComponentNode,
  moveNode,
  removeNode,
  updateNodeProps,
  updateNodeStyle,
  type DocumentNode,
  type NodeId,
  type NodeStyle,
  type PropValue,
} from "@/entities/document";
import { acceptsComponentChildren, createComponentNode } from "../lib/create-component-node.lib";

/**
 * Studio 에디터 상태 오케스트레이션 — 문서·선택·삽입·삭제·prop 편집을 한 곳에서 소유한다.
 * 캔버스/팔레트/인스펙터가 이 훅의 상태를 공유한다(컴포넌트는 순수 렌더).
 */
export function useStudioEditor() {
  const [document, setDocument] = useState(createSampleDocument);
  const [selectedId, setSelectedId] = useState<NodeId | undefined>(undefined);

  const selectedNode: DocumentNode | undefined = useMemo(
    () => (selectedId ? findNode(document, selectedId) : undefined),
    [document, selectedId],
  );

  const selectNode = useCallback((id: NodeId) => setSelectedId(id), []);

  const clearSelection = useCallback(() => setSelectedId(undefined), []);

  const updateProp = useCallback(
    (prop: string, value: PropValue) => {
      if (!selectedId) {
        return;
      }

      setDocument((doc) => updateNodeProps(doc, selectedId, prop, value));
    },
    [selectedId],
  );

  const insertComponent = useCallback(
    (key: ComponentKey) => {
      const manifest = getManifest(key);

      if (!manifest) {
        return;
      }

      const node = createComponentNode(manifest, createNodeId);
      const container =
        selectedNode && isComponentNode(selectedNode) ? selectedNode : undefined;
      const containerManifest = container ? getManifest(container.type) : undefined;
      const parentId =
        container && containerManifest && acceptsComponentChildren(containerManifest)
          ? container.id
          : null;

      setDocument((doc) => insertNode(doc, parentId, node));
      setSelectedId(node.id);
    },
    [selectedNode],
  );

  const updateStyle = useCallback(
    (key: keyof NodeStyle, value: number | undefined) => {
      if (!selectedId) {
        return;
      }

      setDocument((doc) => updateNodeStyle(doc, selectedId, key, value));
    },
    [selectedId],
  );

  const resizeNode = useCallback((id: NodeId, size: { width?: number; height?: number }) => {
    setDocument((doc) => {
      let next = doc;

      if (size.width !== undefined) {
        next = updateNodeStyle(next, id, "width", size.width);
      }

      if (size.height !== undefined) {
        next = updateNodeStyle(next, id, "height", size.height);
      }

      return next;
    });
  }, []);

  /** 같은 부모면 순서변경, 다른 부모면 그 부모로 이동(흐름 D&D). */
  const reorderNode = useCallback((activeId: NodeId, overId: NodeId) => {
    setDocument((doc) => moveNode(doc, activeId, overId));
  }, []);

  const deleteSelected = useCallback(() => {
    if (!selectedId) {
      return;
    }

    setDocument((doc) => removeNode(doc, selectedId));
    setSelectedId(undefined);
  }, [selectedId]);

  return {
    document,
    selectedId,
    selectedNode,
    selectNode,
    clearSelection,
    updateProp,
    updateStyle,
    resizeNode,
    reorderNode,
    insertComponent,
    deleteSelected,
  };
}
