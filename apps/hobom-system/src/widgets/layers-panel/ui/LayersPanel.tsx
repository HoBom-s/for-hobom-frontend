import { Bom } from "hobom-utils";
import * as stylex from "@stylexjs/stylex";
import { DragIndicatorOutlined } from "hobom-design-system/icons";
import { Hb, Sortable } from "@/shared/ui";
import {
  isComponentNode,
  isTextNode,
  type DocumentNode,
  type NodeId,
  type StudioDocument,
} from "@/entities/document";
import type { DragEndEvent } from "hobom-design-system";

const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    ":hover": { backgroundColor: "var(--hb-color-border)" },
  },
});

interface LayersPanelProps {
  document: StudioDocument;
  selectedId?: NodeId;
  onSelect: (id: NodeId) => void;
  onReorder: (activeId: NodeId, overId: NodeId) => void;
}

interface FlatLayer {
  node: DocumentNode;
  depth: number;
}

/** 트리를 깊이 우선으로 평탄화한다(들여쓰기 깊이 포함). */
const flattenLayers = (nodes: DocumentNode[], depth: number): FlatLayer[] =>
  Bom.flatMap(nodes, (node) => [
    { node, depth },
    ...(isComponentNode(node) ? flattenLayers(node.children, depth + 1) : []),
  ]);

/**
 * 문서 트리를 단일 평탄 리스트의 레이어 목록으로 보여준다(들여쓰기로 계층 표현).
 * 단일 SortableContext라 충돌 감지가 안정적 — 핸들 드래그로 순서변경 및 다른 부모로 이동.
 */
export function LayersPanel({ document, selectedId, onSelect, onReorder }: LayersPanelProps) {
  const layers = flattenLayers(document.children, 0);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorder(String(active.id), String(over.id));
    }
  };

  return (
    <Sortable.Root onDragEnd={handleDragEnd}>
      <Sortable.List items={layers.map((layer) => layer.node.id)} strategy="vertical">
        <Hb.Box
          style={{
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          {layers.map(({ node, depth }) => (
            <Sortable.Item key={node.id} id={node.id} useHandle>
              <LayerRow node={node} depth={depth} selectedId={selectedId} onSelect={onSelect} />
            </Sortable.Item>
          ))}
        </Hb.Box>
      </Sortable.List>
    </Sortable.Root>
  );
}

interface LayerRowProps {
  node: DocumentNode;
  depth: number;
  selectedId?: NodeId;
  onSelect: (id: NodeId) => void;
}

function LayerRow({ node, depth, selectedId, onSelect }: LayerRowProps) {
  const isSelected = node.id === selectedId;
  const label = isTextNode(node) ? `"${node.value}"` : node.type.replace(/^Hb\./, "");

  return (
    <Hb.Box
      {...stylex.props(styles.row)}
      style={{
        paddingLeft: `${4 + depth * 14}px`,
        backgroundColor: isSelected ? "var(--hb-color-border)" : "transparent",
      }}
    >
      <Sortable.Handle>
        <DragIndicatorOutlined
          sx={{ fontSize: 16, color: "text.disabled", cursor: "grab", display: "block" }}
        />
      </Sortable.Handle>
      <Hb.Box
        onClick={() => onSelect(node.id)}
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 12,
          cursor: "pointer",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: isSelected ? "text.primary" : "text.secondary",
        }}
      >
        {label}
      </Hb.Box>
    </Hb.Box>
  );
}
