import type { ComponentType, MouseEvent, PointerEvent } from "react";
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

/** 리사이즈 최소 크기(px). */
const MIN_SIZE = 24;

/** 부분 사이징 — 축에 따라 width/height만 갱신한다. */
interface ResizeSize {
  width?: number;
  height?: number;
}

type ResizeAxis = "x" | "y" | "both";

/**
 * 흐름 레이아웃에서 의미 있는 핸들 세트.
 * 위/왼쪽은 레이아웃이 고정하므로 오른쪽(너비)·아래(높이)·우하단(둘 다)만 둔다.
 */
const HANDLES: { axis: ResizeAxis; sx: Record<string, unknown> }[] = [
  { axis: "x", sx: { right: -10, top: "50%", transform: "translateY(-50%)", cursor: "ew-resize" } },
  {
    axis: "y",
    sx: { bottom: -10, left: "50%", transform: "translateX(-50%)", cursor: "ns-resize" },
  },
  { axis: "both", sx: { right: -10, bottom: -10, cursor: "nwse-resize" } },
];

interface NodeViewProps {
  node: DocumentNode;
  selectedId?: NodeId;
  onSelect?: (id: NodeId) => void;
  onResize?: (id: NodeId, size: ResizeSize) => void;
}

/** Document 노드 하나를 실제 컴포넌트(또는 텍스트)로 렌더한다. 재귀적. */
function NodeView({ node, selectedId, onSelect, onResize }: NodeViewProps) {
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

  const isSelected = node.id === selectedId;

  const handleSelect = (event: MouseEvent) => {
    event.stopPropagation();
    onSelect?.(node.id);
  };

  /** 핸들 드래그로 부모(wrapper) 크기를 측정해 축에 맞는 W/H를 갱신한다. */
  const startResize = (axis: ResizeAxis) => (event: PointerEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const wrapper = event.currentTarget.parentElement;

    if (!wrapper || !onResize) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;

    const onMove = (move: globalThis.PointerEvent) => {
      const size: ResizeSize = {};

      if (axis !== "y") {
        size.width = Math.max(MIN_SIZE, Math.round(rect.width + (move.clientX - startX)));
      }

      if (axis !== "x") {
        size.height = Math.max(MIN_SIZE, Math.round(rect.height + (move.clientY - startY)));
      }

      onResize(node.id, size);
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <Hb.Box
      component="span"
      onClick={handleSelect}
      sx={{
        position: "relative",
        display: "inline-flex",
        cursor: "pointer",
        borderRadius: 1,
        outline: "2px solid",
        outlineColor: isSelected ? "primary.main" : "transparent",
        outlineOffset: 2,
      }}
    >
      <Component {...node.props} sx={node.style}>
        {node.children.map((child) => (
          <NodeView
            key={child.id}
            node={child}
            selectedId={selectedId}
            onSelect={onSelect}
            onResize={onResize}
          />
        ))}
      </Component>

      {isSelected &&
        onResize &&
        HANDLES.map((handle) => (
          <Hb.Box
            key={handle.axis}
            onPointerDown={startResize(handle.axis)}
            onClick={(event) => event.stopPropagation()}
            sx={{
              position: "absolute",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              touchAction: "none",
              zIndex: 3,
              ...handle.sx,
            }}
          >
            <Hb.Box
              sx={{
                width: 10,
                height: 10,
                bgcolor: "primary.main",
                border: "2px solid",
                borderColor: "background.paper",
                borderRadius: "2px",
              }}
            />
          </Hb.Box>
        ))}
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
  onResize?: (id: NodeId, size: ResizeSize) => void;
}

/** Document Model을 실제 `Hb.*` 컴포넌트 트리로 렌더하는 캔버스. */
export function Canvas({ document, selectedId, onSelect, onResize }: CanvasProps) {
  return (
    <>
      {document.children.map((node) => (
        <NodeView
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
          onResize={onResize}
        />
      ))}
    </>
  );
}
