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

interface LayersPanelProps {
  document: StudioDocument;
  selectedId?: NodeId;
  onSelect: (id: NodeId) => void;
  onReorder: (activeId: NodeId, overId: NodeId) => void;
}

/** 문서 트리를 레이어 목록으로 보여준다. 핸들 드래그로 같은 부모 안에서 순서변경. */
export function LayersPanel({ document, selectedId, onSelect, onReorder }: LayersPanelProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorder(String(active.id), String(over.id));
    }
  };

  return (
    <Sortable.Root onDragEnd={handleDragEnd}>
      <Hb.Box sx={{ py: 0.5 }}>
        <LayerList
          nodes={document.children}
          depth={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </Hb.Box>
    </Sortable.Root>
  );
}

interface LayerListProps {
  nodes: DocumentNode[];
  depth: number;
  selectedId?: NodeId;
  onSelect: (id: NodeId) => void;
}

function LayerList({ nodes, depth, selectedId, onSelect }: LayerListProps) {
  return (
    <Sortable.List items={nodes.map((node) => node.id)} strategy="vertical">
      {nodes.map((node) => (
        <Sortable.Item key={node.id} id={node.id} useHandle>
          <LayerRow node={node} depth={depth} selectedId={selectedId} onSelect={onSelect} />
        </Sortable.Item>
      ))}
    </Sortable.List>
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
    <>
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          pl: `${4 + depth * 14}px`,
          pr: 1,
          py: 0.5,
          bgcolor: isSelected ? "action.selected" : "transparent",
          "&:hover": { bgcolor: isSelected ? "action.selected" : "action.hover" },
        }}
      >
        <Sortable.Handle>
          <DragIndicatorOutlined
            sx={{ fontSize: 16, color: "text.disabled", cursor: "grab", display: "block" }}
          />
        </Sortable.Handle>
        <Hb.Box
          onClick={() => onSelect(node.id)}
          sx={{
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

      {isComponentNode(node) && node.children.length > 0 && (
        <LayerList
          nodes={node.children}
          depth={depth + 1}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      )}
    </>
  );
}
