import { useCallback, useMemo, useState } from "react";
import { getManifest, type ComponentKey } from "@/entities/manifest";
import {
  createNodeId,
  createSampleDocument,
  findNode,
  insertNode,
  isComponentNode,
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
    updateProp,
    updateStyle,
    insertComponent,
    deleteSelected,
  };
}
