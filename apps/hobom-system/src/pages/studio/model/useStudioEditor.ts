import { useCallback, useMemo, useState } from "react";
import {
  createSampleDocument,
  findNode,
  updateNodeProps,
  type DocumentNode,
  type NodeId,
  type PropValue,
} from "@/entities/document";

/**
 * Studio 에디터 상태 오케스트레이션 — 문서·선택·prop 편집을 한 곳에서 소유한다.
 * 캔버스와 인스펙터가 이 훅의 상태를 공유한다(컴포넌트는 순수 렌더).
 */
export function useStudioEditor() {
  const [document, setDocument] = useState(createSampleDocument);
  const [selectedId, setSelectedId] = useState<NodeId | undefined>(undefined);

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

  const selectedNode: DocumentNode | undefined = useMemo(
    () => (selectedId ? findNode(document, selectedId) : undefined),
    [document, selectedId],
  );

  return { document, selectedId, selectedNode, selectNode, updateProp };
}
