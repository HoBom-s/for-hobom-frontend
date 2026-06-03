import { Hb } from "@/shared/ui";
import {
  isComponentNode,
  isTextNode,
  type DocumentNode,
  type NodeId,
  type StudioDocument,
} from "@/entities/document";

interface LayersPanelProps {
  document: StudioDocument;
  selectedId?: NodeId;
  onSelect: (id: NodeId) => void;
}

/** 문서 트리를 레이어 목록으로 보여준다(피그마 Layers 패널). 선택은 캔버스와 동기화. */
export function LayersPanel({ document, selectedId, onSelect }: LayersPanelProps) {
  return (
    <Hb.Box sx={{ py: 0.5 }}>
      {document.children.map((node) => (
        <LayerRow
          key={node.id}
          node={node}
          depth={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </Hb.Box>
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
        onClick={() => onSelect(node.id)}
        sx={{
          pl: `${8 + depth * 14}px`,
          pr: 1,
          py: 0.5,
          fontSize: 12,
          cursor: "pointer",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: isSelected ? "text.primary" : "text.secondary",
          bgcolor: isSelected ? "action.selected" : "transparent",
          "&:hover": { bgcolor: isSelected ? "action.selected" : "action.hover" },
        }}
      >
        {label}
      </Hb.Box>

      {isComponentNode(node) &&
        node.children.map((child) => (
          <LayerRow
            key={child.id}
            node={child}
            depth={depth + 1}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
    </>
  );
}
