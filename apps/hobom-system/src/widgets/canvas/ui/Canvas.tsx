import type { ComponentType, MouseEvent } from "react";
import { Hb } from "@/shared/ui";
import { getManifest } from "@/entities/manifest";
import {
  isTextNode,
  type DocumentNode,
  type NodeId,
  type StudioDocument,
} from "@/entities/document";
import { resolvePath } from "../lib/resolve-component.lib";

/** 매니페스트 `import.access` 경로 해석의 시작점. */
const COMPONENT_ROOT = { Hb };

interface NodeViewProps {
  node: DocumentNode;
  selectedId?: NodeId;
  onSelect?: (id: NodeId) => void;
}

/** Document 노드 하나를 실제 컴포넌트(또는 텍스트)로 렌더한다. 재귀적. */
function NodeView({ node, selectedId, onSelect }: NodeViewProps) {
  if (isTextNode(node)) {
    return <>{node.value}</>;
  }

  const manifest = getManifest(node.type);
  const Component = manifest
    ? (resolvePath(COMPONENT_ROOT, manifest.import.access) as
        | ComponentType<Record<string, unknown>>
        | undefined)
    : undefined;

  if (!Component) {
    return <UnknownNode type={node.type} />;
  }

  const handleSelect = (event: MouseEvent) => {
    event.stopPropagation();
    onSelect?.(node.id);
  };

  return (
    <Hb.Box
      component="span"
      onClick={handleSelect}
      sx={{
        display: "inline-flex",
        cursor: "pointer",
        borderRadius: 1,
        outline: "2px solid",
        outlineColor: node.id === selectedId ? "primary.main" : "transparent",
        outlineOffset: 2,
      }}
    >
      <Component {...node.props} sx={node.style}>
        {node.children.map((child) => (
          <NodeView key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} />
        ))}
      </Component>
    </Hb.Box>
  );
}

function UnknownNode({ type }: { type: string }) {
  return (
    <Hb.Text variant="caption" color="error">
      ⚠ 미등록 컴포넌트: {type}
    </Hb.Text>
  );
}

interface CanvasProps {
  document: StudioDocument;
  selectedId?: NodeId;
  onSelect?: (id: NodeId) => void;
}

/** Document Model을 실제 `Hb.*` 컴포넌트 트리로 렌더하는 캔버스. */
export function Canvas({ document, selectedId, onSelect }: CanvasProps) {
  return (
    <>
      {document.children.map((node) => (
        <NodeView key={node.id} node={node} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </>
  );
}
